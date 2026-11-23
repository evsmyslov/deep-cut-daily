"use strict";

const DAY = 86400000;
const firstDay = Date.parse(premiere) / DAY;
const maximum = 6;
const storageKey = "deep-cut-daily-v1";
const dateLabel = new Intl.DateTimeFormat("en", { timeZone: "UTC", month: "short", day: "numeric", year: "numeric" });
const levels = ["Opening", "Close-up", "Deep cut"];
const get = id => document.getElementById(id);
let library = {};
try {
  library = JSON.parse(localStorage.getItem(storageKey)) ?? {};
} catch {
  // Progress can still be kept in memory.
}
function today() { return Math.max(firstDay, Math.floor(Date.now() / DAY)); }
function episode(day) { return editions[(day - firstDay) % editions.length]; }
function dateKey(day) { return new Date(day * DAY).toISOString().slice(0, 10); }
function readRoute() {
  const params = new URLSearchParams(location.search);
  const date = params.get("edition");
  const parsed = /^\d{4}-\d\d-\d\d$/.test(date ?? "") ? Date.parse(date) / DAY : NaN;
  const valid = parsed >= firstDay && parsed <= today() && dateKey(parsed) === date;
  const target = params.get("score");
  return { day: valid ? parsed : today(), fixed: valid, rival: valid && /^[0-6]$/.test(target ?? "") ? Number(target) : null };
}
let route = readRoute();
let page;
let round;

