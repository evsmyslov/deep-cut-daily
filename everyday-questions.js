// The first few choices should come to mind without knowing the rarest one.
const everydayCards = [
["carry-light","Name something you can carry to light your way.","Назовите источник света, который можно взять с собой.",`
4;flashlight|torch|electric torch;фонарик|ручной фонарь
0;candle;свеча
0;phone flashlight|phone torch|phone|smartphone;фонарик телефона|телефон|смартфон
0;headlamp|head torch;налобный фонарь|налобник
0;lantern;фонарь
0;match|matches;спичка|спички
1;camping lantern;кемпинговый фонарь
1;flaming torch|fire torch;факел
1;lighter;зажигалка
1;glow stick|light stick;светящаяся палочка|химический источник света
1;oil lamp;масляная лампа
2;storm lantern|kerosene lantern;керосиновый фонарь|керосиновая лампа|летучая мышь
2;road flare|signal flare;сигнальный фальшфейер|фальшфейер
2;book light;лампа для чтения|фонарик для книги
2;miners lamp|miner's lamp;шахтёрский фонарь
2;dynamo flashlight|hand crank flashlight;динамо-фонарь|ручной динамо-фонарь
3;carbide lamp|acetylene lamp;карбидная лампа|ацетиленовая лампа
3;rushlight;лучина|ситниковая свеча
`],
["zippers","Name something that often has a zipper.","Назовите вещь, у которой часто бывает молния.",`
4;jacket;куртка
4;backpack|rucksack;рюкзак
0;jeans;джинсы
0;trousers|pants;брюки|штаны
0;suitcase|luggage;чемодан
0;hoodie|zip hoodie;толстовка|худи
0;pencil case;пенал
0;handbag|purse;сумка|дамская сумка
1;wallet|zip wallet;кошелёк
1;coat;пальто
1;dress;платье
1;boots;сапоги|ботинки
1;tent;палатка
1;sleeping bag;спальный мешок|спальник
1;cosmetics bag|toiletry bag;косметичка|несессер
1;pillowcase|cushion cover;наволочка|чехол для подушки
2;duvet cover;пододеяльник
2;wetsuit|diving suit;гидрокостюм
2;ski suit|ski overalls;лыжный костюм|лыжный комбинезон
2;garment bag;чехол для одежды|портплед
2;travel packing cube|packing cube;органайзер для чемодана|дорожный органайзер
3;beekeeping suit|beekeeper suit;костюм пчеловода|комбинезон пчеловода
3;removable mattress cover|mattress cover;съёмный чехол для матраса|чехол матраса
`],
["things-on-wheels","Name something with wheels that people move without a motor.","Назовите вещь на колёсах, которую двигают без мотора.",`
4;bicycle|bike;велосипед|велик
4;shopping cart|shopping trolley;тележка из магазина|магазинная тележка|тележка для покупок
0;skateboard;скейтборд|скейт
0;kick scooter|scooter;самокат
0;pram|stroller|pushchair;детская коляска|коляска
0;wheelbarrow;тачка|садовая тачка
0;rolling suitcase|wheeled suitcase;чемодан на колёсах
1;roller skates|inline skates|rollerblades;роликовые коньки|ролики
1;manual wheelchair|wheelchair;инвалидная коляска|кресло-коляска
1;office chair|desk chair;офисное кресло|кресло на колёсах
1;hand truck|sack trolley;двухколёсная тележка|ручная тележка
1;toy car;игрушечная машинка
1;tricycle;трёхколёсный велосипед
2;push reel mower|reel mower;механическая газонокосилка|ручная газонокосилка
2;pedal car;педальная машинка|детский педальный автомобиль
2;manual pallet jack|pallet jack|hand pallet truck;ручная гидравлическая тележка|рохля
2;hospital stretcher|wheeled stretcher|gurney;больничная каталка|каталка
2;library book cart|book trolley;библиотечная тележка
3;horse-drawn carriage|horse drawn carriage|carriage;конная карета|карета
3;wheeled walker|rollator;роллатор|ходунки на колёсиках
3;mechanic's creeper|mechanics creeper;подкатной лежак автомеханика|подкатной лежак
`],
["measuring-scales","Name something with markings that you use to measure.","Назовите предмет с делениями, которым что-нибудь измеряют.",`
4;ruler;линейка
4;tape measure|measuring tape;рулетка|измерительная лента
0;thermometer;термометр|градусник
0;measuring jug|measuring cup;мерный стакан|мерный кувшин
0;protractor;транспортир
0;kitchen scale|kitchen scales;кухонные весы
1;stopwatch with a dial|analog stopwatch;аналоговый секундомер|стрелочный секундомер
1;syringe;шприц
1;graduated cylinder|measuring cylinder;мерный цилиндр|мензурка
1;odometer|speedometer;спидометр|одометр
1;barometer;барометр
1;analog pressure gauge|pressure gauge;манометр
2;calipers|caliper|vernier caliper;штангенциркуль
2;micrometer;микрометр
2;rain gauge;дождемер|осадкомер
2;hydrometer;ареометр
2;sextant;секстант
3;densitometer;денситометр
3;measuring pipette|graduated pipette;градуированная пипетка|мерная пипетка
3;dental periodontal probe|periodontal probe;пародонтологический зонд|пародонтальный зонд
`],
["hinged-things","Name something that opens on hinges.","Назовите вещь, которая открывается на петлях.",`
4;door;дверь
4;window|casement window;окно|распашное окно
0;cupboard|cabinet;шкаф|шкафчик
0;gate;ворота|калитка
0;fridge|refrigerator;холодильник
0;laptop;ноутбук
0;treasure chest|chest|trunk;сундук|ларь
1;car door;дверца машины|дверь автомобиля
1;car hood|bonnet;капот
1;oven door|oven;дверца духовки|духовка
1;toilet seat|toilet lid;сиденье унитаза|крышка унитаза
1;toolbox|tool chest;ящик для инструментов
1;flip phone|clamshell phone;телефон-раскладушка|раскладушка
1;compact mirror|powder compact;пудреница|складное зеркальце
2;waffle iron;вафельница
2;jewellery box|jewelry box;шкатулка|футляр для украшений
2;accordion folding partition|folding screen;складная ширма|ширма
2;aircraft access hatch|hatch;люк|лючок
2;locket;медальон
3;drawbridge;подъёмный мост|разводной мост
3;hinged microscope slide box|microscope slide box;футляр для предметных стёкол
`],
["headwear","Name something people wear on their head.","Назовите то, что носят на голове.",`
4;hat;шляпа
4;cap|baseball cap;кепка|бейсболка
0;beanie|knit cap|wool hat;вязаная шапка|шапка
0;helmet;шлем|каска
0;crown;корона
0;headphones;наушники
0;headband;ободок|повязка на голову
1;beret;берет
1;bandana;бандана
1;headscarf|kerchief;платок|головной платок
1;wig;парик
1;swim cap;шапочка для плавания
1;panama hat|bucket hat;панама|панамка
1;turban;тюрбан|чалма
1;tiara|diadem;тиара|диадема
2;ushanka;ушанка|шапка-ушанка
2;balaclava;балаклава
2;sombrero;сомбреро
2;fez|tarboosh;феска|тарбуш
2;kokoshnik;кокошник
2;mantilla;мантилья
2;bicorne|bicorne hat;двууголка|двурогая шляпа
3;coif;коиф|койф
3;chaperon|medieval chaperon;шаперон|средневековый капюшон-шаперон
`],
["paper-marks","Name something you can use to write or draw on paper.","Назовите то, чем можно писать или рисовать на бумаге.",`
4;pencil;карандаш
4;pen|ballpoint pen;ручка|шариковая ручка
0;felt-tip pen|marker;фломастер|маркер
0;crayon|wax crayon;восковой мелок|восковый карандаш
0;bristle brush|paintbrush|brush;кисть|кисточка
0;chalk;мел|мелок
1;gel pen;гелевая ручка
1;fountain pen;перьевая ручка
1;charcoal|drawing charcoal;рисовальный уголь|уголь
1;pastel|pastel stick;пастель
1;highlighter;текстовыделитель|хайлайтер
1;colored pencil|coloured pencil;цветной карандаш
2;quill|quill pen;гусиное перо|перо
2;dip pen|pen nib;перо для туши|стальное перо
2;finger paint|finger;палец|пальчиковая краска
2;stamp|rubber stamp;штамп|печать
2;sanguine;сангина
2;graphite stick;графитовый стержень|графитовая палочка
3;reed pen|qalam;калям|тростниковое перо
3;silverpoint|silver stylus;серебряный штифт|серебряный карандаш
`],
["citrus","Name a citrus fruit.","Назовите цитрусовый фрукт.",`
4;orange;апельсин
4;lemon;лимон
0;mandarin|mandarin orange|tangerine;мандарин
0;lime;лайм
0;grapefruit;грейпфрут
0;pomelo;помело
1;clementine;клементин
1;kumquat;кумкват
1;blood orange;красный апельсин|кровавый апельсин
1;bergamot|bergamot orange;бергамот
1;yuzu;юдзу|юзу
2;citron;цитрон
2;calamansi|calamondin;каламондин|каламансин|каламанси
2;satsuma|satsuma mandarin;сатсума|уншиу
2;sour orange|bitter orange;померанец|горький апельсин
2;ugli fruit|jamaican tangelo;угли|ямайский танжело
2;oroblanco|sweetie citrus|sweetie;свити|оробланко
2;finger lime|australian finger lime;пальчиковый лайм|пальчатый лайм
3;Buddha's hand|fingered citron;рука будды|пальчатый цитрон
3;rangpur|rangpur lime;рангпур|рангпурский лайм
3;kabosu;кабосу
`],
["jam-fruits","Name a fruit or berry people use to make jam.","Назовите фрукт или ягоду, из которых делают варенье.",`
4;strawberry|strawberries;клубника|земляника садовая
4;raspberry|raspberries;малина
0;cherry|cherries;вишня
0;apple;яблоко|яблоки
0;apricot;абрикос
0;plum;слива
0;peach;персик
0;blackcurrant|black currant;чёрная смородина|смородина
1;blueberry;голубика
1;bilberry;черника
1;pear;груша
1;gooseberry;крыжовник
1;blackberry;ежевика
1;orange;апельсин
1;lemon;лимон
1;cranberry;клюква
2;quince;айва
2;fig;инжир
2;mulberry;шелковица|тутовник
2;cloudberry;морошка
2;sea buckthorn;облепиха
2;feijoa;фейхоа
2;lingonberry;брусника
2;rowan berry|rowanberries;рябина
3;serviceberry|saskatoon berry;ирга|ирга канадская
3;rose hip|rosehip;шиповник
3;cornelian cherry|cornelian cherry dogwood;кизил
3;quandong|desert peach;квандонг|пустынный персик
`],
["potato-dishes","Name a dish made mainly from potatoes.","Назовите блюдо, в котором картофель — главный ингредиент.",`
4;french fries|fries|chips;картофель фри|картошка фри|фри
4;mashed potatoes|potato mash;картофельное пюре|пюре
0;roast potatoes|roasted potatoes;запечённый картофель|печёная картошка
0;potato chips|crisps;чипсы|картофельные чипсы
0;potato pancakes|draniki|latkes;драники|латкес|картофельные оладьи
0;baked potato|jacket potato;картофель в мундире|запечённая картофелина
1;potato wedges;картофель по-деревенски|картофельные дольки
1;hash browns|hash browns potato;хашбраун|хэшбраун
1;potato salad;картофельный салат
1;potato casserole;картофельная запеканка
1;potato gratin|gratin dauphinois|dauphinoise potatoes;картофельный гратен|гратен дофинуа
1;potato croquettes;картофельные крокеты
1;potato dumplings|potato gnocchi|gnocchi;картофельные ньокки|ньокки|картофельные клёцки
2;aloo tikki;алу тикки
2;patatas bravas|papas bravas;пататас бравас
2;poutine;путин
2;rösti|rosti;рёшти
2;potato kugel;картофельный кугель
2;colcannon;колканнон
2;papas arrugadas;папас арругадас|канарский морщинистый картофель
3;bubble and squeak;бабл-энд-сквик|бабл энд сквик
3;hasselback potatoes|hasselback potato;картофель хассельбек|картошка гармошкой
3;boxty|irish boxty;боксти|ирландские картофельные блины
3;pommes anna|potatoes anna;картофель анна|помм анна
`],
["animal-shells","Name an animal with a hard shell.","Назовите животное с твёрдым панцирем или раковиной.",`
4;turtle|tortoise;черепаха
4;snail;улитка
0;crab;краб
0;lobster;лобстер|омар
0;clam;двустворчатый моллюск|клем
0;oyster;устрица
0;mussel;мидия
1;crayfish|crawfish;рак|речной рак
1;hermit crab;рак-отшельник
1;scallop;морской гребешок|гребешок
1;beetle;жук
1;armadillo;броненосец
2;nautilus;наутилус
2;abalone;морское ушко|абалон|галиотис
2;horseshoe crab;мечехвост
2;shore limpet|limpet;морское блюдечко
2;barnacle;морской желудь|балянус
2;conch;стромбус|стромб
3;chiton;хитон|панцирный моллюск
3;trilobite;трилобит
3;brachiopod;брахиопод|плеченогий
`],
["swimming-birds","Name a bird that often swims.","Назовите птицу, которая часто плавает.",`
4;duck;утка
4;penguin;пингвин
0;swan;лебедь
0;goose;гусь
0;pelican;пеликан
0;seagull|gull;чайка
1;cormorant;баклан
1;coot|eurasian coot;лысуха
1;puffin|atlantic puffin;тупик
1;loon|diver;гагара
1;grebe;поганка|птица поганка
1;mallard;кряква
2;eider;гага
2;merganser|goosander;крохаль
2;wigeon;свиязь
2;razorbill;гагарка
2;tufted duck;хохлатая чернеть
2;guillemot|murre;кайра
3;dipper;оляпка
3;shearwater;буревестник
3;red-necked phalarope|red necked phalarope;круглоносый плавунчик
`],
["striped-animals","Name an animal with stripes.","Назовите животное с полосами.",`
4;zebra;зебра
4;tiger;тигр
0;wasp;оса
0;bee;пчела
0;bumblebee;шмель
0;clownfish|clown fish;рыба-клоун|амфиприон
0;raccoon;енот
0;skunk;скунс
1;chipmunk;бурундук
1;badger;барсук
1;tabby cat|striped cat;полосатая кошка|полосатый кот
1;lemur|ring tailed lemur;лемур|кошачий лемур
1;okapi;окапи
1;perch|european perch;окунь|речной окунь
2;striped hyena;полосатая гиена
2;zebra shark;зебровая акула
2;zebrafish|zebra danio;данио-рерио|рыбка-зебра
2;striped bass;полосатый лаврак|полосатый окунь
2;humbug damselfish;полосатый дасцилл|дасцилл-зебра
2;striped ground squirrel;полосатый суслик
3;aardwolf;земляной волк
3;banded mongoose;полосатый мангуст
3;giant eland|derby eland;гигантская канна|канна дерби
`],
["houseplants","Name a plant people grow indoors.","Назовите растение, которое выращивают дома.",`
4;cactus;кактус
4;aloe vera|aloe;алоэ|алоэ вера
0;ficus|rubber plant|rubber tree;фикус|фикус каучуконосный
0;orchid;орхидея
0;geranium|pelargonium;герань|пеларгония
0;violet|african violet|saintpaulia;фиалка|узамбарская фиалка|сенполия
0;fern;папоротник
0;monstera;монстера
1;snake plant|sansevieria;сансевиерия|щучий хвост|тёщин язык
1;spider plant|chlorophytum;хлорофитум
1;pothos|epipremnum|devils ivy;эпипремнум|сциндапсус
1;peace lily|spathiphyllum;спатифиллум
1;jade plant|money tree|crassula;толстянка|денежное дерево
1;begonia;бегония
1;dracaena;драцена
1;zamioculcas|zz plant;замиокулькас|долларовое дерево
2;anthurium;антуриум
2;calathea;калатея
2;christmas cactus|schlumbergera;декабрист|шлюмбергера
2;gloxinia;глоксиния
2;streptocarpus;стрептокарпус
2;peperomia;пеперомия
2;cast iron plant|aspidistra;аспидистра
3;string of hearts|ceropegia woodii;церопегия вуда|церопегия
3;hoya|wax plant;хойя|восковой плющ
3;jewel orchid|ludisia discolor;лудизия дисколор|лудизия|драгоценная орхидея
`]
];
everydayCards.push(
["length-units","Name a unit of length.","Назовите единицу длины.",`
4;metre|meter|m;метр|м
4;centimetre|centimeter|cm;сантиметр|см
0;kilometre|kilometer|km;километр|км
0;millimetre|millimeter|mm;миллиметр|мм
0;inch;дюйм
0;mile;миля
0;foot|feet;фут
1;yard;ярд
1;light-year|light year;световой год
1;micrometre|micrometer|micron;микрометр|микрон
1;nanometre|nanometer;нанометр
1;nautical mile;морская миля
1;decimetre|decimeter;дециметр
2;astronomical unit;астрономическая единица
2;parsec;парсек
2;cubit;локоть
2;verst;верста
2;fathom;морская сажень|фатом
2;ångström|angstrom;ангстрем
3;furlong;фарлонг
3;hand|hand unit;хэнд|ладонь единица длины
3;stadion|stadium unit|stade;стадий|стадия единица длины
`],
["star-flags","Name a country with a star on its flag.","Назовите страну, на флаге которой есть звезда.",`
4;United States|USA|US|America;США|Соединённые Штаты Америки|Америка
4;China;Китай
0;Vietnam;Вьетнам
0;Brazil;Бразилия
0;Turkey|Türkiye;Турция
0;Australia;Австралия
0;New Zealand;Новая Зеландия
0;Cuba;Куба
0;North Korea|DPRK;Северная Корея|КНДР
0;Israel;Израиль
1;Pakistan;Пакистан
1;Chile;Чили
1;Morocco;Марокко
1;Algeria;Алжир
1;Tunisia;Тунис
1;Singapore;Сингапур
1;South Sudan;Южный Судан
1;Senegal;Сенегал
1;Malaysia;Малайзия
1;Philippines;Филиппины
1;Azerbaijan;Азербайджан
1;Uzbekistan;Узбекистан
1;Turkmenistan;Туркменистан
1;Tajikistan;Таджикистан
2;Myanmar|Burma;Мьянма|Бирма
2;Cameroon;Камерун
2;Ghana;Гана
2;Somalia;Сомали
2;Ethiopia;Эфиопия
2;Suriname;Суринам
2;Togo;Того
2;Burkina Faso;Буркина-Фасо
2;Venezuela;Венесуэла
2;Honduras;Гондурас
2;Panama;Панама
2;Syria;Сирия
2;Djibouti;Джибути
2;Liberia;Либерия
2;Congo-Kinshasa|DR Congo|Democratic Republic of the Congo|DRC;Демократическая Республика Конго|ДР Конго|ДРК
2;Angola;Ангола
2;Mozambique;Мозамбик
2;Zimbabwe;Зимбабве
2;Guinea-Bissau;Гвинея-Бисау
2;Cabo Verde|Cape Verde;Кабо-Верде
2;Central African Republic;Центральноафриканская Республика|ЦАР
2;Equatorial Guinea;Экваториальная Гвинея
2;Burundi;Бурунди
2;Grenada;Гренада
2;Jordan;Иордания
2;Libya;Ливия
2;Mauritania;Мавритания
2;Papua New Guinea;Папуа — Новая Гвинея|Папуа Новая Гвинея
2;Samoa;Самоа
2;Slovenia;Словения
2;Bosnia and Herzegovina;Босния и Герцеговина
3;Dominica;Доминика
3;Timor-Leste|East Timor;Тимор-Лешти|Восточный Тимор
3;São Tomé and Príncipe|Sao Tome and Principe;Сан-Томе и Принсипи
3;Comoros;Коморы|Коморские Острова
3;Solomon Islands;Соломоновы Острова
3;Saint Kitts and Nevis|St Kitts and Nevis;Сент-Китс и Невис
3;Nauru;Науру
3;Marshall Islands;Маршалловы Острова
3;Tuvalu;Тувалу
3;Federated States of Micronesia|Micronesia;Федеративные Штаты Микронезии|Микронезия
`],
["visible-weather","Name something that happens in the weather that you can see.","Назовите погодное явление, которое можно увидеть.",`
4;rain;дождь
4;snow|snowfall;снег|снегопад
0;lightning;молния
0;rainbow;радуга
0;fog;туман
0;hail;град
0;thunderstorm;гроза
0;clouds|cloud;облака|облако
1;sleet|wet snow;мокрый снег|дождь со снегом
1;blizzard|snowstorm;метель|вьюга|буран
1;tornado;торнадо|смерч
1;drizzle;морось
1;dew;роса
1;frost|hoarfrost;иней|изморозь
1;sandstorm|dust storm;песчаная буря|пыльная буря
1;freezing rain|ice storm;ледяной дождь
2;waterspout;водяной смерч
2;sun halo|halo;солнечное гало|гало
2;sundog|sun dog|parhelion;паргелий|ложное солнце
2;lenticular cloud;линзовидное облако|линзообразное облако
2;virga;вирга|сухой дождь
3;noctilucent clouds|night shining clouds;серебристые облака
3;frost flowers|ice flowers;ледяные цветы|морозные цветы
3;diamond dust|ice crystals in the air;алмазная пыль|ледяные иглы
`],
["space-trip-films","Name a film in which a character travels into space.","Назовите фильм, в котором кто-нибудь летит в космос.",`
4;Interstellar;Интерстеллар
0;The Martian|Martian;Марсианин
0;Gravity;Гравитация
0;Star Wars: A New Hope|Star Wars Episode IV|Star Wars;Звёздные войны: Новая надежда|Звёздные войны Новая надежда
0;Apollo 13;Аполлон-13
0;2001: A Space Odyssey|2001 A Space Odyssey;Космическая одиссея 2001 года|2001 Космическая одиссея
0;WALL-E|WALLE;ВАЛЛ-И
1;Alien;Чужой
1;Armageddon;Армагеддон
1;First Man;Человек на Луне
1;Ad Astra;К звёздам
1;Passengers (2016)|Passengers;Пассажиры
1;Star Trek (2009)|Star Trek;Звёздный путь 2009|Звёздный путь
1;Guardians of the Galaxy;Стражи Галактики
2;Solaris (1972)|Solaris;Солярис
2;The Right Stuff|Right Stuff;Парни что надо|Первые настоящие парни
2;Space Cowboys;Космические ковбои
2;Silent Running;Молчаливое бегство|Бесшумный бег
2;Moon (2009)|Moon;Луна 2112|Луна 2009
2;For All Mankind (1989)|For All Mankind film;Ради всего человечества 1989|Ради всего человечества
2;Salyut 7|Salyut-7;Салют-7
2;The Challenge (2023)|The Challenge;Вызов
3;Destination Moon;Место назначения — Луна|Пункт назначения Луна
3;A Trip to the Moon|Le Voyage dans la Lune;Путешествие на Луну
3;The Woman in the Moon|Woman in the Moon|Frau im Mond;Женщина на Луне
`],
["winged-characters","Name a fictional character with wings.","Назовите вымышленного персонажа, у которого есть крылья.",`
4;Tinker Bell|Tinkerbell;Динь-Динь|фея Динь Динь
0;Toothless;Беззубик
0;Dumbo;Дамбо
0;Maleficent;Малефисента
0;Smaug;Смауг
0;Hedwig;Букля|Хедвиг
0;Rainbow Dash;Радуга Дэш|Радуга Деш
1;Fluttershy;Флаттершай
1;Charizard;Чаризард
1;Spyro;Спайро|дракончик Спайро
1;Dragon from Shrek|Shrek's Dragon;Дракониха из Шрека|дракониха
1;Hawkman;Человек-ястреб|Хокмэн
1;Hawkgirl;Орлица|Хокгёрл
1;Vulture from Spider-Man|Marvel Vulture;Стервятник из Человека-паука|Стервятник
1;Angel from X-Men|Warren Worthington III|Marvel Angel;Ангел из Людей Икс|Уоррен Уортингтон III
2;Buckbeak;Клювокрыл
2;Fawkes;Фоукс|феникс Фоукс
2;Saphira;Сапфира
2;Iago from Aladdin|Iago;Яго из Аладдина|Яго
2;Archangel from X-Men|Marvel Archangel;Архангел из Людей Икс
3;Trogdor|Trogdor the Burninator;Трогдор
3;Pern dragon Ramoth|Ramoth;Рамот|Рамос драконица
3;Orm Embar;Орм Эмбар
`],
["blown-instruments","Name a musical instrument you blow into.","Назовите музыкальный инструмент, в который дуют.",`
4;flute;флейта
4;trumpet;труба
0;saxophone|sax;саксофон
0;clarinet;кларнет
0;harmonica|mouth organ;губная гармошка
0;recorder;блокфлейта
0;trombone;тромбон
0;tuba;туба
1;oboe;гобой
1;bassoon;фагот
1;french horn;валторна
1;bagpipes;волынка
1;ocarina;окарина
1;pan flute|panpipes;флейта пана|свирель
1;melodica;мелодика
1;piccolo;флейта-пикколо|пикколо
2;didgeridoo;диджериду
2;duduk;дудук
2;trombone alto|alto trombone;альтовый тромбон
2;shakuhachi;сякухати
2;zurna|surnay;зурна
2;bansuri;бансури
2;whistle|tin whistle;вистл|тин-вистл|свисток
3;crumhorn|krummhorn;крумгорн
3;nose flute;носовая флейта
3;sarrusophone;саррюзофон|сарузофон
`],
["animated-dogs","Name a cartoon with a dog as a main character.","Назовите мультфильм или мультсериал, где один из главных героев — собака.",`
4;Scooby-Doo|Scooby Doo;Скуби-Ду
4;PAW Patrol;Щенячий патруль
0;Bluey;Блуи
0;Lady and the Tramp;Леди и Бродяга
0;101 Dalmatians|One Hundred and One Dalmatians;101 далматинец|Сто один далматинец
0;Bolt;Вольт
0;Balto;Балто
0;The Secret Life of Pets;Тайная жизнь домашних животных
0;Courage the Cowardly Dog;Кураж — трусливый пёс|Кураж трусливый пёс
1;The Fox and the Hound;Лис и пёс|Лис и пес
1;All Dogs Go to Heaven;Все псы попадают в рай
1;Clifford the Big Red Dog;Клиффорд — большая красная собака|Клиффорд
1;Pound Puppies;Щенки из приюта
1;The Snoopy Show;Шоу Снупи
1;Dug Days;Будни Дага
1;Mr. Peabody and Sherman|Mr Peabody & Sherman;Приключения мистера Пибоди и Шермана
2;The Plague Dogs;Отчаянные псы|Чумные псы
2;White Fang (2018)|White Fang;Белый Клык
2;Oliver & Company|Oliver and Company;Оливер и компания
2;Isle of Dogs;Остров собак
2;Shaun the Sheep|Shaun the Sheep Movie;Барашек Шон|Барашек Шон мультфильм
3;Rover Dangerfield;Ровер Дэнджерфилд
3;Poochini;Пуччини|Собачья жизнь Пуччини
3;Kipper|Kipper the Dog;Пёс Киппер|Киппер
`],
["racket-sports","Name a sport played with a racket or paddle.","Назовите вид спорта, в котором играют ракеткой.",`
4;tennis|lawn tennis;теннис|большой теннис
4;badminton;бадминтон
0;table tennis|ping pong|ping-pong;настольный теннис|пинг-понг
0;squash;сквош
0;padel|padel tennis;падел
1;pickleball;пиклбол
1;beach tennis;пляжный теннис
1;racquetball|racketball;ракетбол
1;soft tennis;софт-теннис|мягкий теннис
1;speed badminton|crossminton;кроссминтон|скоростной бадминтон
2;platform tennis;теннис на платформе|платформ-теннис
2;real tennis|royal tennis|court tennis;королевский теннис|реал-теннис
2;basque pelota with a paddle|frontenis|basque pelota;фронтенис|баскская пелота
2;frescobol;фрескобол
3;tennis polo;теннис-поло
3;touchtennis;тачтеннис|тач-теннис
3;qianball;цяньбол
`],
["inflatable-things","Name something people fill with air to make it bigger or firmer.","Назовите то, что можно надуть воздухом.",`
4;balloon;воздушный шарик|шарик
4;ball|football|soccer ball;мяч|футбольный мяч
0;tire|tyre;шина|покрышка
0;air mattress|inflatable mattress;надувной матрас|матрас
0;inflatable boat|rubber dinghy;надувная лодка|резиновая лодка
0;swim ring|pool float;надувной круг|круг для плавания
1;inflatable pool|paddling pool;надувной бассейн
1;beach ball;пляжный мяч
1;basketball;баскетбольный мяч
1;yoga ball|exercise ball|stability ball;фитбол|гимнастический мяч
1;balloon animal;фигурка из шариков
1;inner tube;велокамера|камера колеса
1;inflatable pillow|travel pillow;надувная подушка
2;bouncy castle|inflatable castle;надувной замок|надувной батут
2;inflatable kayak;надувной каяк|надувная байдарка
2;inflatable life jacket;надувной спасательный жилет
2;inflatable tent|air tent;надувная палатка
2;life raft|inflatable life raft;спасательный плот|надувной плот
2;airship|blimp;дирижабль
3;air splint|inflatable splint;пневматическая шина|надувная шина для иммобилизации
3;inflatable lifting bag|pneumatic lifting bag;пневматический домкрат|надувная подъёмная подушка
3;inflatable movie screen|inflatable screen;надувной экран для кино|надувной киноэкран
`],
["first-aid-kit","Name something you might find in a first-aid kit.","Назовите то, что обычно бывает в аптечке.",`
4;bandage;бинт|повязка
4;plaster|adhesive bandage|band aid|bandaid;пластырь|лейкопластырь
0;cotton wool|cotton balls;вата|ватные шарики
0;gauze|gauze pad|gauze dressing;марля|марлевая салфетка
0;scissors;ножницы
0;thermometer;градусник|термометр
0;disposable gloves|medical gloves;медицинские перчатки|одноразовые перчатки
0;antiseptic|antiseptic wipes;антисептик|антисептическая салфетка
1;tweezers;пинцет
1;elastic bandage|compression bandage;эластичный бинт
1;safety pin;английская булавка|булавка
1;cold pack|instant cold pack;охлаждающий пакет|холодовый пакет
1;saline solution|saline;физраствор
2;triangular bandage|arm sling;треугольная косынка|косыночная повязка
2;burn dressing;противоожоговая повязка
2;emergency blanket|space blanket;спасательное одеяло|термоодеяло
2;first aid manual;инструкция по первой помощи
2;finger splint|splint;шина для пальца|медицинская шина
3;sterile eye pad|eye dressing;стерильная повязка для глаза|глазная повязка
3;cpr face shield|resuscitation face shield;барьерная маска для искусственного дыхания|маска для ИВЛ
3;tubular retention bandage|tubular net bandage;трубчатый сетчатый бинт|сетчатый бинт
`],
["key-locks","Name something people open with a key.","Назовите то, что открывают ключом.",`
4;door|front door;дверь|входная дверь
4;padlock;навесной замок|замок
0;car door|car;машина|автомобиль
0;safe;сейф
0;mailbox|letterbox;почтовый ящик
0;chest|treasure chest;сундук
0;gate|garden gate;ворота|калитка
0;locker;шкафчик|шкафчик в раздевалке
1;garage|garage door;гараж|дверь гаража
1;bicycle lock|bike lock;велозамок|замок велосипеда
1;suitcase;чемодан
1;tool chest|toolbox;ящик с инструментами|ящик для инструментов
1;desk drawer|locked drawer;запираемый ящик стола|ящик стола
1;cabinet;шкаф|запираемый шкаф
2;cash box;денежный ящик|кассовый бокс|денежная шкатулка
2;filing cabinet;архивный шкаф|картотека
2;hotel room;номер в гостинице|гостиничный номер
2;prison cell|jail cell;тюремная камера|камера
2;music case|instrument case;футляр для инструмента|музыкальный футляр
3;vending machine service door|vending machine;торговый автомат|сервисная дверца автомата
3;elevator service panel;сервисная панель лифта
3;church offertory box|offertory box|poor box;ящик для пожертвований|церковная кружка для пожертвований
`]
);

