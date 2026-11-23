"use strict";

function answerKey(text) {
  return text.normalize("NFKC").toLowerCase().replaceAll("c++","c plus plus").replaceAll("c#","c sharp").replaceAll("ё","е")
    .replace(/\p{Script=Latin}/gu, c => c.normalize("NFD").replace(/\p{M}/gu,""))
    .replace(/['’]/g,"").replace(/&/g," and ").replace(/[^\p{L}\p{N}]+/gu," ").trim();
}

const MINE_SCORES = [25,55,85,120,10];

function answerRows(source) {
  return source.trim().split("\n").map(row => {
    const [tier, en, ru] = row.trim().split(";");
    return [Number(tier), en, ru];
  });
}
function add(id, en, ru, source, lookup = null) {
  catalog[id] = [en,ru,answerRows(source),lookup];
}
function extend(id, source) {
  catalog[id][2].push(...answerRows(source));
}

add("weapons", "Name a specific fictional weapon.", "Назовите конкретное вымышленное оружие.", `
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

const firstDeck = Object.keys(catalog);

extend("weapons", `
4;Magic wand|Wand|Wizard wand|Sorcerer's wand;Волшебная палочка|Магическая палочка|Палочка волшебника|Палочка
4;Lightsaber|Laser sword|Light saber;Световой меч|Лазерный меч|Лайтсейбер
4;Magic sword|Enchanted sword;Волшебный меч|Магический меч|Зачарованный меч
4;Ray gun|Laser blaster|Energy blaster;Лучевая пушка|Лучемёт|Лазерный бластер|Бластер
1;Ebony Blade (Marvel)|Ebony Blade Marvel|Marvel's Ebony Blade;Эбонитовый клинок Marvel|Эбонитовый клинок Чёрного рыцаря
2;Phaser Type II|Type 2 Phaser|Type-II Phaser;Фазер второго типа|Фазер тип 2
2;Noisy Cricket;Шумный сверчок
2;Longclaw;Длинный коготь
2;Ice|Ned Stark's Ice;Лёд Неда Старка|Меч Лёд
2;Needle|Arya's Needle;Игла Арьи|Меч Игла
2;Oathkeeper;Верный клятве|Клятвохранитель
2;Widow's Wail;Плач вдовы|Вдовий плач
2;Windshear;Порыв ветра|Сдвиг ветра
3;The Sword of Omens|Sword of Omens;Меч Предзнаменований
3;Sakabatō|Sakabato|Kenshin's reverse-blade sword;Сакабато Химуры Кэнсина|Меч Кэнсина с обратным лезвием
3;Dragnipur;Драгнипур
3;Callandor;Калландор
3;Sword of Truth;Меч Истины
3;Dyrnwyn;Дирнвин
3;Caladbolg|Caladbolg of Fergus;Каладболг
3;Fragarach;Фрагарах
`);
extend("myth", `
0;Ares;Арес|Арей
0;Hermes;Гермес|Эрмий
0;Dionysus|Dionysos;Дионис|Дионисий
1;Demeter;Деметра
1;Persephone|Kore;Персефона|Кора
1;Eros;Эрос|Эрот
1;Hebe;Геба
1;Nike;Ника|Нике
1;Pan;Пан
2;Iris;Ирида|Ирис
2;Eos;Эос
2;Helios;Гелиос
2;Selene;Селена
2;Hypnos;Гипнос
2;Thanatos;Танатос|Фанатос
2;Tyche;Тюхе|Тихе
2;Heros Heracles|Heracles|Herakles|Hercules;Геракл|Геркулес
2;Morpheus;Морфей
2;Nyx;Никта|Никс|Нюкта
2;Gaia|Gaea|Ge;Гея|Гайя
2;Cronus|Kronos;Кронос|Крон
2;Rhea;Рея
2;Prometheus;Прометей
2;Atlas;Атлант|Атлас
2;Triton;Тритон
3;Erebus;Эреб|Эребос
3;Proteus;Протей
3;Nereus;Нерей
3;Amphitrite;Амфитрита
3;Achelous|Acheloos;Ахелой
3;Astraea|Astraia;Астрея
3;Asteria;Астерия
3;Eileithyia|Ilithyia;Илифия|Эйлейтия
3;Mnemosyne;Мнемосина
3;Hygieia|Hygeia;Гигиея|Гигия
3;Enyo;Энио|Эньо
3;Eris;Эрида|Эрис
3;Phobos;Фобос
3;Deimos;Деймос|Дэймос
3;Plutus|Ploutos;Плутос
3;Momos|Momus;Мом|Момус
`);
extend("lens", `
1;smartphone camera|phone camera;Камера телефона|Камера смартфона
2;dashcam|dash cam;Видеорегистратор
2;webcam|web camera;Веб-камера
2;security camera|CCTV camera;Камера видеонаблюдения
2;film enlarger|enlarger;Фотоувеличитель
3;optical comparator;Оптический компаратор
3;autorefractor;Авторефрактометр
3;slit lamp;Щелевая лампа
3;light field camera;Камера светового поля
3;Schmidt corrector plate;Коррекционная пластина Шмидта
`);
add("herbs","Name an herb used in cooking.","Назовите траву, которую используют в кулинарии.",`
0;basil;базилик
0;dill;укроп
0;parsley;петрушка
0;mint;мята
1;thyme;тимьян|чабрец
1;rosemary;розмарин
1;oregano|wild marjoram;орегано|душица
1;cilantro|coriander leaves;кинза|листья кориандра
1;sage;шалфей
2;tarragon;эстрагон|тархун
2;sorrel;щавель
2;marjoram|sweet marjoram;майоран
2;chives;шнитт-лук|лук-резанец
3;lovage;любисток
3;chervil;кервель
3;culantro|long coriander;кулантро|эрингиум пахучий
3;shiso|perilla;сисо|шисо|перилла
3;epazote;эпасот|эпазоте
3;summer savory|savory;чабер|садовый чабер
`);
add("desserts","Name a dessert served cold or frozen.","Назовите десерт, который подают охлаждённым или замороженным.",`
0;ice cream;мороженое
0;sorbet;сорбет
0;milkshake;молочный коктейль
1;gelato;джелато
1;tiramisu;тирамису
1;panna cotta;панна-котта|паннакотта
1;frozen yogurt|froyo;замороженный йогурт
2;granita;гранита
2;semifreddo;семифредо
2;lemon posset;лимонный поссет
2;chocolate mousse;шоколадный мусс
2;trifle;трайфл
3;kulfi;кулфи
3;falooda|faluda;фалуда
3;halo-halo;хало-хало|халохало
3;bingsu|patbingsu;бинсу|патбинсу
3;silvanas;сильванас
3;spaghettieis;мороженое спагетти|шпагетти-айс
3;kakigori;какигори
`);
add("painting","Name a painting held in a public museum collection.","Назовите картину из коллекции общедоступного музея.",`
0;Mona Lisa|La Gioconda;Мона Лиза|Джоконда
0;The Starry Night|Starry Night;Звёздная ночь
1;The Birth of Venus;Рождение Венеры
1;The Night Watch;Ночной дозор
1;Guernica;Герника
1;The Persistence of Memory;Постоянство памяти
2;The Arnolfini Portrait;Портрет четы Арнольфини
2;The Garden of Earthly Delights;Сад земных наслаждений
2;Wanderer above the Sea of Fog;Странник над морем тумана
2;The Raft of the Medusa;Плот Медузы
3;The Death of Marat;Смерть Марата
3;The Battle of San Romano;Битва при Сан-Романо
3;The Ambassadors|Holbein's The Ambassadors;Послы Гольбейна|Послы
3;The Hireling Shepherd;Наёмный пастух
3;The Barge Haulers on the Volga|Barge Haulers on the Volga;Бурлаки на Волге
3;The Oxbow;Старица|Излучина реки Коннектикут
`);
add("observatory","Name an observatory used to study space.","Назовите обсерваторию, в которой изучают или изучали космос.",`
0;Greenwich Observatory|Royal Observatory Greenwich;Гринвичская обсерватория
0;Arecibo Observatory|Arecibo;Аресибо|Обсерватория Аресибо
1;Palomar Observatory;Паломарская обсерватория
1;Mauna Kea Observatories;Обсерватории Мауна-Кеа
1;Pulkovo Observatory;Пулковская обсерватория|Пулково
2;European Southern Observatory Paranal|Paranal Observatory;Паранальская обсерватория|Обсерватория Параналь
2;Kitt Peak National Observatory;Национальная обсерватория Китт-Пик|Китт-Пик
2;La Silla Observatory;Обсерватория Ла-Силья|Ла-Силья
2;Roque de los Muchachos Observatory;Обсерватория Роке-де-лос-Мучачос
3;Byurakan Observatory;Бюраканская обсерватория
3;Lick Observatory;Ликская обсерватория|Обсерватория Лика
3;Siding Spring Observatory;Обсерватория Сайдинг-Спринг
3;Teide Observatory;Обсерватория Тейде
3;Crimean Astrophysical Observatory;Крымская астрофизическая обсерватория|КрАО
`, [["Q62832"],["astronomical observatory","radio observatory","астрономическая обсерватория","радиообсерватория"],["fictional","вымышлен"]]);
add("fictional-places","Name a named place from a fictional world.","Назовите место из вымышленного мира, у которого есть собственное имя.",`
0;Hogwarts;Хогвартс
0;Gotham City|Gotham;Готэм|Готэм-сити
0;Mordor;Мордор
1;Tatooine;Татуин
1;Winterfell;Винтерфелл
1;Narnia;Нарния
1;Neverland;Нетландия|Неверленд
2;Rivendell|Imladris;Ривенделл|Имладрис
2;Hyrule;Хайрул
2;Rapture;Восторг|Рапчур
2;Vice City;Вайс-Сити
2;Shire;Шир
3;Ankh-Morpork;Анк-Морпорк
3;Cittàgazze|Cittagazze;Читтагацце
3;Gormenghast;Горменгаст
3;Gondolin;Гондолин
3;Hallownest;Халлоунест
3;Revachol;Ревашоль
3;Arrakeen;Арракин
`, [[],["fictional city","fictional country","fictional planet","fictional location","вымышленный город","вымышленная страна","вымышленная планета","вымышленная локация"],["list of","список"]]);
add("gemstones","Name a stone used as a gemstone.","Назовите камень, который используют как ювелирную вставку.",`
0;diamond;алмаз|бриллиант
0;ruby;рубин
0;emerald;изумруд
0;sapphire;сапфир
1;amethyst;аметист
1;topaz;топаз
1;opal;опал
1;garnet;гранат
2;peridot|chrysolite;перидот|хризолит
2;spinel;шпинель
2;aquamarine;аквамарин
2;moonstone|adularia;лунный камень|адуляр
2;malachite;малахит
2;lapis lazuli;лазурит
3;tanzanite;танзанит
3;benitoite;бенитоит
3;painite;пейнит
3;serendibite;серендибит
3;tsavorite;цаворит|тсаворит
3;alexandrite;александрит
`);
add("drinkware","Name an object people drink beverages from.","Назовите предмет, из которого пьют напитки.",`
4;glass;стакан
4;cup;чашка
0;mug;кружка
0;bottle;бутылка
1;wine glass;винный бокал
1;shot glass;рюмка|шот
1;teacup;чайная чашка
1;thermos flask|thermos;термос
2;goblet;кубок
2;champagne flute|flute glass;бокал-флейта|бокал для шампанского
2;highball glass;хайбол|стакан хайбол
2;martini glass;бокал для мартини|мартинка
2;beer stein|stein;пивная кружка с крышкой
3;porron|porrón;поррон
3;tumbler;тумблер|стакан тумблер
3;quaich;куэйх|квейх
3;coupe glass|champagne coupe;креманка для шампанского|бокал-купе
`);
add("water-machines","Name a device used to move or lift water.","Назовите устройство, с помощью которого перемещают или поднимают воду.",`
4;pump;насос
0;water pump;водяной насос|водный насос
0;bucket;ведро
0;hose|garden hose;шланг|садовый шланг
1;siphon;сифон
1;centrifugal pump;центробежный насос
1;hand pump;ручной насос|помпа
1;water wheel;водяное колесо
2;Archimedes' screw|archimedes screw|screw pump;Архимедов винт|Винт Архимеда
2;peristaltic pump;перистальтический насос
2;diaphragm pump;мембранный насос
3;hydraulic ram|ram pump;гидравлический таран|гидротаран
3;airlift pump;эрлифт|воздушный подъёмник
3;noria;нория
3;chain pump;цепной насос
3;shaduf|shadoof;шадуф
3;pulser pump;пульсационный насос
`);
add("card-games","Name a game that people play with a standard deck of cards.","Назовите игру, в которую играют стандартной колодой карт.",`
0;poker;покер
0;blackjack|twenty-one;блэкджек|двадцать одно|21
0;solitaire|patience;пасьянс|солитер
1;bridge|contract bridge;бридж
1;hearts;червы
1;durak;дурак
1;go fish;го фиш|рыбалка
2;spades;пики
2;rummy;рамми
2;canasta;канаста
2;euchre;юкер
2;preferans|preference;преферанс
2;cribbage;криббедж
3;piquet;пикет
3;whist;вист
3;bezique;безик
3;oh hell;ох-хелл
3;seep|sweep;сип
3;President|Asshole;Президент
`);
add("shipwrecks","Name a ship known to have sunk.","Назовите корабль или судно, которое затонуло.",`
0;Titanic|RMS Titanic;Титаник
0;Lusitania|RMS Lusitania;Лузитания
1;Bismarck;Бисмарк
1;Yamato;Ямато
1;Britannic|HMHS Britannic;Британник
2;Vasa;Васа|Ваза
2;Mary Rose;Мэри Роуз
2;Endurance;Эндьюранс|Эндюранс
2;Edmund Fitzgerald|SS Edmund Fitzgerald;Эдмунд Фицджеральд
2;Wilhelm Gustloff;Вильгельм Густлофф
3;Batavia;Батавия
3;HMS Erebus;Эребус
3;HMS Terror;Террор
3;Andrea Doria;Андреа Дориа
3;Kronan;Крунан
3;SS Central America;Сентрал Америка
3;MV Doña Paz|Dona Paz;Донья Пас
`);

const MINE_DAY = Date.parse("2026-11-23") / 86400000;
const dailyOrder = ["weapons","lens","countries","elements","instruments","mountains","video-games","myth",
  "rivers","films","currency","dinosaurs","capitals","board-games","craters","languages",
  "novels","africa","spacecraft","architects","islands","metals","birds","programming","asia","composers","americas","europe","oceania"];
// Keep a released deck frozen so an old room code always draws the same questions.
const secondDeck = Object.keys(catalog);
add("long-films","Name a film longer than 2 hours 30 minutes.","Назовите фильм длительностью более 2 часов 30 минут.",`
0;The Lord of the Rings: The Fellowship of the Ring|The Fellowship of the Ring|Fellowship of the Ring|lotr fellowship;Властелин колец: Братство кольца|Братство кольца
0;The Lord of the Rings: The Two Towers|The Two Towers|Two Towers|lotr two towers;Властелин колец: Две крепости|Две крепости
0;The Lord of the Rings: The Return of the King|The Return of the King|Return of the King|lotr return of the king;Властелин колец: Возвращение короля|Возвращение короля
0;Titanic;Титаник
0;Interstellar;Интерстеллар
0;Avatar: The Way of Water|Avatar the way of water|Avatar 2;Аватар: Путь воды|Аватар 2
1;The Godfather|Godfather;Крёстный отец
1;Oppenheimer;Оппенгеймер
1;Dune: Part Two|Dune Part Two|Dune 2;Дюна: Часть вторая|Дюна 2
1;Avengers: Endgame|Endgame;Мстители: Финал|Мстители Финал
1;The Dark Knight Rises;Тёмный рыцарь: Возрождение легенды
1;Schindler's List;Список Шиндлера
1;The Green Mile|Green Mile;Зелёная миля
1;Saving Private Ryan;Спасти рядового Райана
1;The Wolf of Wall Street|Wolf of Wall Street;Волк с Уолл-стрит
1;Gladiator;Гладиатор
1;The Batman;Бэтмен 2022|Бэтмен
2;The Godfather Part II|Godfather Part 2|The Godfather 2;Крёстный отец 2
2;Lawrence of Arabia;Лоуренс Аравийский
2;Gone with the Wind;Унесённые ветром
2;Doctor Zhivago|Dr Zhivago;Доктор Живаго
2;Ben-Hur|Ben Hur;Бен-Гур
2;Barry Lyndon;Барри Линдон
2;Amadeus;Амадей
2;The Irishman|Irishman;Ирландец
2;Killers of the Flower Moon;Убийцы цветочной луны
2;Once Upon a Time in America;Однажды в Америке
2;Casino;Казино
2;Heat;Схватка
2;Magnolia;Магнолия
2;The Deer Hunter;Охотник на оленей
2;Seven Samurai;Семь самураев
3;Stalker;Сталкер
3;Fanny and Alexander|Fanny & Alexander;Фанни и Александр
3;A Brighter Summer Day;Яркий летний день
3;The Human Condition I: No Greater Love|No Greater Love;Удел человеческий: Нет большей любви
3;Jeanne Dielman, 23 quai du Commerce, 1080 Bruxelles|Jeanne Dielman;Жанна Дильман
3;The Best of Youth;Лучшие из молодых
3;Satantango|Sátántangó;Сатанинское танго
3;War and Peace|War and Peace 1967;Война и мир|Война и мир Бондарчука
3;The Travelling Players|The Traveling Players;Комедианты
3;Happy Hour|Happy Hour 2015;Счастливый час|Счастливый час Хамагути
`);

const mineDecks = {1:firstDeck, 2:secondDeck, 3:Object.keys(catalog)};
const MINE_DECK_VERSION = 3;
const mineCalendars = [
  {from:MINE_DAY, order:dailyOrder},
  {from:Date.parse("2026-11-24") / 86400000, order:[
    "herbs","weapons","observatory","elements","fictional-places","drinkware","mountains","myth",
    "shipwrecks","desserts","countries","programming","painting","lens","water-machines","card-games",
    "gemstones","africa","films","instruments","craters","video-games","currency","rivers",
    "novels","americas","spacecraft","languages","birds","capitals","metals","dinosaurs",
    "europe","architects","board-games","islands","asia","composers","oceania"
  ]},
  {from:Date.parse("2026-11-25") / 86400000, order:["long-films",...secondDeck.filter(id=>id!=="films"),"films"]}
];
function mineIds(seed, mode, version = MINE_DECK_VERSION) {
  if (mode === "daily") {
    const {from,order} = mineCalendars.findLast(period => seed >= period.from);
    const start = ((seed - from) * 8) % order.length;
    return Array.from({length:8}, (_,i) => order[(start + i) % order.length]);
  }
  let value = seed >>> 0;
  const ids = [...mineDecks[version]];
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
add("trees","Name a tree that grows in a temperate climate.","Назовите дерево, которое растёт в умеренном климате.",`
0;oak;дуб
0;birch;берёза
0;pine;сосна
0;maple;клён
1;spruce;ель
1;ash;ясень
1;willow;ива
1;elm;вяз
1;beech;бук
1;larch;лиственница
2;alder;ольха
2;hornbeam;граб
2;rowan|mountain ash;рябина
2;silver birch;берёза повислая|бородавчатая берёза
2;European yew|common yew;тис ягодный|тис
3;dawn redwood|metasequoia;метасеквойя|метасеквойя глиптостробовидная
3;hophornbeam|hop hornbeam;хмелеграб
3;Kentucky coffeetree;бундук двудомный|кентуккийское кофейное дерево
3;Japanese katsura|katsura tree;багрянник японский
`);
add("breads","Name a regional type of bread.","Назовите разновидность хлеба, характерную для какой-либо страны или региона.",`
0;baguette|French baguette;багет
0;lavash;лаваш
0;pita;пита
1;focaccia;фокачча
1;ciabatta;чиабатта
1;naan;наан
1;challah;хала
2;injera;ынджера|инджера
2;khobz;хобз
2;pumpernickel;пумперникель
2;pandebono|pan de bono;пан-де-боно|пандебоно
2;matzo|matzah|matsa;маца
3;pane carasau;пане каразау|хлеб каразау
3;lagana;лагана
3;lahoh|lahooh;лахох
3;damper|Australian damper;дампер
3;georgian shotis puri|shotis puri;шотис пури|шоти
3;broa de milho|broa;броа де милью|португальский кукурузный хлеб
`);
add("constellations","Name a constellation recognized by the International Astronomical Union.","Назовите созвездие, признанное Международным астрономическим союзом.",`
0;Orion;Орион
0;Ursa Major|Great Bear;Большая Медведица
0;Ursa Minor|Little Bear;Малая Медведица
1;Cassiopeia;Кассиопея
1;Andromeda;Андромеда
1;Scorpius|Scorpio;Скорпион
1;Cygnus|Swan;Лебедь
1;Crux|Southern Cross;Южный Крест
2;Aquila|Eagle;Орёл
2;Lyra;Лира
2;Delphinus|Dolphin;Дельфин
2;Pegasus;Пегас
2;Hydra;Гидра
3;Reticulum|Reticle;Сетка
3;Horologium|Clock;Часы
3;Antlia|Air Pump;Насос
3;Caelum;Резец
3;Mensa|Table Mountain;Столовая Гора
3;Microscopium|Microscope;Микроскоп
3;Circinus|Compass;Циркуль
`, [["Q8928"],["constellation","созвездие"],["former","obsolete","устаревш","упраздн"]]);
add("animation","Name an animated feature film.","Назовите полнометражный анимационный фильм.",`
0;Shrek;Шрек
0;Toy Story;История игрушек
0;The Lion King|Lion King;Король Лев
0;Frozen;Холодное сердце
1;Spirited Away;Унесённые призраками
1;Finding Nemo;В поисках Немо
1;Ratatouille;Рататуй
1;Princess Mononoke;Принцесса Мононоке
1;Wall-E|WALL E;ВАЛЛ-И|ВАЛЛИ
2;The Iron Giant|Iron Giant;Стальной гигант
2;Coraline;Коралина в Стране Кошмаров|Коралина
2;Fantastic Mr. Fox;Бесподобный мистер Фокс
2;Song of the Sea;Песнь моря
2;Klaus;Клаус
3;Persepolis;Персеполис
3;The Red Turtle|Red Turtle;Красная черепаха
3;The King and the Mockingbird|Le Roi et l Oiseau;Король и птица
3;I Lost My Body;Я потерял своё тело
3;Wolfwalkers;Легенда о волках|Волчьи всадники
3;The Triplets of Belleville|Triplets of Belleville;Трио из Бельвилля
`, [["Q202866"],["animated feature film","feature length animated film","полнометражный анимационный фильм"],["short film","series","короткометраж","сериал"]]);
const REPLAY_DAY = Date.parse("2026-11-23") / 86400000;
const latestEditionRevision = day => day === REPLAY_DAY ? 2 : 1;
const currentDailyQuestions = ["long-films","trees","constellations","fictional-places","breads","animation","water-machines","herbs"];
function dailyIds(day,revision=1) {
  return revision===2 && day===REPLAY_DAY ? currentDailyQuestions : mineIds(day,"daily");
}