function save() {
  library[route.day] = round;
  try { localStorage.setItem(storageKey, JSON.stringify(library)); } catch { /* The round stays playable. */ }
}
const total = () => round.answers.reduce((sum, item) => sum + item.points, 0);
function normalize(value) {
  return value.normalize("NFKD").replace(/\p{M}/gu, "").toLowerCase().replace(/[’']/g, "")
    .replace(/[^a-z0-9]+/g, " ").trim();
}
function swap(id) {
  page = id;
  get("stage").replaceChildren(get(id).content.cloneNode(true));
}
function setHeader() {
  const kind = route.day === today() ? "Today" : "Archive";
  get("edition").textContent = `${kind} / ${dateLabel.format(route.day * DAY)}`;
  get("footer-mode").textContent = route.rival === null ? "3 questions · Play at your own pace" : "Friend challenge · Same three questions";
}
function intro(moveFocus = false) {
  swap("intro");
  setHeader();
  const [topic, category, pitch] = episode(route.day);
  get("category").textContent = category;
  get("topic").textContent = topic;
  get("pitch").textContent = pitch;
  get("challenge").hidden = route.rival === null;
  get("challenge").textContent = "A friend challenged you to this edition.";
  const previous = library[route.day];
  const start = get("start");
  start.textContent = previous?.done ? "See my result" : previous ? "Resume edition" : "Play this edition";
  start.onclick = () => {
    round = library[route.day] ?? { answers: [], hint: false, feedback: false, done: false };
    save();
    if (round.done) showResults();
    else question();
  };
  if (moveFocus) start.focus();
}
function question() {
  swap("question");
  const index = round.answers.length - Number(round.feedback);
  const [prompt, clue, accepted, fact] = episode(route.day)[3][index];
  get("level").textContent = `${index + 1} / 3 · ${levels[index]} · ${index + 1} pt${index ? "s" : ""}`;
  get("round-score").textContent = `${total()} / ${maximum}`;
  get("prompt").textContent = prompt;
  [...get("progress").children].forEach((bar, n) => bar.classList.toggle("active", n <= index));
  const hint = () => {
    get("hint-line").textContent = clue;
    get("hint-line").hidden = false;
    get("hint").disabled = true;
  };
  if (round.hint && !round.feedback) hint();
  get("hint").onclick = () => {
    round.hint = true;
    save();
    hint();
    get("answer").focus();
  };
  function settle(text) {
    if (round.feedback) return;
    const guess = normalize(text);
    const correct = guess !== "" && accepted.split("|").some(answer => normalize(answer) === guess);
    const points = correct ? index + 1 - Number(round.hint) : 0;
    round.answers.push({ text, correct, points, usedHint: round.hint });
    round.feedback = true;
    save();
    reveal();
  }
  get("answer-form").onsubmit = event => {
    event.preventDefault();
    const value = get("answer").value.trim();
    if (normalize(value)) settle(value);
  };
  get("skip").onclick = () => settle("");
  get("next").onclick = () => {
    round.feedback = false;
    round.hint = false;
    round.done = round.answers.length === 3;
    save();
    if (round.done) showResults();
    else question();
  };
  function reveal() {
    const result = round.answers[index];
    get("answer-form").hidden = true;
    get("question-actions").hidden = true;
    get("feedback").hidden = false;
    get("fact").textContent = fact;
    get("verdict").textContent = result.correct
      ? `${accepted.split("|")[0]} · +${result.points} pt${result.points === 1 ? "" : "s"}`
      : `${result.text ? "Answer" : "Skipped"} · ${accepted.split("|")[0]}`;
    get("round-score").textContent = `${total()} / ${maximum}`;
    if (index === 2) get("next").textContent = "See result";
    get("next").focus({ preventScroll: true });
  }
  if (round.feedback) reveal();
  else get("answer").focus({ preventScroll: true });
}
function node(name, text) {
  const el = document.createElement(name);
  el.textContent = text;
  return el;
}
function showResults() {
  swap("results");
  const [topic, , , questions] = episode(route.day);
  const points = total();
  get("finished-topic").textContent = `${topic} / ${dateKey(route.day)}`;
  get("total").textContent = `${points} / ${maximum} points`;
  get("comparison").hidden = route.rival === null;
  if (route.rival !== null) {
    const outcome = points === route.rival ? "You tied." : points > route.rival ? "You beat their score." : "Your friend wins this one.";
    get("comparison").textContent = `Friend’s score: ${route.rival} / ${maximum}. ${outcome}`;
  }
  round.answers.forEach((answer, index) => {
    const expected = questions[index][2].split("|")[0];
    const row = node("li", "");
    const description = answer.correct ? answer.text : answer.text ? `${answer.text} · Answer: ${expected}` : `Skipped · ${expected}`;
    row.append(node("span", description), node("strong", `+${answer.points}`));
    get("recap").append(row);
  });
  get("today").textContent = route.fixed ? "Today’s edition" : "Back to edition";
  get("today").onclick = () => openEdition();
  get("share").onclick = () => {
    const url = new URL(location.href);
    url.search = "";
    url.hash = "";
    url.searchParams.set("edition", dateKey(route.day));
    url.searchParams.set("score", String(points));
    const scorecard = round.answers.map(a => a.correct ? a.usedHint ? "🟨" : "🟩" : "⬛").join("");
    copyChallenge(`Deep Cut Daily · ${topic}\n${scorecard} ${points}/${maximum}\nCan you beat my score?\n${url.href}`);
  };
  get("stage").querySelector("h1").tabIndex = -1;
  get("stage").querySelector("h1").focus({ preventScroll: true });
}
async function copyChallenge(text) {
  try {
    await navigator.clipboard.writeText(text);
    if (get("share-status")) get("share-status").textContent = "Challenge copied.";
  } catch {
    const field = node("textarea", "");
    field.value = text;
    field.readOnly = true;
    field.rows = 5;
    field.setAttribute("aria-label", "Challenge text");
    modal("Copy your challenge", field);
    field.select();
  }
}
function openEdition(day) {
  const url = new URL(location.href);
  url.search = "";
  url.hash = "";
  if (day !== undefined) url.searchParams.set("edition", dateKey(day));
  history.pushState(null, "", url);
  route = readRoute();
  intro(true);
}
function modal(title, ...content) {
  get("modal-title").textContent = title;
  get("modal-content").replaceChildren(...content);
  get("modal").showModal();
}
get("home").onclick = event => { event.preventDefault(); openEdition(); };
get("rules").onclick = () => modal("How to play",
  node("p", "Type your own answers to three questions on the same topic. The questions are worth one, two and three points."),
  node("p", "A hint costs one point on that question. Skip to see the answer, or complete the edition and challenge a friend to the same questions."),
  node("p", "A new edition opens at 00:00 UTC. Progress and stats are saved in this browser."));
get("stats").onclick = () => {
  const completed = Object.values(library).filter(item => item.done);
  let day = today();
  let streak = 0;
  if (!library[day]?.done) day--;
  while (library[day]?.done) { streak++; day--; }
  const perfect = completed.filter(item => item.answers.reduce((sum, answer) => sum + answer.points, 0) === maximum).length;
  const grid = node("div", "");
  grid.className = "stat-grid";
  for (const [count, label] of [[completed.length, "Completed"], [perfect, "Perfect scores"], [streak, "Day streak"]]) {
    const stat = node("div", "");
    stat.append(node("strong", String(count)), node("span", label));
    grid.append(stat);
  }
  modal("Your stats", grid);
};
get("archive").onclick = () => {
  const list = node("div", "");
  list.className = "archive-list";
  for (let day = today() - 1; day >= Math.max(firstDay, today() - editions.length + 1); day--) {
    const button = node("button", "");
    button.className = "archive-item";
    const date = node("time", dateLabel.format(day * DAY));
    date.dateTime = dateKey(day);
    button.append(node("span", episode(day)[0]), date);
    button.onclick = () => { get("modal").close(); openEdition(day); };
    list.append(button);
  }
  modal("Past editions", list.childElementCount ? list : node("p", "Past editions start appearing tomorrow."));
};
addEventListener("popstate", () => { route = readRoute(); intro(); });
function updateClock() {
  const now = Date.now();
  const seconds = Math.ceil((DAY - (now % DAY)) / 1000);
  const time = [Math.floor(seconds / 3600), Math.floor(seconds / 60) % 60, seconds % 60].map(num => String(num).padStart(2, "0"));
  get("countdown").textContent = `Next in ${time.join(":")}`;
  if (!route.fixed && route.day !== today() && page === "intro") {
    route = readRoute();
    intro();
  }
}
intro();
updateClock();
setInterval(updateClock, 1000);