everydayCards.push(
["glass-objects","Name something commonly made of glass.","Назовите предмет, который часто делают из стекла.",`
4;window pane|window|glass pane;оконное стекло|окно
4;bottle;бутылка
0;drinking glass|glass;стакан
0;jar;банка
0;mirror;зеркало
0;light bulb|bulb;лампочка
0;eyeglass lens|glasses|spectacles;линза очков|очки
1;vase;ваза
1;fish tank|aquarium;аквариум
1;windshield|windscreen;лобовое стекло
1;ashtray;пепельница
1;wine glass;бокал
1;Christmas bauble|glass ornament;ёлочный шар|ёлочная игрушка
1;picture frame glazing|picture frame;стекло фоторамки|фоторамка
2;marble|glass marble;стеклянный шарик|шарик
2;measuring cup|glass measuring jug;мерный стакан|мерная кружка
2;test tube;пробирка
2;glass pipette|pipette;пипетка
2;syrup dispenser;дозатор для сиропа
2;hourglass|sand timer;песочные часы
2;prism;призма
3;watch glass|laboratory watch glass;часовое стекло
3;glass float|fishing float;стеклянный рыболовный поплавок|рыболовный поплавок
`],
["buttons","Name a device with buttons you can press.","Назовите устройство, у которого есть кнопки.",`
4;remote control|remote|tv remote;пульт|пульт управления
4;phone|telephone|smartphone;телефон|смартфон
0;keyboard|computer keyboard;клавиатура
0;calculator;калькулятор
0;elevator|lift;лифт
0;doorbell;дверной звонок|звонок
0;microwave|microwave oven;микроволновка|микроволновая печь
0;washing machine;стиральная машина|стиралка
0;camera;фотоаппарат|камера
1;game controller|gamepad|joystick;геймпад|игровой контроллер|джойстик
1;mouse|computer mouse;компьютерная мышь|мышка|мышь
1;radio;радио|радиоприёмник
1;vending machine;торговый автомат
1;digital watch|watch;электронные часы|наручные часы
1;coffee machine|coffee maker;кофемашина|кофеварка
1;cash machine|ATM;банкомат
1;printer;принтер
2;intercom;домофон|переговорное устройство
2;label maker|label printer;принтер этикеток|маркиратор
2;walkie talkie|two-way radio;рация
2;sewing machine;швейная машина
2;metronome|digital metronome;метроном
2;pedestrian crossing button|pedestrian signal;кнопка на пешеходном переходе|пешеходный светофор
3;autoclave;автоклав
3;cash counter|banknote counter|bill counter;счётчик банкнот|счётчик купюр
`],
["tool-teeth","Name an object with teeth.","Назовите предмет, у которого есть зубцы.",`
4;comb|hair comb;расчёска|гребень
4;saw|handsaw|hand saw;пила|ножовка
0;gear|cog|cogwheel|gearwheel;шестерня|зубчатое колесо
0;zipper|zip;молния|застёжка-молния
0;fork;вилка
0;rake;грабли
0;key;ключ
1;chainsaw|chain saw;бензопила|цепная пила
1;serrated knife|bread knife;зубчатый нож|нож для хлеба
1;hair clip|claw clip;заколка-краб|заколка для волос|крабик
1;meat tenderizer|meat mallet;молоток для отбивания мяса|кухонный молоток
1;ratchet buckle;храповая пряжка
2;pinking shears|zigzag scissors;ножницы зигзаг|зигзагообразные ножницы
2;ratchet wheel|ratchet;храповое колесо|храповик
2;tile trowel|notched trowel;зубчатый шпатель
2;bread-scoring wheel;зубчатый нож-колёсико|фигурный нож для теста
2;staple remover;антистеплер
2;crampons;альпинистские кошки|кошки для альпинизма
2;wool carder|wool comb;чесалка для шерсти|кардочес
3;fret saw|fretsaw|scroll saw;лобзик
3;pottery rib comb|ceramic comb;гребёнка для керамики|гончарная гребёнка
`],
["fruit-pits","Name a fruit with a hard pit.","Назовите фрукт или ягоду с твёрдой косточкой.",`
4;peach;персик
4;plum;слива
0;cherry|sour cherry;вишня
0;sweet cherry;черешня
0;apricot;абрикос
0;nectarine;нектарин
0;olive;оливка|маслина
0;mango;манго
0;date|dates;финик|финики
1;cherry plum;алыча
1;lychee|litchi;личи
1;cornelian cherry|cornel;кизил
1;loquat|Japanese medlar;мушмула японская|локва
1;sloe|blackthorn;тёрн
2;jujube|Chinese date;зизифус|унаби|китайский финик
2;damson|damson plum;дамасская слива|тернослива
2;greengage|gage plum;ренклод
2;rambutan;рамбутан
2;barbados cherry|acerola;ацерола|барбадосская вишня
2;jocote|red mombin;мексиканская слива|момбина пурпурная
3;biblical jujube|Christ's thorn jujube;зизифус терновый
3;marula;марула
`],
["freshwater-fish","Name a fish that lives in rivers or lakes.","Назовите рыбу, которая живёт в реках или озёрах.",`
4;pike|northern pike;щука
4;perch|European perch;окунь
0;carp|common carp;карп|сазан
0;crucian carp;карась
0;rainbow trout|trout;радужная форель|форель
0;catfish|wels catfish;сом
0;roach|common roach;плотва|сорога
0;bream|common bream;лещ
1;zander|pikeperch|pike perch;судак
1;tench;линь
1;European chub|chub;голавль
1;rudd|common rudd;краснопёрка
1;goldfish;золотая рыбка
1;gudgeon;пескарь
1;burbot;налим
1;piranha;пиранья
1;tilapia;тилапия
1;largemouth bass|black bass;большеротый окунь|басс
2;sterlet;стерлядь
2;bleak;уклейка
2;ruffe;ёрш
2;asp;жерех|шереспёр
2;grayling;хариус
2;weatherfish|European weather loach;вьюн
2;ide;язь
2;whitefish;сиг
2;grass carp;белый амур
2;longnose gar|garpike;длиннорылый панцирник
3;inconnu|nelma;нельма
3;sweetfish|ayu;аю|сладкая рыба
`],
["public-transport","Name a type of public transport.","Назовите вид общественного транспорта.",`
4;bus;автобус
4;metro|subway|underground|tube;метро|метрополитен
0;tram|streetcar;трамвай
0;train|railway;поезд|железная дорога
0;trolleybus;троллейбус
0;ferry;паром
0;minibus|shared taxi|jitney;маршрутка|маршрутное такси|микроавтобус
1;commuter train|suburban train;электричка|пригородный поезд
1;taxi|cab;такси
1;coach|intercity bus;междугородний автобус
1;monorail;монорельс
1;funicular|inclined railway;фуникулёр
1;passenger plane|airplane|airliner;пассажирский самолёт|самолёт
1;water bus|water taxi|river bus;речной трамвай|водное такси
2;cable car|gondola lift|aerial tramway;канатная дорога|подвесная канатная дорога
2;double-decker bus;двухэтажный автобус
2;light rail;легкорельсовый транспорт|скоростной трамвай
2;high-speed train;высокоскоростной поезд|скоростной поезд
2;tuk-tuk|auto rickshaw;тук-тук|моторикша
2;passenger hydrofoil|hydrofoil;судно на подводных крыльях
3;maglev|magnetic levitation train;маглев|поезд на магнитной подушке
3;suspension railway|suspended monorail;подвесная железная дорога|подвесной монорельс
`],
["breakfast-dishes","Name a dish people often eat for breakfast.","Назовите блюдо, которое часто едят на завтрак.",`
4;porridge|oatmeal;овсяная каша|овсянка|каша
4;fried eggs|fried egg;яичница|глазунья
0;omelette|omelet;омлет
0;pancakes|pancake;блинчики|блины|панкейки
0;scrambled eggs|scrambled egg;скрэмбл|яичница-болтунья|болтунья
0;toast;тост|тосты
0;sandwich;бутерброд|сэндвич
0;breakfast cereal|corn flakes|cornflakes|cereal;кукурузные хлопья|хлопья
0;waffles|waffle;вафли
0;yogurt|yoghurt;йогурт
1;French toast;французский тост|сладкие гренки|гренки
1;granola;гранола
1;muesli;мюсли
1;syrniki|quark pancakes;сырники|творожники
1;eggs Benedict|egg Benedict;яйца Бенедикт|яйцо Бенедикт
1;poached egg|poached eggs;яйцо пашот|пашот
1;boiled egg|boiled eggs|soft-boiled eggs;варёное яйцо|яйцо всмятку|варёные яйца
1;shakshuka;шакшука
1;croissant;круассан
1;bagel|bagel with cream cheese;бейгл|бублик
2;full English breakfast|English breakfast;английский завтрак
2;breakfast burrito;буррито на завтрак|буррито
2;rice porridge|congee;рисовая каша|конджи
2;overnight oats;ленивая овсянка
2;hash browns|hash brown;хашбраун|хашбрауны
2;huevos rancheros;уэвос ранчерос|яйца по-ранчерски
2;idli;идли
3;ful medames|foul medames;фул медамес|фуль медамес
3;menemen;менемен
`],
["underwater-mammals","Name a mammal that spends much of its time in water.","Назовите млекопитающее, которое много времени проводит в воде.",`
4;whale;кит
4;dolphin;дельфин
0;seal;тюлень
0;walrus;морж
0;otter;выдра
0;beaver;бобр|бобёр
0;hippopotamus|hippo;бегемот|гиппопотам
1;platypus;утконос
1;sea lion;морской лев
1;manatee|sea cow;ламантин|морская корова
1;sea otter;калан|морская выдра
1;orca|killer whale;косатка|касатка
1;beluga|beluga whale;белуха
1;narwhal;нарвал
1;muskrat;ондатра
1;coypu|nutria;нутрия
2;desman|Russian desman;выхухоль
2;dugong;дюгонь
2;water vole|European water vole;водяная полёвка|водяная крыса
2;porpoise|harbour porpoise;морская свинья
2;mink|European mink|American mink;норка
2;fur seal;морской котик
2;elephant seal;морской слон
2;bowhead whale;гренландский кит
3;water opossum|yapok;водяной опоссум|плавун
3;sea mink;морская норка
`],
["plants-you-can-eat-leaves","Name a plant whose leaves people eat.","Назовите растение, листья которого едят.",`
4;lettuce;латук|салат|листовой салат
4;cabbage;капуста
0;spinach;шпинат
0;parsley;петрушка
0;dill;укроп
0;mint;мята
0;green onion|scallion|spring onion;зелёный лук|лук
1;basil;базилик
1;coriander|cilantro;кинза|кориандр
1;kale;кейл|листовая капуста
1;arugula|rocket;руккола|рукола
1;sorrel;щавель
1;celery;сельдерей
1;brussels sprout|brussels sprouts;брюссельская капуста
1;nettle|stinging nettle;крапива
1;beet|beetroot|beet greens;свёкла|свекольная ботва
1;grape|grapevine|grape leaves;виноград|виноградные листья
2;chard|Swiss chard;мангольд
2;watercress;кресс водяной|водяной кресс
2;endive;эндивий
2;dandelion;одуванчик
2;ramsons|wild garlic;черемша
2;perilla|shiso;перилла|шисо
2;purslane;портулак
3;New Zealand spinach|tetragonia;новозеландский шпинат|тетрагония
3;sea beet;морская свёкла
`],
["school-shows","Name a TV series where much of the story takes place at school.","Назовите сериал, в котором значительная часть событий происходит в школе.",`
4;Wednesday;Уэнсдей
4;Sex Education;Половое воспитание|Сексуальное просвещение
0;Glee;Хор|Гли
0;Elite|Élite;Элита
0;Never Have I Ever;Я никогда не...
0;Euphoria;Эйфория
0;High School Musical: The Musical: The Series|High School Musical the Series;Классный мюзикл: Мюзикл
1;Freaks and Geeks;Хулиганы и ботаны
1;Heartstopper;Трепет сердца
1;Gilmore Girls;Девочки Гилмор
1;Buffy the Vampire Slayer|Buffy;Баффи — истребительница вампиров|Баффи
1;Derry Girls;Девчонки из Дерри
1;Abbott Elementary;Начальная школа «Эбботт»|Начальная школа Эбботт
1;School 2010|Shkola;Школа
1;Gym Teacher|Fizruk;Физрук
1;Closed School|Zakrytaya shkola;Закрытая школа
1;Skins;Молокососы
2;Saved by the Bell;Спасённые звонком
2;Degrassi: The Next Generation|Degrassi;Деграсси: Следующее поколение|Деграсси
2;Waterloo Road;Улица Ватерлоо
2;The Inbetweeners;Переростки
2;Boy Meets World;Парень познаёт мир
2;Ned's Declassified School Survival Guide|Neds Declassified;Рассекреченное руководство Неда по выживанию в школе
2;All of Us Are Dead;Мы все мертвы
2;A.P. Bio|AP Bio;Курс биологии
3;Square Pegs;Квадратные колышки|Сквер Пегс
3;My So-Called Life;Моя так называемая жизнь
`],
["erasable-marks","Name something people use to erase a mark or writing.","Назовите то, чем стирают надпись или след.",`
4;eraser|rubber|pencil eraser;ластик|стёрка
4;whiteboard eraser|board eraser|chalkboard eraser;губка для доски|стиралка для доски
0;cloth|rag;тряпка|ткань
0;water;вода
0;sponge;кухонная губка
0;wet wipe|wipe;влажная салфетка|салфетка
0;soap;мыло
1;acetone|nail polish remover;ацетон|жидкость для снятия лака
1;rubbing alcohol|alcohol;спирт|изопропиловый спирт
1;kneaded eraser|putty rubber;клячка|ластик-клячка
1;whiteboard cleaner|board spray;очиститель для маркерных досок|спрей для доски
1;erasable pen eraser|friction eraser;ластик для стираемой ручки
2;melamine sponge|magic eraser;меламиновая губка
2;sandpaper;наждачная бумага|наждачка
2;pumice stone|pumice;пемза
2;glass scraper|razor scraper;скребок для стекла
2;ink eradicator|ink eraser;стирающая ручка|ручка для удаления чернил|стиралка для чернил
2;bread crumb|soft bread;хлебный мякиш|мякиш
3;drafting powder|dry cleaning pad;чистящая подушечка для чертежей
`]
);
