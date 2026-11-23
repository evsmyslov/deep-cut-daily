"use strict";

const DAY = 86400000;
const START = Date.parse(debut) / DAY;
const scores = [25, 55, 85, 120];
const colors = ["#b1bba6", "#c58f6f", "#94c1a9", "#eac57f"];
const marks = ["⬜", "🟫", "🟩", "🟨"];
const maximum = groups.length * scores.at(-1);
const storage = "deep-cut-daily-descent";
const strings = {
  en: {
    rules:"How to play", stats:"Stats", archive:"Archive", reset:"New expedition at 00:00 UTC", daily:"Daily expedition",
    hero:"Journey to\nthe Core", pitch:"Find a correct answer most people would overlook. The rarer the find, the deeper you go.",
    challenge:"A friend sent you this expedition.", answerLabel:"Your answer", submit:"Submit", skip:"Skip", finished:"Expedition complete",
    share:"Challenge a friend", todayButton:"Today’s expedition", today:"Today", past:"Archive", nextIn:"Next in", next:"Go deeper", result:"See result",
    play:"Begin descent", resume:"Resume descent", replay:"See my result", active:"4 questions · Answers in EN or RU",
    versus:"Friend challenge · Same four questions", placeholder:"Answer in English or Russian…", question:"Question",
    wrong:"Answer not found", skipped:"Skipped", sample:"A valid answer", points:"points", target:"Friend’s score",
    won:"You beat their score.", tied:"You tied.", lost:"Your friend wins this one.", copied:"Challenge copied.",
    copy:"Copy your challenge", dare:"Can you find rarer answers?", noPast:"Past expeditions appear here after their daily release.",
    classic:"Classic edition and old results", completed:"Completed", best:"Best score", streak:"Day streak", badges:"Achievements", close:"Close",
    language:"Switch to Russian", menu:"Game menu", tiers:["Pebble","Ore","Relic","Core Gem"],
    categories:{science:"Science",places:"Geography",culture:"Pop culture",variety:"General knowledge"},
    rulesText:["Four prompts, each with more than one correct answer. Write one answer in English or Russian, regardless of your interface language.",
      "A find earns 25, 55, 85 or 120 points, based on an editorial estimate of its rarity. Both languages share the same answers and points.",
      "A new set opens at 00:00 UTC. Everyone gets the same questions. Your progress stays in this browser."],
    awards:[["First Footstep","Complete an expedition."],["Gem Hunter","Find three Core Gems in one expedition."],["Corebreaker","Earn 480 points in one expedition."]]
  },
  ru: {
    rules:"Правила", stats:"Статистика", archive:"Архив", reset:"Новый выпуск в 03:00 МСК", daily:"Ежедневная экспедиция",
    hero:"К центру\nЗемли", pitch:"Найдите верный ответ, который не сразу придёт в голову. Чем реже находка, тем глубже вы спускаетесь.",
    challenge:"Друг отправил вам эту экспедицию.", answerLabel:"Ваш ответ", submit:"Ответить", skip:"Пропустить", finished:"Экспедиция завершена",
    share:"Бросить вызов другу", todayButton:"Сегодняшний выпуск", today:"Сегодня", past:"Архив", nextIn:"До нового", next:"Спуститься глубже", result:"Посмотреть итог",
    play:"Начать спуск", resume:"Продолжить спуск", replay:"Мой результат", active:"4 вопроса · Ответы на EN или RU",
    versus:"Вызов друга · Те же четыре вопроса", placeholder:"Ответ на русском или английском…", question:"Вопрос",
    wrong:"Ответ не найден в словаре", skipped:"Пропуск", sample:"Верный вариант", points:"очков", target:"Счёт друга",
    won:"Вы набрали больше.", tied:"У вас ничья.", lost:"Друг набрал больше.", copied:"Вызов скопирован.",
    copy:"Скопируйте вызов", dare:"Сможешь найти ответы пореже?", noPast:"Здесь появятся выпуски, которые уже вышли.",
    classic:"Классическая версия и прежние результаты", completed:"Пройдено", best:"Рекорд", streak:"Дней подряд", badges:"Достижения", close:"Закрыть",
    language:"Переключить на английский", menu:"Меню игры", tiers:["Галька","Руда","Реликт","Самоцвет ядра"],
    categories:{science:"Наука",places:"География",culture:"Поп-культура",variety:"Общие знания"},
    rulesText:["Четыре вопроса, у каждого несколько верных ответов. Напишите один на русском или английском независимо от языка интерфейса.",
      "Находка приносит 25, 55, 85 или 120 очков по заранее заданной оценке редкости. Ответы и баллы одинаковы для обоих языков.",
      "Новый выпуск выходит в 03:00 по Москве. Вопросы у всех одинаковые. Прогресс сохраняется в этом браузере."],
    awards:[["Первый шаг","Завершить экспедицию."],["Искатель самоцветов","Найти три самоцвета ядра за экспедицию."],["Покоритель ядра","Набрать 480 очков за экспедицию."]]
  }
};
const get = id => document.getElementById(id);
const today = () => Math.max(START, Math.floor(Date.now() / DAY));
const iso = day => new Date(day * DAY).toISOString().slice(0, 10);
let library = {};
let lang = navigator.language.startsWith("ru") ? "ru" : "en";
try {
  const saved = JSON.parse(localStorage.getItem(storage));
  library = saved?.library ?? {};
  if (strings[saved?.lang]) lang = saved.lang;
} catch { /* Play remains available without storage. */ }
const words = () => strings[lang];
const displayDate = day => new Intl.DateTimeFormat(lang, { timeZone:"UTC", day:"numeric", month:"short", year:"numeric" }).format(day * DAY);
const pointsFor = answer => answer.tier < 0 ? 0 : scores[answer.tier];
const score = round => round.answers.reduce((sum, answer) => sum + pointsFor(answer), 0);
let route, page, round;

