"use strict";

const DAY = 86400000;
const START = MINE_DAY;
const LIMIT = 30;
const GAME_NAME = "Rare Below";
const scores = MINE_SCORES;
const colors = ["#b1bba6", "#c58f6f", "#94c1a9", "#eac57f", "#777b73"];
const marks = ["⬜", "🟫", "🟩", "🟨", "▫️"];
const questionsPerRound = 8;
const maximum = questionsPerRound * Math.max(...scores);
const storage = "rare-below-v1";
const answerService = "https://deep-cut-answer-data.choicehelix2.chatgpt.site";
const publicGame = "https://evsmyslov.github.io/deep-cut-daily/";
const gameRoot = new URL("./",document.baseURI);
const strata = [
  [0,"Surface","Поверхность"],
  [8,"Upper crust","Верхняя кора"],
  [32,"Lower crust","Нижняя кора"],
  [100,"Upper mantle","Верхняя мантия"],
  [550,"Mantle transition zone","Переходная зона мантии"],
  [1700,"Lower mantle","Нижняя мантия"],
  [2890,"Core–mantle boundary","Граница ядра и мантии"],
  [4300,"Outer core","Внешнее ядро"],
  [6371,"Inner core · Earth’s center","Внутреннее ядро · Центр Земли"]
];
const depthThresholds = [0,25,65,130,240,410,620,800,maximum];
const strings = {
  en: {
    endless:"Endless", duel:"Friend duel", invite:"Copy invite link", solo:"Daily", refresh:"Refresh duel", stopRun:"Finish run",
    remaining:"Seconds left", timeUp:"Time’s up", checking:"Checking that answer…", unverifiable:"Could not verify that specific answer",
    openRules:"Each prompt accepts several answers. A broad answer that fits can earn 10 points. More specific finds can earn more.",
    moreRules:"You get 30 seconds per question. Some categories can check unfamiliar names in Wikidata.",
    matchIntro:"Play the same eight questions as your friend. Scores appear when both players finish.",
    matchWait:"Waiting for your friend to finish.", matchReady:"Invite ready. You can play now.",
    matchError:"Could not open this duel. Try again.", endlessIntro:"Keep digging as long as you like. Finish the run whenever you’re ready.",
    mineRun:"Endless run", fresh:"New run", previous:"Previous eight-question expedition",
    rules:"How to play", stats:"Stats", archive:"Archive", reset:"New expedition at 00:00 UTC", daily:"Daily expedition",
    hero:"Journey to\nthe Core", pitch:"Think of an answer that fits and that most people would overlook. The rarer the find, the deeper you go.",
    challenge:"A friend sent you this expedition.", answerLabel:"Your answer", submit:"Submit", skip:"Skip", finished:"Expedition complete",
    share:"Challenge a friend", todayButton:"Today’s expedition", today:"Today", past:"Archive", nextIn:"Next in", next:"Next question", result:"See result",
    play:"Begin descent", resume:"Resume descent", replay:"See my result", active:"8 questions · Answers in EN or RU",
    versus:"Friend challenge · Same eight questions", placeholder:"Answer in English or Russian…", question:"Question",
    wrong:"That answer doesn’t fit", skipped:"Skipped", sample:"An answer that fits", points:"points", target:"Friend’s score",
    won:"You beat their score.", tied:"You tied.", lost:"Your friend wins this one.", copied:"Challenge copied.",
    copy:"Copy your challenge", dare:"Can you find rarer answers?", noPast:"Past expeditions appear here after their daily release.",
    classic:"Classic edition and old results", completed:"Completed", best:"Best score", streak:"Day streak", badges:"Achievements", close:"Close",
    depth:"Depth", scoreLabel:"Score", km:"km", arrived:"Reached", stayed:"No descent", answerBoard:"Answer survey",
    pending:"Loading anonymous picks…", noData:"Too few completed expeditions for anonymous counts. The list shows the quiz’s rarity tiers.",
    surveyError:"Community counts are unavailable. The list shows the quiz’s rarity tiers.",
    surveyData:"Community picks, from least to most selected.",
    community:"Community picks", dictionary:"Examples by rarity", early:"Previous four-question expedition",
    language:"Switch to Russian", menu:"Game menu", tiers:["Pebble","Ore","Relic","Core Gem","Dust"],
    categories:{science:"Science",places:"Geography",culture:"Pop culture",variety:"General knowledge"},
    rulesText:["Answer eight questions in English or Russian. Your score determines how deep you dig. A zero-point answer leaves you at the same depth.",
      "A find earns 10, 25, 55, 85 or 120 points, based on an editorial estimate of its rarity. Both languages share the same answers and points.",
      "A new set opens at 00:00 UTC. Everyone gets the same questions. Your progress stays in this browser.",
      "After the expedition, accepted choices are counted anonymously. A challenge link shares your score."],
    awards:[["First Footstep","Complete an expedition."],["Gem Hunter","Find three Core Gems in one expedition."],["Corebreaker","Earn 960 points in one expedition."]]
  },
  ru: {
    endless:"Бесконечный", duel:"Дуэль", invite:"Скопировать приглашение", solo:"Выпуск дня", refresh:"Обновить дуэль", stopRun:"Завершить забег",
    remaining:"Секунд осталось", timeUp:"Время вышло", checking:"Проверяем ответ…", unverifiable:"Не удалось подтвердить конкретный ответ",
    openRules:"У каждого вопроса много подходящих ответов. Общий вариант может принести 10 очков, а за более конкретную находку можно получить больше.",
    moreRules:"На вопрос даётся 30 секунд. Для части тем незнакомые названия проверяются по Викиданным.",
    matchIntro:"У вас и друга восемь одинаковых вопросов. Счёт соперника откроется, когда оба завершат дуэль.",
    matchWait:"Ждём, пока друг закончит дуэль.", matchReady:"Приглашение готово. Можно начинать.",
    matchError:"Не удалось открыть дуэль. Попробуйте ещё раз.", endlessIntro:"Копайте сколько угодно. Забег можно завершить в любой момент.",
    mineRun:"Бесконечный забег", fresh:"Новый забег", previous:"Прежняя экспедиция из восьми вопросов",
    rules:"Правила", stats:"Статистика", archive:"Архив", reset:"Новый выпуск в 03:00 МСК", daily:"Ежедневная экспедиция",
    hero:"К центру\nЗемли", pitch:"Найдите подходящий ответ, который не сразу придёт в голову. Чем реже находка, тем глубже вы спускаетесь.",
    challenge:"Друг отправил вам эту экспедицию.", answerLabel:"Ваш ответ", submit:"Ответить", skip:"Пропустить", finished:"Экспедиция завершена",
    share:"Бросить вызов другу", todayButton:"Сегодняшний выпуск", today:"Сегодня", past:"Архив", nextIn:"До нового", next:"Следующий вопрос", result:"Посмотреть итог",
    play:"Начать спуск", resume:"Продолжить спуск", replay:"Мой результат", active:"8 вопросов · Ответы на EN или RU",
    versus:"Вызов друга · Те же восемь вопросов", placeholder:"Ответ на русском или английском…", question:"Вопрос",
    wrong:"Ответ не подходит", skipped:"Пропуск", sample:"Подходящий пример", points:"очков", target:"Счёт друга",
    won:"Вы набрали больше.", tied:"У вас ничья.", lost:"Друг набрал больше.", copied:"Вызов скопирован.",
    copy:"Скопируйте вызов", dare:"Сможешь найти ответы пореже?", noPast:"Здесь появятся выпуски, которые уже вышли.",
    classic:"Классическая версия и прежние результаты", completed:"Пройдено", best:"Рекорд", streak:"Дней подряд", badges:"Достижения", close:"Закрыть",
    depth:"Глубина", scoreLabel:"Счёт", km:"км", arrived:"Достигнуто", stayed:"Остались на месте", answerBoard:"Ответы игроков",
    pending:"Загружаем анонимные ответы…", noData:"Пока мало завершённых экспедиций для анонимной сводки. Ниже — ответы по уровням редкости в игре.",
    surveyError:"Сводка игроков недоступна. Ниже — ответы по уровням редкости в игре.",
    surveyData:"Выбор игроков, от самых редких до самых частых.",
    community:"Выбор игроков", dictionary:"Примеры по редкости", early:"Прошлая экспедиция из четырёх вопросов",
    language:"Переключить на английский", menu:"Меню игры", tiers:["Галька","Руда","Реликт","Самоцвет ядра","Пыль"],
    categories:{science:"Наука",places:"География",culture:"Поп-культура",variety:"Общие знания"},
    rulesText:["Ответьте на восемь вопросов по-русски или по-английски. Глубина зависит от набранных очков. При нуле за ответ шахтёр остаётся на месте.",
      "Находка приносит 10, 25, 55, 85 или 120 очков по заранее заданной оценке редкости. Ответы и баллы одинаковы для обоих языков.",
      "Новый выпуск выходит в 03:00 по Москве. Вопросы у всех одинаковые. Прогресс сохраняется в этом браузере.",
      "После экспедиции засчитанные ответы попадают в анонимную сводку. Ссылка-вызов передаёт ваш счёт."],
    awards:[["Первый шаг","Завершить экспедицию."],["Искатель самоцветов","Найти три самоцвета ядра за экспедицию."],["Покоритель ядра","Набрать 960 очков за экспедицию."]]
  }
};
Object.assign(strings.en, {
  live:"Friend duel", yourSeat:"You", friendSeat:"Friend", ready:"Ready",
  isReady:"Ready", notReady:"Not ready", waitSeat:"Waiting to join", joiningRoom:"Connecting to the room…",
  liveRules:"Share the link and both press Ready. The first accepted answer gives the other player up to 10 seconds.",
  getReady:"Get ready", answerLocked:"Answer locked. Waiting for your friend.", rush:"Your friend answered. You have up to 10 seconds.",
  autoNext:"Next question starts automatically.",
  roomExpired:"This invite has expired. Create a new duel.", roomFull:"This room already has two players.",
  suggestion:"Did you mean?", joinCode:"Join by code", roomCode:"Room code", badCode:"Enter the 16-character room code.", originalEdition:"Original edition",
  createRoom:"Create a room", retryLive:"Retry connection", duelMenu:"Duel menu",
  wrongRetry:"That answer doesn’t fit. Try again.", lookupRetry:"Answer check unavailable. Try again or enter another answer.",
  retryRule:"If an answer doesn’t fit, you can try again until time runs out.",
  unready:"Cancel ready", connectingAgain:"Trying another connection…",
  duelTimeout:"The room server took too long to respond.", duelOffline:"Your browser is offline.",
  duelNetwork:"This browser couldn’t reach the room server.", duelResponse:"The room server returned an unexpected response."
});
Object.assign(strings.ru, {
  live:"Дуэль с другом", yourSeat:"Вы", friendSeat:"Друг", ready:"Готов",
  isReady:"Готов", notReady:"Не готов", waitSeat:"Ещё не подключился", joiningRoom:"Подключаемся к лобби…",
  liveRules:"Поделитесь ссылкой и оба нажмите «Готов». После первого засчитанного ответа у второго игрока останется до 10 секунд.",
  getReady:"Приготовьтесь", answerLocked:"Ответ принят. Ждём друга.", rush:"Друг ответил. У вас до 10 секунд.",
  autoNext:"Следующий вопрос начнётся автоматически.",
  roomExpired:"Срок действия ссылки истёк. Создайте новую дуэль.", roomFull:"В этой комнате уже два игрока.",
  suggestion:"Имели в виду?", joinCode:"Войти по коду", roomCode:"Код комнаты", badCode:"Введите код комнаты из 16 символов.", originalEdition:"Первый выпуск",
  createRoom:"Создать комнату", retryLive:"Повторить подключение", duelMenu:"Меню дуэли",
  wrongRetry:"Ответ не подходит. Попробуйте ещё раз.", lookupRetry:"Проверка недоступна. Повторите попытку или введите другой ответ.",
  retryRule:"Если ответ не подходит, можно попробовать снова, пока есть время.",
  unready:"Отменить готовность", connectingAgain:"Пробуем подключиться другим способом…",
  duelTimeout:"Сервер комнаты не ответил вовремя.", duelOffline:"Браузер сейчас без подключения к интернету.",
  duelNetwork:"Браузер не смог связаться с сервером комнаты.", duelResponse:"Сервер комнаты вернул неожиданный ответ."
});
const get = id => document.getElementById(id);
const today = () => Math.max(START, Math.floor(Date.now() / DAY));
const iso = day => new Date(day * DAY).toISOString().slice(0, 10);
let library = {};
let lang = navigator.language.startsWith("ru") ? "ru" : "en";
try {
  const saved = JSON.parse(localStorage.getItem(storage));
  library = saved?.library ?? {};
  const preference = saved?.lang ?? JSON.parse(localStorage.getItem("deep-cut-daily-shaft"))?.lang;
  if (strings[preference]) lang = preference;
} catch { /* Play remains available without storage. */ }
const words = () => strings[lang];
const displayDate = day => new Intl.DateTimeFormat(lang, { timeZone:"UTC", day:"numeric", month:"short", year:"numeric" }).format(day * DAY);
const pointsFor = answer => scores[answer.tier] ?? 0;
const score = round => round.answers.reduce((sum, answer) => sum + pointsFor(answer), 0);
let route, page, round;
let questionTimer;
let roomStamp;

