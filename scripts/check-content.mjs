import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {runInNewContext} from "node:vm";

const scripts = ["catalog-data.js","question-bank.js","everyday-questions.js","theme-questions.js","open-questions.js"];
const source = scripts.map(file => readFileSync(new URL(`../${file}`,import.meta.url),"utf8")).join("\n");
const {cards,decks,packs,models} = runInNewContext(source + `
  ({cards:themeCards, decks:[mineDecks[6],mineDecks[7]], packs:minePacks,
    models:Object.fromEntries([...new Set(mineDecks[7].concat(...Object.values(minePacks).map(pack=>pack.ids)))]
      .map(id=>[id,mineQuestion(id)]))})
`);
const ids = cards.map(([id])=>id);
assert.equal(new Set(ids).size,ids.length,"New question IDs must be unique");
for (const id of ids) {
  assert.ok(!decks[0].includes(id),`${id} collides with an earlier question`);
  assert.ok(decks[1].includes(id),`${id} is missing from the current deck`);
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
  for (const [id] of themeCards) {
    const model=mineQuestion(id);
    for (const [i,[tier,en,ru]] of catalog[id][2].entries()) {
      for (const name of [...en.split("|"),...ru.split("|")]) {
        if (model.aliases.get(answerKey(name))?.id!==i) throw new Error(id+" has an ambiguous alias: "+name);
      }
    }
  }
`);
for (const [id,pack] of Object.entries(packs)) {
  assert.ok(pack.en && pack.ru,`${id} needs both titles`);
  assert.ok(pack.ids.length>=10,`${id} needs enough questions for a ten-round room`);
  assert.equal(new Set(pack.ids).size,pack.ids.length,`${id} contains repeated questions`);
}
const addedAnswers=ids.reduce((sum,id)=>sum+models[id].entries.length,0);
console.log(`${decks[1].length} active questions, ${ids.length} newly authored questions, ${addedAnswers} new answers, ${Object.keys(packs).length} themed expeditions`);
