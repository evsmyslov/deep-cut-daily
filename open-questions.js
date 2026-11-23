"use strict";

function answerKey(text) {
  return text.normalize("NFKC").toLowerCase().replaceAll("c++","c plus plus").replaceAll("c#","c sharp").replaceAll("ё","е")
    .replace(/\p{Script=Latin}/gu, c => c.normalize("NFD").replace(/\p{M}/gu,""))
    .replace(/['’]/g,"").replace(/&/g," and ").replace(/[^\p{L}\p{N}]+/gu," ").trim();
}

function add(id, en, ru, source, lookup = null) {
  const rows = source.trim().split("\n").map(row => {
    const [tier, en, ru] = row.trim().split(";");
    return [Number(tier), en, ru];
  });
  catalog[id] = [en, ru, rows, lookup];
}

add("weapons", "Name a specific fictional weapon. Give its name or model.", "Назовите конкретное вымышленное оружие. Укажите его имя или модель.", `
0;Elder Wand|Deathstick|Wand of Destiny;Бузинная палочка|Смертоносная палочка|Палочка Судьбы
0;Excalibur;Экскалибур|Эскалибур
0;Mjolnir|Mjölnir|Thors hammer;Мьёльнир|Молот Тора
0;Infinity Gauntlet;Перчатка Бесконечности
1;Darksaber|dark saber;Тёмный меч|Дарксейбер|Тёмный световой меч
1;Master Sword|Blade of Evils Bane;Меч Мастера|Мастер-меч
1;Anduril|Andúril|Flame of the West;Андурил|Пламя Запада
1;Frostmourne;Ледяная Скорбь|Фростморн
1;BFG 9000|BFG9000;БФГ 9000
1;Sting;Жало|Меч Жало
1;Stormbreaker;Громсекира|Секира Грома|Штормбрейкер
1;Glamdring|Foe-hammer;Гламдринг|Молотящий Врагов
1;Energy Sword Type-1|Type-1 Energy Sword|Type-1 Energy Weapon;Энергетический меч Тип-1|Тип-1
2;Luke Skywalkers green lightsaber|Luke Skywalkers second lightsaber;Зелёный световой меч Люка Скайуокера|Второй световой меч Люка
2;Gryffindors Sword|Sword of Gryffindor|Sword of Godric Gryffindor;Меч Гриффиндора|Меч Годрика Гриффиндора
2;Keyblade Kingdom Key|Kingdom Key;Ключ Королевства
2;Portal Gun|Aperture Science Handheld Portal Device;Портальная пушка|Ручное портальное устройство Aperture Science
2;Needler|Type-33 Guided Munitions Launcher;Игломёт|Пусковая установка Тип-33
2;Gravity Gun|Zero Point Energy Field Manipulator;Гравипушка|Манипулятор энергетического поля нулевой точки
2;Gjallarhorn;Гьяллархорн
2;Hidden Blade;Скрытый клинок
3;Daedric artifact Dawnbreaker|Dawnbreaker;Сияние Рассвета|Сияние рассвета
3;Wabbajack;Ваббаджек
3;Mehrunes Razor|Mehrunes Dagon Razor;Бритва Мерунеса
3;Harry Potters holly and phoenix feather wand|Harry Potters holly wand|Harry Potters wand;Палочка Гарри Поттера|Палочка Гарри Поттера из остролиста|Остролист и перо феникса
3;Voldemorts yew wand|Voldemorts wand|Tom Riddles wand;Палочка Волан-де-Морта|Тисовая палочка Волан-де-Морта|Палочка Тома Реддла
3;Hermione Grangers vine wand|Hermione Grangers wand;Палочка Гермионы Грейнджер|Палочка Гермионы из виноградной лозы
3;Rons willow wand|Ron Weasleys willow wand|Ron Weasleys second wand;Ивовая палочка Рона Уизли|Палочка Рона из ивы|Вторая палочка Рона Уизли
3;Anakins lightsaber|Anakin Skywalkers lightsaber|Skywalker lightsaber;Световой меч Энакина Скайуокера|Меч Энакина
3;Kylo Rens crossguard lightsaber|Kylo Rens lightsaber;Световой меч Кайло Рена|Меч Кайло Рена
3;Darth Mauls double bladed lightsaber|Darth Mauls lightsaber;Двуклинковый меч Дарта Мола|Световой меч Дарта Мола
3;Samus Arm Cannon;Наручная пушка Самус|Ручная пушка Самус
3;Cerebral Bore;Церебральный бур
3;Monado;Монадо
3;Yamato|Vergils Yamato;Ямато Вергилия|Катана Ямато
3;Red Queen|Neros Red Queen;Красная Королева Неро|Меч Красная Королева
3;Rebellion|Dantes Rebellion;Мятежник Данте|Меч Мятежник
3;Dragon Slayer|Guts Dragon Slayer;Убийца драконов|Меч Гатса
3;Zangetsu;Зангецу|Зангэцу
3;Ruyi Jingu Bang|Jingu Bang;Жезл Жуи Цзиньгу Бан|Посох Сунь Укуна
3;Orcrist|Goblin-cleaver;Оркрист|Гоблинорез
3;Aeglos|Aiglos;Эглос|Айглос
3;Anglachel|Gurthang;Англахэл|Гуртанг
3;Gungnir|Odins spear;Гунгнир|Копьё Одина
3;Muramasa Blade|Muramasa Blade Marvel;Клинок Мурамасы
3;Blades of Chaos;Клинки Хаоса
3;Leviathan Axe;Топор Левиафан|Левиафан Кратоса
3;Draupnir Spear;Копьё Драупнир
3;Saw Cleaver;Топор-пила|Пила-тесак
3;Moonlight Greatsword|Holy Moonlight Sword;Меч лунного света|Священный меч лунного света
`, [["Q15720870"],["fictional weapon","fictional sword","fictional firearm","вымышленное оружие","вымышленный меч","световой меч","lightsaber"],["manufacturer","производитель","list of","список"]]);

add("lens","Name an object that uses a lens.","Назовите предмет, в котором используется линза.",`
0;camera;фотоаппарат|камера
0;eyeglasses|glasses|spectacles;очки
0;magnifying glass|magnifier;лупа
1;telescope|refracting telescope;телескоп|рефрактор
1;microscope|optical microscope;микроскоп
1;binoculars;бинокль
1;projector|film projector;проектор|кинопроектор
2;contact lens;контактная линза
2;peephole|door viewer;дверной глазок|глазок
2;periscope;перископ
2;rangefinder|optical rangefinder;оптический дальномер|дальномер
2;vr headset;шлем виртуальной реальности|VR-шлем
2;optical mouse;оптическая мышь
3;ophthalmoscope;офтальмоскоп
3;retinoscope;ретиноскоп
3;slide scanner;сканер слайдов
3;theodolite;теодолит
3;endoscope;эндоскоп
3;fresnel lighthouse lantern|lighthouse lantern;фонарь маяка|маячный фонарь
3;surveying level|optical level;нивелир|оптический нивелир
3;spectrophotometer;спектрофотометр
3;collimator;коллиматор
`);

add("mountains","Name a mountain.","Назовите гору.",`
0;Mount Everest|Everest|Chomolungma|Sagarmatha;Эверест|Джомолунгма|Сагарматха
0;K2|Godwin-Austen|Chhogori;К2|Чогори
0;Kilimanjaro;Килиманджаро
1;Mont Blanc;Монблан
1;Denali|Mount McKinley;Денали|Мак-Кинли
1;Mount Elbrus|Elbrus;Эльбрус
1;Mount Fuji|Fuji;Фудзи|Фудзияма|Фудзисан
1;Matterhorn;Маттерхорн
2;Aconcagua;Аконкагуа
2;Annapurna;Аннапурна
2;Mount Kinabalu|Kinabalu;Кинабалу
2;Table Mountain;Столовая гора
2;Mount Erebus|Erebus;Эребус
3;Vinson Massif|Mount Vinson|Vinson;Массив Винсон|Винсон
3;Puncak Jaya|Carstensz Pyramid;Пунчак-Джая|Пирамида Карстенса
3;Gangkhar Puensum;Гангкхар-Пуенсум
3;Mount Roraima|Roraima;Рорайма
`, [["Q8502"],["mountain","mountain peak","volcano","гора","горная вершина","вулкан"],["fictional","вымышленн","mountain range","горный хребет"]]);

add("films","Name a feature film.","Назовите полнометражный фильм.",`
0;The Matrix|Matrix;Матрица
0;Titanic;Титаник
0;Avatar;Аватар
0;Inception;Начало
1;Interstellar;Интерстеллар
1;The Godfather|Godfather;Крёстный отец
1;Jurassic Park;Парк юрского периода
1;Pulp Fiction;Криминальное чтиво
1;The Shawshank Redemption;Побег из Шоушенка
2;Stalker;Сталкер
2;The Seventh Seal;Седьмая печать
2;Bicycle Thieves;Похитители велосипедов
2;Rashomon;Расёмон
3;A Brighter Summer Day;Яркий летний день
3;The Color of Pomegranates;Цвет граната
3;The Ascent;Восхождение
3;Woman in the Dunes;Женщина в песках
3;Dersu Uzala;Дерсу Узала
`, [["Q11424","Q24869"],["film","фильм"],["short film","короткометраж","television series","сериал","film series","серия фильмов"]]);

add("novels","Name a novel.","Назовите роман.",`
0;War and Peace;Война и мир
0;1984|Nineteen Eighty-Four;1984
0;The Hobbit|Hobbit;Хоббит|Хоббит или Туда и обратно
1;Jane Eyre;Джейн Эйр
1;Pride and Prejudice;Гордость и предубеждение
1;Dune;Дюна
1;The Master and Margarita;Мастер и Маргарита
2;One Hundred Years of Solitude;Сто лет одиночества
2;The Trial;Процесс
2;The Name of the Rose;Имя розы
2;The Left Hand of Darkness;Левая рука тьмы
3;Pale Fire;Бледный огонь
3;The Invention of Morel;Изобретение Мореля
3;The Factory;Фабрика
3;The Man Without Qualities;Человек без свойств
3;The Melancholy of Resistance;Меланхолия сопротивления
`, [["Q8261"],["novel","роман"],["novel series","серия романов","graphic novel","графический роман"]]);

add("video-games","Name a video game. Give a specific title within a series.","Назовите видеоигру. Если это серия, укажите конкретную часть.",`
0;Minecraft;Майнкрафт
0;Tetris;Тетрис
0;Fortnite;Фортнайт
1;Portal;Портал
1;Stardew Valley;Стардью Вэлли|Долина Стардью
1;Hollow Knight;Холлоу Найт
1;Grand Theft Auto V|GTA V|GTA 5;ГТА 5
1;The Witcher 3 Wild Hunt|Witcher 3;Ведьмак 3|Ведьмак 3 Дикая охота
2;Disco Elysium;Диско Элизиум
2;Slay the Spire;Убей шпиль
2;Celeste;Селеста
2;Return of the Obra Dinn;Возвращение Обра Динн
3;Rain World;Мир дождя
3;Hypnospace Outlaw;Хипноспейс Аутлоу
3;Chants of Sennaar;Песни Сеннаара
3;The Case of the Golden Idol;Дело о золотом идоле
3;A Short Hike;Короткий поход
`, [["Q7889"],["video game","видеоигра","компьютерная игра"],["series","франшиза","серия игр"]]);

add("instruments","Name a musical instrument.","Назовите музыкальный инструмент.",`
0;guitar;гитара
0;piano;пианино|фортепиано
0;violin;скрипка
1;flute;флейта
1;trumpet;труба
1;saxophone;саксофон
1;accordion;аккордеон
2;oboe;гобой
2;harpsichord;клавесин
2;contrabassoon;контрафагот
2;didgeridoo;диджериду
2;balalaika;балалайка
3;nyckelharpa;никельхарпа|никкельхарпа
3;shakuhachi;сякухати|шакухачи
3;ondes martenot;волны Мартено
3;crwth;крут
3;hurdy-gurdy;колёсная лира
3;glass harmonica;стеклянная гармоника
`, [["Q34379"],["musical instrument","музыкальный инструмент"],["manufacturer","producer","производитель"]]);

add("board-games","Name a tabletop board game.","Назовите настольную игру с игровым полем.",`
0;chess;шахматы
0;Monopoly;Монополия
0;checkers|draughts;шашки
1;backgammon;нарды
1;go|weiqi|baduk;го|вэйци|бадук
1;Scrabble;Эрудит|Скраббл
1;Catan|Settlers of Catan;Колонизаторы|Катан
2;Ticket to Ride;Билет на поезд
2;Carcassonne;Каркассон
2;Azul;Азул
2;Pandemic;Пандемия
3;Root;Корни
3;Pax Pamir;Пакс Памир
3;Crokinole;Крокинол
3;Tak;Так
3;Hnefatafl;Хнефатафл
3;YINSH;Инш
`, [["Q131436"],["board game","настольная игра"],["video game","видеоигра","manufacturer","производитель"]]);

add("programming","Name a programming language.","Назовите язык программирования.",`
0;Python;Питон|Пайтон
0;JavaScript|JS;Джаваскрипт
0;Java;Джава|Ява
0;C++|cpp|c plus plus;Си плюс плюс
1;C#|c sharp;Си шарп
1;C;Си
1;Go|golang;Го
1;Rust;Раст
1;PHP;Пиэйчпи
2;Haskell;Хаскелл
2;Erlang;Эрланг
2;Fortran;Фортран
2;Pascal;Паскаль
2;Kotlin;Котлин
3;Forth;Форт
3;Ada;Ада
3;Raku;Раку
3;Befunge;Бифандж
3;Brainfuck;Брейнфак
3;Piet;Пит
`, [["Q9143"],["programming language","язык программирования"],["language family","семейство языков"]]);

add("birds","Name a species of bird.","Назовите вид птицы.",`
0;house sparrow;домовый воробей
0;rock dove|rock pigeon;сизый голубь
0;common raven;обыкновенный ворон
1;barn owl;обыкновенная сипуха|сипуха
1;great tit;большая синица
1;emperor penguin;императорский пингвин
1;peregrine falcon;сапсан
2;grey heron;серая цапля
2;red kite;красный коршун
2;hoopoe|eurasian hoopoe;удод
2;blue jay;голубая сойка
3;shoebill;китоглав
3;kakapo;какапо
3;hoatzin;гоацин
3;resplendent quetzal;квезаль|кетсаль
3;secretarybird|secretary bird;птица-секретарь
`, [["Q5113"],["species of bird","вид птиц","bird species"],["genus","род птиц"]]);

add("dinosaurs","Name a non-avian dinosaur genus.","Назовите род нептичьих динозавров.",`
0;Tyrannosaurus|T rex|Tyrannosaurus rex;Тираннозавр|Тираннозавр рекс
0;Triceratops;Трицератопс
0;Velociraptor;Велоцираптор
1;Stegosaurus;Стегозавр
1;Brachiosaurus;Брахиозавр
1;Spinosaurus;Спинозавр
1;Diplodocus;Диплодок
2;Pachycephalosaurus;Пахицефалозавр
2;Iguanodon;Игуанодон
2;Deinonychus;Дейноних
2;Therizinosaurus;Теризинозавр
3;Oryctodromeus;Ориктодромеус
3;Yi|Yi qi;И ци
3;Mononykus;Мононик
3;Kosmoceratops;Космоцератопс
3;Nigersaurus;Нигерзавр
3;Borealopelta;Бореалопельта
`, [[],["genus of dinosaur","genus of theropod dinosaur","genus of sauropod dinosaur","род динозавров","род тероподовых динозавров"],["bird","птиц","pterosaur","птерозавр"]]);

add("craters","Name a named impact crater on the Moon.","Назовите ударный кратер на Луне, у которого есть название.",`
0;Tycho;Тихо
0;Copernicus;Коперник
1;Kepler;Кеплер
1;Aristarchus;Аристарх
1;Plato;Платон
2;Clavius;Клавий
2;Ptolemaeus;Птолемей
2;Alphonsus;Альфонс
2;Grimaldi;Гримальди
3;Aitken;Эйткен
3;Tsiolkovskiy|Tsiolkovsky;Циолковский
3;Schrödinger;Шрёдингер
3;Petavius;Петавий
3;Langrenus;Лангрен
3;Mare Moscoviense impact basin;Море Москвы
`, [[],["lunar impact crater","impact crater on the moon","кратер на луне","лунный кратер"],["martian","марс"]]);

add("rivers","Name a river.","Назовите реку.",`
0;Nile;Нил
0;Amazon;Амазонка
0;Volga;Волга
0;Mississippi;Миссисипи
1;Danube;Дунай
1;Rhine;Рейн
1;Thames;Темза
1;Ganges;Ганг
1;Yangtze;Янцзы
2;Mekong;Меконг
2;Orinoco;Ориноко
2;Lena;Лена
2;Tigris;Тигр
3;Fly River;Флай
3;Essequibo;Эссекибо
3;Okavango;Окаванго
3;Orange River;Оранжевая река
3;Salween;Салуин
`, [["Q4022"],["river in","river of","river on","река в","река на"],["fictional","вымышленн"]]);

add("myth","Name a named deity from Greek mythology.","Назовите бога или богиню из древнегреческой мифологии.",`
0;Zeus;Зевс
0;Poseidon;Посейдон
0;Athena;Афина
1;Hera;Гера
1;Artemis;Артемида
1;Apollo;Аполлон
1;Aphrodite;Афродита
1;Hades;Аид
2;Hestia;Гестия
2;Hephaestus;Гефест
2;Hecate;Геката
2;Nemesis;Немезида
3;Ananke;Ананке
3;Melinoe;Мелиноя
3;Zagreus;Загрей
3;Adrestia;Адрастея
3;Harmonia;Гармония
3;Asclepius;Асклепий
`, [[],["greek deity","greek god","greek goddess","древнегреческий бог","древнегреческая богиня","бог греческой мифологии"],["roman","римский","рымский"]]);

add("spacecraft","Name a spacecraft launched beyond Earth's orbit.","Назовите космический аппарат, запущенный за пределы земной орбиты.",`
0;Voyager 1;Вояджер-1
0;Voyager 2;Вояджер-2
0;Apollo 11;Аполлон-11
1;New Horizons;Новые горизонты
1;Cassini;Кассини
1;Pioneer 10;Пионер-10
1;Curiosity|Mars Science Laboratory;Кьюриосити
2;Venera 7;Венера-7
2;Hayabusa2|Hayabusa 2;Хаябуса-2
2;Mars Express;Марс-экспресс
2;James Webb Space Telescope|JWST;Джеймс Уэбб|Телескоп Джеймса Уэбба
3;Parker Solar Probe;Паркер|Солнечный зонд Паркер
3;Mariner 4;Маринер-4
3;Luna 3;Луна-3
3;Vega 1;Вега-1
3;Akatsuki;Акацуки
3;BepiColombo;БепиКоломбо
3;Rosetta;Розетта
`);

add("architects","Name an architect known for a completed building.","Назовите архитектора, известного построенным зданием.",`
0;Antoni Gaudí|Gaudi;Антонио Гауди|Антони Гауди
0;Frank Lloyd Wright;Фрэнк Ллойд Райт
1;Le Corbusier;Ле Корбюзье
1;Zaha Hadid;Заха Хадид
1;Frank Gehry;Фрэнк Гери
1;Norman Foster;Норман Фостер
2;I M Pei|Ieoh Ming Pei;Бэй Юймин|Бей Юймин
2;Tadao Ando;Тадао Андо
2;Moshe Safdie;Моше Сафди
2;Renzo Piano;Ренцо Пьяно
3;Lina Bo Bardi;Лина Бо Барди
3;Carlo Scarpa;Карло Скарпа
3;Alvar Aalto;Алвар Аалто
3;Kenzo Tange;Кэндзо Тангэ
3;Shigeru Ban;Сигэру Бан
3;Anna Heringer;Анна Херингер
`, [[],["architect","архитектор"],["fictional","вымышлен","software","enterprise"]]);

add("composers","Name a composer of a classical orchestral work.","Назовите композитора, написавшего классическое оркестровое произведение.",`
0;Ludwig van Beethoven|Beethoven;Людвиг ван Бетховен|Бетховен
0;Wolfgang Amadeus Mozart|Mozart;Вольфганг Амадей Моцарт|Моцарт
0;Pyotr Ilyich Tchaikovsky|Tchaikovsky;Пётр Ильич Чайковский|Чайковский
1;Johann Sebastian Bach|Bach;Иоганн Себастьян Бах|Бах
1;Antonio Vivaldi|Vivaldi;Антонио Вивальди|Вивальди
1;Johannes Brahms|Brahms;Иоганнес Брамс|Брамс
2;Claude Debussy|Debussy;Клод Дебюсси|Дебюсси
2;Jean Sibelius|Sibelius;Ян Сибелиус|Сибелиус
2;Dmitri Shostakovich|Shostakovich;Дмитрий Шостакович|Шостакович
2;Maurice Ravel|Ravel;Морис Равель|Равель
3;Florence Price;Флоренс Прайс
3;Lili Boulanger;Лили Буланже
3;William Grant Still;Уильям Грант Стилл
3;Galina Ustvolskaya;Галина Уствольская|Уствольская
3;Einojuhani Rautavaara;Эйноюхани Раутаваара
3;Tōru Takemitsu;Тору Такэмицу
`, [[],["classical composer","classical music composer","композитор классической музыки"],["fictional","вымышлен"]]);

add("islands","Name an island.","Назовите остров.",`
0;Greenland;Гренландия
0;Madagascar;Мадагаскар
0;Iceland;Исландия
1;Sicily;Сицилия
1;Borneo|Kalimantan;Борнео|Калимантан
1;Honshu;Хонсю
1;Crete;Крит
2;Palawan;Палаван
2;Socotra;Сокотра
2;Svalbard Spitsbergen|Spitsbergen;Западный Шпицберген
2;Hainan;Хайнань
3;Bouvet Island;Буве|Остров Буве
3;Heard Island;Херд|Остров Херд
3;Tristan da Cunha;Тристан-да-Кунья
3;Ellesmere Island|Ellesmere;Элсмир
3;Novaya Zemlya Severny Island|Severny Island;Северный остров Новой Земли
`, [["Q23442"],["island","остров"],["archipelago","архипелаг","fictional","вымышлен","island country","островное государство"]]);

const MINE_DAY = Date.parse("2026-11-23") / 86400000;
const dailyOrder = ["weapons","lens","countries","elements","instruments","mountains","video-games","myth",
  "rivers","films","currency","dinosaurs","capitals","board-games","craters","languages",
  "novels","africa","spacecraft","architects","islands","metals","birds","programming","asia","composers","americas","europe","oceania"];
const questionIds = Object.keys(catalog);
function mineIds(seed, mode) {
  if (mode === "daily") {
    const start = ((seed - MINE_DAY) * 8) % dailyOrder.length;
    return Array.from({length:8}, (_,i) => dailyOrder[(start + i) % dailyOrder.length]);
  }
  let value = seed >>> 0;
  const ids = [...questionIds];
  for (let i=ids.length-1; i>0; i--) {
    value = (Math.imul(value,1664525) + 1013904223) >>> 0;
    const j = value % (i+1);
    [ids[i],ids[j]] = [ids[j],ids[i]];
  }
  return ids;
}
const prepared = new Map();
function mineQuestion(id) {
  if (prepared.has(id)) return prepared.get(id);
  const [en, ru, rows, lookup] = catalog[id];
  const aliases = new Map();
  const entries = rows.map(([tier,en,ru], index) => {
    const entry = { id:index, tier, en:en.split("|")[0], ru:ru.split("|")[0] || en.split("|")[0] };
    for (const name of [...en.split("|"), ...ru.split("|")]) if (name) aliases.set(answerKey(name), entry);
    return entry;
  });
  const question = {id,en,ru,entries,aliases,lookup};
  prepared.set(id,question);
  return question;
}
