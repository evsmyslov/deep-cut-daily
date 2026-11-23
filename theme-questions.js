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

const rotationCards = [
["things-that-fold","Name something that is designed to fold up.","Назовите вещь, которую можно сложить.",`
4;Umbrella;зонт|зонтик
4;Folding chair|camping chair;складной стул|раскладной стул
0;Paper fan|hand fan|folding fan;веер|складной веер
0;Folding table;складной стол|раскладной стол
0;Deckchair|folding deck chair;шезлонг|складной шезлонг
0;Folding bicycle|folding bike;складной велосипед
0;Stroller|pushchair|baby buggy;детская коляска|складная коляска
0;Sofa bed|fold-out couch;диван-кровать|раскладной диван
1;Pocketknife|folding knife;складной нож|перочинный нож
1;Stepladder|folding ladder;стремянка|складная лестница
1;Ironing board;гладильная доска
1;Folding phone|foldable phone|flip phone;телефон-раскладушка|складной телефон
1;Folding cot|camp bed;раскладушка|складная кровать
1;Folding scooter;складной самокат
2;Folding ruler|carpenter's rule;складная линейка|складной метр
2;Folding music stand;складной пюпитр|пюпитр
2;Folding screen|room divider;складная ширма|ширма
3;Folding kayak|origami kayak;складной каяк|складная байдарка
`],
["things-with-pockets","Name something with a pocket for carrying small items.","Назовите вещь, у которой бывает карман для мелочей.",`
4;Jeans;джинсы
4;Jacket|coat;куртка|пальто
0;Backpack|rucksack;рюкзак
0;Handbag|purse;сумочка|дамская сумка
0;Shirt;рубашка
0;Hoodie|sweatshirt;худи|толстовка
0;Trousers|pants;брюки|штаны
0;Shorts;шорты
1;Suitcase;чемодан
1;Apron;фартук|передник
1;Life jacket|life vest;спасательный жилет
1;Work overalls|coveralls|dungarees;рабочий комбинезон|комбинезон
1;Lab coat;лабораторный халат|белый халат
2;Tool belt;пояс для инструментов|пояс плотника
2;Car door|car door pocket;дверь автомобиля|дверь машины
2;Golf bag;сумка для гольфа
2;Laptop sleeve|laptop bag;чехол для ноутбука|сумка для ноутбука
3;Saddlebag|bicycle pannier;велосумка на багажник|седельная сумка
`],
["foods-with-cheese","Name a dish that is usually made with cheese.","Назовите блюдо, которое обычно готовят с сыром.",`
4;Pizza;пицца
4;Cheeseburger;чизбургер
0;Macaroni and cheese|mac and cheese;макароны с сыром|мак энд чиз
0;Khachapuri;хачапури
0;Lasagna|lasagne;лазанья
0;Grilled cheese sandwich|grilled cheese|cheese toastie;горячий бутерброд с сыром|сырный тост
0;Cheesecake;чизкейк
0;Greek salad;греческий салат
1;Quesadilla;кесадилья
1;Caprese salad|caprese;капрезе|салат капрезе
1;Cheese fondue;сырное фондю|фондю
1;Parmesan risotto|risotto alla parmigiana;ризотто с пармезаном
1;Eggplant parmigiana|aubergine parmigiana|eggplant parmesan;баклажаны пармиджана|баклажаны с пармезаном
2;Käsespätzle|kaesespaetzle|cheese spätzle;кезешпецле|шпецле с сыром
2;Tartiflette;тартифлет|тартифлетт
2;Raclette;раклет
2;Pão de queijo|Brazilian cheese bread;пао де кейжо|бразильские сырные булочки
3;Aligot;алиго
`],
["foods-with-rice","Name a dish in which rice is a main ingredient.","Назовите блюдо, в котором рис — один из главных ингредиентов.",`
4;Pilaf|plov|pilau|pulao;плов
4;Sushi;суши
0;Fried rice;жареный рис
0;Risotto;ризотто
0;Paella;паэлья
0;Rice pudding;рисовый пудинг
0;Rice porridge|congee|jook;рисовая каша|конджи
0;Stuffed peppers;фаршированный перец|фаршированные перцы
1;Biryani|biriyani;бирьяни|бирияни
1;Onigiri|rice ball;онигири|рисовый шарик
1;Dolma|dolmades;долма
1;Bibimbap;пибимпап|бибимбап
1;Jambalaya;джамбалайя|джамбалайа
2;Nasi goreng;наси горенг
2;Arancini;аранчини
2;Omurice;омурайсу|омурис
2;Mango sticky rice;клейкий рис с манго
3;Kedgeree;кеджери
`],
["nocturnal-animals","Name an animal that is mostly active at night.","Назовите животное, которое чаще всего активно ночью.",`
4;Owl;сова
4;Bat;летучая мышь
0;Hedgehog;ёж|ёжик
0;Raccoon;енот
0;Red fox|fox;лисица|лиса
0;Badger;барсук
0;Opossum;опоссум
0;Moth;ночная бабочка|мотылёк
1;Aardvark;трубкозуб
1;Jerboa;тушканчик
1;Slow loris|loris;толстый лори|медленный лори
1;Tarsier;долгопят
1;Sugar glider;сахарная сумчатая летяга|сахарный поссум
1;Kakapo;какапо|совиный попугай
2;Fennec fox|fennec;фенек
2;African civet|civet;африканская цивета|цивета
2;Aye-aye|Madagascar aye aye;ай-ай|мадагаскарская руконожка|руконожка
3;Kinkajou;кинкажу
`],
["sports-with-a-ball","Name a sport played with a ball.","Назовите вид спорта, в котором играют мячом.",`
4;Football|soccer|association football;футбол
4;Basketball;баскетбол
0;Volleyball;волейбол
0;Tennis|lawn tennis;теннис|большой теннис
0;Table tennis|ping pong;настольный теннис|пинг-понг
0;Baseball;бейсбол
0;Handball|team handball;гандбол
0;Rugby;регби
1;Golf;гольф
1;Cricket;крикет
1;Softball;софтбол
1;Water polo;водное поло
1;Lacrosse;лакросс
1;Polo|horse polo;поло|конное поло
2;Floorball;флорбол
2;Netball;нетбол
2;Sepak takraw;сепак такро|сепактакрау
2;Gaelic football;гэльский футбол
3;Korfball;корфбол
`],
["films-with-time-travel","Name a film involving time travel or a time loop.","Назовите фильм о путешествии во времени или временной петле.",`
4;Back to the Future|BTTF;Назад в будущее
4;The Terminator|Terminator;Терминатор
0;Interstellar;Интерстеллар
0;Harry Potter and the Prisoner of Azkaban|Prisoner of Azkaban;Гарри Поттер и узник Азкабана|Узник Азкабана
0;Avengers: Endgame|Avengers Endgame|Endgame;Мстители: Финал
0;Groundhog Day;День сурка
0;Edge of Tomorrow|Live Die Repeat;Грань будущего
1;The Time Machine|The Time Machine 2002;Машина времени
1;About Time;Бойфренд из будущего
1;Looper;Петля времени
1;Twelve Monkeys|12 Monkeys;12 обезьян|Двенадцать обезьян
1;The Butterfly Effect|Butterfly Effect;Эффект бабочки
1;Bill & Ted's Excellent Adventure|Bill and Teds Excellent Adventure;Невероятные приключения Билла и Теда
2;Timecrimes|Los cronocrímenes;Временная петля
2;Predestination;Патруль времени
2;Primer|Primer 2004;Детонатор
2;Time After Time|Time After Time 1979;Путешествие в машине времени
3;Beyond the Infinite Two Minutes;За пределами бесконечных двух минут
`],
["films-with-dinosaurs","Name a film that features a dinosaur.","Назовите фильм, в котором появляется динозавр.",`
4;Jurassic Park;Парк юрского периода
4;Jurassic World;Мир юрского периода
0;The Good Dinosaur|Good Dinosaur;Хороший динозавр
0;Ice Age: Dawn of the Dinosaurs|Ice Age 3;Ледниковый период 3: Эра динозавров|Ледниковый период 3
0;The Land Before Time|Land Before Time;Земля до начала времён
0;Dinosaur|Dinosaur 2000|Disney's Dinosaur;Динозавр
0;King Kong|King Kong 2005;Кинг-Конг
1;Night at the Museum;Ночь в музее
1;The Lost World: Jurassic Park|Jurassic Park 2;Парк юрского периода: Затерянный мир|Парк юрского периода 2
1;We're Back! A Dinosaur's Story|Were Back;Мы вернулись! История динозавра
1;Walking with Dinosaurs|Walking with Dinosaurs 2013;Прогулки с динозаврами
1;Journey to the Center of the Earth|Journey to the Center of the Earth 2008;Путешествие к центру Земли
2;Caveman|Caveman 1981;Пещерный человек
2;The Lost World|The Lost World 1925;Затерянный мир|Затерянный мир 1925
2;Baby: Secret of the Lost Legend|Baby Secret of the Lost Legend;Динозавр: Тайна затерянной легенды
2;The Valley of Gwangi|Valley of Gwangi;Долина Гванги
2;When Dinosaurs Ruled the Earth;Когда динозавры правили Землёй
3;Gertie the Dinosaur;Динозавр Герти|Герти-динозавр
`],
["films-with-pirates","Name a film featuring a pirate.","Назовите фильм, в котором есть пират.",`
4;Pirates of the Caribbean: The Curse of the Black Pearl|Pirates of the Caribbean|The Curse of the Black Pearl;Пираты Карибского моря: Проклятие Чёрной жемчужины|Пираты Карибского моря
4;Peter Pan|Peter Pan 1953;Питер Пэн
0;Hook|Hook 1991;Капитан Крюк
0;Treasure Planet;Планета сокровищ
0;The Princess Bride|Princess Bride;Принцесса-невеста
0;Treasure Island|Treasure Island 1988;Остров сокровищ
0;Sinbad: Legend of the Seven Seas|Sinbad;Синдбад: Легенда семи морей
1;Captain Phillips;Капитан Филлипс
1;The Pirates! In an Adventure with Scientists!|The Pirates Band of Misfits;Пираты! Банда неудачников
1;Cutthroat Island;Остров головорезов
1;The Sea Beast|Sea Beast;Морской монстр
1;The SpongeBob SquarePants Movie|SpongeBob Movie;Губка Боб Квадратные Штаны
2;Captain Blood;Одиссея капитана Блада|Капитан Блад
2;The Crimson Pirate|Crimson Pirate;Багровый пират
2;Yellowbeard;Жёлтая Борода
2;The Pirates 2014;Пираты 2014
2;Porco Rosso;Порко Россо
3;Anne of the Indies;Анна — королева пиратов
`],
["films-at-sea","Name a film in which much of the story takes place at sea.","Назовите фильм, в котором значительная часть событий происходит в море.",`
4;Titanic;Титаник
4;Life of Pi;Жизнь Пи
0;Jaws;Челюсти
0;Finding Nemo;В поисках Немо
0;Moana|Vaiana;Моана
0;Das Boot|The Boat;Подводная лодка
0;The Perfect Storm|Perfect Storm;Идеальный шторм
1;Master and Commander: The Far Side of the World|Master and Commander;Хозяин морей: На краю Земли|Хозяин морей
1;The Hunt for Red October|Hunt for Red October;Охота за «Красным Октябрём»|Охота за Красным Октябрем
1;In the Heart of the Sea|Heart of the Sea;В сердце моря
1;All Is Lost;Не угаснет надежда
1;Triangle of Sadness;Треугольник печали
2;Lifeboat|Lifeboat 1944;Спасательная шлюпка
2;Crimson Tide;Багровый прилив
2;Kon-Tiki|Kon Tiki;Кон-Тики
2;The Finest Hours|Finest Hours;И грянул шторм
2;Dead Calm;Мёртвый штиль
3;A Night to Remember|A Night to Remember 1958;Гибель «Титаника»|Незабываемая ночь
`],
["songs-with-names","Name a song with a first name in its title.","Назовите песню, в названии которой есть имя человека.",`
4;Billie Jean|Billie Jean Michael Jackson;Билли Джин|Билли Джин Майкл Джексон
4;Jolene|Jolene Dolly Parton;Джолин|Джолин Долли Партон
0;Hey Jude|Hey Jude Beatles;Хей Джуд|Эй Джуд
0;Sweet Caroline|Sweet Caroline Neil Diamond;Свит Кэролайн
0;Roxanne|Roxanne The Police;Роксанна
0;Tanechka|Tanechka Carnival Night;Танечка
0;Alisa|Sekret Alisa;Алиса|Алиса Секрет
0;Katyusha|Katiusha;Катюша
1;Come On Eileen|Come On Eileen Dexys Midnight Runners;Кам он Айлин
1;Dear Prudence|Dear Prudence Beatles;Дорогая Пруденс
1;Eleanor Rigby|Eleanor Rigby Beatles;Элеанор Ригби|Элинор Ригби
1;Alison|Alison Elvis Costello;Элисон Костелло
1;Aleksandra|Alexandra Moscow Does Not Believe in Tears;Александра|Александра Москва слезам не верит
1;Alyosha;Алёша
2;Veronica|Veronica Elvis Costello;Вероника Элвис Костелло
2;Alejandro|Alejandro Lady Gaga;Алехандро
2;The Ballad of John and Yoko|Ballad of John and Yoko;Баллада о Джоне и Йоко
3;A Song for Jeffrey|A Song for Jeffrey Jethro Tull;Песня для Джеффри
`],
["songs-with-animals","Name a song with an animal in its title.","Назовите песню, в названии которой есть животное.",`
4;Eye of the Tiger;Глаз тигра|Ай оф зе тайгер
4;Baby Shark;Бэйби шарк|Малыш акулёнок
0;Who Let the Dogs Out|Who Let the Dogs Out Baha Men;Кто выпустил собак
0;Blackbird|Blackbird Beatles;Чёрный дрозд|Блэкбёрд
0;Hound Dog|Hound Dog Elvis;Хаунд дог
0;The Lion Sleeps Tonight|Lion Sleeps Tonight;Лев спит сегодня ночью
0;A Grasshopper Sat in the Grass;В траве сидел кузнечик|Кузнечик
0;Two Cheerful Geese;Два весёлых гуся
1;War Pigs|War Pigs Black Sabbath;Военные свиньи|Вор пигс
1;Wild Horses|Wild Horses Rolling Stones;Дикие лошади
1;Crocodile Rock|Crocodile Rock Elton John;Крокодайл рок|Крокодиловый рок
1;Three Little Birds|Three Little Birds Bob Marley;Три маленькие птички
1;Feed the Birds|Feed the Birds Mary Poppins;Покормите птиц
1;White Rabbit|White Rabbit Jefferson Airplane;Белый кролик
2;Rock Lobster|Rock Lobster B-52s;Рок лобстер
2;Black Cat|Black Cat Janet Jackson;Чёрная кошка Джанет Джексон
2;A Horse with No Name|Horse with No Name;Лошадь без имени
3;Albatross|Albatross Fleetwood Mac;Альбатрос Fleetwood Mac
`],
["bands-with-numbers","Name a band whose name contains a digit.","Назовите музыкальную группу, в названии которой есть цифра.",`
4;U2;Ю ту|Ю2
4;Maroon 5;Марун 5|Марун файв
0;Blink-182|Blink 182;Блинк-182
0;Sum 41;Сам 41|Сум 41
0;5 Seconds of Summer|5SOS;5 секунд лета
0;2 Unlimited;Ту Анлимитед|2 Анлимитед
0;30 Seconds to Mars|Thirty Seconds to Mars;30 секунд до Марса
0;5'nizza|5nizza;Пятница|5ница
1;7B|7B band;7Б
1;UB40;Ю би 40
1;3 Doors Down;3 Дорс Даун
1;The 1975;1975
1;The B-52s|B-52s|B52s;Би 52
1;2 Brothers on the 4th Floor;2 Бразерс он зе 4 флор
2;10cc;10 сс
2;999|999 band;Группа 999
2;8 Bit Weapon;Восьмибитное оружие|8 бит оружие
3;65daysofstatic|65 Days of Static;65 дней статики
`],
["music-duos","Name a music act best known as a duo.","Назовите музыкальную группу, известную как дуэт.",`
4;Daft Punk;Дафт Панк
4;Simon & Garfunkel|Simon and Garfunkel;Саймон и Гарфанкел
0;Roxette;Роксет|Роксетт
0;t.A.T.u.|tatu;Тату
0;The White Stripes|White Stripes;Уайт Страйпс|Вайт Страйпс
0;Eurythmics;Юритмикс|Эвритмикс
0;Pet Shop Boys;Пет Шоп Бойз
0;The Black Keys|Black Keys;Блэк Киз
1;Hall & Oates|Daryl Hall and John Oates;Холл и Оутс
1;Twenty One Pilots;Твенти Уан Пайлотс
1;The Chemical Brothers|Chemical Brothers;Кемикал Бразерс
1;The Proclaimers|Proclaimers;Проклеймерс
1;MGMT;Эм Джи Эм Ти
1;5'nizza|5nizza;Пятница|5ница
2;The Kills|Kills;Зе Киллз
2;Air|Air French duo;Эйр|Эйр французский дуэт
2;Erasure;Ирейжер|Ирейжур
3;Everything But the Girl|EBTG;Эврисинг Бат Зе Гёрл
`],
["car-brands-s","Name a car brand whose Latin-script name starts with S (including Š).","Назовите автомобильную марку на латинскую S или Š.",`
4;Subaru;Субару
4;Suzuki;Судзуки|Сузуки
4;Škoda|Skoda;Шкода
0;SEAT;Сеат
0;Smart;Смарт
0;Saab;Сааб
0;SsangYong|Ssang Yong;Ссанъён|Ссангйонг|Сангёнг
0;Shelby;Шелби
1;Studebaker;Студебекер
1;Saturn;Сатурн
1;Scion;Сайон|Сцион
1;Seres;Серес
1;Simca;Симка
2;Saleen;Салин|Сейлин
2;Spyker;Спайкер
2;Sunbeam;Санбим
2;Saipa;Сайпа
2;Soueast;Соуист
3;Sachsenring;Заксенринг
`]
];
