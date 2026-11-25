import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {runInNewContext} from "node:vm";

const scripts = ["catalog-data.js","question-bank.js","everyday-questions.js","theme-questions.js","answer-expansions.js","open-questions.js","answer-notes.js"];
const source = scripts.map(file => readFileSync(new URL(`../${file}`,import.meta.url),"utf8")).join("\n");
const {cards,decks,packs,models,retired} = runInNewContext(source + `
  ({cards:[...themeCards,...rotationCards,...dailySpecialCards], decks:[mineDecks[6],mineDecks[MINE_DECK_VERSION]], packs:minePacks,
    retired:Object.keys(rotationReplacements), models:Object.fromEntries([...new Set([...themeCards.map(([id])=>id),...dailySpecialCards.map(([id])=>id),
      ...mineDecks[MINE_DECK_VERSION],...Object.values(minePacks).flatMap(pack=>pack.ids)])]
      .map(id=>[id,mineQuestion(id)]))})
`);
const ids = cards.map(([id])=>id);
assert.equal(new Set(ids).size,ids.length,"New question IDs must be unique");
for (const id of ids) {
  assert.ok(!decks[0].includes(id),`${id} collides with an earlier question`);
  const model=models[id];
  assert.ok(model.en && model.ru,`${id} needs both prompts`);
  assert.ok(model.entries.length>=15,`${id} needs more answers`);
  assert.equal(model.entries.filter(entry=>entry.tier===3).length,1,`${id} needs exactly one +120 answer`);
  for (const entry of model.entries) {
    assert.ok(entry.en && entry.ru,`${id} needs both answer labels for ${entry.id}`);
    assert.ok(Number.isInteger(entry.tier) && entry.tier>=0 && entry.tier<=4,`${id} has an invalid tier`);
  }
}
runInNewContext(source + `
  for (const [id] of [...themeCards,...rotationCards,...dailySpecialCards]) {
    const model=mineQuestion(id);
    for (const [i,[tier,en,ru]] of catalog[id][2].entries()) {
      for (const name of [...en.split("|"),...ru.split("|")]) {
        if (model.aliases.get(answerKey(name))?.id!==i) throw new Error(id+" has an ambiguous alias: "+name);
      }
    }
  }
  for (const [day,revisions] of dailyRevisions) {
    for (const [index,ids] of revisions.entries()) {
      if (!validDailyRevision(day,index+2) || ids.length!==8 || new Set(ids).size!==8 || ids.some(id=>!hasMineQuestion(id))) {
        throw new Error("Invalid special daily revision for "+day);
      }
    }
  }
  for (let offset=0;offset<90;offset++) {
    const ids=dailyIds(MINE_DAY+2+offset);
    if (new Set(ids).size!==8 || ids.some(id=>!mineDecks[MINE_DECK_VERSION].includes(id))) throw new Error("Invalid daily pack");
  }
  for (const [id,expansion] of Object.entries(mineAnswerExpansions)) {
    if (!Object.hasOwn(catalog,id)) throw new Error("Unknown expanded question: "+id);
    const model=mineQuestion(id);
    const base=catalog[id][2].length;
    if (model.entries.length!==base+(expansion.rows?.length ?? 0)-(expansion.inactive?.length ?? 0)) {
      throw new Error("Invalid answer count for "+id);
    }
    if (model.entries.filter(entry=>entry.tier===3).length!==1) throw new Error("Invalid top rarity for "+id);
    for (const [i,[tier,en,ru]] of (expansion.rows ?? []).entries()) {
      const entry=model.answerById.get(base+i);
      if (entry.tier!==tier) throw new Error(id+" changed tier for "+en);
      if (expansion.inactive?.includes(base+i)) continue;
      for (const name of [...en.split("|"),...ru.split("|")]) {
        if (name && model.aliases.get(answerKey(name))!==entry) throw new Error(id+" has an ambiguous addition: "+name);
      }
    }
    for (const [i,aliases] of Object.entries(expansion.aliases ?? {})) {
      for (const alias of aliases) {
        if (model.aliases.get(answerKey(alias))?.id!==Number(i)) throw new Error(id+" has an ambiguous alias: "+alias);
      }
    }
  }
  for (const [id,count] of [["constellations",88],["countries",193],["elements",118]]) {
    if (mineQuestion(id).entries.length!==count) throw new Error("Incomplete reference list: "+id);
  }
  for (const [id,english,russian] of [
    ["birds","Struthio molybdophanes","Сомалийский страус"],
    ["capitals","Bandar Seri Begawan","Бандар-Сери-Бегаван"],
    ["constellations","Puppis","Корма"],
    ["rivers","Douro","Дору"],
    ["films","Titanic (1997)","Титаник"],
    ["long-films","Doctor Zhivago (1965)","Доктор Живаго"],
    ["long-films","Kingdom of Heaven (Director’s Cut)","Царство небесное (режиссёрская версия)"]
  ]) {
    const {aliases}=mineQuestion(id);
    const answer=aliases.get(answerKey(english));
    if (!answer || aliases.get(answerKey(russian))!==answer) throw new Error(id+" has separate language variants: "+english);
  }
  const longMovies=mineQuestion("long-films");
  if (longMovies.aliases.has("avengers infinity war") || longMovies.aliases.has("kingdom of heaven")) {
    throw new Error("A theatrical cut below the stated runtime is still eligible");
  }
`);
for (const [id,pack] of Object.entries(packs)) {
  assert.ok(pack.en && pack.ru,`${id} needs both titles`);
  assert.ok(pack.ids.length>=10,`${id} needs enough questions for a ten-round room`);
  assert.equal(new Set(pack.ids).size,pack.ids.length,`${id} contains repeated questions`);
}
assert.equal(new Set(decks[1]).size,decks[1].length,"The current deck contains repeated questions");
for (const id of retired) {
  assert.ok(!decks[1].includes(id),`${id} remains in the active deck`);
  assert.ok(!Object.values(packs).some(pack=>pack.ids.includes(id)),`${id} remains in a themed pack`);
}
const noteCount=runInNewContext(source + `
  for (const [id,notes] of Object.entries(mineAnswerNotes)) {
    const labels=new Set(mineQuestion(id).entries.map(entry=>entry.en));
    for (const [name,note] of Object.entries(notes)) {
      if (!labels.has(name)) throw new Error(id+" has a note for an unknown answer: "+name);
      if (note.length!==2 || note.some(text=>typeof text!=="string" || !text.trim())) {
        throw new Error(id+" needs a note in both languages: "+name);
      }
    }
  }
  for (const id of [...mineDecks[MINE_DECK_VERSION],...dailySpecialCards.map(([id])=>id)]) {
    const best=mineQuestion(id).entries.find(entry=>entry.tier===3);
    if (!mineAnswerNotes[id]?.[best?.en]) throw new Error(id+" is missing a +120 answer note");
  }
  Object.values(mineAnswerNotes).reduce((sum,notes)=>sum+Object.keys(notes).length,0);
`);
const addedAnswers=ids.reduce((sum,id)=>sum+models[id].entries.length,0);
console.log(`${decks[1].length} active questions, ${ids.length} validated editorial cards with ${addedAnswers} answers, ${noteCount} bilingual answer notes, ${retired.length} retired prompts, ${Object.keys(packs).length} themed expeditions`);
