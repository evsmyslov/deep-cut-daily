#!/usr/bin/env python3
"""Build the bilingual quiz bank from GeoNames and Wikidata exports.

GeoNames inputs: cities.zip (cities15000.zip), names.zip (alternateNamesV2.zip),
admin1.txt (admin1CodesASCII.txt), country.txt (countryInfo.txt).
Wikidata inputs: film-cast.tsv, film-director.tsv, albums.tsv, novels.tsv
with entity, contributor and sitelink count columns, plus labels.tsv and
optionally extended-labels.tsv with entity and @en/@ru labels. The credit
properties are P161 (cast), P57 (director), P175 (album performer), and P50
(author). The source files are used as snapshots so released IDs stay stable.
"""
import argparse
import json
import re
import subprocess
import unicodedata
from collections import Counter, defaultdict
from pathlib import Path
from zipfile import ZipFile


def lines(path):
    with path.open(encoding="utf-8") as source:
        yield from source


def zip_lines(path):
    with ZipFile(path) as source:
        file = max((item for item in source.infolist() if item.filename.endswith(".txt")),key=lambda item:item.file_size)
        with source.open(file) as content:
            for line in content:
                yield line.decode("utf-8")


def answer_key(text):
    normalized = unicodedata.normalize("NFKC", text).lower().replace("ё", "е")
    return " ".join(re.findall(r"[^\W_]+", normalized, flags=re.UNICODE))


def titles(text):
    return " ".join(text.replace("|", "–").split())


def alternatives(display, other):
    return display if not other or display == other else f"{display}|{other}"


def distinct(answers, pool):
    seen, result = set(), []
    for item, weight in sorted(answers, key=lambda row: (-row[1], row[0])):
        en, ru = pool[item]
        keys = {answer_key(name) for name in f"{en}|{ru}".split("|")}
        if not all(keys) or keys & seen:
            continue
        seen.update(keys)
        result.append((item, weight))
    return result


def places(source):
    countries = {
        fields[0]: fields[4] for line in lines(source/"country.txt")
        if line.strip() and not line.startswith("#") and len(fields := line.split("\t"))>4
    }
    regions = {
        fields[0]: (fields[1], int(fields[3])) for line in lines(source/"admin1.txt")
        if len(fields := line.strip().split("\t"))==4
    }
    labels = json.loads(subprocess.check_output([
        "node", "-e",
        "const ru=new Intl.DisplayNames(['ru'],{type:'region'});"
        "console.log(JSON.stringify(Object.fromEntries(process.argv.slice(1).map(c=>[c,ru.of(c)]))));",
        *countries,
    ], text=True))
    admin_groups, nation_groups = defaultdict(list), defaultdict(list)
    metadata = {}
    for line in zip_lines(source/"cities.zip"):
        fields=line.rstrip("\n").split("\t")
        feature, country=fields[7:9]
        population=int(fields[14])
        if (population<15000 or country not in countries or
                feature not in {"PPL","PPLC","PPLA","PPLA2","PPLA3","PPLA4","PPLA5"}):
            continue
        id=int(fields[0])
        metadata[id]=(fields[1],fields[2])
        nation_groups[country].append((id,population))
        admin_groups[f"{country}.{fields[10]}"].append((id,population))
    needed=set(metadata)|{geo_id for _,geo_id in regions.values()}
    translated={}
    for line in zip_lines(source/"names.zip"):
        fields=line.split("\t",6)
        if len(fields)<6 or fields[2]!="ru" or int(fields[1]) not in needed:
            continue
        id=int(fields[1])
        # Historical and colloquial spellings stay out of the canonical title.
        if len(fields)>6 and (fields[5]=="1" or fields[6].split("\t",1)[0].strip()=="1"):
            continue
        preferred=(fields[4]=="1",bool(re.search("[А-Яа-яЁё]",fields[3])))
        if preferred[1] and (id not in translated or preferred>translated[id][0]):
            translated[id]=(preferred,titles(fields[3]))
    pool={}
    for id,(original,ascii_name) in metadata.items():
        en=alternatives(titles(ascii_name),titles(original))
        ru=translated.get(id,(None,titles(original)))[1]
        pool[id]=(en,ru)
    candidates=[]
    for code,weights in nation_groups.items():
        entries=distinct(weights,pool)
        if len(entries)>=15:
            candidates.append(("country-cities","places",f"cities-{code.lower()}",
                f"Name a city or town in {countries[code]} with a GeoNames population of at least 15,000.",
                f"Назовите город с населением от 15 000 человек по GeoNames в стране «{labels[code]}».",entries))
    for key,weights in admin_groups.items():
        entries=distinct(weights,pool)
        if key not in regions or len(entries)<15:
            continue
        code=key.split(".")[0]
        name,id=regions[key]
        ru=translated.get(id,(None,name))[1]
        candidates.append(("region-cities","places",f"cities-{key.replace('.','-').lower()}",
            f"Name a city or town in {name}, {countries[code]}, with a GeoNames population of at least 15,000.",
            f"Назовите город с населением от 15 000 человек по GeoNames в регионе «{ru}», {labels[code]}.",entries))
    return pool,candidates


