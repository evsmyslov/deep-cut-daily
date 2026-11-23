"use strict";

// Use unique IDs. Append new answers so saved results keep their original IDs.
const themeCards = [
["film-narrators","Name a film told in part by a character who narrates.","Назовите фильм, в котором один из героев рассказывает историю за кадром.",`
4;Forrest Gump;Форрест Гамп
4;The Shawshank Redemption|Shawshank;Побег из Шоушенка
0;Fight Club;Бойцовский клуб
0;Goodfellas;Славные парни
0;The Wolf of Wall Street;Волк с Уолл-стрит
0;The Green Mile;Зелёная миля
0;American Beauty;Красота по-американски
1;Trainspotting;На игле
1;A Christmas Story;Рождественская история
1;The Usual Suspects;Подозрительные лица
1;Stand by Me;Останься со мной
1;Casino;Казино
1;Sunset Boulevard|Sunset Blvd;Бульвар Сансет
2;Edward Scissorhands;Эдвард Руки-ножницы
2;The Sandlot;Площадка
2;Fear and Loathing in Las Vegas;Страх и ненависть в Лас-Вегасе
2;Adaptation|Adaptation 2002;Адаптация
2;The Big Lebowski|Big Lebowski;Большой Лебовски
2;A Clockwork Orange|Clockwork Orange;Заводной апельсин
3;Badlands|Badlands 1973;Пустоши|Бесплодные земли
`],
["film-animals-speak","Name a film with an animal that speaks a human language.","Назовите фильм, в котором животное говорит на человеческом языке.",`
4;Shrek;Шрек
4;The Lion King|Lion King;Король Лев
0;Madagascar;Мадагаскар
0;Ice Age;Ледниковый период
0;Finding Nemo;В поисках Немо
0;Kung Fu Panda;Кунг-фу Панда
0;Ratatouille;Рататуй
0;Zootopia|Zootropolis;Зверополис
1;Babe;Бэйб: Четвероногий малыш|Бэйб
1;Stuart Little;Стюарт Литтл
1;The Jungle Book|Jungle Book;Книга джунглей
1;Charlotte's Web|Charlottes Web;Паутина Шарлотты
1;Paddington;Приключения Паддингтона|Паддингтон
1;Fantastic Mr. Fox|Fantastic Mr Fox;Бесподобный мистер Фокс
1;Doctor Dolittle|Dr Dolittle;Доктор Дулиттл
2;The Secret of NIMH|Secret of Nimh;Секрет крыс|Секрет Н.И.М.Х.
2;Cats & Dogs|Cats and Dogs;Кошки против собак
2;Watership Down|Watership Down 1978;Обитатели холмов|Уотершипский холм
3;The Plague Dogs|Plague Dogs;Чумные псы|Отчаянные псы
`],
["films-with-trains","Name a film where a train is important to the story.","Назовите фильм, в котором поезд играет важную роль.",`
4;Snowpiercer;Сквозь снег
4;Murder on the Orient Express;Убийство в Восточном экспрессе
0;Train to Busan;Поезд в Пусан
0;The Polar Express|Polar Express;Полярный экспресс
0;Bullet Train;Быстрее пули
0;Harry Potter and the Philosopher's Stone|Harry Potter and the Sorcerer's Stone;Гарри Поттер и философский камень
1;Source Code;Исходный код
1;Unstoppable|Unstoppable 2010;Неуправляемый
1;The Darjeeling Limited|Darjeeling Limited;Поезд на Дарджилинг. Отчаянные путешественники|Поезд на Дарджилинг
1;The Girl on the Train|Girl on the Train;Девушка в поезде
1;The Commuter|Commuter;Пассажир
1;Before Sunrise;Перед рассветом
1;Back to the Future Part III|Back to the Future 3;Назад в будущее 3
2;The General|The General 1926|Buster Keaton's The General;Генерал|Паровоз Генерал
2;Runaway Train;Поезд-беглец
2;The Taking of Pelham One Two Three|The Taking of Pelham 123;Захват поезда Пелэм 123|Опасные пассажиры поезда 123
2;Transsiberian;Транссибирский экспресс
2;The Train|The Train 1964;Поезд|Поезд 1964
2;Silver Streak;Серебряная стрела
3;The Narrow Margin|Narrow Margin 1952;Узкая грань|Узкая грань 1952
`],
["animated-robots","Name an animated film whose plot involves a robot.","Назовите полнометражный мультфильм, в котором важную роль играет робот.",`
4;WALL-E|WALL E|WALLE;ВАЛЛ-И|Валли
4;Big Hero 6;Город героев
0;The Iron Giant|Iron Giant;Стальной гигант
0;Robots|Robots 2005;Роботы
0;The Wild Robot|Wild Robot;Дикий робот
0;Astro Boy|Astro Boy 2009;Астробой
1;The Mitchells vs. the Machines|Mitchells vs the Machines;Митчеллы против машин
1;Transformers One|Transformers 1 2024;Трансформеры: Начало
1;Ron’s Gone Wrong|Rons Gone Wrong;Неисправимый Рон
1;Meet the Robinsons;В гости к Робинсонам
1;The Incredibles|Incredibles;Суперсемейка
1;Next Gen;Следующее поколение
1;Lightyear;Базз Лайтер
2;Robot Dreams;Мечты робота
2;Castle in the Sky|Laputa Castle in the Sky;Небесный замок Лапута
2;9|Nine 2009;Девять|9
2;Appleseed|Appleseed 2004;Яблочное зёрнышко|Яблочное семя
3;Eve no Jikan|Time of Eve;Время Евы
`],
["named-soundtracks","Name a film whose original score was composed by Hans Zimmer.","Назовите фильм, к которому Ханс Циммер написал музыку.",`
4;Interstellar;Интерстеллар
4;Inception;Начало
0;The Lion King|Lion King;Король Лев
0;Dune|Dune 2021;Дюна|Дюна 2021
0;Gladiator;Гладиатор
0;The Dark Knight|Dark Knight;Тёмный рыцарь
0;Pirates of the Caribbean: Dead Man's Chest|Dead Mans Chest;Пираты Карибского моря: Сундук мертвеца|Сундук мертвеца
1;Dunkirk;Дюнкерк
1;Man of Steel;Человек из стали
1;The Last Samurai|Last Samurai;Последний самурай
1;The Prince of Egypt|Prince of Egypt;Принц Египта
1;Kung Fu Panda;Кунг-фу Панда
1;Rain Man;Человек дождя
1;Madagascar;Мадагаскар
2;The Holiday|The Holiday 2006;Отпуск по обмену
2;Crimson Tide;Багровый прилив
2;The Thin Red Line|Thin Red Line;Тонкая красная линия
2;The Road to El Dorado|Road to El Dorado;Дорога на Эльдорадо
2;Thelma & Louise|Thelma and Louise;Тельма и Луиза
2;Backdraft;Обратная тяга
3;A League of Their Own;Их собственная лига
`],
["drum-family","Name a kind of drum.","Назовите разновидность барабана.",`
4;bass drum|kick drum;бас-барабан|бочка
4;snare drum;малый барабан|рабочий барабан
0;tom-tom|tom drum;том-том|том
0;bongo|bongos;бонго|бонги
0;conga|congas;конга|конги
0;timpani|kettledrum;литавры|литавра
1;djembe;джембе
1;tabla;табла
1;taiko;тайко
1;darbuka|doumbek;дарбука|думбек
1;bodhrán|bodhran;бойран|боран
1;cajón|cajon;кахон
1;frame drum;рамочный барабан
2;surdo;сурду
2;repinique;репинике
2;talking drum;говорящий барабан
2;mridangam;мридангам
2;udu;уду
2;dhol;дхол
3;kendang|gendang;кенданг|генданг
`],
["keyboard-instruments","Name a musical instrument played with a keyboard.","Назовите музыкальный инструмент с клавиатурой.",`
4;piano|grand piano|fortepiano;фортепиано|рояль|пианино
4;synthesizer|synth;синтезатор
0;organ|pipe organ;орган|духовой орган
0;accordion|piano accordion;аккордеон
0;bayan|button accordion;баян
0;harpsichord;клавесин
1;digital piano|electric piano;цифровое пианино|электропианино
1;celesta;челеста
1;harmonium|reed organ;фисгармония|гармониум
1;melodica|pianica;мелодика
2;clavichord;клавикорд
2;keytar;клавитара|кейтар
2;Mellotron;меллотрон
2;ondes Martenot;волны Мартено|онд Мартено
2;carillon;карильон
2;glasschord;стеклянный клавикорд|глассхорд
3;clavioline;клавиолин
`],
["titles-sing-colors","Name a song with a color in its title.","Назовите песню, в названии которой есть цвет.",`
4;Yellow Submarine;Yellow Submarine|Жёлтая подводная лодка
4;Back in Black;Back in Black|Снова в чёрном
0;Paint It Black|Paint It, Black;Paint It Black|Покрась это в чёрный
0;Purple Rain;Purple Rain|Пурпурный дождь
0;Blue Suede Shoes;Blue Suede Shoes|Синие замшевые туфли
0;Blackbird;Blackbird|Чёрный дрозд
0;Yellow by Coldplay|Yellow;Yellow|Жёлтая
1;Blue Monday;Blue Monday
1;Golden Brown;Golden Brown
1;Red Red Wine;Red Red Wine
1;White Rabbit;White Rabbit|Белый кролик
1;Black or White;Black or White|Чёрный или белый
1;Mr. Blue Sky|Mr Blue Sky;Mr. Blue Sky
1;Голубой вагон|Blue Wagon;Голубой вагон
1;Красные маки|Red Poppies;Красные маки
2;Pink Moon;Pink Moon|Розовая луна
2;Silver Springs;Silver Springs
2;White Houses;White Houses
2;Green Onions;Green Onions|Зелёный лук
2;Black Magic Woman;Black Magic Woman
2;Orange Crush;Orange Crush
2;Розовый фламинго|Pink Flamingo;Розовый фламинго
3;Black Coffee in Bed;Black Coffee in Bed|Чёрный кофе в постель
`],
["sounds-on-record","Name something musicians use to make a sound louder.","Назовите предмет, с помощью которого музыканты усиливают звук.",`
4;amplifier|amp;усилитель|усилок
4;microphone|mic;микрофон
0;loudspeaker|speaker|speakers;колонка|динамик|акустическая колонка
0;megaphone;мегафон
0;guitar amplifier|guitar amp|combo amp;гитарный усилитель|комбоусилитель|комбик
0;soundboard|sound board|mixing console|mixer;микшер|микшерный пульт
1;preamplifier|preamp;предусилитель|предусилок
1;PA system|public address system;звукоусилительная система|концертная акустика|PA
1;monitor speaker|stage monitor;сценический монитор
1;bass amplifier|bass amp;басовый усилитель|басовый комбик
1;subwoofer;сабвуфер
2;boost pedal|clean boost;педаль буста|бустер
2;line booster|line amplifier;линейный усилитель|линейный бустер
2;acoustic horn|horn loudspeaker;акустический рупор|рупор
2;theatre acoustical shell|acoustic shell;акустическая раковина|сценическая раковина
3;Leslie speaker|Leslie cabinet;кабинет Лесли|динамик Лесли
`],
["kitchen-grates","Name something in a kitchen with holes in it.","Назовите кухонный предмет, в котором есть отверстия.",`
4;colander;дуршлаг
4;grater;тёрка
0;sieve|strainer;сито|ситечко
0;slotted spoon;шумовка
0;salt shaker;солонка
0;pepper shaker;перечница
0;kitchen sink|sink;кухонная мойка|раковина
1;tea strainer;ситечко для чая
1;garlic press;чеснокодавка|пресс для чеснока
1;potato masher;толкушка|картофелемялка
1;steamer basket|steamer;паровая корзина|пароварка
1;perforated pizza pan|pizza screen;перфорированная форма для пиццы|сетка для пиццы
1;water filter|filter jug;фильтр для воды|фильтр-кувшин
2;food mill;протирочная мельница|протирочная машина
2;drinking straw|straw;трубочка|соломинка
2;pepper grinder|pepper mill;мельница для перца
2;spice shaker;дозатор для специй|баночка для специй
2;spaetzle maker|spatzle maker;тёрка для шпецле
3;ricer|potato ricer;пресс для картофеля
`],
["things-on-fridges","Name something people attach to the outside of a refrigerator.","Назовите то, что люди крепят снаружи холодильника.",`
4;fridge magnet|magnet;магнитик|магнит|магнит на холодильник
4;shopping list;список покупок
0;photo|picture;фотография|фото
0;children's drawing|drawing;детский рисунок|рисунок
0;note|sticky note|post it;записка|стикер
0;calendar;календарь
1;menu|takeout menu;меню|меню доставки
1;postcard;открытка
1;to-do list|todo list;список дел
1;recipe;рецепт
1;sticker;наклейка
1;fridge whiteboard|whiteboard;маркерная доска|доска для записей
1;souvenir magnet;сувенирный магнит
2;magnetic clip|clip;магнитный зажим|клипса
2;magnetic poetry|word magnets;магнитные слова|магнитная поэзия
2;weekly meal planner|meal planner;план питания|меню на неделю
2;magnetic bottle opener|bottle opener;магнитная открывалка|открывалка
2;magnetic kitchen timer|kitchen timer;кухонный таймер
3;magnetic spice rack|spice rack;магнитная полка для специй|подставка для специй
`],
["flat-baked-foods","Name a flatbread people cook in a pan or on a griddle.","Назовите лепёшку, которую готовят на сковороде или жарочной плите.",`
4;tortilla;тортилья
4;chapati|roti;чапати|роти
0;paratha;паратха|парата
0;arepa;арепа
0;pita;пита
1;injera;ынджера|инджера
1;dosa;доса
1;tiganopsomo;тиганопсомо
1;gözleme|gozleme;гёзлеме|гезлеме
1;bazlama;базлама
1;piadina;пьядина|пиадина
2;lefse;лефсе
2;frybread|fry bread;жареная индейская лепёшка|фрайбрэд
2;msemen|rghaif;мсемен|мсеммен
2;bing|jianbing;цзяньбин|бин
2;guokui;гокуй|гокуэй
3;tunnbröd|tunnbrod;туннбрёд
`],
["round-kitchen-objects","Name a kitchen utensil with a circular part.","Назовите кухонный инструмент с круглой деталью.",`
4;pizza cutter;нож для пиццы|пиццерезка
4;ladle;половник|поварёшка
0;round cookie cutter|cookie cutter;круглая формочка|формочка для печенья
0;kitchen sieve|sieve;кухонное сито|сито
0;can opener;консервный нож
0;pot lid|pan lid;крышка кастрюли|крышка сковороды
1;rolling pin;скалка
1;apple corer;нож для сердцевины яблок|корер
1;melon baller;ложка для шариков|нуазетка
1;ice cream scoop;ложка для мороженого
1;egg ring|pancake ring;кольцо для яичницы
1;round grater|rotary grater;барабанная тёрка|роторная тёрка
1;kitchen funnel|funnel;кухонная воронка|воронка
2;dough docker|dough roller docker;ролик для прокалывания теста|ролик-докер
2;pastry wheel|pastry cutter wheel;фигурный нож для теста|ролик для теста
2;pastry tamper|tart tamper;пестик для тарталеток
2;meat grinder|mincer;мясорубка
2;drum sieve|tamis;барабанное сито|тами
3;biscuit press|cookie press;шприц-пресс для печенья
`],
["birds-red","Name a bird with some red in its plumage.","Назовите птицу, в оперении которой есть красный цвет.",`
4;bullfinch;снегирь
4;robin|European robin;зарянка|малиновка
0;northern cardinal|cardinal;красный кардинал|кардинал
0;great spotted woodpecker|woodpecker;большой пёстрый дятел|дятел
0;scarlet macaw|red macaw;красный ара|ара
1;goldfinch|European goldfinch;щегол
1;red crossbill|crossbill;клёст-еловик|клёст
1;rosefinch|common rosefinch;обыкновенная чечевица|чечевица
1;scarlet tanager;алая танагра
1;red-breasted goose;краснозобая казарка
1;red-headed woodpecker;красноголовый меланерпес|красноголовый дятел
2;scarlet ibis;красный ибис
2;red-winged blackbird;красноплечий чёрный трупиал
2;vermilion flycatcher;красный тиранн
2;red siskin;огненный чиж|красный чиж
2;pine grosbeak;щур
2;red avadavat;красный астрильд|амандава
3;scarlet-backed flowerpecker;красноспинный цветоед
`],
["plants-climb","Name a plant that can climb a wall or a support.","Назовите растение, которое может виться по стене или опоре.",`
4;ivy|English ivy;плющ
4;grapevine|grape vine;виноград|виноградная лоза
0;hops|hop;хмель
0;climbing rose|rambling rose;плетистая роза
0;clematis;клематис|ломонос
0;beans|pole beans|runner bean;вьющаяся фасоль|фасоль
0;pea|garden pea;горох
1;honeysuckle|climbing honeysuckle;вьющаяся жимолость|жимолость|каприфоль
1;morning glory;ипомея|вьюнок
1;wisteria;глициния
1;Virginia creeper;девичий виноград|партеноциссус
1;passionflower|passion fruit;пассифлора|страстоцвет|маракуйя
1;climbing hydrangea;гортензия черешковая|черешковая гортензия
2;trumpet vine|campsis;кампсис
2;black-eyed Susan vine|thunbergia;тунбергия
2;Akebia|chocolate vine;акебия
2;bougainvillea;бугенвиллея
2;vanilla orchid|vanilla;ваниль|ванильная орхидея
2;Schisandra chinensis|magnolia vine;лимонник китайский|лимонник
3;canary creeper|Tropaeolum peregrinum;настурция иноземная|канарская настурция
`]
];
