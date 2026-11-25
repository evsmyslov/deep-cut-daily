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
0;The Hobbit|Hobbit;Хоббит, или Туда и обратно|Хоббит
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

add("video-games","Name a specific video game title.","Назовите конкретную видеоигру.",`
0;Minecraft;Minecraft|Майнкрафт
0;Tetris;Тетрис
0;Fortnite;Fortnite|Фортнайт
1;Portal;Portal|Портал
1;Stardew Valley;Stardew Valley|Стардью Вэлли|Долина Стардью
1;Hollow Knight;Hollow Knight|Холлоу Найт
1;Grand Theft Auto V|GTA V|GTA 5;Grand Theft Auto V|ГТА 5
1;The Witcher 3: Wild Hunt|Witcher 3;Ведьмак 3: Дикая Охота|Ведьмак 3
2;Disco Elysium;Disco Elysium|Диско Элизиум
2;Slay the Spire;Slay the Spire|Убей шпиль
2;Celeste;Celeste|Селеста
2;Return of the Obra Dinn;Return of the Obra Dinn|Возвращение Обра Динн
3;Rain World;Rain World|Мир дождя
3;Hypnospace Outlaw;Hypnospace Outlaw|Хипноспейс Аутлоу
3;Chants of Sennaar;Chants of Sennaar|Песни Сеннаара
3;The Case of the Golden Idol;The Case of the Golden Idol|Дело о золотом идоле
3;A Short Hike;A Short Hike|Короткий поход
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
const MINE_DECK_VERSION = 8;
const mineCalendars = [{from:MINE_DAY,order:dailyOrder}];
function mineIds(seed, mode, version = MINE_DECK_VERSION) {
  if (mode === "daily") {
    const {from,order} = mineCalendars.findLast(period => seed >= period.from);
    const start = ((seed - from) * 8) % order.length;
    return Array.from({length:8}, (_,i) => order[(start + i) % order.length]);
  }
  if (version===5) return mixedBank(seed);
  if (version===6) return interleaveQuestionGroups(everydayGroups,seed);
  if (version===7) return interleaveQuestionGroups(themedGroups,seed);
  if (version===8) return interleaveQuestionGroups(rotationGroups,seed);
  return shuffleMine(mineDecks[version],seed);
}
function shuffleMine(deck,seed) {
  let value = seed >>> 0;
  const ids = [...deck];
  for (let i=ids.length-1; i>0; i--) {
    value = (Math.imul(value,1664525) + 1013904223) >>> 0;
    const j = value % (i+1);
    [ids[i],ids[j]] = [ids[j],ids[i]];
  }
  return ids;
}
const prepared = new Map();
function hasMineQuestion(id) {
  return typeof id==="string" && (Object.hasOwn(catalog,id) || generatedQuestions.has(id));
}
function mineQuestion(id) {
  if (prepared.has(id)) return prepared.get(id);
  const [en, ru, rows, lookup] = catalog[id] ?? generatedModel(id);
  const extra = Object.hasOwn(mineAnswerExpansions,id) ? mineAnswerExpansions[id] : null;
  const aliases = new Map();
  const answerById = new Map();
  const entries = [];
  const inactive = new Set(extra?.inactive);
  const inactiveKeys = new Set();
  const best=rows.reduce((score,row)=>Math.max(score,MINE_SCORES[row[0]]),0);
  const legacyHighest=rows.findLastIndex(row=>MINE_SCORES[row[0]]===best);
  const activeBest=rows.reduce((score,row,index)=>inactive.has(index) ? score : Math.max(score,MINE_SCORES[row[0]]),0);
  const highest=rows.findLastIndex((row,index)=>!inactive.has(index)&&MINE_SCORES[row[0]]===activeBest);
  const register = ([tier,en,ru,entryId], index) => {
    const rank=index===(inactive.has(index) ? legacyHighest : highest) ? 3 : tier===3 ? 2 : tier;
    const [english,...enAliases] = en.split("|");
    const [russian,...ruAliases] = ru.split("|");
    const entry = {id:entryId??index,tier:rank,en:english,ru:extra?.ru?.[index] ?? (russian || english)};
    answerById.set(entry.id,entry);
    const names=[english,...enAliases,russian,...ruAliases,entry.ru];
    if (inactive.has(index)) {
      for (const name of names) if (name) inactiveKeys.add(answerKey(name));
    } else {
      entries.push(entry);
      for (const name of names) if (name) aliases.set(answerKey(name),entry);
    }
  };
  rows.forEach(register);
  extra?.rows?.forEach((row,index)=>register(row,rows.length+index));
  if (extra) {
    const registerAlias = (index,name) => {
      const key=answerKey(name);
      if (!aliases.has(key)) aliases.set(key,answerById.get(index));
    };
    for (const [index,name] of Object.entries(extra.ru ?? {})) {
      if (!inactive.has(Number(index))) registerAlias(Number(index),name);
    }
    for (const [index,names] of Object.entries(extra.aliases ?? {})) {
      if (!inactive.has(Number(index))) names.forEach(name=>registerAlias(Number(index),name));
    }
  }
  const question = {id,en,ru,entries,answerById,aliases,inactiveKeys,lookup};
  if (prepared.size>=128) prepared.delete(prepared.keys().next().value);
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
add("constellations","Name a constellation.","Назовите созвездие.",`
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

// Localized titles from PlayStation, EA and Netflix. Common spellings stay searchable.
// https://www.playstation.com/ru-ua/the-last-of-us/
// https://www.playstation.com/ru-ua/games/horizon-forbidden-west/
// https://www.ea.com/ru/games/library/rpg/sci-fi-rpg
// https://www.netflix.com/by-ru/title/81399614
extend("video-games",`
1;The Last of Us Part I|The Last of Us Part 1;Одни из нас: Часть I|Одни из нас: Часть 1
1;The Last of Us Part II|The Last of Us 2|TLOU2;Одни из нас: Часть II|Одни из нас: Часть 2
1;Uncharted 4: A Thief's End|Uncharted 4;Uncharted 4: Путь вора|Анчартед 4|Путь вора
2;Uncharted: The Lost Legacy|The Lost Legacy;Uncharted: Утерянное наследие|Утерянное наследие
2;Horizon Forbidden West;Horizon Запретный Запад|Горизонт Запретный Запад|Хорайзон Запретный Запад
2;Star Wars Jedi: Fallen Order|Jedi Fallen Order;Звёздные войны Джедаи: Павший Орден|Джедаи Павший Орден
2;Mass Effect 2|ME2;Mass Effect 2|Масс Эффект 2
`);
extend("animation",`
2;The Mitchells vs. the Machines|The Mitchells versus the Machines;Митчеллы против машин
2;Guillermo del Toro's Pinocchio|Pinocchio 2022;Пиноккио Гильермо дель Торо
`);
add("fictional-robots","Name a fictional robot with a name of its own.","Назовите вымышленного робота с собственным именем.",`
0;R2-D2|R2D2;R2-D2|Арту-Диту
0;WALL-E|WALLE;ВАЛЛ-И|ВАЛЛИ
0;Optimus Prime;Оптимус Прайм
1;C-3PO|C3PO;C-3PO|Си-Трипио
1;Bender|Bender Bending Rodriguez;Бендер|Бендер Родригес
1;Baymax;Бэймакс|Беймакс
1;BB-8|BB8;BB-8|Би-Би-8
1;EVE|Extraterrestrial Vegetation Evaluator;ЕВА
2;Johnny 5|Johnny Five|Number 5;Джонни 5|Номер 5
2;Astro Boy|Atom;Астробой|Атом
2;Alpha 5|Alpha Five;Альфа-5
2;Marvin the Paranoid Android|Marvin;Марвин|Параноидальный андроид Марвин
2;TARS;TARS|ТАРС
2;The Iron Giant|Iron Giant;Стальной гигант
3;R. Daneel Olivaw|Daneel Olivaw;Р. Дэниел Оливо|Дэниел Оливо|Дэниел Оливоу
3;Tik-Tok|Tik Tok of Oz;Тик-Ток из страны Оз|Тик-Ток
3;K-2SO|K2SO;K-2SO|Кей-Туэсо
3;Crow T. Robot|Crow T Robot;Кроу Т. Робот
3;Tom Servo;Том Серво
`);
add("city-films","Name a film whose English title contains the name of a real city.","Назовите фильм, в английском названии которого есть название реального города.",`
0;Casablanca;Касабланка
0;Chicago;Чикаго
0;Midnight in Paris;Полночь в Париже
1;Philadelphia;Филадельфия
1;Gangs of New York;Банды Нью-Йорка
1;Last Tango in Paris;Последнее танго в Париже
1;Escape from New York;Побег из Нью-Йорка
1;Train to Busan;Поезд в Пусан
2;Tokyo Story;Токийская повесть|Токийская история
2;Paris, Texas|Paris Texas;Париж, Техас
2;Munich;Мюнхен
2;In Bruges;Залечь на дно в Брюгге
2;Vicky Cristina Barcelona;Вики Кристина Барселона
2;Cairo Station;Каирский вокзал
3;Dublin Oldschool;Дублин Олдскул
3;Rome, Open City|Rome Open City;Рим — открытый город
3;My Winnipeg;Мой Виннипег
3;Lisbon Story;Лиссабонская история
3;Oslo, August 31st|Oslo August 31st;Осло, 31 августа
3;The Last Black Man in San Francisco;Последний чёрный в Сан-Франциско
3;The Battle of Algiers|Battle of Algiers;Битва за Алжир
`);
add("non-electric-clocks","Name a device that measures time without electricity.","Назовите устройство, которое измеряет время без электричества.",`
0;Sundial;Солнечные часы
0;Hourglass|Sandglass;Песочные часы
0;Mechanical wristwatch|Wind-up wristwatch;Механические наручные часы
1;Pendulum clock;Маятниковые часы
1;Water clock|Clepsydra;Водяные часы|Клепсидра
1;Mechanical pocket watch|Wind-up pocket watch;Механические карманные часы
1;Cuckoo clock;Часы с кукушкой
1;Self-winding watch|Automatic watch;Часы с автоподзаводом
2;Candle clock;Свечные часы
2;Incense clock;Благовонные часы|Ароматические часы
2;Marine chronometer;Морской хронометр
2;Mechanical tower clock;Механические башенные часы
2;Nocturnal|Nocturlabe;Ноктурлабиум|Ноктурнал
3;Elephant clock|Al-Jazari's elephant clock;Слоновые часы|Часы-слон аль-Джазари
3;Congreve rolling ball clock|Congreve clock;Шариковые часы Конгрива|Часы Конгрива
3;Candle alarm clock;Свечной будильник
3;Oil-lamp clock|Oil lamp clock;Масляные часы|Часы с масляной лампой
`);
add("numbered-albums","Name a music album with a digit in its title.","Назовите музыкальный альбом, в названии которого есть цифра.",`
0;1989|1989 Taylor Swift;1989
0;21|21 Adele;21
0;25|25 Adele;25
1;24K Magic|24K Magic Bruno Mars;24K Magic
1;30|30 Adele;30
1;4|4 Beyoncé;4
1;808s & Heartbreak|808s and Heartbreak;808s & Heartbreak
1;1984 Van Halen|1984;1984
2;2112|2112 Rush;2112
2;1999|1999 Prince;1999
2;3 Feet High and Rising;3 Feet High and Rising
2;5150|5150 Van Halen;5150
2;2001|2001 Dr Dre;2001
2;The 20/20 Experience;The 20/20 Experience
3;69 Love Songs;69 Love Songs
3;13 Songs|13 Songs Fugazi;13 Songs
3;154|154 Wire;154
3;Talking Heads: 77|77 Talking Heads;Talking Heads: 77
3;98.12.28 Otokotachi no Wakare;98.12.28 男達の別れ
`);
mineDecks[4]=Object.keys(catalog);

add("fictional-vehicles","Name a vehicle with its own name in a work of fiction.","Назовите транспорт с собственным именем из вымышленного произведения.",`
4;Millennium Falcon;Тысячелетний сокол|Сокол тысячелетия
0;Batmobile;Бэтмобиль
0;TARDIS;ТАРДИС
0;Black Pearl;Чёрная жемчужина
0;Hogwarts Express;Хогвартс-экспресс
1;Nautilus|Captain Nemo's Nautilus;Наутилус капитана Немо|Наутилус
1;USS Enterprise|Enterprise NCC-1701;Энтерпрайз
1;Flying Dutchman|Flying Dutchman from Pirates of the Caribbean;Летучий голландец
1;KITT|Knight Industries Two Thousand;КИТТ
1;Chitty Chitty Bang Bang;Пиф-паф ой-ой-ой
1;Lightning McQueen;Молния Маккуин
2;Serenity|Serenity from Firefly;Серенити|Безмятежность
2;Old Bessie|Planet Express Ship;Старая Бесси|Корабль Межпланетного экспресса
2;The Magic School Bus|Magic School Bus;Волшебный школьный автобус
2;Slave I|Slave One|Firespray gunship of Boba Fett;Раб I|Раб-1
2;Rocinante|Rocinante from The Expanse;Росинант
2;Normandy SR-2|Normandy SR2|Normandy;Нормандия SR-2|Нормандия
3;Samus's Gunship|Samus Gunship;Корабль Самус
3;Swordfish II|Swordfish 2;Меч-рыба II|Суордфиш II
3;Sleeper Service|GSV Sleeper Service;Спальная служба|Служба сна
`);
add("fermented-foods","Name a food made using fermentation.","Назовите продукт, который готовят с помощью ферментации.",`
4;yogurt|yoghurt;йогурт
0;kimchi;кимчи
0;sauerkraut;квашеная капуста
0;kefir;кефир
1;sourdough bread|sourdough;хлеб на закваске|хлеб на кислой закваске
1;miso;мисо
1;tempeh|tempe;темпе
1;fermented pickles|lacto-fermented cucumbers;квашеные огурцы|молочнокислые огурцы
1;soy sauce;соевый соус
1;Roquefort;рокфор
2;natto;натто
2;fish sauce|nam pla|nuoc mam;рыбный соус|нам пла|ныок мам
2;injera;ынджера|инджера
2;idli;идли
2;dosa;доса
2;dahi|dadhi;дахи
2;ryazhenka;ряженка
2;matsoni|matsun;мацони|мацун
3;fermented poi|sour poi;кислый пои|ферментированный пои
3;surströmming|surstromming;сюрстрёмминг
3;douchi;доучи|ферментированные чёрные соевые бобы
3;hákarl|hakarl;хаукарль|хакарл
`);
add("writing-systems","Name a writing system used for a living spoken language.","Назовите систему письма, которой записывают живой разговорный язык.",`
4;Latin script|Latin alphabet;латиница|латинский алфавит
4;Cyrillic|Cyrillic alphabet;кириллица
0;Arabic script|Arabic alphabet;арабское письмо|арабский алфавит
0;Chinese characters|Hanzi;китайские иероглифы|ханьцзы
0;Greek alphabet;греческий алфавит
0;Hangul|Hangeul;хангыль
0;Hebrew alphabet;еврейский алфавит|древнееврейское письмо
1;Devanagari;деванагари
1;Georgian alphabet|Mkhedruli;грузинское письмо|мхедрули
1;Armenian alphabet;армянский алфавит
1;Thai script|Thai alphabet;тайское письмо|тайский алфавит
1;Katakana;катакана
1;Hiragana;хирагана
2;Tibetan script;тибетское письмо
2;Khmer script;кхмерское письмо
2;Ge'ez script|Ethiopic script;эфиопское письмо|письмо геэз
2;Bengali script|Bangla script;бенгальское письмо
2;Cherokee syllabary;слоговое письмо чероки
2;N'Ko|NKo;нко
2;Tifinagh|Neo-Tifinagh;тифинаг
3;Osmanya|Osmanya alphabet;османья
3;Nyiakeng Puachue Hmong;ньякенг пуачуэ хмонг
3;Ol Chiki|Ol Cemet;ол-чики
`);
add("plucked-strings","Name an instrument typically played by plucking its strings.","Назовите инструмент, на котором обычно играют щипком по струнам.",`
4;guitar;гитара
0;harp;арфа
0;ukulele;укулеле
0;balalaika;балалайка
0;banjo;банджо
0;mandolin;мандолина
1;lute;лютня
1;sitar;ситар
1;harpsichord;клавесин
1;koto;кото
1;oud;уд
1;gusli;гусли
1;domra;домра
2;theorbo;теорба
2;shamisen|samisen;сямисэн
2;pipa;пипа
2;guzheng|zheng;гучжэн
2;kora;кора
2;charango;чаранго
2;bandura;бандура
3;setar;сетар
3;baglama|saz;баглама|саз
3;qinqin;циньцинь
`);
add("architectural-materials","Name a traditional material used for roofing buildings.","Назовите традиционный материал, которым покрывают крыши зданий.",`
4;clay tiles|roof tiles;глиняная черепица|черепица
0;slate|natural slate;кровельный сланец|сланец
0;straw thatch|straw;солома|соломенная кровля
0;wood shingles|shingles;деревянный гонт|гонт
1;reed thatch|reed;тростник|камыш
1;copper sheets|copper;медь|медные листы
1;corrugated iron|corrugated metal;гофрированное железо|профнастил
1;concrete roof tiles;бетонная черепица
1;terracotta;терракота
2;palm leaves|palm fronds;пальмовые листья
2;birch bark;береста
2;bamboo;бамбук
2;lead sheets|lead roofing;свинцовые листы|свинцовая кровля
2;zinc sheets|zinc roofing;цинковые листы|цинковая кровля
2;sod|turf roofing;дёрн|дерновая кровля
3;limestone roof slabs|limestone roofing;известняковые плиты|известняковая кровля
3;gneiss roofing slabs|gneiss slabs;кровельные плиты из гнейса
3;heather thatch;вересковая кровля|вереск
`);

const generatedQuestions=new Map(QUESTION_BANK.questions.map(([id,...record])=>[id,record]));
const bankGroups=new Map([["handwritten",Object.keys(catalog)]]);
for (const [id,[group]] of generatedQuestions) {
  if (!bankGroups.has(group)) bankGroups.set(group,[]);
  bankGroups.get(group).push(id);
}
mineDecks[5]=[...Object.keys(catalog),...generatedQuestions.keys()];
function mixedBank(seed) {
  return interleaveQuestionGroups([...bankGroups.values()],seed);
}
function interleaveQuestionGroups(questionGroups,seed) {
  const groups=shuffleMine(questionGroups,seed).map((ids,index)=>shuffleMine(ids,(seed+index*11369)>>>0));
  const deck=[];
  const longest=Math.max(...groups.map(group=>group.length));
  for (let index=0;index<longest;index++) {
    for (const group of groups) if (group[index]) deck.push(group[index]);
  }
  return deck;
}
function generatedModel(id) {
  const [group,pool,en,ru,answers]=generatedQuestions.get(id);
  const size=answers.length;
  const rows=answers.map((reference,index)=>{
    const [itemId,english,russian]=QUESTION_BANK.pools[pool][reference];
    const position=index/size;
    const tier=index===size-1 ? 3 : position<.18 ? 4 : position<.5 ? 0 : position<.82 ? 1 : 2;
    return [tier,english,russian,itemId];
  });
  return [en,ru,rows,bankLookup(group,id)];
}
function bankLookup(group,id) {
  const entity=id.match(/-q(\d+)$/)?.[1];
  const relation={
    "film-actors":["P161",["Q11424"]],
    "film-directors":["P57",["Q11424"]],
    "music-albums":["P175",["Q482994","Q208569"]],
    "novels-by-author":["P50",["Q8261"]],
    "named-species":["P171",[]]
  }[group];
  if (!entity || !relation) return null;
  return {field:relation[0],types:relation[1],entity:`Q${entity}`,species:group==="named-species"};
}
for (const card of everydayCards) add(...card);
const everydayGroups = [
  ["carry-light","zippers","things-on-wheels","measuring-scales","hinged-things","headwear","paper-marks","inflatable-things","first-aid-kit","key-locks","lens","drinkware","non-electric-clocks","glass-objects","buttons","tool-teeth","erasable-marks"],
  ["citrus","jam-fruits","potato-dishes","desserts","herbs","breads","fermented-foods","fruit-pits","breakfast-dishes","plants-you-can-eat-leaves"],
  ["length-units","star-flags","visible-weather","elements","countries","capitals","mountains","rivers","islands","constellations","gemstones","public-transport"],
  ["animal-shells","swimming-birds","striped-animals","houseplants","birds","trees","freshwater-fish","underwater-mammals"],
  ["films","video-games","board-games","space-trip-films","animated-dogs","winged-characters","animation","fictional-places","fictional-vehicles","fictional-robots","myth","racket-sports","instruments","blown-instruments","plucked-strings","card-games","school-shows","weapons"]
];
mineDecks[6]=everydayGroups.flat();
const launchRevisions = [
  ["long-films","trees","constellations","fictional-places","breads","animation","water-machines","herbs"],
  ["carry-light","citrus","swimming-birds","zippers","elements","blown-instruments","animated-dogs","potato-dishes"]
];
const [upcoming,repeatAfterLaunch] = [[],[]];
for (const id of interleaveQuestionGroups(everydayGroups,20261124)) {
  (launchRevisions[1].includes(id) ? repeatAfterLaunch : upcoming).push(id);
}
mineCalendars.push({from:MINE_DAY+1,order:[...upcoming,...repeatAfterLaunch]});
for (const card of dailySpecialCards) add(...card);
const dailyRevisions = new Map([
  [MINE_DAY,launchRevisions],
  [MINE_DAY+1,[dailySpecialCards.map(([id])=>id)]]
]);
const latestEditionRevision = day => (dailyRevisions.get(day)?.length ?? 0)+1;
function validDailyRevision(day,revision) {
  return Number.isInteger(revision) && revision>=1 && revision<=latestEditionRevision(day);
}
function dailyIds(day,revision=1) {
  return dailyRevisions.get(day)?.[revision-2] ?? mineIds(day,"daily");
}

for (const card of themeCards) add(...card);
const originalMinePacks = {
  cinema:{en:"Cinema",ru:"Кино",ids:["films","animation","space-trip-films","animated-dogs","long-films","film-narrators","film-animals-speak","films-with-trains","animated-robots","named-soundtracks"]},
  music:{en:"Music",ru:"Музыка",ids:["instruments","blown-instruments","plucked-strings","numbered-albums","composers","drum-family","keyboard-instruments","titles-sing-colors","sounds-on-record","named-soundtracks"]},
  household:{en:"Everyday life",ru:"Повседневность",ids:["carry-light","zippers","hinged-things","things-on-wheels","drinkware","glass-objects","tool-teeth","buttons","key-locks","things-on-fridges","kitchen-grates","round-kitchen-objects"]},
  food:{en:"Food",ru:"Еда",ids:["potato-dishes","jam-fruits","citrus","fruit-pits","herbs","breakfast-dishes","breads","desserts","fermented-foods","flat-baked-foods","plants-you-can-eat-leaves"]},
  nature:{en:"Nature",ru:"Природа",ids:["trees","birds","houseplants","striped-animals","animal-shells","freshwater-fish","swimming-birds","underwater-mammals","visible-weather","birds-red","plants-climb"]}
};
const minePackLengths=[7,12];
const minePackVersion=2;
function minePack(id) {
  return Object.hasOwn(minePacks,id) ? minePacks[id] : null;
}
function packIds(id,seed,version=MINE_DECK_VERSION,packVersion=minePackVersion) {
  const pack=(version===7 && originalMinePacks[id]) || (packVersion===1 ? previousMinePacks[id] : minePack(id));
  return pack ? shuffleMine(pack.ids,seed) : [];
}
const themedGroups = [
  [...everydayGroups[0],"things-on-fridges","kitchen-grates","round-kitchen-objects"],
  [...everydayGroups[1],"flat-baked-foods"],
  everydayGroups[2],
  [...everydayGroups[3],"birds-red","plants-climb"],
  [...everydayGroups[4],"film-narrators","film-animals-speak","films-with-trains","animated-robots","named-soundtracks","drum-family","keyboard-instruments","titles-sing-colors","sounds-on-record"]
];
mineDecks[7]=themedGroups.flat();

for (const card of rotationCards) add(...card);
const rotationReplacements = {
  "erasable-marks":"things-that-fold",
  "non-electric-clocks":"things-with-pockets",
  "plants-you-can-eat-leaves":"foods-with-cheese",
  "fermented-foods":"foods-with-rice",
  "underwater-mammals":"nocturnal-animals",
  "racket-sports":"sports-with-a-ball",
  "film-narrators":"films-with-time-travel",
  "animated-robots":"films-with-dinosaurs",
  "named-soundtracks":"films-with-pirates",
  "sounds-on-record":"songs-with-names",
  "long-films":"films-at-sea",
  "numbered-albums":"bands-with-numbers",
  "composers":"songs-with-animals"
};
const replaceRetired = (ids,replacements=rotationReplacements) => ids.map(id=>replacements[id] ?? id);
const rotationGroups = themedGroups.map(ids=>replaceRetired(ids));
const activeIds = new Set(rotationGroups.flat());
rotationGroups.at(-1).push(...rotationCards.map(([id])=>id).filter(id=>!activeIds.has(id)));
const musicReplacements = {...rotationReplacements,"named-soundtracks":"music-duos"};
const previousMinePacks = Object.fromEntries(Object.entries(originalMinePacks).map(([id,pack])=>[
  id,{...pack,ids:replaceRetired(pack.ids,id==="music" ? musicReplacements : rotationReplacements)}
]));
previousMinePacks.household.ids.push("things-that-fold","things-with-pockets");
for (const card of packQuestionCards) add(...card);
const additionsByPack={
  cinema:["school-shows","fictional-robots","fictional-vehicles","daily-heist-films","films-with-submarines","films-with-storms"],
  music:["daily-rain-titles","daily-seventies-guitarists","instruments-with-hammers","albums-with-animals"],
  household:["measuring-scales","headwear","paper-marks","inflatable-things","first-aid-kit","daily-without-hands","things-with-hand-cranks","things-that-squeak"],
  food:["daily-dipping-foods","foods-on-skewers","foods-in-edible-wraps"],
  nature:["fruit-pits","gemstones","marsupials","animals-that-build-nests","plants-with-thorns","animals-that-change-color"]
};
const minePacks=Object.fromEntries(Object.entries(previousMinePacks).map(([id,pack])=>[
  id,{...pack,ids:[...new Set([...pack.ids,...additionsByPack[id]])]}
]));
Object.assign(minePacks,{
  geography:{en:"Around the world",ru:"Вокруг света",ids:["countries","capitals","star-flags","rivers","mountains","islands","daily-metropolitan-capitals","public-transport","lake-countries","volcanic-islands","rivers-through-capitals","bridge-cities"]},
  science:{en:"Science and technology",ru:"Наука и техника",ids:["elements","metals","constellations","programming","water-machines","length-units","lens","spacecraft","observatory","gemstones","solar-system-moons","measuring-scales"]},
  games:{en:"Sports and games",ru:"Спорт и игры",ids:["sports-with-a-ball","races-with-wheels","card-games","board-games","video-games","daily-fishing-games","goal-sports","ice-sports","tile-laying-games","games-with-a-glider","things-on-wheels","dice-games"]}
});
mineDecks[8]=rotationGroups.flat();
mineCalendars.push({from:MINE_DAY+2,order:interleaveQuestionGroups(rotationGroups,20261125)});
