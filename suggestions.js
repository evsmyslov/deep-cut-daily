// Score only submitted answers. Suggestions are optional spelling changes.
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
function suggestAnswers(model,value) {
  const key=answerKey(value);
  if (model.aliases.has(key)) return [];
  const retyped=model.aliases.get(answerKey(alternateLayout(value)));
  if (retyped && key.length>=3) return [retyped];
  if (model.id==="long-films" && ["lotr","l o t r","lord of the rings","the lord of the rings","властелин колец","вк"].includes(key)) {
    return model.entries.slice(0,3);
  }
  if (key.length<4) return [];
  const limit=key.length<8 ? 1 : key.length<16 ? 2 : 3;
  const digits=key.match(/\d+/g)?.join(",");
  const compact=key.replaceAll(" ","");
  const sound=phoneticKey(key);
  const isCyrillic=/\p{Script=Cyrillic}/u;
  const cyrillic=isCyrillic.test(key);
  const candidates=new Map();
  for(const [alias,entry] of model.aliases) {
    if (!alias || (digits && digits!==alias.match(/\d+/g)?.join(","))) continue;
    const tight=alias.replaceAll(" ","");
    const sameLetters=compact===tight;
    const sameSound=sound.length>=4 && cyrillic!==isCyrillic.test(alias) && phoneticKey(alias)===sound;
    const distance=sameLetters ? .15 : sameSound ? .3 : spellingDistance(key,alias,limit);
    if (distance>limit) continue;
    const rank=distance+Number(alias[0]!==key[0])*.22+Math.abs(alias.length-key.length)*.04;
    if (rank<(candidates.get(entry)??Infinity)) candidates.set(entry,rank);
  }
  const ranked=[...candidates].sort((a,b)=>a[1]-b[1]);
  const best=ranked[0]?.[1];
  return ranked.filter(([,rank])=>rank<=best+.35).slice(0,3).map(([entry])=>entry);
}
function bindSuggestions(model) {
  const field=get("answer");
  const container=get("suggestions");
  const render=()=>{
    const items=field.disabled ? [] : suggestAnswers(model,field.value);
    container.replaceChildren();
    container.hidden=!items.length;
    if (!items.length) return;
    container.append(element("span",words().suggestion));
    items.forEach(entry=>{
      const choice=element("button",entry[lang]);
      choice.type="button";
      choice.className="quiet";
      choice.onclick=()=>{
        field.value=entry[lang];
        render();
        field.focus({preventScroll:true});
      };
      container.append(choice);
    });
  };
  field.addEventListener("input",render);
  render();
}
