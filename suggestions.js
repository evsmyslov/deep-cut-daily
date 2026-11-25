// Match spelling only when an answer is submitted.
function spellingDistance(left,right,limit) {
  if (Math.abs(left.length-right.length)>limit) return limit+1;
  let row=Array.from({length:right.length+1},(_,index)=>index);
  let beforePrevious;
  for(let i=1;i<=left.length;i++) {
    const previous=row;
    row=[i];
    for(let j=1;j<=right.length;j++) {
      row[j]=Math.min(previous[j]+1,row[j-1]+1,previous[j-1]+Number(left[i-1]!==right[j-1]));
      if (i>1 && j>1 && left[i-1]===right[j-2] && left[i-2]===right[j-1]) {
        row[j]=Math.min(row[j],beforePrevious[j-2]+1);
      }
    }
    beforePrevious=previous;
  }
  return row.at(-1);
}

const keyboardLatin="`qwertyuiop[]asdfghjkl;'zxcvbnm,.";
const keyboardCyrillic="ёйцукенгшщзхъфывапролджэячсмитьбю";
const cyrillicSounds={
  а:"a",б:"b",в:"v",г:"g",д:"d",е:"e",ж:"zh",з:"z",и:"i",й:"y",к:"k",л:"l",м:"m",н:"n",о:"o",п:"p",
  р:"r",с:"s",т:"t",у:"u",ф:"f",х:"kh",ц:"ts",ч:"ch",ш:"sh",щ:"shch",ъ:"",ы:"y",ь:"",э:"e",ю:"yu",я:"ya"
};
function phoneticKey(key) {
  return [...key].map(letter=>cyrillicSounds[letter] ?? letter).join("")
    .replace(/(ey|ee|ea)/g,"i").replace(/oa/g,"o").replace(/([a-z])\1+/g,"$1").replaceAll(" ","");
}
function alternateLayout(value) {
  const cyrillic=/\p{Script=Cyrillic}/u.test(value);
  if (cyrillic && /\p{Script=Latin}/u.test(value)) return "";
  const from=cyrillic ? keyboardCyrillic : keyboardLatin;
  const to=cyrillic ? keyboardLatin : keyboardCyrillic;
  return [...value.toLowerCase()].map(char=>to[from.indexOf(char)] ?? char).join("");
}
const suggestionIndexes=new WeakMap();
const cyrillicText=/\p{Script=Cyrillic}/u;
function indexSuggestions(model) {
  if (suggestionIndexes.has(model)) return suggestionIndexes.get(model);
  const lengths=new Map(), compact=new Map(), sounds=new Map();
  for (const [alias,entry] of model.aliases) {
    const candidate={alias,entry,digits:alias.match(/\d+/g)?.join(","),cyrillic:cyrillicText.test(alias)};
    for (const [map,key] of [[lengths,alias.length],[compact,alias.replaceAll(" ","")],[sounds,phoneticKey(alias)]]) {
      if (!map.has(key)) map.set(key,[]);
      map.get(key).push(candidate);
    }
  }
  const index={lengths,compact,sounds};
  suggestionIndexes.set(model,index);
  return index;
}
function suggestAnswers(model,value) {
  const key=answerKey(value);
  if (model.aliases.has(key) || model.inactiveKeys?.has(key)) return [];
  const retyped=alternateLayout(value);
  const layoutMatch=model.aliases.get(answerKey(retyped));
  if (layoutMatch && key.length>=3) return [{entry:layoutMatch,text:retyped}];
  if (model.id==="long-films" && ["lotr","l o t r","lord of the rings","the lord of the rings","властелин колец","вк"].includes(key)) {
    return model.entries.slice(0,3).map(entry=>({entry,text:entry.en}));
  }
  if (key.length<4) return [];
  const limit=key.length<8 ? 1 : key.length<16 ? 2 : 3;
  const digits=key.match(/\d+/g)?.join(",");
  const compact=key.replaceAll(" ","");
  const sound=phoneticKey(key);
  const cyrillic=cyrillicText.test(key);
  const index=indexSuggestions(model);
  const candidates=new Map();
  const record=({alias,entry,digits:aliasDigits},distance)=>{
    if (distance>limit || (digits && digits!==aliasDigits)) return;
    const rank=distance+Number(alias[0]!==key[0])*.22+Math.abs(alias.length-key.length)*.04;
    if (rank<(candidates.get(entry)?.rank??Infinity)) candidates.set(entry,{entry,text:alias,rank});
  };
  for (const item of index.compact.get(compact) ?? []) record(item,.15);
  if (sound.length>=4) {
    for (const item of index.sounds.get(sound) ?? []) {
      if (item.cyrillic!==cyrillic) record(item,.3);
    }
  }
  if (!candidates.size) {
    for (let length=key.length-limit; length<=key.length+limit; length++) {
      for (const item of index.lengths.get(length) ?? []) {
        if (item.cyrillic!==cyrillic || (digits && digits!==item.digits)) continue;
        if (model.aliases.size>5000 && item.alias[0]!==key[0] && item.alias.at(-1)!==key.at(-1)) continue;
        record(item,spellingDistance(key,item.alias,limit));
      }
    }
  }
  const ranked=[...candidates.values()].sort((a,b)=>a.rank-b.rank);
  const best=ranked[0]?.rank;
  return ranked.filter(({rank})=>rank<=best+.35).slice(0,3);
}
function bindAnswerCorrection(model) {
  const field=get("answer");
  const form=get("answer-form");
  const container=get("suggestions");
  const clear=()=>{
    container.replaceChildren();
    container.hidden=true;
  };
  field.addEventListener("input",clear);
  return text=>{
    clear();
    const entry=model.aliases.get(answerKey(text));
    if (entry) return {entry,text};
    const items=suggestAnswers(model,text);
    if (items.length<2) return items[0] ?? {text};
    container.setAttribute("aria-label",words().suggestion);
    container.hidden=false;
    container.append(element("span",words().suggestion));
    for (const {entry,text:choiceText} of items) {
      const choice=element("button",entry[lang]);
      choice.type="button";
      choice.className="quiet";
      choice.onclick=()=>{
        field.value=choiceText;
        form.requestSubmit();
      };
      container.append(choice);
    }
    container.querySelector("button").focus({preventScroll:true});
    return null;
  };
}