function persist() {
  try { localStorage.setItem(storage, JSON.stringify({lang, library})); } catch { /* Keep the current state in memory. */ }
}
function save() {
  library[route.day] = round;
  persist();
}
function readRoute() {
  const args = new URLSearchParams(location.search);
  const key = args.get("edition") ?? "";
  const date = /^\d{4}-\d\d-\d\d$/.test(key) ? Date.parse(key) / DAY : NaN;
  const valid = date >= START && date <= today() && iso(date) === key;
  const scoreText = args.get("score") ?? "";
  const rival = /^\d{1,3}$/.test(scoreText) && Number(scoreText) <= maximum ? Number(scoreText) : null;
  return { day: valid ? date : today(), fixed: valid, rival: valid ? rival : null };
}
function questionAt(index) {
  return questionFor(route.day - START, index, groups[index][1]);
}
function element(name, text) {
  const el = document.createElement(name);
  el.textContent = text;
  return el;
}
function localize() {
  document.documentElement.lang = lang;
  for (const item of document.querySelectorAll("[data-text]")) item.textContent = words()[item.dataset.text];
  get("lang").textContent = lang === "en" ? "EN / RU" : "RU / EN";
  get("lang").setAttribute("aria-label", words().language);
  get("nav").setAttribute("aria-label", words().menu);
  get("close").setAttribute("aria-label", words().close);
  const tierCards = words().tiers.map((tier, index) => {
    const card = element("div", "");
    card.className = "tier";
    card.style.setProperty("--tier", colors[index]);
    const icon = element("i", "");
    icon.setAttribute("aria-hidden", "true");
    const label = element("span", "");
    label.append(element("strong", tier), element("small", `+${scores[index]}`));
    card.append(icon, label);
    return card;
  });
  get("levels").replaceChildren(...tierCards);
}
function swap(id) {
  page = id;
  get("stage").replaceChildren(get(id).content.cloneNode(true));
  localize();
  get("edition").textContent = `${route.day === today() ? words().today : words().past} / ${displayDate(route.day)}`;
  get("footer-mode").textContent = route.rival === null ? words().active : words().versus;
  clock();
}
function intro(focus = false) {
  swap("intro");
  get("challenge").hidden = route.rival === null;
  const existing = library[route.day];
  get("start").textContent = existing?.done ? words().replay : existing ? words().resume : words().play;
  get("start").onclick = () => {
    round = library[route.day] ?? { answers: [], feedback: false, done: false };
    save();
    if (round.done) results();
    else question();
  };
  if (focus) get("start").focus();
}
function question(draft = "", focus = true) {
  swap("question");
  const index = round.answers.length - Number(round.feedback);
  const model = questionAt(index);
  const ui = words();
  get("level").textContent = `${ui.question} ${index + 1} / ${groups.length}`;
  get("round-score").textContent = `${score(round)} / ${maximum}`;
  get("category").textContent = ui.categories[model.category];
  get("prompt").textContent = model.prompt[lang === "en" ? 0 : 1];
  [...get("progress").children].forEach((bar, n) => bar.classList.toggle("active", n <= index));
  get("answer").placeholder = ui.placeholder;
  get("answer").value = draft;
  function settle(text) {
    if (round.feedback) return;
    const entry = model.answers.get(keyFor(text));
    round.answers.push({ text, id: entry?.id ?? null, tier: entry?.tier ?? -1 });
    round.feedback = true;
    save();
    reveal(true);
  }
  get("answer-form").onsubmit = event => {
    event.preventDefault();
    const value = get("answer").value.trim();
    if (keyFor(value)) settle(value);
  };
  get("skip").onclick = () => settle("");
  get("next").onclick = () => {
    round.feedback = false;
    round.done = round.answers.length === groups.length;
    save();
    if (round.done) results();
    else question();
  };
  function reveal(moveFocus) {
    const answer = round.answers[index];
    const found = model.entries[answer.id];
    get("answer-form").hidden = true;
    get("skip").hidden = true;
    get("feedback").hidden = false;
    get("verdict").textContent = found
      ? `${found[lang]} · ${ui.tiers[answer.tier]} · +${pointsFor(answer)}`
      : answer.text ? ui.wrong : ui.skipped;
    get("sample").textContent = found ? "" : `${ui.sample} · ${model.entries[0][lang]}`;
    get("round-score").textContent = `${score(round)} / ${maximum}`;
    get("next").textContent = index === groups.length - 1 ? ui.result : ui.next;
    if (moveFocus) get("next").focus({ preventScroll:true });
  }
  if (round.feedback) reveal(focus);
  else if (focus) get("answer").focus({ preventScroll:true });
}
const gemCount = round => round.answers.filter(a => a.tier === scores.length - 1).length;
const earned = rounds => [
  rounds.length > 0,
  rounds.some(round => gemCount(round) >= 3),
  rounds.some(round => score(round) === maximum)
];
function results(focus = true) {
  swap("results");
  const ui = words();
  const points = score(round);
  get("finished-topic").textContent = displayDate(route.day);
  get("total").textContent = `${points} / ${maximum} ${ui.points}`;
  get("badge").textContent = earned([round]).flatMap((unlocked, index) => unlocked ? [ui.awards[index][0]] : []).at(-1);
  get("comparison").hidden = route.rival === null;
  if (route.rival !== null) {
    const outcome = points === route.rival ? ui.tied : points > route.rival ? ui.won : ui.lost;
    get("comparison").textContent = `${ui.target} · ${route.rival} / ${maximum}. ${outcome}`;
  }
  round.answers.forEach((answer, index) => {
    const row = element("li", "");
    const name = questionAt(index).entries[answer.id]?.[lang] ?? (answer.text || ui.skipped);
    row.append(element("span", name), element("strong", `+${pointsFor(answer)}`));
    get("recap").append(row);
  });
  get("today").onclick = () => openEdition();
  get("share").onclick = () => {
    const url = new URL(location.href);
    url.search = "";
    url.hash = "";
    url.searchParams.set("mode", "descent");
    url.searchParams.set("edition", iso(route.day));
    url.searchParams.set("score", points);
    const card = round.answers.map(answer => marks[answer.tier] ?? "⬛").join("");
    copyChallenge(`Deep Cut Daily · ${iso(route.day)}\n${card} ${points}/${maximum}\n${ui.dare}\n${url.href}`);
  };
  if (focus) {
    const title = get("stage").querySelector("h1");
    title.tabIndex = -1;
    title.focus({ preventScroll:true });
  }
}
function openEdition(day) {
  const url = new URL(location.href);
  url.search = "";
  url.hash = "";
  if (day !== undefined) {
    url.searchParams.set("mode", "descent");
    url.searchParams.set("edition", iso(day));
  }
  history.pushState(null, "", url);
  route = readRoute();
  intro(true);
}
function modal(title, ...content) {
  get("modal-title").textContent = title;
  get("modal-content").replaceChildren(...content);
  get("modal").showModal();
}
async function copyChallenge(text) {
  try {
    await navigator.clipboard.writeText(text);
    if (get("share-status")) get("share-status").textContent = words().copied;
  } catch {
    const field = element("textarea", "");
    field.value = text;
    field.readOnly = true;
    field.rows = 5;
    field.setAttribute("aria-label", words().copy);
    modal(words().copy, field);
    field.select();
  }
}
function showStats() {
  const ui = words();
  const completed = Object.values(library).filter(item => item.done);
  let day = today();
  let consecutive = 0;
  if (!library[day]?.done) day--;
  while (library[day]?.done) { consecutive++; day--; }
  const grid = element("div", "");
  grid.className = "stat-grid";
  const best = Math.max(0, ...completed.map(score));
  for (const [count, label] of [[completed.length, ui.completed], [best, ui.best], [consecutive, ui.streak]]) {
    const stat = element("div", "");
    stat.append(element("strong", count), element("span", label));
    grid.append(stat);
  }
  const awards = element("ul", "");
  earned(completed).forEach((unlocked, index) => {
    const [title, description] = ui.awards[index];
    awards.append(element("li", `${unlocked ? "✓" : "○"} ${title} · ${description}`));
  });
  modal(ui.stats, grid, element("h3", ui.badges), awards);
}
function clock() {
  const seconds = Math.ceil((DAY - Date.now() % DAY) / 1000);
  const units = [Math.floor(seconds / 3600), Math.floor(seconds / 60) % 60, seconds % 60];
  get("countdown").textContent = `${words().nextIn} ${units.map(n => String(n).padStart(2, "0")).join(":")}`;
}
function launch() {
  const params = new URLSearchParams(location.search);
  if (params.has("edition") && !params.has("mode")) {
    location.replace(new URL(`classic/${location.search}`, location.href));
    return;
  }
  route = readRoute();
  get("home").onclick = event => { event.preventDefault(); openEdition(); };
  get("rules").onclick = () => modal(words().rules, ...words().rulesText.map(text => element("p", text)));
  get("stats").onclick = showStats;
  get("archive").onclick = () => {
    const ui = words();
    const list = element("div", "");
    list.className = "archive-list";
    for (let day = today() - 1; day >= Math.max(START, today() - 14); day--) {
      const button = element("button", displayDate(day));
      button.className = "archive-item";
      button.onclick = () => { get("modal").close(); openEdition(day); };
      list.append(button);
    }
    const classic = element("a", ui.classic);
    classic.href = "../classic/";
    classic.className = "classic-link";
    modal(ui.archive, list.childElementCount ? list : element("p", ui.noPast), classic);
  };
  get("lang").onclick = () => {
    const draft = get("answer")?.value ?? "";
    lang = lang === "en" ? "ru" : "en";
    persist();
    if (page === "question") question(draft, false);
    else if (page === "results") results(false);
    else intro();
  };
  addEventListener("popstate", () => { route = readRoute(); intro(); });
  intro();
  setInterval(() => {
    if (!route.fixed && page === "intro" && route.day !== today()) {
      route = readRoute();
      intro();
    } else clock();
  }, 1000);
}
launch();
