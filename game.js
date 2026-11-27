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
const endlessModes = ["easy","hard","rare"];
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
    remaining:"Seconds left. ", secondUnit:"s", timeUp:"Time’s up", checking:"Checking that answer…", unverifiable:"Could not verify that specific answer",
    openRules:"Each prompt accepts several answers. A broad answer that fits can earn 10 points. More specific finds can earn more.",
    moreRules:"You get 30 seconds per question. Some categories can check unfamiliar names in Wikidata.",
    matchIntro:"Play the same eight questions as your friend. Scores appear when both players finish.",
    matchWait:"Waiting for your friend to finish.", matchReady:"Invite ready. You can play now.",
    matchError:"Could not open this duel. Try again.",
    mineRun:"Endless run", fresh:"New run", previous:"Previous eight-question expedition",
    rules:"How to play", stats:"Stats", archive:"Archive", reset:"New expedition at 00:00 UTC", daily:"Daily expedition",
    hero:"Journey to\nthe Core", pitch:"Think of an answer that fits and that most people would overlook. The rarer the find, the deeper you go.",
    challenge:"A friend sent you this expedition.", answerLabel:"Your answer", submit:"Submit", skip:"Skip", finished:"Expedition complete",
    share:"Challenge a friend", todayButton:"Today’s expedition", today:"Today", past:"Archive", nextIn:"Next in", next:"Next question", result:"See result",
    play:"Begin descent", resume:"Resume descent", replay:"See my result", active:"8 questions · Answers in EN or RU",
    versus:"Friend challenge · Same eight questions", placeholder:"Enter an answer…", question:"Question",
    wrong:"That answer doesn’t fit", skipped:"Skipped", sample:"An answer that fits", points:"points", target:"Friend’s score",
    won:"You beat their score.", tied:"You tied.", lost:"Your friend wins this one.", copied:"Challenge copied.",
    copy:"Copy your challenge", dare:"Can you find rarer answers?", noPast:"Past expeditions appear here after their daily release.",
    classic:"Classic edition and old results", completed:"Completed", best:"Best score", streak:"Day streak", badges:"Achievements", close:"Close",
    depth:"Depth", scoreLabel:"Score", km:"km", arrived:"Reached", stayed:"No descent", answerBoard:"Answer survey",
    pending:"Loading anonymous picks…", noData:"Too few completed expeditions for anonymous counts. The list shows the quiz’s rarity tiers.",
    surveyError:"Community counts are unavailable. The list shows the quiz’s rarity tiers.",
    surveyData:"Community picks, from least to most selected.",
    community:"Player counts and known answers", dictionary:"All known answers", early:"Previous four-question expedition",
    answerSearch:"Search answers", moreAnswers:"Next answers", previousAnswers:"Previous answers", noAnswers:"No matching answers",
    language:"Switch to Russian", menu:"Game menu", tiers:["Shard","Crystal","Relic","Core Heart","Trace"],
    categories:{science:"Science",places:"Geography",culture:"Pop culture",variety:"General knowledge"},
    rulesText:["Answer eight questions in English or Russian. Your score determines how far the cart descends. A zero-point answer leaves you at the same depth.",
      "A find earns 10, 25, 55, 85 or 120 points. Both languages share the same answers and points.",
      "A new set opens at 00:00 UTC. Everyone gets the same questions. Your progress stays in this browser.",
      "After the expedition, accepted choices are counted anonymously. A challenge link shares your score."],
    awards:[["First Footstep","Complete an expedition."],["Gem Hunter","Find three Core Hearts in one expedition."],["Corebreaker","Earn 960 points in one expedition."]]
  },
  ru: {
    endless:"Бесконечный", duel:"Дуэль", invite:"Скопировать приглашение", solo:"Выпуск дня", refresh:"Обновить дуэль", stopRun:"Завершить забег",
    remaining:"Секунд осталось. ", secondUnit:"с", timeUp:"Время вышло", checking:"Проверяем ответ…", unverifiable:"Не удалось подтвердить конкретный ответ",
    openRules:"У каждого вопроса много подходящих ответов. Общий вариант может принести 10 очков, а за более конкретную находку можно получить больше.",
    moreRules:"На вопрос даётся 30 секунд. Для части тем незнакомые названия проверяются по Викиданным.",
    matchIntro:"У вас и друга восемь одинаковых вопросов. Счёт соперника откроется, когда оба завершат дуэль.",
    matchWait:"Ждём, пока друг закончит дуэль.", matchReady:"Приглашение готово. Можно начинать.",
    matchError:"Не удалось открыть дуэль. Попробуйте ещё раз.",
    mineRun:"Бесконечный забег", fresh:"Новый забег", previous:"Прежняя экспедиция из восьми вопросов",
    rules:"Правила", stats:"Статистика", archive:"Архив", reset:"Новый выпуск в 03:00 МСК", daily:"Ежедневная экспедиция",
    hero:"К центру\nЗемли", pitch:"Найдите подходящий ответ, который не сразу придёт в голову. Чем реже находка, тем глубже вы спускаетесь.",
    challenge:"Друг отправил вам эту экспедицию.", answerLabel:"Ваш ответ", submit:"Ответить", skip:"Пропустить", finished:"Экспедиция завершена",
    share:"Бросить вызов другу", todayButton:"Сегодняшний выпуск", today:"Сегодня", past:"Архив", nextIn:"До нового", next:"Следующий вопрос", result:"Посмотреть итог",
    play:"Начать спуск", resume:"Продолжить спуск", replay:"Мой результат", active:"8 вопросов · Ответы на EN или RU",
    versus:"Вызов друга · Те же восемь вопросов", placeholder:"Введите ответ…", question:"Вопрос",
    wrong:"Ответ не подходит", skipped:"Пропуск", sample:"Подходящий пример", points:"очков", target:"Счёт друга",
    won:"Вы набрали больше.", tied:"У вас ничья.", lost:"Друг набрал больше.", copied:"Вызов скопирован.",
    copy:"Скопируйте вызов", dare:"Сможешь найти ответы пореже?", noPast:"Здесь появятся выпуски, которые уже вышли.",
    classic:"Классическая версия и прежние результаты", completed:"Пройдено", best:"Рекорд", streak:"Дней подряд", badges:"Достижения", close:"Закрыть",
    depth:"Глубина", scoreLabel:"Счёт", km:"км", arrived:"Достигнуто", stayed:"Остались на месте", answerBoard:"Ответы игроков",
    pending:"Загружаем анонимные ответы…", noData:"Пока мало завершённых экспедиций для анонимной сводки. Ниже — ответы по уровням редкости в игре.",
    surveyError:"Сводка игроков недоступна. Ниже — ответы по уровням редкости в игре.",
    surveyData:"Выбор игроков, от самых редких до самых частых.",
    community:"Известные ответы и выбор игроков", dictionary:"Все известные ответы", early:"Прошлая экспедиция из четырёх вопросов",
    answerSearch:"Поиск по ответам", moreAnswers:"Следующие ответы", previousAnswers:"Предыдущие ответы", noAnswers:"Подходящих ответов нет",
    language:"Переключить на английский", menu:"Меню игры", tiers:["Осколок","Кристалл","Реликт","Сердце ядра","След"],
    categories:{science:"Наука",places:"География",culture:"Поп-культура",variety:"Общие знания"},
    rulesText:["Ответьте на восемь вопросов по-русски или по-английски. Очки определяют, как далеко спустится вагонетка. При нуле за ответ она остаётся на месте.",
      "Находка приносит 10, 25, 55, 85 или 120 очков. Ответы и баллы одинаковы для обоих языков.",
      "Новый выпуск выходит в 03:00 по Москве. Вопросы у всех одинаковые. Прогресс сохраняется в этом браузере.",
      "После экспедиции засчитанные ответы попадают в анонимную сводку. Ссылка-вызов передаёт ваш счёт."],
    awards:[["Первый шаг","Завершить экспедицию."],["Искатель самоцветов","Найти три сердца ядра за экспедицию."],["Покоритель ядра","Набрать 960 очков за экспедицию."]]
  }
};
Object.assign(strings.en, {
  live:"Friend duel", yourSeat:"You", friendSeat:"Friend", ready:"Ready",
  isReady:"Ready", notReady:"Not ready", waitSeat:"Waiting to join", joiningRoom:"Connecting to the room…",
  liveRules:"Share the link and both press Ready. The first accepted answer gives the other player up to 10 seconds.",
  getReady:"Get ready", answerLocked:"Answer locked. Waiting for your friend.", rush:"Your friend answered. You have up to 10 seconds.",
  autoNext:"Next question starts automatically.",
  roomExpired:"This invite has expired. Create a new duel.", roomFull:"This room already has two players.",
  suggestion:"Did you mean?", correctionApplied:"Correction applied. Press Submit again to send.",
  joinCode:"Join by code", roomCode:"Room code", badCode:"Enter the six-character room code.", originalEdition:"Original edition", secondEdition:"Second edition",
  createRoom:"Create a room", retryLive:"Retry connection", duelMenu:"Duel menu",
  wrongRetry:"That answer doesn’t fit. Try again.", lookupRetry:"Answer check unavailable. Try again or enter another answer.",
  retryRule:"If an answer doesn’t fit, you can try again until time runs out.",
  unready:"Cancel ready",
  duelTimeout:"The room server took too long to respond.", duelOffline:"Your browser is offline.",
  duelNetwork:"This browser couldn’t reach the room server.", duelResponse:"The room server returned an unexpected response.",
  directDuel:"Open duel directly", memberExpired:"This room session is no longer valid. Open a fresh invitation.",
  easy:"Easy", hard:"Hard", rare:"Rare only",
  endlessModes:["Skip any question and continue your descent.","Skipping is disabled. The run ends when time runs out.","Keep the streak alive with answers worth at least 55 points."],
  rareRetry:"It fits, but this mode needs a Crystal or rarer. Try again.", streakEnded:"Time ran out. Your streak has ended.", answersFound:"answers found",
  dataRarity:"Each question has one Core Heart. The bank estimates rarity using population, Wikidata coverage, or editorial estimates. Results show player counts when enough people have finished.",
  sourceCredits:"Questions use adapted data from",
  sound:"Audio", music:"Music", effects:"Sound effects", musicVolume:"Music volume", effectsVolume:"Sound effects volume",
  friends:"Friends", friendCode:"Your friend code", friendAdd:"Add friend", friendCodeInput:"Friend code",
  friendIntro:"Share your friend code to keep in touch and invite each other to duels.",
  friendDevice:"This profile is saved in this browser.", noFriends:"No friends added yet.",
  editFriendName:"Edit name", friendNameLabel:"Private name", friendNameHint:"Saved in this browser. Clear the name to show the code instead.",
  saveFriendName:"Save", cancelFriendName:"Cancel",
  incoming:"Duel invitations", nobodyInvited:"No pending invitations.", challengeFriend:"Invite to duel",
  acceptInvite:"Join duel", declineInvite:"Decline", removeFriend:"Remove", friendsLoading:"Loading your friends…",
  contactCode:"Enter the eight-character friend code.", contactMissing:"Friend not found.", contactSelf:"This is your own code."
});
Object.assign(strings.ru, {
  live:"Дуэль с другом", yourSeat:"Вы", friendSeat:"Друг", ready:"Готов",
  isReady:"Готов", notReady:"Не готов", waitSeat:"Ещё не подключился", joiningRoom:"Подключаемся к лобби…",
  liveRules:"Поделитесь ссылкой и оба нажмите «Готов». После первого засчитанного ответа у второго игрока останется до 10 секунд.",
  getReady:"Приготовьтесь", answerLocked:"Ответ принят. Ждём друга.", rush:"Друг ответил. У вас до 10 секунд.",
  autoNext:"Следующий вопрос начнётся автоматически.",
  roomExpired:"Срок действия ссылки истёк. Создайте новую дуэль.", roomFull:"В этой комнате уже два игрока.",
  suggestion:"Имели в виду?", correctionApplied:"Подставлено. Нажмите «Ответить» ещё раз.",
  joinCode:"Войти по коду", roomCode:"Код комнаты", badCode:"Введите код комнаты из шести символов.", originalEdition:"Первый выпуск", secondEdition:"Второй выпуск",
  createRoom:"Создать комнату", retryLive:"Повторить подключение", duelMenu:"Меню дуэли",
  wrongRetry:"Ответ не подходит. Попробуйте ещё раз.", lookupRetry:"Проверка недоступна. Повторите попытку или введите другой ответ.",
  retryRule:"Если ответ не подходит, можно попробовать снова, пока есть время.",
  unready:"Отменить готовность",
  duelTimeout:"Сервер комнаты не ответил вовремя.", duelOffline:"Браузер сейчас без подключения к интернету.",
  duelNetwork:"Браузер не смог связаться с сервером комнаты.", duelResponse:"Сервер комнаты вернул неожиданный ответ.",
  directDuel:"Открыть дуэль напрямую", memberExpired:"Сеанс этой комнаты больше недействителен. Откройте новое приглашение.",
  easy:"Обычный", hard:"На вылет", rare:"Только редкие",
  endlessModes:["Пропускайте любые вопросы и продолжайте спуск.","Без пропусков. Когда время истечёт, забег завершится.","Поддерживайте серию ответами от 55 очков."],
  rareRetry:"Ответ подходит, но здесь нужен «Кристалл» или выше. Попробуйте ещё раз.", streakEnded:"Время вышло. Серия завершена.", answersFound:"ответов засчитано",
  dataRarity:"У каждого вопроса одно Сердце ядра. Для оценки редкости используются население, число языковых версий в Викиданных или редакционная оценка. В итогах видна частота ответов, когда выпуск прошли достаточно игроков.",
  sourceCredits:"В вопросах использованы адаптированные данные из",
  sound:"Звук", music:"Музыка", effects:"Звуковые эффекты", musicVolume:"Громкость музыки", effectsVolume:"Громкость эффектов",
  friends:"Друзья", friendCode:"Ваш код друга", friendAdd:"Добавить друга", friendCodeInput:"Код друга",
  friendIntro:"Поделитесь своим кодом, чтобы добавлять друзей и приглашать их на дуэли.",
  friendDevice:"Профиль сохранён в этом браузере.", noFriends:"Пока здесь нет друзей.",
  editFriendName:"Изменить имя", friendNameLabel:"Личное имя", friendNameHint:"Имя хранится в этом браузере. Очистите поле, чтобы снова видеть код.",
  saveFriendName:"Сохранить", cancelFriendName:"Отмена",
  incoming:"Приглашения на дуэль", nobodyInvited:"Нет новых приглашений.", challengeFriend:"Пригласить в дуэль",
  acceptInvite:"Войти в дуэль", declineInvite:"Отклонить", removeFriend:"Удалить", friendsLoading:"Загружаем друзей…",
  contactCode:"Введите код друга из восьми символов.", contactMissing:"Друг не найден.", contactSelf:"Это ваш собственный код."
});
Object.assign(strings.en, {
  pack:"Themed expeditions", pickPack:"Choose an expedition", packRounds:"Rounds per expedition",
  packIntro:n=>`${n} questions on this theme.`, packPool:n=>`${n} questions in the pool`,
  packReplay:"New expedition", archiveNew:"Not played", archiveResume:"Continue", archiveDone:"Finished",
  company:"Group room", companyIntro:"Play with 2–8 people. Share the code and compare finds after each round.",
  companyName:"Nickname", companyTheme:"Theme", companyRoundCount:"Questions", companyAll:"All themes",
  companySaveName:"Save name", companyStart:"Start expedition", companyWait:"Waiting for the host to start.",
  companyNeedPlayers:"At least two players are needed to start.", companyPlayer:"Miner", companyYou:"you",
  companyHost:"host", companyStandings:"Room standings", companyUnique:"Unique in this room",
  companyStarted:"This expedition has already started.", directCompany:"Open room directly",
  scoreChart:"Player score distribution", scoreSelf:n=>`You · ${n} pts`, scoreLoading:"Loading scores…",
  scoreNotEnough:"Comparison appears after three players finish.",
  scoreUnavailable:"Player scores are temporarily unavailable.",
  scoreDaily:n=>`${n} finishes in this edition`,
  scorePack:n=>`${n} personal bests for this theme and run length`,
  scoreBand:(from,to,n)=>`${from}–${to} points · ${n} ${n===1 ? "player" : "players"}`,
  recapTitle:"Round review"
});
Object.assign(strings.ru, {
  pack:"Тематические экспедиции", pickPack:"Выберите экспедицию", packRounds:"Раундов в экспедиции",
  packIntro:n=>`${n} вопросов на эту тему.`, packPool:n=>`В наборе ${n} вопросов`,
  packReplay:"Новая экспедиция", archiveNew:"Не сыграно", archiveResume:"Продолжить", archiveDone:"Завершено",
  company:"Комната для компании", companyIntro:"Играйте вдвоём или компанией до 8 человек. Поделитесь кодом и сравнивайте находки после каждого раунда.",
  companyName:"Ник", companyTheme:"Тема", companyRoundCount:"Вопросов", companyAll:"Все темы",
  companySaveName:"Сохранить имя", companyStart:"Начать экспедицию", companyWait:"Ждём, пока ведущий начнёт игру.",
  companyNeedPlayers:"Для старта нужны хотя бы два игрока.", companyPlayer:"Шахтёр", companyYou:"вы",
  companyHost:"ведущий", companyStandings:"Таблица комнаты", companyUnique:"Уникальный ответ в комнате",
  companyStarted:"Экспедиция в этой комнате уже началась.", directCompany:"Открыть комнату напрямую",
  scoreChart:"Распределение очков игроков", scoreSelf:n=>`Вы · ${n} очков`, scoreLoading:"Загружаем результаты игроков…",
  scoreNotEnough:"Сравнение появится, когда сыграют три игрока.",
  scoreUnavailable:"Результаты игроков пока недоступны.",
  scoreDaily:n=>`Завершено экспедиций в этом выпуске: ${n}`,
  scorePack:n=>`Личных рекордов в этой теме с таким числом раундов: ${n}`,
  scoreBand:(from,to,n)=>`${from}–${to} очков · игроков: ${n}`,
  recapTitle:"Разбор раундов"
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
function normalizeRoomCode(value) {
  if (/^[a-hj-np-z2-9]{6}$/i.test(value ?? "")) return value.toUpperCase();
  if (/^[a-f0-9]{16}$/i.test(value ?? "")) return value.toLowerCase();
  return null;
}
const packKey = (id,length) => `pack:${id}${length===minePackLengths[0] ? "" : `:${length}`}`;
const editionKey = (day, revision) => `daily:${day}${revision>1 ? `:${revision}` : ""}`;
function readRoute() {
  const args=new URLSearchParams(location.search);
  const company=args.get("company")==="1";
  const continued=normalizeRoomCode(args.get("continue"));
  if (location.origin===answerService && continued) {
    const member=new URLSearchParams(location.hash.slice(1)).get("seat") ?? history.state?.duelSeat;
    if (isBrowserId(member)) {
      const clean=new URL(location.href);
      clean.hash="";
      try { history.replaceState({...history.state,duelSeat:member},"",clean); } catch { /* The fragment can still be used. */ }
      return {mode:"live",duel:continued,member,company,key:`live:${continued}`};
    }
  }
  const pathInvite=location.pathname.match(/\/play\/join\/([^/]+)\/?$/)?.[1];
  const guestRoom=[pathInvite,args.get("join"),location.hash.match(/^#join-(\w+)$/)?.[1]].map(normalizeRoomCode).find(Boolean);
  if (guestRoom) return {mode:"live",duel:guestRoom,company,seat:"guest",key:`live:${guestRoom}:guest`};
  const mode=args.get("mode");
  const duel=normalizeRoomCode(args.get("room"));
  if ((mode==="duel" && duel?.length===16) || (mode==="live" && duel)) return {mode,duel,company,key:`${mode}:${duel}`};
  const pack=args.get("pack");
  if (mode==="pack" && minePack(pack)) {
    const rounds=Number(args.get("rounds"));
    const length=minePackLengths.includes(rounds) ? rounds : minePackLengths[0];
    return {mode,pack,length,key:packKey(pack,length)};
  }
  if (mode==="endless") {
    const requested=args.get("difficulty");
    const difficulty=endlessModes.includes(requested) ? requested : "easy";
    return {mode,difficulty,key:difficulty==="easy" ? "endless" : `endless:${difficulty}`};
  }
  const key=args.get("edition") ?? "";
  const date=/^\d{4}-\d\d-\d\d$/.test(key) ? Date.parse(key)/DAY : NaN;
  const fixed=date>=START && date<=today() && iso(date)===key;
  const day=fixed ? date : today();
  const requested=Number(args.get("set") ?? 1);
  const revision=fixed ? (validDailyRevision(day,requested) ? requested : 1) : latestEditionRevision(day);
  const scoreText=args.get("score") ?? "";
  const rival=fixed && /^\d{1,3}$/.test(scoreText) && Number(scoreText)<=maximum ? Number(scoreText) : null;
  return {mode:"daily",day,fixed,revision,rival,key:editionKey(day,revision)};
}
function dailyRoute() {
  const day=today();
  const revision=latestEditionRevision(day);
  return {mode:"daily",day,fixed:false,revision,rival:null,key:editionKey(day,revision)};
}
let cachedDeck;
function questionAt(index) {
  const pinned=round.answers[index]?.prompt ?? round.prompts?.[index];
  if (pinned) return mineQuestion(pinned);
  if (route.mode==="daily") return mineQuestion(dailyIds(route.day,route.revision)[index]);
  const version=round.deckVersion ?? 1;
  const size=mineDecks[version].length;
  const cycle=route.mode==="endless" ? Math.floor(index/size) : 0;
  const seed=(round.seed+cycle)>>>0;
  if (cachedDeck?.seed!==seed || cachedDeck.version!==version) {
    cachedDeck={seed,version,ids:mineIds(seed,route.mode,version)};
  }
  return mineQuestion(cachedDeck.ids[index%size]);
}
function expeditionLength() {
  if (route.mode==="pack") return route.length;
  if (route.mode==="live") return liveView?.state?.rounds ?? questionsPerRound;
  return questionsPerRound;
}
function depthAt(points) {
  if (route.mode==="pack") points*=questionsPerRound/route.length;
  const stop = depthThresholds.findLastIndex(threshold => points >= threshold);
  const lower = depthThresholds[stop];
  const upper = depthThresholds[stop+1];
  const fraction = upper === undefined ? 0 : (points-lower)/(upper-lower);
  const start = strata[stop][0];
  const end = strata[stop+1]?.[0] ?? start;
  return {stop, km:start+(end-start)*fraction};
}
const layerName = stop => strata[stop][lang === "ru" ? 2 : 1];

let mineScene;
function setWorld(count = 0, points = 0, animate = false) {
  const machine = get("machine");
  const progress = get("progress");
  const rounds=expeditionLength();
  if (progress.children.length!==rounds) progress.replaceChildren(...Array.from({length:rounds},()=>element("i","")));
  const {stop, km} = depthAt(points);
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
  mineScene.moveTo(points, animate);
}

function mountWorld() {
  mineScene = new MineScene(get("mine-scene"), depthThresholds);
  strata.forEach(() => {
    get("depth-map").append(element("span", ""));
  });
}

function answerNote(model, answer) {
  if (answer?.id == null) return "";
  const english = model.answerById.get(answer.id)?.en ?? answer.en;
  return mineAnswerNotes[model.id]?.[english]?.[lang==="ru" ? 1 : 0] ?? (lang==="ru" ? answer.noteRu : answer.noteEn) ?? "";
}

function renderAnswerTimer(milliseconds, urgentAt = 8) {
  const remaining = Math.max(0, milliseconds);
  const seconds = Math.ceil(remaining / 1000);
  const timer = get("answer-timer");
  const readout = get("timer");
  if (readout.textContent !== String(seconds)) readout.textContent = seconds;
  timer.style.setProperty("--time-left", Math.min(1, remaining / (LIMIT * 1000)));
  timer.classList.toggle("urgent", seconds <= urgentAt);
  return seconds;
}

function renderAnswerVerdict(model, answer, fallback, animate = false) {
  const verdict = get("verdict");
  verdict.hidden = false;
  const note = get("answer-note");
  note.textContent = answerNote(model, answer);
  note.hidden = !note.textContent;
  if (!answer || answer.tier<0) {
    delete verdict.dataset.points;
    verdict.classList.remove("is-celebrating");
    verdict.textContent = fallback;
    return;
  }
  const points = pointsFor(answer);
  const gem = element("span","");
  gem.className = "verdict-gem";
  gem.setAttribute("aria-hidden","true");
  const label = element("span","");
  label.className = "verdict-label";
  label.append(element("span",answer[lang]),element("small",words().tiers[answer.tier]));
  verdict.dataset.points = points;
  verdict.classList.toggle("is-celebrating",animate && points>=55);
  verdict.replaceChildren(gem,label,element("strong",`+${points}`));
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
  get("hud-duel-score").hidden=route.mode!=="live" || route.company;
  const ui = words();
  get("duel").disabled=route.mode==="live" && id!=="results";
  get("friends").disabled=get("duel").disabled;
  get("company").disabled=get("duel").disabled;
  get("edition").textContent = route.mode === "daily" ? `${route.day === today() ? ui.today : ui.past} / ${displayDate(route.day)}`
    : route.mode==="pack" ? minePack(route.pack)[lang] : route.company ? ui.company : ui[route.mode];
  get("footer-mode").textContent = route.mode === "daily" && route.rival !== null ? ui.versus : `30 s · ${ui.active.split(" · ").at(-1)}`;
  clock();
}
function intro(focus = false) {
  clearInterval(questionTimer);
  closeDuel();
  const invitation=route.mode==="live" ? route : null;
  if (invitation) route=dailyRoute();
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
    get("topic").textContent = route.mode==="pack" ? minePack(route.pack)[lang] : ui[route.difficulty ?? route.mode];
    get("pitch").textContent = route.mode==="pack" ? ui.packIntro(route.length) : route.difficulty ? ui.endlessModes[endlessModes.indexOf(route.difficulty)] : ui.matchIntro;
    get("lobby-status").textContent = route.mode === "duel" ? ui.matchReady : "";
  }
  invite.hidden = route.mode !== "duel";
  invite.onclick = () => copyChallenge(location.href, "lobby-status");
  get("start").textContent = existing?.done ? ui.replay : existing ? ui.resume : ui.play;
  get("start").onclick = async () => {
    if (!existing?.done) activateAudio();
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
    if (current.mode==="pack" && !round.prompts) {
      round.packVersion=minePackVersion;
      round.prompts=packIds(current.pack,round.seed).slice(0,current.length);
    }
    if (current.mode==="endless" && !round.done && (round.deckVersion ?? 1)<MINE_DECK_VERSION) {
      round.answers=round.answers.map((answer,index)=>({...answer,prompt:questionAt(index).id}));
      round.deckVersion=MINE_DECK_VERSION;
      round.pending=null;
      round.deadline=null;
    }
    save();
    if (round.done) results();
    else question();
  };
  if (focus) get("start").focus();
  if (invitation) enterLive(invitation);
  else if (location.origin===answerService && new URLSearchParams(location.search).get("company")==="1") showCompanyMenu();
  else if (location.origin===answerService && new URLSearchParams(location.search).get("duel")==="1") showDuelMenu();
}

function question(draft = "", focus = true) {
  clearInterval(questionTimer);
  swap("question");
  const index = round.answers.length - Number(Boolean(round.feedback));
  const model = questionAt(index);
  const ui = words();
  const strict = route.mode==="endless" && route.difficulty!=="easy";
  const minimumPoints = route.difficulty==="rare" ? 55 : 0;
  setWorld(round.answers.length, score(round));
  const denominator = route.mode === "endless" ? "" : ` / ${expeditionLength()}`;
  get("category").textContent = route.difficulty ? `${ui[route.difficulty]} · ${ui.question} ${index+1}` : `${ui.question} ${index + 1}${denominator}`;
  get("prompt").textContent = model[lang];
  get("answer").placeholder = ui.placeholder;
  get("answer").value = draft;
  const input=get("answer");
  const form=get("answer-form");
  const submit=form.querySelector("button");
  const status=get("check-status");
  const resolveAnswer=bindAnswerCorrection(model);
  input.addEventListener("input", () => { status.textContent = ""; });
  get("finish-endless").hidden = route.mode !== "endless";
  get("finish-endless").onclick = complete;
  get("next").onclick = event => {
    const activeRound = round;
    const activeRoute = route;
    event.currentTarget.disabled = true;
    mineScene.afterJourney(() => {
      if (page!=="question" || round!==activeRound || route!==activeRoute || !round.feedback) return;
      round.feedback = false;
      if (route.mode !== "endless" && round.answers.length === expeditionLength()) { complete(); return; }
      round.deadline = null;
      save();
      question();
    });
  };
  get("skip").hidden=strict;
  if (!strict) get("skip").onclick = () => settle("", null, "skip");
  form.onsubmit = async event => {
    event.preventDefault();
    const text = get("answer").value.trim();
    const key = answerKey(text);
    if (!key || round.feedback || round.pending) return;
    if (Date.now() >= round.deadline) { settle("", null, "timeout"); return; }
    if (model.id === "weapons" && /^(weapon|fictional weapon|оружие|вымышленное оружие)$/.test(key) && !model.aliases.has(key)) {
      reject("wrongRetry"); return;
    }
    status.textContent="";
    const resolved=resolveAnswer(text);
    if (resolved.entry) { settle(text,resolved.entry,"answer"); return; }
    const checkedAt = Date.now();
    const pending = {text};
    round.pending = pending;
    clearInterval(questionTimer);
    input.readOnly=true;
    submit.disabled=true;
    get("suggestions").hidden=true;
    status.textContent=words().checking;
    let failure="wrongRetry";
    let entry;
    try { entry = (await request("verify", { id:model.id, text, language:lang }, 20000)).answer; }
    catch { failure="lookupRetry"; }
    if (!form.isConnected || round.pending!==pending) return;
    round.deadline += Date.now()-checkedAt;
    round.pending = null;
    save();
    questionTimer = setInterval(tick,120);
    if (entry) settle(text,entry,"checked");
    else reject(failure);
  };
  function reject(message) {
    round.pending=null;
    input.readOnly=false;
    submit.disabled=false;
    status.textContent=words()[message];
    playCue("reject");
    input.focus({preventScroll:true});
    input.select();
  }
  function settle(text, entry, reason) {
    if (round.feedback) return;
    if (entry && pointsFor(entry)<minimumPoints) { reject("rareRetry"); return; }
    clearInterval(questionTimer);
    round.answers.push({...entry,text,prompt:model.id,id:entry?.id ?? null,tier:entry?.tier ?? -1,reason});
    round.pending = null;
    round.feedback = true;
    save();
    if (reason==="timeout" && strict) { complete(); return; }
    setWorld(round.answers.length, score(round), Boolean(entry));
    playCue(entry ? "find" : "skip",entry?.tier);
    reveal(true,true);
  }
  function reveal(moveFocus, animate = false) {
    const answer = round.answers[index];
    const names = words();
    const found = answer.id !== null;
    get("answer-form").hidden = true;
    get("suggestions").hidden = true;
    get("skip").hidden = true;
    get("check-status").textContent = "";
    get("feedback").hidden = false;
    renderAnswerVerdict(model,answer,answer.reason === "timeout" ? names.timeUp
      : answer.reason === "checked" ? names.unverifiable : answer.text ? names.wrong : names.skipped,animate);
    get("sample").textContent = found ? "" : `${names.sample} · ${model.entries[0][lang]}`;
    const depth = depthAt(score(round));
    const motion = pointsFor(answer) > 0 ? names.arrived : names.stayed;
    get("arrival").textContent = `${motion} · ${layerName(depth.stop)} · ${get("depth").textContent}`;
    const last = route.mode !== "endless" && index === expeditionLength() - 1;
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
    const seconds = renderAnswerTimer(round.deadline - Date.now());
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
  playCue("finish");
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
  get("finished-topic").textContent = route.mode === "daily" ? displayDate(route.day) : route.mode==="pack" ? minePack(route.pack)[lang]
    : route.company ? ui.company : ui[route.difficulty ?? route.mode];
  setWorld(round.answers.length, points);
  const found=round.answers.filter(answer=>answer.tier>=0).length;
  get("total").textContent = endless ? `${points} ${ui.points} · ${found} ${ui.answersFound}` : `${points} / ${expeditionLength()*Math.max(...scores)} ${ui.points}`;
  get("badge").textContent = endless && route.difficulty!=="easy" && round.answers.at(-1)?.reason==="timeout"
    ? ui.streakEnded : earned([round]).flatMap((unlocked, index) => unlocked ? [ui.awards[index][0]] : []).at(-1);
  get("comparison").hidden = route.company || (!["duel","live"].includes(route.mode) && route.rival == null);
  if (route.mode === "daily" && route.rival !== null) showComparison(route.rival,points);
  const recapUpdates=[];
  const recap=get("recap");
  get("round-review").hidden=!round.answers.length;
  round.answers.forEach((answer,index)=>{
    const model=route.mode==="live" ? mineQuestion(answer.prompt) : questionAt(index);
    const row=element("li","");
    const details=element("details","");
    details.name="round-review";
    details.addEventListener("toggle",()=>{
      if (details.open) recap.querySelectorAll("details[open]").forEach(other=>{
        if (other!==details) other.open=false;
      });
    });
    const summary=element("summary","");
    const answerText=answer[lang] ?? (answer.text || (answer.reason==="timeout" ? ui.timeUp : ui.skipped));
    const label=element("span","");
    const prompt=element("small",`${index+1}. ${model[lang]}`);
    prompt.className="recap-question";
    label.append(prompt,element("span",answerText));
    summary.append(label, element("strong",`+${pointsFor(answer)}`));
    const extras=element("div","");
    extras.id=`recap-detail-${index}`;
    extras.className="recap-detail";
    recapUpdates.push(bindRecap(details,extras,model,answer,round.rivalAnswers?.[index]));
    details.append(summary,extras);
    row.append(details);
    recap.append(row);
  });
  get("share").hidden = endless || route.mode === "live" || route.mode==="pack";
  get("refresh-duel").hidden = route.mode !== "duel";
  get("today").onclick = () => {
    if (endless || route.mode==="pack") { delete library[route.key]; persist(); intro(true); }
    else openEdition();
  };
  if (endless) get("today").textContent = ui.fresh;
  if (route.mode==="pack") get("today").textContent=ui.packReplay;
  get("share").onclick = () => {
    if (route.mode === "duel") { copyChallenge(location.href); return; }
    const url = new URL(gameRoot);
    url.searchParams.set("mode", "mine");
    url.searchParams.set("edition", iso(route.day));
    if (route.revision>1) url.searchParams.set("set",route.revision);
    url.searchParams.set("score", points);
    const card = round.answers.map(answer => marks[answer.tier] ?? "⬛").join("");
    copyChallenge(`${GAME_NAME} · ${iso(route.day)}
${card} ${points}/${maximum}
${ui.dare}
${url.href}`);
  };
  get("answer-source").hidden = route.mode !== "daily";
  if (route.mode==="daily" || route.mode==="pack") showResultStatistics(recapUpdates,points);
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
async function request(path,data,timeout=8000,transport=undefined,lifetime) {
  const abort=new AbortController();
  const stop=()=>abort.abort();
  if (lifetime?.aborted) stop();
  else lifetime?.addEventListener("abort",stop,{once:true});
  const timer=setTimeout(()=>abort.abort(),timeout);
  try {
    const base=location.origin===answerService ? "" : answerService;
    const options={
      method:"POST",headers:{"Content-Type":"text/plain;charset=UTF-8"},
      body:JSON.stringify(path==="verify" ? data : {...data,browser:anonymousId()}),signal:abort.signal
    };
    const url=`${base}/${path}`;
    const response=await (transport ? transport(url,options) : fetch(url,options));
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
  } finally {
    clearTimeout(timer);
    lifetime?.removeEventListener("abort",stop);
  }
}

function bindRecap(details,root,model,answer,rival) {
  const pageSize=60;
  let counts=[], rounds=0, verified=[], loading=false, page=0;
  let choices=[], names, search, status, list, navigation;
  const canonicalId=entry=>typeof entry.id==="string"
    ? (model.aliases.get(answerKey(entry.en)) ?? model.aliases.get(answerKey(entry.ru)))?.id ?? entry.id
    : entry.id;
  const played=new Map();
  function refreshChoices() {
    const known=new Map(model.entries.map(entry=>[entry.id,entry]));
    for (const item of [answer,rival,...verified,...counts]) {
      if (item?.id!=null && !known.has(canonicalId(item))) known.set(item.id,item);
    }
    played.clear();
    for (const item of counts) {
      const id=canonicalId(item);
      played.set(id,(played.get(id) ?? 0)+item.count);
    }
    choices=[...known.values()].sort((a,b)=>
      (played.get(a.id) ?? 0)-(played.get(b.id) ?? 0) || pointsFor(b)-pointsFor(a) || a[lang].localeCompare(b[lang],lang));
    if (!names) {
      names=new Map();
      for (const [key,entry] of model.aliases) {
        if (!names.has(entry.id)) names.set(entry.id,[]);
        names.get(entry.id).push(key);
      }
    }
  }
  function renderPage() {
    const ui=words();
    const key=answerKey(search.value);
    const matching=key ? choices.filter(entry=>(names.get(entry.id) ?? [answerKey(entry.en),answerKey(entry.ru)])
      .some(name=>name.includes(key))) : choices;
    page=Math.min(page,Math.max(0,Math.ceil(matching.length/pageSize)-1));
    const start=page*pageSize;
    const items=matching.slice(start,start+pageSize).map(entry=>{
      const frequency=rounds ? ` · ${played.get(entry.id) ?? 0} / ${rounds}` : "";
      const item=element("li",`${entry[lang]} · ${ui.tiers[entry.tier]} · +${pointsFor(entry)}${frequency}`);
      const note=entry.id!==canonicalId(answer) && answerNote(model,entry);
      if (note) {
        const explanation=element("small",note);
        explanation.className="answer-note";
        item.append(explanation);
      }
      return item;
    });
    status.textContent=items.length
      ? `${rounds ? ui.community : ui.dictionary} · ${start+1}–${start+items.length} / ${matching.length}`
      : ui.noAnswers;
    list.replaceChildren(...items);
    list.hidden=!items.length;
    list.scrollTop=0;
    navigation.hidden=matching.length<=pageSize;
    navigation.firstElementChild.disabled=page===0;
    navigation.lastElementChild.disabled=start+pageSize>=matching.length;
  }
  function createControls() {
    const ui=words();
    const items=[];
    const note=answerNote(model,answer);
    if (note) {
      const explanation=element("p",note);
      explanation.className="answer-note";
      items.push(explanation);
    }
    if (rival) items.push(element("p",duelAnswerText(rival)));
    search=element("input","");
    search.type="search";
    search.placeholder=ui.answerSearch;
    search.setAttribute("aria-label",ui.answerSearch);
    search.className="recap-search";
    search.oninput=()=>{ page=0; renderPage(); };
    status=element("small","");
    status.setAttribute("aria-live","polite");
    list=element("ul","");
    list.tabIndex=0;
    navigation=element("div","");
    navigation.className="recap-pages";
    for (const [label,step] of [[ui.previousAnswers,-1],[ui.moreAnswers,1]]) {
      const button=element("button",label);
      button.className="quiet";
      button.type="button";
      button.onclick=()=>{ page+=step; renderPage(); };
      navigation.append(button);
    }
    items.push(search,status,list,navigation);
    root.replaceChildren(...items);
  }
  function render() {
    if (!search) createControls();
    refreshChoices();
    renderPage();
  }
  details.ontoggle=async()=>{
    if (!details.open) return;
    render();
    if (loading) return;
    loading=true;
    try {
      verified=(await request("answer-list",{id:model.id})).answers;
      if (root.isConnected && details.open) render();
    } catch { loading=false; }
  };
  return (picked,total)=>{
    counts=picked??[];
    rounds=total??0;
    if (details.open) render();
  };
}
function showScoreDistribution(chart,distribution,points,isDaily) {
  const ui=words();
  const status=chart.querySelector("#score-peers");
  if (!distribution?.bins?.length) {
    status.textContent=ui.scoreNotEnough;
    return;
  }
  const {pointsMax,bins,players}=distribution;
  const peak=Math.max(...bins);
  const bandWidth=pointsMax/bins.length;
  const marker=chart.querySelector("#score-marker");
  const band=chart.querySelector("#score-band");
  const bars=chart.querySelector("#score-bars");
  const markerIndex=Math.min(bins.length-1,Math.floor(points/bandWidth));
  const number=n=>n.toLocaleString(lang);
  status.textContent=(isDaily ? ui.scoreDaily : ui.scorePack)(number(players));
  const describe=(index,count)=>{
    const start=index*bandWidth;
    const end=start+bandWidth-Number(index<bins.length-1);
    return ui.scoreBand(number(start),number(end),number(count));
  };
  const yourBand=describe(markerIndex,bins[markerIndex]);
  bars.style.setProperty("--bins",bins.length);
  bars.replaceChildren(...bins.map((count,index)=>{
    const button=element("button","");
    const label=describe(index,count);
    button.type="button";
    button.setAttribute("aria-label",label);
    button.title=label;
    button.style.setProperty("--height",`${count/peak*100}%`);
    button.classList.toggle("is-player-band",index===markerIndex);
    button.onfocus=button.onpointerenter=()=>{ band.textContent=label; };
    button.onblur=button.onpointerleave=()=>{ if (document.activeElement!==button) band.textContent=yourBand; };
    button.onclick=()=>{ band.textContent=label; };
    return button;
  }));
  marker.style.setProperty("--position",`${Math.min(100,points/pointsMax*100)}%`);
  marker.style.setProperty("--height",`${bins[markerIndex]/peak*100}%`);
  chart.querySelector("#score-axis").replaceChildren(...[0,pointsMax/2,pointsMax].map(n=>element("span",number(n))));
  band.textContent=yourBand;
  chart.querySelector("#score-plot").hidden=false;
}
async function showResultStatistics(recapUpdates,points) {
  const chart=get("score-chart");
  const peerStatus=get("score-peers");
  const status=get("answer-source");
  const ui=words();
  const isDaily=route.mode==="daily";
  const picks=round.answers.map(answer=>answer.id);
  const data=isDaily ? {edition:iso(route.day),editionRevision:route.revision,picks}
    : {pack:route.pack,seed:round.seed,rounds:route.length,version:round.packVersion ?? 1,picks};
  chart.hidden=false;
  get("score-self").textContent=ui.scoreSelf(points.toLocaleString(lang));
  peerStatus.textContent=ui.scoreLoading;
  if (isDaily) status.textContent=ui.pending;
  let survey;
  try { survey=await request(isDaily ? "mine-answers" : "pack-scores",data); } catch { survey=null; }
  if (!chart.isConnected) return;
  if (survey) showScoreDistribution(chart,survey.distribution,points,isDaily);
  else peerStatus.textContent=ui.scoreUnavailable;
  if (isDaily) {
    const counts=survey?.counts;
    status.textContent=counts ? ui.surveyData : survey ? ui.noData : ui.surveyError;
    if (counts) recapUpdates.forEach((update,index)=>update(counts[index],survey.rounds));
  }
}
function openEdition(day,mode,duel,revision,packLength) {
  const url=new URL(gameRoot);
  if (day!==undefined) {
    url.searchParams.set("mode","mine");
    url.searchParams.set("edition",iso(day));
    const edition=revision ?? latestEditionRevision(day);
    if (edition>1) url.searchParams.set("set",edition);
  } else if (mode) {
    url.searchParams.set("mode",mode);
    if (duel) url.searchParams.set(mode==="endless" ? "difficulty" : mode==="pack" ? "pack" : "room",duel);
    if (mode==="pack") url.searchParams.set("rounds",packLength);
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
function showEndlessMenu() {
  const list=element("div","");
  list.className="mode-picker";
  endlessModes.forEach((difficulty,index)=>{
    const button=element("button",words()[difficulty]);
    button.className="quiet";
    button.append(element("small",words().endlessModes[index]));
    button.onclick=()=>{
      get("modal").close();
      openEdition(undefined,"endless",difficulty);
    };
    list.append(button);
  });
  modal(words().endless,list);
}
function showPackMenu() {
  const ui=words();
  const list=element("div","");
  list.className="mode-picker pack-menu";
  const label=element("label",ui.packRounds);
  label.className="pack-length";
  const length=element("select","");
  for (const rounds of minePackLengths) length.add(new Option(rounds,rounds));
  length.value=route.mode==="pack" ? route.length : minePackLengths.at(-1);
  label.append(length);
  const update=[];
  for (const [id,pack] of Object.entries(minePacks)) {
    const button=element("button",pack[lang]);
    button.className="quiet";
    const status=element("small","");
    button.append(element("small",ui.packPool(pack.ids.length)),status);
    update.push(()=>{
      const saved=library[packKey(id,Number(length.value))];
      status.textContent=saved?.done ? ui.replay : saved ? ui.resume : "";
    });
    button.onclick=()=>{
      get("modal").close();
      openEdition(undefined,"pack",id,undefined,Number(length.value));
    };
    list.append(button);
  }
  length.onchange=()=>update.forEach(render=>render());
  length.onchange();
  modal(ui.pickPack,label,list);
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
  const finished = day => {
    for (let revision=1;revision<=latestEditionRevision(day);revision++) {
      if (library[editionKey(day,revision)]?.done) return true;
    }
    return false;
  };
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
  get("rules").onclick = () => {
    const ui=words();
    const credits=element("p",`${ui.sourceCredits} `);
    const geo=element("a","GeoNames (CC BY 4.0)");
    geo.href="https://www.geonames.org/export/";
    const wiki=element("a","Wikidata (CC0)");
    wiki.href="https://www.wikidata.org/wiki/Wikidata:Licensing";
    credits.append(geo," · ",wiki);
    modal(ui.rules,...[...ui.rulesText,ui.openRules,ui.moreRules,ui.retryRule,ui.dataRarity].map(text=>element("p",text)),credits);
  };
  const menu=get("game-menu");
  menu.addEventListener("click",event=>{
    if (event.target.closest("button")) menu.open=false;
  });
  document.addEventListener("click",event=>{
    if (menu.open && !menu.contains(event.target)) menu.open=false;
  });
  menu.addEventListener("keydown",event=>{
    if (event.key!=="Escape" || !menu.open) return;
    event.stopPropagation();
    menu.open=false;
    get("game-menu-label").focus();
  });
  get("packs").onclick = showPackMenu;
  get("company").onclick = showCompanyMenu;
  get("endless").onclick = showEndlessMenu;
  get("sound").onclick = showAudioMenu;
  get("friends").onclick = showFriends;
  startFriendPolling();
  prepareAudio();
  get("duel").onclick = showDuelMenu;
  addEventListener("online",wakeDuel);
  document.addEventListener("visibilitychange",wakeDuel);
  get("duel-close").onclick = closeDuel;
  get("duel-modal").addEventListener("cancel", event => { event.preventDefault(); closeDuel(); });
  get("stats").onclick = showStats;
  get("archive").onclick = () => {
    const ui = words();
    const list = element("div", "");
    list.className = "archive-list";
    function addEdition(day,revision,label) {
      const saved=library[editionKey(day,revision)];
      const button=element("button","");
      button.className="archive-item";
      const status=element("span",saved?.done ? `${ui.archiveDone} · ${score(saved)} / ${maximum}` : saved ? ui.archiveResume : ui.archiveNew);
      status.className="archive-status";
      button.append(element("span",label),status);
      button.onclick=()=>{
        get("modal").close();
        openEdition(day,undefined,undefined,revision);
        if (saved) get("start").click();
      };
      list.append(button);
    }
    const currentDay=today();
    const previousLabels=[ui.originalEdition,ui.secondEdition];
    for (let day = currentDay; day >= Math.max(START,currentDay-14); day--) {
      const date=displayDate(day);
      const latest=latestEditionRevision(day);
      addEdition(day,latest,day===currentDay ? `${date} · ${ui.today}` : date);
      for (let revision=latest-1;revision>=1;revision--) {
        addEdition(day,revision,`${date} · ${previousLabels[revision-1] ?? `#${revision}`}`);
      }
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