function persist() {
  try { localStorage.setItem(storage, JSON.stringify({lang, library})); } catch { /* Keep the current state in memory. */ }
}
function save() {
  library[route.key] = round;
  persist();
}
const isRoomCode = value => /^[a-f0-9]{16}$/.test(value ?? "");
const editionKey = (day, revision) => `daily:${day}${revision===2 ? ":2" : ""}`;
function readRoute() {
  const args=new URLSearchParams(location.search);
  const pathInvite=location.pathname.match(/\/play\/join\/([a-f0-9]{16})\/?$/)?.[1];
  const guestRoom=[pathInvite,args.get("join"),location.hash.match(/^#join-([a-f0-9]{16})$/)?.[1]].find(isRoomCode);
  if (guestRoom) return {mode:"live",duel:guestRoom,seat:"guest",key:`live:${guestRoom}:guest`};
  const mode=args.get("mode");
  const duel=args.get("room");
  if ((mode==="duel" || mode==="live") && isRoomCode(duel)) return {mode,duel,key:`${mode}:${duel}`};
  if (mode==="endless") return {mode,key:"endless"};
  const key=args.get("edition") ?? "";
  const date=/^\d{4}-\d\d-\d\d$/.test(key) ? Date.parse(key)/DAY : NaN;
  const fixed=date>=START && date<=today() && iso(date)===key;
  const day=fixed ? date : today();
  const revision=fixed && args.get("set")!=="2" ? 1 : latestEditionRevision(day);
  const scoreText=args.get("score") ?? "";
  const rival=fixed && /^\d{1,3}$/.test(scoreText) && Number(scoreText)<=maximum ? Number(scoreText) : null;
  return {mode:"daily",day,fixed,revision,rival,key:editionKey(day,revision)};
}
function dailyRoute() {
  const day=today();
  const revision=latestEditionRevision(day);
  return {mode:"daily",day,fixed:false,revision,rival:null,key:editionKey(day,revision)};
}
function questionAt(index) {
  if (route.mode==="daily") return mineQuestion(dailyIds(route.day,route.revision)[index]);
  const version=round.deckVersion ?? 1;
  const size=mineDecks[version].length;
  const cycle=route.mode==="endless" ? Math.floor(index/size) : 0;
  const ids=mineIds((round.seed+cycle)>>>0,route.mode,version);
  return mineQuestion(ids[index%ids.length]);
}
function depthAt(points) {
  const stop = depthThresholds.findLastIndex(threshold => points >= threshold);
  const lower = depthThresholds[stop];
  const upper = depthThresholds[stop+1];
  const fraction = upper === undefined ? 0 : (points-lower)/(upper-lower);
  const start = strata[stop][0];
  const end = strata[stop+1]?.[0] ?? start;
  return {stop, travel:stop+fraction, km:start+(end-start)*fraction};
}
const layerName = stop => strata[stop][lang === "ru" ? 2 : 1];

let rideTimer;
function setWorld(count = 0, points = 0, animate = false) {
  const machine = get("machine");
  const progress = get("progress");
  const {stop, travel, km} = depthAt(points);
  machine.style.setProperty("--stop", travel);
  machine.dataset.stop = stop;
  machine.dataset.depth = km;
  get("depth").textContent = `${km.toLocaleString(lang,{maximumFractionDigits:1})} ${words().km}`;
  get("hud-score").textContent = points;
  get("hud-step").textContent = layerName(stop);
  [...progress.children].forEach((bar, i) => bar.classList.toggle("active", i < count));
  [...get("depth-map").children].forEach((dot, i) => {
    dot.title = `${layerName(i)} · ${strata[i][0]} ${words().km}`;
    dot.classList.toggle("active", i === stop);
    dot.classList.toggle("reached", i < stop);
    if (i === stop) dot.setAttribute("aria-current", "step");
    else dot.removeAttribute("aria-current");
  });
  if (animate) {
    const miner = get("miner");
    clearTimeout(rideTimer);
    miner.classList.remove("moving");
    void miner.offsetWidth;
    miner.classList.add("moving");
    rideTimer = setTimeout(() => miner.classList.remove("moving"),950);
  }
}

function mountWorld() {
  strata.forEach((_, index) => {
    const layer = element("div", "");
    layer.className = "world-layer";
    layer.style.backgroundImage = `url("art/shaft/${index}.png")`;
    get("world-track").append(layer);
    get("depth-map").append(element("span", ""));
    if (index > 0) get("progress").append(element("i", ""));
  });
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
  get("duel-close").setAttribute("aria-label", words().close);
  const tierCards = [4,0,1,2,3].map(index => {
    const tier = words().tiers[index];
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
  const ui = words();
  get("duel").disabled=route.mode==="live" && id!=="results";
  get("edition").textContent = route.mode === "daily" ? `${route.day === today() ? ui.today : ui.past} / ${displayDate(route.day)}` : ui[route.mode];
  get("footer-mode").textContent = route.mode === "daily" && route.rival !== null ? ui.versus : `30 s · ${ui.active.split(" · ").at(-1)}`;
  clock();
}
function intro(focus = false) {
  clearInterval(questionTimer);
  closeDuel();
  const invitation=route.mode==="live" ? route : null;
  if (invitation) route=dailyRoute();
  clearTimeout(rideTimer);
  get("miner").classList.remove("moving");
  roomStamp = null;
  swap("intro");
  setWorld(0);
  const ui = words();
  const current = route;
  const existing = library[route.key];
  const invite = get("invite");
  get("challenge").hidden = route.mode !== "daily" || route.rival === null;
  if (route.mode !== "daily") {
    get("stage").querySelector("[data-text=daily]").hidden = true;
    get("topic").textContent = ui[route.mode];
    get("pitch").textContent = route.mode === "endless" ? ui.endlessIntro : ui.matchIntro;
    get("lobby-status").textContent = route.mode === "duel" ? ui.matchReady : "";
  }
  invite.hidden = route.mode !== "duel";
  invite.onclick = () => copyChallenge(location.href, "lobby-status");
  get("start").textContent = existing?.done ? ui.replay : existing ? ui.resume : ui.play;
  get("start").onclick = async () => {
    const button = get("start");
    let seed = existing?.seed;
    let deckVersion = MINE_DECK_VERSION;
    if (current.mode === "duel" && !existing) {
      button.disabled = true;
      try {
        const joined = await request("duel",{room:current.duel,action:"join"});
        seed = joined.seed;
        deckVersion = joined.deckVersion ?? 1;
      }
      catch { if (route === current) get("lobby-status").textContent = words().matchError; return; }
      finally { button.disabled = false; }
      if (route !== current || !button.isConnected) return;
    }
    round = existing ?? { answers:[], feedback:false, done:false, deckVersion, seed:seed ?? crypto.getRandomValues(new Uint32Array(1))[0] };
    save();
    if (round.done) results();
    else question();
  };
  if (focus) get("start").focus();
  if (invitation) enterLive(invitation);
}

function question(draft = "", focus = true) {
  clearInterval(questionTimer);
  swap("question");
  const index = round.answers.length - Number(round.feedback);
  const model = questionAt(index);
  const ui = words();
  setWorld(round.answers.length, score(round));
  const denominator = route.mode === "endless" ? "" : ` / ${questionsPerRound}`;
  get("category").textContent = `${ui.question} ${index + 1}${denominator}`;
  get("prompt").textContent = model[lang];
  get("answer").placeholder = ui.placeholder;
  get("answer").value = draft;
  const input=get("answer");
  const form=get("answer-form");
  const submit=form.querySelector("button");
  const status=get("check-status");
  bindSuggestions(model);
  input.addEventListener("input", () => { status.textContent = ""; });
  get("finish-endless").hidden = route.mode !== "endless";
  get("finish-endless").onclick = complete;
  get("next").onclick = () => {
    round.feedback = false;
    if (route.mode !== "endless" && round.answers.length === questionsPerRound) { complete(); return; }
    round.deadline = null;
    save();
    question();
  };
  get("skip").onclick = () => settle("", null, "skip");
  form.onsubmit = async event => {
    event.preventDefault();
    const text = get("answer").value.trim();
    const key = answerKey(text);
    if (!key || round.feedback || round.pending) return;
    if (Date.now() >= round.deadline) { settle("", null, "timeout"); return; }
    let entry = model.aliases.get(key);
    if (entry) { settle(text, entry, "answer"); return; }
    if (!model.lookup || (model.id === "weapons" && /^(weapon|fictional weapon|оружие|вымышленное оружие)$/.test(key))) {
      reject("wrongRetry"); return;
    }
    const pending = {text};
    round.pending = pending;
    input.readOnly=true;
    submit.disabled=true;
    get("suggestions").hidden=true;
    status.textContent=words().checking;
    let failure="wrongRetry";
    try { entry = (await request("verify", { id:model.id, text, language:lang }, 6500)).answer; }
    catch { failure="lookupRetry"; }
    if (!form.isConnected || round.pending!==pending) return;
    if (Date.now()>=round.deadline) { settle("",null,"timeout"); return; }
    if (entry) settle(text,entry,"checked");
    else reject(failure);
  };
  function reject(message) {
    round.pending=null;
    input.readOnly=false;
    submit.disabled=false;
    status.textContent=words()[message];
    input.focus({preventScroll:true});
    input.select();
  }
  function settle(text, entry, reason) {
    if (round.feedback) return;
    clearInterval(questionTimer);
    round.answers.push({text, id:entry?.id ?? null, tier:entry?.tier ?? -1, en:entry?.en, ru:entry?.ru, reason});
    round.pending = null;
    round.feedback = true;
    save();
    if (!entry) {
      clearTimeout(rideTimer);
      get("miner").classList.remove("moving");
    }
    setWorld(round.answers.length, score(round), Boolean(entry));
    reveal(true);
  }
  function reveal(moveFocus) {
    const answer = round.answers[index];
    const names = words();
    const found = answer.id !== null;
    get("answer-form").hidden = true;
    get("suggestions").hidden = true;
    get("skip").hidden = true;
    get("check-status").textContent = "";
    get("feedback").hidden = false;
    get("verdict").textContent = found
      ? `${answer[lang]} · ${names.tiers[answer.tier]} · +${pointsFor(answer)}`
      : answer.reason === "timeout" ? names.timeUp : answer.reason === "checked" ? names.unverifiable : answer.text ? names.wrong : names.skipped;
    get("sample").textContent = found ? "" : `${names.sample} · ${model.entries[0][lang]}`;
    const depth = depthAt(score(round));
    const motion = pointsFor(answer) > 0 ? names.arrived : names.stayed;
    get("arrival").textContent = `${motion} · ${layerName(depth.stop)} · ${get("depth").textContent}`;
    const last = route.mode !== "endless" && index === questionsPerRound - 1;
    get("next").textContent = last ? names.result : names.next;
    if (moveFocus) get("next").focus({preventScroll:true});
  }
  if (round.feedback) { reveal(focus); return; }
  round.pending=null;
  if (!round.deadline) {
    round.deadline = Date.now() + LIMIT * 1000;
    save();
  }
  function tick() {
    const seconds = Math.max(0,Math.ceil((round.deadline - Date.now())/1000));
    const timer = get("timer");
    if (timer.textContent !== String(seconds)) timer.textContent = seconds;
    timer.classList.toggle("urgent", seconds <= 8);
    if (seconds === 0) settle("",null,"timeout");
  }
  questionTimer = setInterval(tick,120);
  tick();
  if (focus && !round.feedback) get("answer").focus({preventScroll:true});
}

function complete() {
  clearInterval(questionTimer);
  round.done = true;
  round.pending = null;
  save();
  results();
}
const gemCount = round => round.answers.filter(a => a.tier === 3).length;
const earned = rounds => [
  rounds.length > 0,
  rounds.some(round => gemCount(round) >= 3),
  rounds.some(round => score(round) === maximum)
];
function results(focus = true) {
  swap("results");
  const ui = words();
  const points = score(round);
  const endless = route.mode === "endless";
  get("finished-topic").textContent = route.mode === "daily" ? displayDate(route.day) : ui[route.mode];
  setWorld(round.answers.length, points);
  get("total").textContent = endless ? `${points} ${ui.points} · ${round.answers.length}` : `${points} / ${maximum} ${ui.points}`;
  get("badge").textContent = earned([round]).flatMap((unlocked, index) => unlocked ? [ui.awards[index][0]] : []).at(-1);
  get("comparison").hidden = !["duel","live"].includes(route.mode) && route.rival == null;
  if (route.mode === "daily" && route.rival !== null) showComparison(route.rival,points);
  round.answers.forEach((answer,index)=>{
    const model=route.mode==="live" ? mineQuestion(answer.prompt) : questionAt(index);
    const row=element("li","");
    const details=element("details","");
    const summary=element("summary","");
    const answerText=answer[lang] ?? (answer.text || (answer.reason==="timeout" ? ui.timeUp : ui.skipped));
    summary.append(element("span",answerText), element("strong",`+${pointsFor(answer)}`));
    const extras=element("div","");
    extras.id=`recap-detail-${index}`;
    extras.className="recap-detail";
    showRecapChoices(extras,model);
    details.append(summary,extras);
    row.append(details);
    get("recap").append(row);
  });
  get("share").hidden = endless || route.mode === "live";
  get("refresh-duel").hidden = route.mode !== "duel";
  get("today").onclick = () => {
    if (endless) { delete library[route.key]; persist(); intro(true); }
    else openEdition();
  };
  if (endless) get("today").textContent = ui.fresh;
  get("share").onclick = () => {
    if (route.mode === "duel") { copyChallenge(location.href); return; }
    const url = new URL(gameRoot);
    url.searchParams.set("mode", "mine");
    url.searchParams.set("edition", iso(route.day));
    if (route.revision===2) url.searchParams.set("set","2");
    url.searchParams.set("score", points);
    const card = round.answers.map(answer => marks[answer.tier] ?? "⬛").join("");
    copyChallenge(`${GAME_NAME} · ${iso(route.day)}
${card} ${points}/${maximum}
${ui.dare}
${url.href}`);
  };
  get("answer-source").hidden = route.mode !== "daily";
  if (route.mode === "daily") showAnswerSurvey();
  if (route.mode === "duel") {
    get("refresh-duel").onclick = refreshMatch;
    refreshMatch();
  }
  if (focus) {
    const title=get("stage").querySelector("h1");
    title.tabIndex=-1;
    title.focus({preventScroll:true});
  }
}
function showComparison(rival, player) {
  const ui = words();
  const outcome = rival === player ? ui.tied : player > rival ? ui.won : ui.lost;
  get("comparison").textContent = `${ui.target} · ${rival} / ${maximum}. ${outcome}`;
}
async function refreshMatch() {
  const marker = {};
  roomStamp = marker;
  const target = get("comparison");
  target.textContent = words().matchWait;
  try {
    const state = await request("duel", {room:route.duel, action:"finish", picks:round.answers.map(a=>a.id)});
    if (roomStamp === marker && target.isConnected && state.rival !== null) showComparison(state.rival,state.own);
  } catch { if (target.isConnected) target.textContent = words().matchError; }
}
let browserId;
const isBrowserId=value=>typeof value==="string" && /^[a-f\d]{8}-(?:[a-f\d]{4}-){3}[a-f\d]{12}$/i.test(value);
function newBrowserId() {
  const bytes=crypto.getRandomValues(new Uint8Array(16));
  bytes[6]=(bytes[6]&15)|64;
  bytes[8]=(bytes[8]&63)|128;
  const id=[...bytes].map(byte=>byte.toString(16).padStart(2,"0")).join("");
  return [id.slice(0,8),id.slice(8,12),id.slice(12,16),id.slice(16,20),id.slice(20)].join("-");
}
function anonymousId() {
  if (browserId) return browserId;
  const key=`${storage}-anonymous`;
  for (const store of ["localStorage","sessionStorage"]) {
    try {
      const id=window[store].getItem(key);
      if (isBrowserId(id)) { browserId=id; break; }
    } catch { /* Storage can be disabled in embedded browsers. */ }
  }
  const remembered=history.state?.minePlayer;
  browserId ||= isBrowserId(remembered) ? remembered : newBrowserId();
  for (const store of ["localStorage","sessionStorage"]) {
    try { window[store].setItem(key,browserId); } catch { /* Fall back to tab history. */ }
  }
  try { history.replaceState({...history.state,minePlayer:browserId},""); } catch { /* Keep an in-memory ID. */ }
  return browserId;
}
async function request(path,data,timeout=8000,transport=(url,options)=>fetch(url,options)) {
  const abort=new AbortController();
  const timer=setTimeout(()=>abort.abort(),timeout);
  try {
    const base=location.origin===answerService ? "" : answerService;
    const response=await transport(`${base}/${path}`,{
      method:"POST",headers:{"Content-Type":"text/plain;charset=UTF-8"},
      body:JSON.stringify(path==="verify" ? data : {...data,browser:anonymousId()}),signal:abort.signal
    });
    const payload=await response.json().catch(()=>null);
    if(!response.ok || !payload) {
      const code=payload?.code ?? (response.status>=500 ? "retry" : "response");
      throw Object.assign(new Error("Service response"),{code});
    }
    return payload;
  } catch(error) {
    if (typeof error?.code === "string") throw error;
    const code=navigator.onLine===false ? "offline" : abort.signal.aborted ? "timeout" : "network";
    throw Object.assign(new Error("Connection unavailable"),{code});
  } finally {clearTimeout(timer);}
}

function showRecapChoices(root,model,picked=[],rounds=0) {
  const ui=words();
  const list=element("ul","");
  if (picked.length) {
    for (const row of picked) list.append(element("li",`${row[lang]} · ${row.count} / ${rounds}`));
  } else {
    const choices=[...model.entries].sort((a,b)=>scores[b.tier]-scores[a.tier]);
    for (const entry of choices.slice(0,12)) list.append(element("li",`${entry[lang]} · ${ui.tiers[entry.tier]} · +${scores[entry.tier]}`));
  }
  root.replaceChildren(element("p",model[lang]),element("small",picked.length?ui.community:ui.dictionary),list);
}
async function showAnswerSurvey() {
  const status=get("answer-source");
  const data={edition:iso(route.day),editionRevision:route.revision,picks:round.answers.map(answer=>answer.id)};
  const models=round.answers.map((_,index)=>questionAt(index));
  status.textContent=words().pending;
  let survey;
  try { survey=await request("mine-answers",data); } catch { survey=null; }
  if (!status.isConnected) return;
  const ui=words();
  const counts=survey?.counts;
  status.textContent=counts ? ui.surveyData : survey ? ui.noData : ui.surveyError;
  if (counts) models.forEach((model,index)=>showRecapChoices(get(`recap-detail-${index}`),model,counts[index],survey.rounds));
}
function openEdition(day,mode,duel,revision) {
  const url=new URL(gameRoot);
  if (day!==undefined) {
    url.searchParams.set("mode","mine");
    url.searchParams.set("edition",iso(day));
    if ((revision ?? latestEditionRevision(day))===2) url.searchParams.set("set","2");
  } else if (mode) {
    url.searchParams.set("mode",mode);
    if (duel) url.searchParams.set("room",duel);
  }
  history.pushState(browserId ? {minePlayer:browserId} : null,"",url);
  route=readRoute();
  intro(true);
}
function modal(title, ...content) {
  get("modal-title").textContent = title;
  get("modal-content").replaceChildren(...content);
  get("modal").showModal();
}
async function copyChallenge(text, status = "share-status") {
  try {
    await navigator.clipboard.writeText(text);
    if (get(status)) get(status).textContent = words().copied;
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
  const completed = Object.entries(library).filter(([key,item])=>key.startsWith("daily:") && item.done).map(([,item])=>item);
  let day = today();
  let consecutive = 0;
  const finished = day => library[editionKey(day,latestEditionRevision(day))]?.done || library[editionKey(day,1)]?.done;
  if (!finished(day)) day--;
  while (finished(day)) {consecutive++;day--;}
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
  const countdown = get("countdown");
  countdown.hidden = route.mode !== "daily";
  if (countdown.hidden) return;
  const seconds = Math.ceil((DAY - Date.now() % DAY) / 1000);
  const units = [Math.floor(seconds / 3600), Math.floor(seconds / 60) % 60, seconds % 60];
  countdown.textContent = `${words().nextIn} ${units.map(n => String(n).padStart(2, "0")).join(":")}`;
}
function launch() {
  const params = new URLSearchParams(location.search);
  const mode = params.get("mode");
  if (mode === "shaft" || mode === "descent" || (params.has("edition") && !mode)) {
    const archive = mode === "shaft" ? "shaft" : mode === "descent" ? "expedition" : "classic";
    location.replace(new URL(`${archive}/${location.search}`, location.href));
    return;
  }
  route = readRoute();
  mountWorld();
  get("home").onclick = event => { event.preventDefault(); openEdition(); };
  get("rules").onclick = () => modal(words().rules, ...[...words().rulesText,words().openRules,words().moreRules,words().retryRule].map(text=>element("p",text)));
  get("endless").onclick = () => openEdition(undefined,"endless");
  get("duel").onclick = showDuelMenu;
  get("duel-close").onclick = closeDuel;
  get("duel-modal").addEventListener("cancel", event => { event.preventDefault(); closeDuel(); });
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
    if (today()-REPLAY_DAY<=14) {
      const first=element("button",`${displayDate(REPLAY_DAY)} · ${ui.originalEdition}`);
      first.className="archive-item";
      first.onclick=()=>{get("modal").close();openEdition(REPLAY_DAY,undefined,undefined,1);};
      list.append(first);
    }
    const classic = element("a", ui.classic);
    classic.href = "classic/";
    classic.className = "classic-link";
    const earlier = element("a", ui.early);
    earlier.href = "expedition/";
    earlier.className = "classic-link";
    const shaft = element("a",ui.previous);
    shaft.href="shaft/";
    shaft.className="classic-link";
    modal(ui.archive, list.childElementCount ? list : element("p", ui.noPast), shaft, element("br",""), earlier, element("br", ""), classic);
  };
  get("lang").onclick = () => {
    const draft = get("answer")?.value ?? "";
    lang = lang === "en" ? "ru" : "en";
    persist();
    if (liveView) { paintLive(liveView,true); return; }
    if (page === "question") question(draft, false);
    else if (page === "results") results(false);
    else intro();
  };
  addEventListener("popstate", () => { route = readRoute(); intro(); });
  intro();
  setInterval(() => {
    if (route.mode === "daily" && !route.fixed && page === "intro" && route.day !== today() && !get("duel-modal").open) {
      route = dailyRoute();
      intro();
    } else clock();
  }, 1000);
}
launch();