def qid(uri):
    return int(uri.rsplit("Q",1)[1].strip(">"))


def media(source):
    languages=defaultdict(dict)
    for basename in ("labels.tsv","extended-labels.tsv","species-labels.tsv"):
        path=source/basename
        if not path.exists():
            continue
        for line in lines(path):
            if not line.startswith("<"):
                continue
            uri,value=line.rstrip("\n").split("\t",1)
            quoted,_,lang=value.rpartition("@")
            if lang not in {"en","ru"}:
                continue
            try:
                name=titles(json.loads(quoted))
            except json.JSONDecodeError:
                continue
            if name:
                languages[qid(uri)][lang]=name
    pool={
        item:(labels.get("en") or labels["ru"], labels.get("ru") or labels["en"])
        for item,labels in languages.items()
    }
    result=[]
    for filename,kind,minimum,en_format,ru_format in [
        ("film-cast.tsv","film-actors",16,"Name a film featuring {} in the credited cast.",
         "Назовите фильм, в котором снимался или снималась {}."),
        ("film-director.tsv","film-directors",13,"Name a film directed by {}.",
         "Назовите фильм режиссёра «{}»."),
        ("albums.tsv","music-albums",12,"Name a music album by {}.",
         "Назовите музыкальный альбом исполнителя «{}»."),
        ("novels-deep.tsv","novels-by-author",10,"Name a novel by {}.",
         "Назовите роман автора «{}»."),
        ("species.tsv","named-species",14,"Name a species in the genus {}.",
         "Назовите вид из рода «{}»."),
    ]:
        credits=defaultdict(dict)
        path=source/filename
        if not path.exists():
            continue
        for line in lines(path):
            if not line.startswith("<"):
                continue
            item,person,links=line.split("\t")
            id,creator=qid(item),qid(person)
            if id in pool and creator in pool:
                credits[creator][id]=int(links)
        used_en,used_ru=set(),set()
        for person,works in sorted(credits.items(),key=lambda entry:(-len(entry[1]),entry[0])):
            if len(works)<minimum:
                break
            en,ru=pool[person]
            en_key,ru_key=answer_key(en),answer_key(ru)
            if en_key in used_en or ru_key in used_ru:
                continue
            entries=distinct(works.items(),pool)
            if len(entries)<minimum:
                continue
            used_en.add(en_key)
            used_ru.add(ru_key)
            result.append((kind,"media",f"{kind}-q{person}",en_format.format(en),ru_format.format(ru),entries))
    return pool,result


def prominence(question):
    return sum(weight for _,weight in question[-1][:5])


def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument("source",type=Path)
    parser.add_argument("output",type=Path)
    parser.add_argument("--target",type=int,required=True,help="number of generated questions")
    options=parser.parse_args()
    geo,locations=places(options.source)
    credits,works=media(options.source)
    pools={"places":geo,"media":credits}
    quotas={
        "country-cities":170,"region-cities":650,"film-directors":900,"music-albums":1150,"novels-by-author":500,"named-species":350
    }
    groups=defaultdict(list)
    for question in locations+works:
        groups[question[0]].append(question)
    for questions in groups.values():
        questions.sort(key=lambda question:(-prominence(question),question[2]))
    selected=[]
    for group,limit in quotas.items():
        selected.extend(groups[group][:limit])
    selected.extend(groups["film-actors"][:max(0,options.target-len(selected))])
    assert len(selected)==options.target, (len(selected),options.target)
    result={"pools":{key:[] for key in pools},"questions":[]}
    references={key:{} for key in pools}
    for kind,pool,id,en,ru,entries in sorted(selected,key=lambda question:question[2]):
        indexed=[]
        for item,_ in entries:
            lookup=references[pool]
            if item not in lookup:
                lookup[item]=len(result["pools"][pool])
                result["pools"][pool].append([item,*pools[pool][item]])
            indexed.append(lookup[item])
        result["questions"].append([id,kind,pool,en,ru,indexed])
    assert len({question[0] for question in result["questions"]})==options.target
    with options.output.open("w",encoding="utf-8",newline="\n") as destination:
        destination.write("// Adapted from GeoNames (CC BY 4.0) and Wikidata (CC0). See the Rules menu.\n")
        destination.write("const QUESTION_BANK = ")
        json.dump(result,destination,ensure_ascii=False,separators=(",",":"))
        destination.write(";\n")
    print("Generated:", dict(Counter(question[0] for question in selected)))
    print("Answers:", {name: len(pool) for name,pool in result["pools"].items()})


if __name__=="__main__":
    main()
