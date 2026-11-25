"use strict";

const packQuestionCards = [
  ["films-with-submarines","Name a film in which a submarine is important to the story.","Назовите фильм, в сюжете которого важна подводная лодка.",`
0;Das Boot|The Boat;Подводная лодка|Лодка
0;The Hunt for Red October;Охота за «Красным Октябрём»
0;K-19: The Widowmaker|K-19;К-19
0;Kursk (2018)|Kursk;Курск
1;Crimson Tide;Багровый прилив
1;Hunter Killer;Хантер Киллер
1;U-571;Ю-571
1;Black Sea (2014)|Black Sea;Чёрное море
1;The World Is Not Enough;И целого мира мало
1;Yellow Submarine;Жёлтая подводная лодка
1;20,000 Leagues Under the Sea (1954)|Twenty Thousand Leagues Under the Sea;20 000 лье под водой
2;Run Silent, Run Deep;Идти тихо, идти глубоко
2;The Enemy Below;Под нами враг
2;The Bedford Incident;Случай с Бедфордом
2;Below (2002)|Below;Глубина
2;The Wolf's Call|Le Chant du loup;Зов волка
2;We Dive at Dawn;Мы погружаемся на рассвете
3;Destination Tokyo;Пункт назначения — Токио
`],
  ["films-with-storms","Name a film where a storm changes what the characters do.","Назовите фильм, в котором буря меняет планы героев.",`
0;Twister (1996)|Twister;Смерч
0;The Day After Tomorrow;Послезавтра
0;The Perfect Storm;Идеальный шторм
0;The Wizard of Oz;Волшебник страны Оз
1;The Hateful Eight;Омерзительная восьмёрка
1;Key Largo;Ки-Ларго
1;The Martian;Марсианин
1;The Finest Hours;И грянул шторм
1;The Poseidon Adventure (1972)|The Poseidon Adventure;Приключение «Посейдона»
1;Crawl (2019)|Crawl;Капкан
1;Hard Rain;Ливень
2;Take Shelter;Укрытие
2;The Lighthouse (2019)|The Lighthouse;Маяк
2;White Squall;Белый шквал
2;No Exit (2022)|No Exit;Выхода нет
2;The Ice Storm;Ледяной ветер
2;Adrift (2018)|Adrift;Во власти стихии
3;The Hurricane (1937);Ураган (1937)
`],
  ["instruments-with-hammers","Name an instrument whose sound can be made by striking it with hammers or mallets.","Назовите инструмент, на котором извлекают звук ударами молоточков или колотушек.",`
0;piano|grand piano|upright piano;фортепиано|пианино|рояль
0;xylophone;ксилофон
0;drum;барабан
0;gong;гонг
1;vibraphone;вибрафон
1;marimba;маримба
1;glockenspiel;колокольчики
1;tubular bells|orchestral chimes;трубчатые колокола
1;timpani|kettledrums;литавры
1;celesta;челеста
1;wood block;деревянная коробочка
2;hammered dulcimer;цимбалы
2;santur|santoor;сантур
2;yangqin;янцинь
2;yanggeum;янгым
2;saron;сарон
2;bonang;бонанг
3;khim;кхим
`],
  ["albums-with-animals","Name a music album with an animal in its original title.","Назовите музыкальный альбом, в оригинальном названии которого есть животное.",`
0;Animals (Pink Floyd)|Animals;Animals
0;Eagles (1972)|Eagles;Eagles
0;Dark Horse (George Harrison)|Dark Horse;Dark Horse
0;Bat Out of Hell;Bat Out of Hell
1;Year of the Cat;Year of the Cat
1;Hounds of Love;Hounds of Love
1;Fly Like an Eagle;Fly Like an Eagle
1;The Lamb Lies Down on Broadway;The Lamb Lies Down on Broadway
1;Gorilla (James Taylor)|Gorilla;Gorilla
1;El Oso;El Oso
1;Bat Out of Hell II: Back into Hell|Bat Out of Hell II;Bat Out of Hell II: Back into Hell
2;To Pimp a Butterfly;To Pimp a Butterfly
2;Dog Man Star;Dog Man Star
2;Elephant (The White Stripes)|Elephant;Elephant
2;Mule Variations;Mule Variations
2;The Snake (Shane MacGowan)|The Snake;The Snake
2;The Crane Wife;The Crane Wife
3;The Fox (Elton John)|The Fox;The Fox
`],
  ["things-with-hand-cranks","Name an object that can be operated by turning a hand crank.","Назовите предмет, который можно привести в действие, вращая ручку.",`
0;meat grinder|mincer;мясорубка
0;hand-crank pencil sharpener|pencil sharpener;ручная точилка для карандашей
0;manual coffee grinder|coffee mill;ручная кофемолка
0;hand-crank flashlight|wind-up flashlight;динамо-фонарик
1;hand drill|brace drill;ручная дрель|коловорот
1;hand-crank radio|wind-up radio;радио с динамо-ручкой
1;hand-crank ice cream maker;ручная мороженица
1;hand-crank egg beater;ручной механический венчик
1;can opener;консервный нож с крутящейся ручкой
1;winch;ручная лебёдка
1;car window crank;ручной стеклоподъёмник
2;hand-crank clothes wringer;ручной отжим для белья
2;hand-crank pasta machine;ручная машинка для пасты
2;hand siren;ручная сирена
2;hand grinder|bench grinder;ручное точило
2;hand-crank film camera;ручная кинокамера
2;Victrola|crank gramophone;патефон|граммофон с ручкой
3;hurdy-gurdy|wheel fiddle;колёсная лира
`],
  ["things-that-squeak","Name something that can squeak when you move or press it.","Назовите что-нибудь, что может скрипнуть или пискнуть, если это подвинуть или нажать.",`
0;door hinge|door;дверная петля|дверь
0;floorboard;половица
0;squeaky toy|rubber duck;игрушка-пищалка|резиновая уточка
0;shoe sole|sneaker sole;подошва ботинка|подошва кроссовка
1;old chair;старый стул
1;bed springs|spring mattress;пружины кровати|пружинный матрас
1;bicycle brake;велосипедный тормоз
1;shopping cart wheel;колесо магазинной тележки
1;window sash;оконная рама
1;chalk;мел
1;windshield wiper;дворник автомобиля
2;loose stair tread;скрипучая ступенька
2;balloon;воздушный шарик
2;eraser;ластик
2;snow under a boot;снег под ботинком
2;styrofoam|polystyrene foam;пенопласт
2;violin bow;скрипичный смычок
3;curd cheese|cheese curds;творожный сыр в зёрнах|сырные зёрна
`],
  ["foods-on-skewers","Name a dish usually cooked or served on a skewer.","Назовите блюдо, которое обычно готовят или подают на шпажке либо шампуре.",`
0;shashlik|shish kebab;шашлык
0;satay;сатай
0;yakitori;якитори
0;marshmallows on sticks;маршмеллоу на палочке
1;souvlaki;сувлаки
1;lyulya kebab|lula kebab;люля-кебаб
1;corn dog;корн-дог
1;cake pop|cake pops;кейк-попс
1;caramel apple|candy apple;яблоко в карамели на палочке
1;mitarashi dango|dango;митараси-данго|данго
1;kushiage|kushikatsu;кусиагэ|кусикацу
2;anticuchos;антикучос
2;arrosticini;арростичини
2;espetada;эшпетада
2;tanghulu;танхулу
2;odeng skewer|eomuk skewer;одэн на шпажке|омук на шпажке
2;pincho moruno|pinchos morunos;пинчо моруно
3;shishito kushiyaki|grilled shishito skewer;жареный перец сисито на шпажке
`],
  ["foods-in-edible-wraps","Name a dish whose outer wrap is meant to be eaten.","Назовите блюдо, у которого съедобная оболочка входит в состав.",`
0;burrito;буррито
0;shawarma|shaurma;шаурма
0;taco;тако
0;dumplings|pelmeni;пельмени
1;spring roll|spring rolls;спринг-ролл|спринг-роллы
1;summer roll|goi cuon|gỏi cuốn;вьетнамский свежий ролл
1;dolma|stuffed vine leaves;долма|фаршированные виноградные листья
1;stuffed cabbage roll;голубец|голубцы
1;gyoza;гёдза
1;baozi;баоцзы
1;kimbap|gimbap;кимбап|кимпаб
2;manti;манты
2;khinkali;хинкали
2;empanada;эмпанада
2;samosa;самса|самоса
2;bánh cuốn|banh cuon;бань куон
2;lumpia;лумпия
3;inari sushi|inarizushi;инари-суши
`],
  ["marsupials","Name a marsupial.","Назовите сумчатое животное.",`
0;kangaroo;кенгуру
0;koala;коала
0;opossum;опоссум
0;wombat;вомбат
1;Tasmanian devil;тасманийский дьявол
1;wallaby;валлаби
1;quokka;квокка
1;sugar glider;сахарная сумчатая летяга
1;tree kangaroo;древесный кенгуру
1;bandicoot;бандикут|сумчатый барсук
1;bilby;билби|кроличий бандикут
2;numbat;намбат|сумчатый муравьед
2;quoll;кволл|сумчатая куница
2;dunnart;даннарт|узконогая сумчатая мышь
2;pademelon;падемелон|филандер
2;bettong;беттонг
2;common brushtail possum;лисовидный кузу
3;monito del monte|colocolo opossum;колоколо|чилийский опоссум
`],
  ["animals-that-build-nests","Name an animal that builds a nest.","Назовите животное, которое строит гнездо.",`
0;swallow;ласточка
0;stork;аист
0;sparrow;воробей
0;magpie;сорока
1;bald eagle;белоголовый орлан
1;beaver;бобр
1;red squirrel;обыкновенная белка
1;paper wasp;бумажная оса
1;bumblebee;шмель
1;chimpanzee;шимпанзе
1;orangutan;орангутан
2;weaverbird|weaver;ткачик
2;red ovenbird|rufous hornero;рыжий печник
2;harvest mouse;мышь-малютка
2;Eurasian penduline tit;обыкновенный ремез
2;King cobra;королевская кобра
2;three-spined stickleback;трёхиглая колюшка
3;Betta splendens|Siamese fighting fish;сиамский петушок
`],
  ["plants-with-thorns","Name a plant with thorns, spines or prickles.","Назовите растение с колючками или шипами.",`
0;rose;роза
0;cactus;кактус
0;blackberry;ежевика
0;raspberry;малина
1;hawthorn;боярышник
1;barberry;барбарис
1;gooseberry;крыжовник
1;blackthorn|sloe;тёрн
1;thistle;чертополох
1;sea buckthorn;облепиха
1;bougainvillea;бугенвиллея
2;firethorn|pyracantha;пираканта
2;honey locust;гледичия
2;silk floss tree|Ceiba speciosa;сейба великолепная
2;prickly pear|Opuntia;опунция
2;Crown of Thorns|Euphorbia milii;молочай Миля
2;holly|Ilex aquifolium;падуб
3;sandbox tree|Hura crepitans;хура трескающаяся
`],
  ["animals-that-change-color","Name an animal whose natural coloring changes with age, season or situation.","Назовите животное, окраска которого меняется с возрастом, сезоном или в зависимости от ситуации.",`
0;chameleon;хамелеон
0;octopus;осьминог
0;Arctic fox;песец
0;hare|mountain hare;заяц-беляк|беляк
1;ermine|stoat;горностай
1;rock ptarmigan;тундряная куропатка
1;cuttlefish;каракатица
1;squid;кальмар
1;flamingo;фламинго
1;mute swan;лебедь-шипун
1;peacock flounder;камбала-ботус
2;zebra shark;зебровая акула
2;mandarin duck;утка-мандаринка|мандаринка
2;green anole;каролинский анолис
2;male paradise fish|Macropodus opercularis;макропод
2;common cuttlefish|Sepia officinalis;обыкновенная каракатица
2;snowshoe hare;американский беляк
3;mimic octopus|Thaumoctopus mimicus;мимический осьминог
`],
  ["lake-countries","Name a country that shares a lake with another country.","Назовите страну, которая делит озеро с другой страной.",`
0;Canada;Канада
0;United States|USA|US;США|Соединённые Штаты
0;Russia;Россия
0;Switzerland;Швейцария
1;France;Франция
1;Germany;Германия
1;Austria;Австрия
1;Italy;Италия
1;Peru;Перу
1;Bolivia;Боливия
1;Chile;Чили
1;Argentina;Аргентина
1;Finland;Финляндия
1;Estonia;Эстония
2;Uganda;Уганда
2;Kenya;Кения
2;Tanzania;Танзания
2;Rwanda;Руанда
2;Burundi;Бурунди
2;Democratic Republic of the Congo|DR Congo;Демократическая Республика Конго|ДР Конго
2;Malawi;Малави
2;Mozambique;Мозамбик
2;Chad;Чад
2;Niger;Нигер
2;Nigeria;Нигерия
2;Cameroon;Камерун
2;Hungary;Венгрия
2;North Macedonia;Северная Македония
2;Montenegro;Черногория
2;Albania;Албания
3;Zambia;Замбия
`],
  ["volcanic-islands","Name an island formed by volcanic activity.","Назовите остров вулканического происхождения.",`
0;Iceland;Исландия
0;Hawaii Island|Big Island of Hawaii|Hawai‘i;Гавайи|Большой остров Гавайи
0;Tenerife;Тенерифе
0;Santorini|Thera;Санторини|Тира
1;Maui;Мауи
1;Oahu;Оаху
1;Kauai;Кауаи
1;La Palma;Ла-Пальма
1;Lanzarote;Лансароте
1;Réunion|Reunion;Реюньон
1;Bali;Бали
1;Stromboli;Стромболи
1;Lipari;Липари
1;Ischia;Искья
2;Pico Island|Pico;Пику
2;Faial;Фаял
2;São Miguel;Сан-Мигел
2;Fernandina;Фернандина
2;Isabela Island;Исабела
2;Easter Island|Rapa Nui;Остров Пасхи|Рапануи
2;Ambrym;Амбрим
2;Anak Krakatau;Анак-Кракатау
2;Fogo;Фогу
3;Surtsey;Сюртсей
`],
  ["rivers-through-capitals","Name a river that flows through a national capital.","Назовите реку, которая протекает через столицу страны.",`
0;Thames;Темза
0;Seine;Сена
0;Moskva River|Moskva;Москва-река|Москва река
0;Danube;Дунай
1;Tiber;Тибр
1;Vltava;Влтава
1;Spree;Шпрее
1;Vistula;Висла
1;Dnieper|Dnipro;Днепр
1;Nile;Нил
1;Ottawa River|Ottawa;Оттава
1;Liffey;Лиффи
1;Tigris;Тигр
2;Mapocho;Мапочо
2;Manzanares;Мансанарес
2;Yamuna;Ямуна
2;Chao Phraya;Чаупхрая
2;Daugava|Western Dvina;Даугава|Западная Двина
2;Anacostia;Анакостия
2;Han River|Han;Ханган
2;Aare;Аре
3;Rímac|Rimac;Римак
`],
  ["bridge-cities","Name a city with a named bridge across a river.","Назовите город, в котором есть мост через реку с собственным названием.",`
0;London;Лондон
0;Paris;Париж
0;Saint Petersburg|St Petersburg;Санкт-Петербург|Петербург
0;Moscow;Москва
1;Prague;Прага
1;Budapest;Будапешт
1;Rome;Рим
1;Florence;Флоренция
1;Berlin;Берлин
1;Dublin;Дублин
1;Lisbon;Лиссабон
1;Porto;Порту
1;Portland Oregon|Portland;Портленд
2;Cologne;Кёльн
2;Dresden;Дрезден
2;Mostar;Мостар
2;Kazan;Казань
2;Tbilisi;Тбилиси
2;Baghdad;Багдад
2;Seoul;Сеул
2;Edmonton;Эдмонтон
2;Ljubljana;Любляна
3;Višegrad|Visegrad Bosnia;Вишеград
`],
  ["solar-system-moons","Name a natural satellite of a planet or dwarf planet in the Solar System.","Назовите естественный спутник планеты или карликовой планеты Солнечной системы.",`
0;Moon|Luna;Луна
0;Titan;Титан
0;Europa;Европа
0;Io;Ио
0;Ganymede;Ганимед
0;Phobos;Фобос
1;Deimos;Деймос
1;Callisto;Каллисто
1;Enceladus;Энцелад
1;Charon;Харон
1;Triton;Тритон
1;Mimas;Мимас
1;Rhea;Рея
1;Titania;Титания
1;Oberon;Оберон
2;Amalthea;Амальтея
2;Himalia;Гималия
2;Iapetus;Япет
2;Dione;Диона
2;Tethys;Тефия|Тетис
2;Hyperion;Гиперион
2;Phoebe;Феба
2;Miranda;Миранда
2;Ariel;Ариэль
2;Umbriel;Умбриэль
2;Nereid;Нереида
2;Proteus;Протей
2;Nix;Никта|Никс
2;Hydra;Гидра
2;Kerberos;Кербер
2;Styx;Стикс
2;Dysnomia;Дисномия
2;Hiʻiaka|Hiiaka;Хииака
3;Namaka;Намака
`],
  ["goal-sports","Name a sport in which a player or team can score a goal.","Назовите вид спорта, в котором игрок или команда могут забить гол.",`
0;football|soccer|association football;футбол
0;ice hockey|hockey;хоккей с шайбой|хоккей
0;handball;гандбол
0;water polo;водное поло
1;field hockey;хоккей на траве
1;lacrosse;лакросс
1;futsal|indoor soccer;футзал|мини-футбол
1;floorball;флорбол
1;horse polo|polo;конное поло|поло
1;beach soccer;пляжный футбол
1;bandy;хоккей с мячом|бенди
2;rink hockey|quad hockey;роллеркей|хоккей на роликах
2;canoe polo|kayak polo;кануполо|поло на каяках
2;underwater hockey;подводный хоккей
2;underwater rugby;подводное регби
2;ringette;рингетт
2;bike polo;велополо
2;Gaelic football;гэльский футбол
2;broomball;брумбол
3;goalball;голбол
`],
  ["ice-sports","Name a sport played or raced on ice.","Назовите вид спорта, которым занимаются на льду.",`
0;ice hockey|hockey;хоккей с шайбой|хоккей
0;figure skating;фигурное катание
0;curling;кёрлинг
0;speed skating;конькобежный спорт
1;short track|short track speed skating;шорт-трек
1;bandy;хоккей с мячом|бенди
1;luge;санный спорт
1;bobsleigh|bobsled;бобслей
1;skeleton;скелетон
1;synchronized skating;синхронное фигурное катание
2;ringette;рингетт
2;ice stock sport|eisstock;айсшток
2;ice cross downhill;скоростной спуск на коньках
2;sledge hockey|para ice hockey;следж-хоккей|парахоккей
2;broomball;брумбол
2;ice speedway|ice racing;мотогонки на льду|айс-спидвей
2;ice yachting|ice sailing;буерный спорт
3;ice golf|snow golf on ice;гольф на льду
`],
  ["tile-laying-games","Name a board game in which placing tiles is a regular part of play.","Назовите настольную игру, где игроки регулярно выкладывают плитки или тайлы.",`
0;dominoes|domino;домино
0;Carcassonne;Каркассон
0;Scrabble;Скрэббл|Эрудит
0;Mahjong;маджонг
1;Azul;Азул
1;Kingdomino;Королевское домино
1;Patchwork;Пэчворк
1;Cascadia;Каскадия
1;Calico;Котики
1;Alhambra;Альгамбра
1;Rummikub;Руммикуб
2;Suburbia;Сабурбия|Пригород
2;Isle of Skye;Остров Скай
2;Tsuro;Цуро
2;Akropolis;Акрополис
2;Dorfromantik: The Board Game|Dorfromantik;Дорфромантик. Настольная игра
2;Castles of Mad King Ludwig;Замки безумного короля Людвига
2;The Castles of Burgundy;Замки Бургундии
3;Aquaretto;Акваретто
`],
  ["games-with-a-glider","Name a video game that lets the player glide through the air under a wing, cape or glider.","Назовите видеоигру, в которой можно планировать в воздухе на крыле, плаще или планере.",`
0;Fortnite;Fortnite
0;Minecraft;Minecraft|Майнкрафт
0;The Legend of Zelda: Breath of the Wild|Breath of the Wild;The Legend of Zelda: Breath of the Wild
0;Genshin Impact;Genshin Impact
1;The Legend of Zelda: Tears of the Kingdom|Tears of the Kingdom;The Legend of Zelda: Tears of the Kingdom
1;Batman: Arkham City|Arkham City;Batman: Arkham City
1;Batman: Arkham Knight|Arkham Knight;Batman: Arkham Knight
1;Just Cause 3;Just Cause 3
1;Just Cause 4;Just Cause 4
1;Far Cry 3;Far Cry 3
1;Far Cry 4;Far Cry 4
2;Super Mario World;Super Mario World
2;Immortals Fenyx Rising;Immortals Fenyx Rising
2;A Short Hike;A Short Hike
2;Palworld;Palworld
2;Grounded;Grounded
2;Enshrouded;Enshrouded
2;Sons of the Forest;Sons of the Forest
3;Superflight;Superflight
`],
  ["races-with-wheels","Name a sport in which competitors race on wheels.","Назовите вид спорта, в котором соревнуются в гонках на колёсах.",`
0;Formula One|Formula 1|F1;Формула-1|Формула 1
0;road cycling|road bicycle racing;шоссейный велоспорт|велогонки
0;kart racing|karting;картинг
0;rallying|car rally|rally;ралли
1;track cycling;велотрек|трековый велоспорт
1;BMX racing;гонки BMX|BMX-гонки
1;mountain bike cross-country|cross-country mountain biking;маунтинбайк кросс-кантри
1;cyclocross;велокросс
1;motocross;мотокросс
1;motorcycle road racing|MotoGP;шоссейно-кольцевые мотогонки|MotoGP
1;stock car racing|NASCAR;гонки сток-каров|NASCAR
2;drag racing;дрэг-рейсинг|драг-рейсинг
2;truck racing;гонки грузовиков
2;inline speed skating;скоростное катание на роликах
2;downhill skateboarding;скоростной спуск на скейтборде
2;wheelchair racing;гонки на колясках
2;speedway;спидвей
3;cycle speedway;велоспидвей
`],
  ["dice-games","Name a game where rolling dice is an ordinary part of play.","Назовите игру, в которой обычно бросают игральные кубики.",`
0;Monopoly;Монополия
0;backgammon;нарды
0;Yahtzee;Ятцы|Яхтзи
0;Dungeons & Dragons|DnD;Подземелья и драконы|ДнД
1;Catan|The Settlers of Catan;Колонизаторы
1;Risk;Риск
1;Ludo;Лудо
1;Snakes and Ladders|Chutes and Ladders;Змеи и лестницы
1;Clue|Cluedo;Клуэдо
1;Farkle;Фаркл|Десять тысяч
1;Craps;крэпс|крапс
2;Qwixx;Квикс
2;King of Tokyo;Повелитель Токио
2;Dice Throne;Dice Throne|Тактические кубики
2;Roll for the Galaxy;Бросок за галактику
2;Can't Stop;Не остановиться
2;Ganz schön clever|That's Pretty Clever;Хитрый ход
2;Bunco;Банко
3;Sagrada;Саграда
`]
];
