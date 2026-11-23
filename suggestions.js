// Score only submitted answers. Suggestions are optional spelling changes.
function spellingDistance(left,right,limit) {
  if (Math.abs(left.length-right.length)>limit) return limit+1;
  let row=Array.from({length:right.length+1},(_,index)=>index);
  for(let i=1;i<=left.length;i++) {
    const previous=row;
    row=[i];
    for(let j=1;j<=right.length;j++) {
      row[j]=Math.min(previous[j]+1,row[j-1]+1,previous[j-1]+Number(left[i-1]!==right[j-1]));
    }
    if (Math.min(...row)>limit) return limit+1;
  }
  return row.at(-1);
}

function suggestAnswers(model,value) {
  const key=answerKey(value);
  if (model.aliases.has(key)) return [];
  if (model.id==="long-films" && ["lotr","l o t r","lord of the rings","the lord of the rings","властелин колец","вк"].includes(key)) {
    return model.entries.slice(0,3);
  }
  if (key.length<5) return [];
  const limit=key.length<8 ? 1 : 2;
  const candidates=new Map();
  for(const [alias,entry] of model.aliases) {
    if (!alias || alias[0]!==key[0]) continue;
    const distance=spellingDistance(key,alias,limit);
    if (distance<=limit && distance<(candidates.get(entry)??Infinity)) candidates.set(entry,distance);
  }
  return [...candidates].sort((a,b)=>a[1]-b[1]).slice(0,3).map(([entry])=>entry);
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
