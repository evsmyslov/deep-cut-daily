"use strict";

// One row per concept: [rarity, English names, Russian names]. The first name
// in each language is shown in the recap. Aliases never change its score.
const groups = [
  ["science", [
    [["Name one of the seven SI base quantities.", "Назовите одну из семи основных величин Международной системы единиц (СИ)."], [
      [0,"time","время"],[0,"length","длина"],[1,"mass","масса"],[1,"thermodynamic temperature|temperature","термодинамическая температура|температура"],[2,"electric current|current","сила тока|сила электрического тока|электрический ток|ток"],[2,"amount of substance","количество вещества"],[3,"luminous intensity","сила света"]
    ]],
    [["Name one of the elements with atomic numbers 1 through 10.", "Назовите элемент с атомным номером от 1 до 10 включительно."], [
      [0,"hydrogen|h","водород"],[0,"oxygen|o","кислород"],[0,"carbon|c","углерод"],[1,"helium|he","гелий"],[1,"nitrogen|n","азот"],[1,"neon|ne","неон"],[2,"lithium|li","литий"],[2,"fluorine|f","фтор"],[2,"boron|b","бор"],[3,"beryllium|be","бериллий"]
    ]],
    [["Name one of the seven colors in the traditional rainbow sequence.", "Назовите один из семи цветов в традиционной последовательности цветов радуги. В английской традиции blue и indigo соответствуют голубому и синему."], [
      [0,"red","красный"],[0,"green","зелёный"],[1,"yellow","жёлтый"],[1,"blue|light blue","голубой"],[2,"orange","оранжевый"],[2,"violet|purple","фиолетовый"],[3,"indigo|dark blue","синий|индиго"]
    ]],
    [["Name one of the eight planets in the Solar System.", "Назовите одну из восьми планет Солнечной системы."], [
      [0,"Earth","Земля"],[0,"Mars","Марс"],[1,"Venus","Венера"],[1,"Jupiter","Юпитер"],[1,"Saturn","Сатурн"],[2,"Mercury","Меркурий"],[2,"Neptune","Нептун"],[3,"Uranus","Уран"]
    ]],
    [["Name one of the four Galilean moons of Jupiter.", "Назовите один из четырёх галилеевых спутников Юпитера."], [
      [0,"Europa","Европа"],[1,"Io","Ио"],[2,"Ganymede","Ганимед"],[3,"Callisto","Каллисто|Калисто"]
    ]],
    [["Name a naturally occurring noble gas with an atomic number below 55.", "Назовите встречающийся в природе благородный газ с атомным номером меньше 55."], [
      [0,"helium|he","гелий"],[1,"neon|ne","неон"],[1,"argon|ar","аргон"],[2,"xenon|xe","ксенон"],[3,"krypton|kr","криптон"]
    ]],
    [["Name one of the eight SI prefixes from kilo through yotta, including both endpoints. Use the prefix name.", "Назовите одну из восьми приставок СИ от кило до йотта включительно. Введите название приставки."], [
      [0,"kilo","кило"],[0,"mega","мега"],[1,"giga","гига"],[1,"tera","тера"],[2,"peta","пета"],[2,"yotta","йотта|иотта"],[2,"exa","экса"],[3,"zetta","зетта"]
    ]]
  ]],
  ["places", [
    [["Name a country that shares a land border with Germany.", "Назовите страну, у которой есть сухопутная граница с Германией."], [
      [0,"France","Франция"],[0,"Poland","Польша"],[1,"Austria","Австрия"],[1,"Switzerland","Швейцария"],[1,"Netherlands|the netherlands|holland","Нидерланды|Голландия"],[2,"Czechia|czech republic|the czech republic","Чехия|Чешская Республика"],[2,"Belgium","Бельгия"],[2,"Denmark","Дания"],[3,"Luxembourg","Люксембург"]
    ]],
    [["Name one of Canada's ten provinces.", "Назовите одну из десяти провинций Канады."], [
      [0,"Ontario","Онтарио"],[0,"Quebec","Квебек"],[1,"British Columbia|bc|b c","Британская Колумбия"],[1,"Alberta","Альберта"],[2,"Manitoba","Манитоба"],[2,"Nova Scotia","Новая Шотландия"],[2,"Newfoundland and Labrador|newfoundland labrador","Ньюфаундленд и Лабрадор|Ньюфаундленд"],[2,"Saskatchewan","Саскачеван"],[2,"New Brunswick","Нью-Брансуик|Нью-Брансвик"],[3,"Prince Edward Island|pei|p e i","Остров Принца Эдуарда"]
    ]],
    [["Name one of the four main islands of Japan.", "Назовите один из четырёх главных островов Японии."], [
      [0,"Honshu|honshū","Хонсю|Хоншу"],[1,"Hokkaido|hokkaidō","Хоккайдо"],[2,"Kyushu|kyūshū","Кюсю|Кьюшу"],[3,"Shikoku","Сикоку|Шикоку"]
    ]],
    [["Name one of the five sovereign Nordic countries.", "Назовите одно из пяти независимых государств Северной Европы, входящих в Северный совет."], [
      [0,"Sweden","Швеция"],[1,"Norway","Норвегия"],[1,"Finland","Финляндия"],[2,"Denmark","Дания"],[3,"Iceland","Исландия"]
    ]],
    [["Name one of the five countries with a coast on the Caspian Sea.", "Назовите одну из пяти стран, имеющих береговую линию на Каспийском море."], [
      [0,"Russia|russian federation","Россия|РФ|Российская Федерация"],[1,"Iran","Иран"],[1,"Kazakhstan","Казахстан"],[2,"Azerbaijan","Азербайджан"],[3,"Turkmenistan","Туркменистан|Туркмения"]
    ]],
    [["Name one of the five oceans.", "Назовите один из пяти океанов."], [
      [0,"Pacific Ocean|pacific","Тихий океан|Тихий"],[0,"Atlantic Ocean|atlantic","Атлантический океан|Атлантический|Атлантика"],[1,"Indian Ocean|indian","Индийский океан|Индийский"],[2,"Arctic Ocean|arctic","Северный Ледовитый океан|Северный Ледовитый"],[3,"Southern Ocean|southern|antarctic ocean","Южный океан|Южный|Антарктический океан|Антарктический"]
    ]],
    [["Name one of the five U.S. states with a coast on the Gulf of Mexico.", "Назовите один из пяти штатов США с выходом к Мексиканскому заливу."], [
      [0,"Florida","Флорида"],[1,"Texas","Техас"],[1,"Louisiana","Луизиана"],[2,"Alabama","Алабама"],[3,"Mississippi","Миссисипи"]
    ]]
  ]],
  ["culture", [
    [["Name one of the four films directed by Hayao Miyazaki that had received a competitive Oscar nomination by the end of 2024.", "Назовите один из четырёх фильмов Хаяо Миядзаки, номинированных на «Оскар» к концу 2024 года."], [
      [0,"Spirited Away|sen to chihiro no kamikakushi","Унесённые призраками"],[1,"Howl's Moving Castle|howls moving castle","Ходячий замок|Ходячий замок Хаула"],[2,"The Boy and the Heron|boy and the heron","Мальчик и птица|Как поживаете"],[3,"The Wind Rises|wind rises","Ветер крепчает"]
    ]],
    [["Name one of the four members of Queen's classic lineup.", "Назовите одного из четырёх музыкантов классического состава Queen."], [
      [0,"Freddie Mercury|mercury|farrokh bulsara","Фредди Меркьюри|Фредди Меркури|Меркьюри|Фаррух Булсара"],[1,"Brian May|may","Брайан Мэй|Брайан Мей|Мэй"],[2,"Roger Taylor|taylor","Роджер Тейлор|Роджер Тэйлор|Тейлор"],[3,"John Deacon|deacon","Джон Дикон|Дикон"]
    ]],
    [["Name a film in the original Lord of the Rings trilogy or the original Hobbit film trilogy directed by Peter Jackson.", "Назовите фильм из кинотрилогии «Властелин колец» или «Хоббит» режиссёра Питера Джексона."], [
      [0,"The Fellowship of the Ring|fellowship of the ring|the lord of the rings the fellowship of the ring","Братство кольца|Властелин колец Братство кольца"],[1,"The Two Towers|two towers|the lord of the rings the two towers","Две крепости|Властелин колец Две крепости"],[1,"The Return of the King|return of the king|the lord of the rings the return of the king","Возвращение короля|Властелин колец Возвращение короля"],[2,"An Unexpected Journey|unexpected journey|the hobbit an unexpected journey","Нежданное путешествие|Хоббит Нежданное путешествие"],[2,"The Desolation of Smaug|desolation of smaug|the hobbit the desolation of smaug","Пустошь Смауга|Хоббит Пустошь Смауга"],[3,"The Battle of the Five Armies|battle of the five armies|the hobbit the battle of the five armies","Битва пяти воинств|Хоббит Битва пяти воинств"]
    ]],
    [["Name one of the four Teenage Mutant Ninja Turtles.", "Назовите одну из четырёх черепашек-ниндзя."], [
      [0,"Leonardo|leo","Леонардо|Лео"],[1,"Michelangelo|mikey","Микеланджело|Майки"],[2,"Raphael|raph","Рафаэль|Раф"],[3,"Donatello|donnie","Донателло|Донни"]
    ]],
    [["Name one of the four members of the Beatles' best-known lineup.", "Назовите одного из четырёх музыкантов самого известного состава The Beatles."], [
      [0,"John Lennon|lennon","Джон Леннон|Леннон"],[1,"Paul McCartney|mccartney","Пол Маккартни|Маккартни"],[2,"Ringo Starr|ringo|richard starkey","Ринго Старр|Ринго|Ричард Старки"],[3,"George Harrison|harrison","Джордж Харрисон|Харрисон"]
    ]],
    [["Name one of the original four ghosts in Pac-Man, using an English nickname, a Japanese name, or a Russian transliteration.", "Назовите одного из четырёх призраков в оригинальной Pac-Man. Подойдёт английское или японское имя либо русская транслитерация."], [
      [0,"Blinky|akabei|shadow","Блинки|Акабэй|Акабей"],[1,"Pinky|pinki|speedy","Пинки"],[2,"Inky|aosuke|bashful","Инки|Аосукэ|Аосуке"],[3,"Clyde|guzuta|pokey","Клайд|Клид|Гудзута"]
    ]],
    [["Name one of the five members of the Spice Girls by their Spice nickname or real name.", "Назовите одну из пяти участниц Spice Girls по сценическому прозвищу или настоящему имени."], [
      [0,"Posh Spice|posh|victoria beckham|victoria adams","Пош Спайс|Пош|Виктория Бекхэм|Виктория Адамс"],[1,"Ginger Spice|ginger|geri halliwell|geri horner|geri halliwell horner","Джинджер Спайс|Джинджер|Джери Холлиуэлл|Джери Хорнер"],[1,"Baby Spice|baby|emma bunton","Бейби Спайс|Бэби Спайс|Эмма Бантон|Эмма Бунтон"],[2,"Sporty Spice|sporty|melanie chisholm|mel c|melanie c","Спорти Спайс|Спорти|Мелани Чисхолм|Мел Си"],[3,"Scary Spice|scary|melanie brown|mel b|melanie b","Скэри Спайс|Скэри|Мелани Браун|Мел Би"]
    ]]
  ]],
  ["variety", [
    [["Name one of the five colors of the Olympic rings.", "Назовите один из пяти цветов олимпийских колец."], [
      [0,"blue","синий"],[1,"red","красный"],[1,"green","зелёный"],[2,"yellow","жёлтый"],[3,"black","чёрный"]
    ]],
    [["Name a piece type on a chessboard at the start of a game. Pawns count.", "Назовите тип фигуры на шахматной доске в начале партии. Пешка тоже считается."], [
      [0,"king","король"],[0,"queen","ферзь|королева"],[1,"pawn","пешка"],[1,"knight","конь"],[2,"bishop","слон|офицер"],[3,"rook|castle","ладья|тура"]
    ]],
    [["Name one of the four Grand Slam tournaments in tennis. Use the tournament name.", "Назовите один из четырёх турниров Большого шлема в теннисе."], [
      [0,"Wimbledon|the championships wimbledon","Уимблдон|Уимблдонский турнир"],[1,"US Open|u s open|united states open","Открытый чемпионат США|Ю Эс Опен"],[2,"Australian Open|australian open tennis","Открытый чемпионат Австралии|Австралиан Опен"],[3,"French Open|roland garros","Ролан Гаррос|Ролан-Гаррос|Открытый чемпионат Франции"]
    ]],
    [["Name one of the four standard playing-card suits.", "Назовите одну из четырёх мастей стандартной колоды карт."], [
      [0,"hearts|heart","червы|черви|черва"],[1,"spades|spade","пики|пика"],[2,"diamonds|diamond","бубны|буби|бубна"],[3,"clubs|club","трефы|трефа|крести|кресты"]
    ]],
    [["Name a prime number strictly between 20 and 50.", "Назовите простое число строго между 20 и 50."], [
      [0,"23|twenty three","двадцать три"],[0,"29|twenty nine","двадцать девять"],[1,"31|thirty one","тридцать один"],[1,"37|thirty seven","тридцать семь"],[2,"41|forty one","сорок один"],[2,"43|forty three","сорок три"],[3,"47|forty seven","сорок семь"]
    ]],
    [["Name one of the six women who married Henry VIII. Use her name.", "Назовите одну из шести жён английского короля Генриха VIII."], [
      [0,"Anne Boleyn","Анна Болейн"],[1,"Catherine of Aragon|katherine of aragon","Екатерина Арагонская"],[1,"Jane Seymour","Джейн Сеймур"],[2,"Anne of Cleves|anna of cleves","Анна Клевская"],[2,"Catherine Howard|katherine howard","Екатерина Говард|Кэтрин Говард"],[3,"Catherine Parr|katherine parr","Екатерина Парр|Кэтрин Парр"]
    ]],
    [["Name one of the four houses at Hogwarts in the Harry Potter books.", "Назовите один из четырёх факультетов Хогвартса в книгах о Гарри Поттере."], [
      [0,"Gryffindor","Гриффиндор"],[1,"Slytherin","Слизерин"],[2,"Ravenclaw","Когтевран|Рейвенкло"],[3,"Hufflepuff","Пуффендуй|Хаффлпафф"]
    ]]
  ]]
];

const debut = "2026-11-23";
function keyFor(text) {
  return text.normalize("NFKC").toLowerCase().replaceAll("ё", "е")
    .replace(/\p{Script=Latin}/gu, letter => letter.normalize("NFD").replace(/\p{M}/gu, ""))
    .replace(/['’]/g, "").replace(/&/g, " and ").replace(/[^\p{L}\p{N}]+/gu, " ").trim();
}
function questionFor(offset, group, bank) {
  const week = Math.floor(offset / bank.length);
  const index = (offset + week * group * group) % bank.length;
  const [prompt, rows] = bank[index];
  const answers = new Map();
  const entries = rows.map(([tier, en, ru], id) => {
    const entry = { id, tier, en: en.split("|")[0], ru: ru.split("|")[0] };
    for (const alias of [...en.split("|"), ...ru.split("|")]) answers.set(keyFor(alias), entry);
    return entry;
  });
  return { prompt, entries, answers, category: groups[group][0] };
}
