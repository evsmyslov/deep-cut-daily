"use strict";

// Each note is written for a canonical answer in a particular question.
const mineAnswerNotes = {
  "carry-light":{
    "rushlight":["A dried rush soaked in fat burns like a small candle.","Высушенный стебель ситника, пропитанный жиром, горит как маленькая свеча."],
    "carbide lamp":["Water drips onto calcium carbide to make acetylene, which burns at the lamp's nozzle.","Вода капает на карбид кальция. Образовавшийся ацетилен горит в горелке лампы."]
  },
  "zippers":{
    "removable mattress cover":["A zipper lets the cover come off for washing.","Молния позволяет снять чехол с матраса и постирать его."]
  },
  "things-on-wheels":{
    "mechanic's creeper":["A mechanic lies on this low wheeled platform to roll under a car.","На таком низком лежаке с колёсиками механик подкатывается под машину."]
  },
  "measuring-scales":{
    "dental periodontal probe":["Dentists read the markings to measure the depth of the space beside a tooth.","По делениям зонда стоматолог измеряет глубину кармана между десной и зубом."]
  },
  "hinged-things":{
    "hinged microscope slide box":["The lid swings open on a hinge so you can reach the slides without taking it off.","Крышка откидывается на петле, открывая доступ к предметным стёклам."]
  },
  "headwear":{
    "chaperon":["This medieval headpiece developed from a hood worn with its opening around the head.","Этот средневековый головной убор вырос из капюшона, который носили отверстием вокруг головы."]
  },
  "paper-marks":{
    "silverpoint":["A silver tip leaves a fine line on paper coated with a slightly abrasive ground.","Серебряный наконечник оставляет тонкую линию на бумаге со специальным шероховатым грунтом."]
  },
  "inflatable-things":{
    "inflatable movie screen":["Air holds the frame up for an outdoor screening. The film is projected onto a fabric sheet.","Воздух держит раму, а фильм на открытом воздухе проецируют на натянутое полотно."]
  },
  "first-aid-kit":{
    "tubular retention bandage":["The elastic net holds a dressing in place on an arm or leg.","Эластичная сетка удерживает перевязочную салфетку на руке или ноге."]
  },
  "key-locks":{
    "church offertory box":["Some donation boxes open with a key so the contents can be collected securely.","Некоторые ящики для пожертвований запираются ключом, чтобы их мог открыть только тот, у кого он есть."],
    "elevator service panel":["A service key unlocks the panel that covers the maintenance controls.","Сервисный ключ отпирает панель, за которой находятся кнопки для обслуживания лифта."]
  },
  "lens":{
    "Schmidt corrector plate":["This thin lens at the front of a Schmidt telescope corrects the spherical aberration of its mirror.","Эта тонкая линза перед зеркалом телескопа Шмидта исправляет сферическую аберрацию."],
    "fresnel lighthouse lantern":["Its stepped lens concentrates the lighthouse beam without a thick block of glass.","Ступенчатая линза собирает свет маяка в пучок, хотя сама она тонкая."],
    "telescope":["Refracting telescopes use a lens to collect light from distant objects.","В телескопе-рефракторе линза собирает свет от далёких объектов."]
  },
  "drinkware":{
    "coupe glass":["Its shallow, bowl-shaped cup sits on a stem. It's used for champagne and cocktails.","На ножке держится неглубокая чаша. Из неё пьют шампанское и коктейли."]
  },
  "things-with-pockets":{
    "Saddlebag":["A bag attached at the saddle or rack can have pockets for small items such as a puncture kit.","В сумке на седле или багажнике могут быть карманы для мелочей, например ремкомплекта."]
  },
  "glass-objects":{
    "glass float":["A sealed glass sphere holds air and keeps a fishing net from sinking.","Герметичный стеклянный шар с воздухом удерживает рыболовную сеть на плаву."]
  },
  "buttons":{
    "cash counter":["Its buttons can set the size of a batch before the machine counts the notes.","Кнопками можно выставить число купюр в пачке перед подсчётом."]
  },
  "tool-teeth":{
    "pottery rib comb":["The teeth rake parallel lines into soft clay.","Зубцы прочерчивают параллельные бороздки в мягкой глине."],
    "zipper":["It can even bite your jacket. Two rows of teeth interlock as you pull the slider.","Молния иногда прикусывает ткань. Когда тянешь бегунок, два ряда зубцов сцепляются."],
    "gear":["Its teeth mesh with another gear to transfer motion.","Зубья шестерни зацепляются за соседнюю и передают движение."],
    "crampons":["The spikes, also called teeth, dig into ice so the wearer doesn't slide.","Зубья кошек врезаются в лёд, чтобы ботинки не скользили."],
    "pinking shears":["The serrated blades leave a zigzag cut that helps keep fabric edges from fraying.","Зубчатые лезвия оставляют зигзаг, благодаря которому ткань меньше осыпается."]
  },
  "things-that-fold":{
    "Folding kayak":["The hull folds down for transport, then opens into a rigid shape on the water.","Корпус складывается для переноски, а перед спуском на воду разворачивается и держит форму."],
    "Folding phone":["A hinge lets the phone fold shut for carrying.","Шарнир позволяет сложить телефон, чтобы он занимал меньше места."],
    "Folding ruler":["Short hinged segments fold together so the ruler fits in a pocket.","Линейка состоит из коротких секций на шарнирах и складывается до размера кармана."]
  },
  "things-on-fridges":{
    "magnetic spice rack":["Its magnets let it hold spice jars on the side of a fridge without screws.","Магниты держат полку с баночками на боковой стенке холодильника без шурупов."]
  },
  "kitchen-grates":{
    "ricer":["It pushes cooked potatoes through small holes, making thin strands for a smooth mash.","Пресс продавливает варёный картофель через мелкие отверстия, чтобы получилось однородное пюре."]
  },
  "round-kitchen-objects":{
    "biscuit press":["A round disc at the end shapes the dough as it comes out of the press.","Круглый диск на конце пресса придаёт тесту форму при выдавливании."]
  },
  "citrus":{
    "kabosu":["This sour Japanese citrus is often squeezed over grilled fish.","Этот кислый японский цитрус часто выжимают на жареную рыбу."]
  },
  "jam-fruits":{
    "quandong":["The tart red flesh of this Australian fruit can be cooked into jam.","Из терпкой красной мякоти этого австралийского плода варят варенье."]
  },
  "potato-dishes":{
    "pommes anna":["Thinly sliced potatoes are layered with butter and baked into a golden cake.","Тонкие ломтики картофеля выкладывают слоями со сливочным маслом и запекают до золотистой корочки."]
  },
  "desserts":{
    "kakigori":["This Japanese dessert is shaved ice topped with syrup.","Этот японский десерт — стружка льда, политая сиропом."]
  },
  "herbs":{
    "summer savory":["Its peppery leaves are often cooked with beans.","Листья чабера с перечным вкусом часто добавляют к фасоли."]
  },
  "breads":{
    "broa de milho":["This Portuguese bread gets its color and texture from cornmeal.","Кукурузная мука даёт этому португальскому хлебу характерный цвет и текстуру."]
  },
  "foods-with-rice":{
    "Kedgeree":["This breakfast dish mixes rice with smoked fish and eggs.","В этом блюде на завтрак рис смешивают с копчёной рыбой и яйцами."],
    "Jambalaya":["The rice cooks in the same pot as the meat or seafood and seasonings.","Рис готовят в одной посуде с мясом или морепродуктами и приправами."]
  },
  "fruit-pits":{
    "marula":["The yellow fruit has a hard stone in its center that protects the seeds.","Внутри жёлтого плода есть твёрдая косточка, защищающая семена."]
  },
  "breakfast-dishes":{
    "menemen":["A Turkish breakfast dish of eggs cooked with tomatoes and peppers.","Турецкое блюдо на завтрак, в котором яйца готовят с помидорами и перцем."]
  },
  "foods-with-cheese":{
    "Aligot":["Cheese makes this French potato mash stretch into long strands.","Из-за сыра это французское картофельное пюре тянется длинными нитями."],
    "Pão de queijo":["These Brazilian cheese rolls use tapioca starch in their dough.","Тесто для этих бразильских сырных булочек делают на крахмале тапиоки."]
  },
  "flat-baked-foods":{
    "tunnbröd":["This thin Swedish flatbread can be baked on a hot plate over a stove.","Эту тонкую шведскую лепёшку можно испечь на раскалённой плите."]
  },
  "length-units":{
    "stadion":["In ancient Greece a stadion measured distance. Its length depended on the local standard.","В Древней Греции стадиями измеряли расстояние. Длина стадия зависела от местного стандарта."]
  },
  "star-flags":{
    "Federated States of Micronesia":["Its flag has four white stars, one for each of its states.","На флаге четыре белые звезды, по одной на каждый штат."]
  },
  "visible-weather":{
    "diamond dust":["Tiny ice crystals suspended in very cold air glitter in the light.","В морозном воздухе мельчайшие кристаллы льда блестят, когда на них падает свет."]
  },
  "elements":{
    "Oganesson":["Element 118 is named after physicist Yuri Oganessian and is made in particle accelerators.","Элемент № 118 назван в честь физика Юрия Оганесяна. Его получают в ускорителях частиц."]
  },
  "countries":{
    "Vanuatu":["This Pacific island country joined the United Nations in 1981.","Это островное государство в Тихом океане вступило в ООН в 1981 году."]
  },
  "capitals":{
    "Port Vila":["The capital of Vanuatu sits on the island of Efate.","Порт-Вила, столица Вануату, находится на острове Эфате."]
  },
  "mountains":{
    "Mount Roraima":["This steep-sided mountain has a flat summit at the meeting point of three countries.","У этой горы крутые склоны и плоская вершина. Здесь сходятся границы трёх стран."]
  },
  "rivers":{
    "Salween":["It rises on the Tibetan Plateau and flows through China and Myanmar to the sea.","Река берёт начало на Тибетском нагорье и через Китай и Мьянму течёт к морю."]
  },
  "islands":{
    "Novaya Zemlya Severny Island":["The Matochkin Shar strait separates it from Yuzhny Island.","Пролив Маточкин Шар отделяет его от Южного острова."]
  },
  "constellations":{
    "Circinus":["Its name refers to a drawing compass. It is one of the modern southern constellations.","Созвездие южного неба названо в честь чертёжного циркуля."]
  },
  "gemstones":{
    "alexandrite":["Some stones look greenish in daylight and reddish under incandescent light.","Камень может казаться зеленоватым при дневном свете и красноватым под лампой накаливания."]
  },
  "public-transport":{
    "suspension railway":["In Wuppertal, passenger cars hang from a rail above the streets and river.","В Вуппертале пассажирские вагоны висят на рельсе над улицами и рекой."]
  },
  "animal-shells":{
    "brachiopod":["Its shell has two valves, so it can resemble a clam even though it belongs to a different group.","У брахиоподы две створки, поэтому она похожа на двустворчатого моллюска, хотя относится к другой группе."],
    "hermit crab":["A hermit crab carries an empty shell to protect its soft abdomen.","Рак-отшельник носит пустую раковину, чтобы защитить мягкое брюшко."]
  },
  "swimming-birds":{
    "red-necked phalarope":["It spins on the water to stir up small prey.","На воде плавунчик кружится, поднимая мелкую добычу к поверхности."]
  },
  "striped-animals":{
    "giant eland":["This large African antelope has thin white stripes across its flanks.","По бокам этой крупной африканской антилопы идут тонкие белые полосы."],
    "lemur":["A ring-tailed lemur has alternating black and white rings on its tail. The rings are stripes too.","У кошачьего лемура на хвосте чередуются чёрные и белые кольца. Это тоже полосы."],
    "striped hyena":["The dark stripes run down its body and legs.","Тёмные полосы проходят по туловищу и ногам полосатой гиены."],
    "zebra shark":["Young zebra sharks have bold stripes that turn into spots as they mature.","У молодых зебровых акул есть полосы, которые с возрастом сменяются пятнами."],
    "okapi":["Its legs look like a zebra's, but its closest living relative is the giraffe.","Ноги окапи похожи на ноги зебры, а его ближайший живой родственник — жираф."],
    "aardwolf":["This striped member of the hyena family mostly eats termites.","Этот полосатый родственник гиен питается главным образом термитами."],
    "clownfish":["The broad white bands across its body count as stripes.","Широкие белые отметины поперёк тела рыбы-клоуна — тоже полосы."]
  },
  "houseplants":{
    "jewel orchid":["People grow it indoors for the pale veins that stand out on its dark leaves.","Эту орхидею выращивают дома ради светлых прожилок на тёмных листьях."]
  },
  "birds":{
    "secretarybird":["This long-legged bird of prey hunts on foot across African grasslands.","Эта длинноногая хищная птица охотится пешком в африканских саваннах."]
  },
  "trees":{
    "Japanese katsura":["Its falling leaves can smell sweet, like caramel, in autumn.","Осенью опадающие листья багрянника могут пахнуть карамелью."]
  },
  "freshwater-fish":{
    "sweetfish":["Ayu spend part of their lives in rivers, where they graze on algae growing on stones.","Аю проводят часть жизни в реках, питаясь водорослями на камнях."]
  },
  "nocturnal-animals":{
    "Kinkajou":["It searches for fruit and nectar in the forest canopy at night.","Ночью кинкажу ищет плоды и нектар в кронах деревьев."],
    "Aye-aye":["At night this lemur taps wood and uses a long finger to pull out insect larvae.","Ночью этот лемур простукивает древесину и длинным пальцем достаёт личинок."]
  },
  "birds-red":{
    "scarlet-backed flowerpecker":["The male has a vivid red stripe down its back.","У самца вдоль спины идёт ярко-красная полоса."]
  },
  "plants-climb":{
    "canary creeper":["The leaf stalks coil round supports as the plant grows.","По мере роста черешки листьев обвиваются вокруг опоры."]
  },
  "films":{
    "Dersu Uzala":["Akira Kurosawa directed the film about a hunter and a survey expedition in the Russian Far East.","Акира Куросава снял этот фильм об охотнике и экспедиции на российском Дальнем Востоке."]
  },
  "video-games":{
    "A Short Hike":["In this indie game you play as a bird named Claire and climb to a mountaintop.","В этой инди-игре птица по имени Клэр поднимается на вершину горы."]
  },
  "board-games":{
    "YINSH":["Players move rings across a hexagonal board and flip markers that the rings pass over.","Игроки двигают кольца на шестиугольном поле и переворачивают фишки, над которыми прошли кольца."]
  },
  "space-trip-films":{
    "The Woman in the Moon":["Fritz Lang's silent film sends its crew to the Moon aboard a rocket.","В немом фильме Фрица Ланга команда летит к Луне на ракете."]
  },
  "animated-dogs":{
    "Kipper":["Kipper is the dog at the center of the animated series based on Mick Inkpen's books.","Пёс Киппер — главный герой мультсериала по книгам Мика Инкпена."]
  },
  "winged-characters":{
    "Orm Embar":["He's a dragon in Ursula K. Le Guin's Earthsea books.","Это дракон из книг Урсулы Ле Гуин о Земноморье."]
  },
  "animation":{
    "The Triplets of Belleville":["This animated feature follows a grandmother trying to find her cyclist grandson.","В этом полнометражном мультфильме бабушка разыскивает внука-велогонщика."]
  },
  "fictional-places":{
    "Arrakeen":["It's a city on the desert planet Arrakis in the Dune books.","Это город на пустынной планете Арракис из книг о Дюне."]
  },
  "fictional-vehicles":{
    "Sleeper Service":["It's a named spaceship in Iain M. Banks's Culture novel Excession.","Это космический корабль из романа Иэна Бэнкса «Эксцесс» о Культуре."]
  },
  "fictional-robots":{
    "Tom Servo":["He's the gumball-machine-headed robot who helps comment on movies in Mystery Science Theater 3000.","Этот робот с головой из автомата для жвачки комментирует фильмы в «Таинственном театре 3000 года»."],
    "R2-D2":["The Star Wars astromech repairs ships and gets into places much bigger droids can't.","Этот астромеханический дроид из «Звёздных войн» чинит корабли и пролезает туда, куда дроиды покрупнее не попадут."]
  },
  "myth":{
    "Momos":["In Greek myth, Momos personifies mockery and fault-finding.","В греческой мифологии Мом олицетворяет насмешку и злословие."]
  },
  "sports-with-a-ball":{
    "Korfball":["Teams score by throwing the ball into a basket mounted on a tall post.","Команды набирают очки, забрасывая мяч в корзину на высокой стойке."],
    "Sepak takraw":["Players send a woven ball over a net with their feet, knees or head.","Плетёный мяч отправляют через сетку ногами, коленями или головой."]
  },
  "instruments":{
    "glass harmonica":["A wet finger rubs the rims of rotating glass bowls to make notes.","Ноты извлекают, прикасаясь влажным пальцем к краям вращающихся стеклянных чаш."]
  },
  "blown-instruments":{
    "sarrusophone":["It has a metal body but makes its sound with a reed.","У инструмента металлический корпус, а звук рождается за счёт трости."]
  },
  "plucked-strings":{
    "qinqin":["This Chinese lute's strings are plucked to produce notes.","У этой китайской лютни звук извлекают щипком по струнам."]
  },
  "card-games":{
    "President":["Players try to get rid of their cards by playing higher sets than the previous player.","Игроки стараются избавиться от карт, выкладывая наборы старше тех, что сыграл предыдущий участник."]
  },
  "school-shows":{
    "My So-Called Life":["The series follows Angela Chase and her classmates at Liberty High.","Сериал рассказывает об Анджеле Чейз и её одноклассниках в старшей школе Либерти."]
  },
  "weapons":{
    "Fragarach":["It's a named sword in Irish mythology, often translated as the Answerer.","Это меч из ирландской мифологии. Его имя часто переводят как «Отвечающий»."],
    "Elder Wand":["The Elder Wand is a particular wand in the Harry Potter books, one of the Deathly Hallows.","Бузинная палочка — одна из Даров Смерти. Это отдельная палочка в истории о Гарри Поттере."]
  },
  "films-with-time-travel":{
    "Beyond the Infinite Two Minutes":["A café owner discovers that a screen can show him what happens two minutes in the future.","Владелец кафе обнаруживает, что на мониторе можно увидеть, что произойдёт через две минуты."],
    "Groundhog Day":["The main character keeps waking up on the same day.","Главный герой снова и снова просыпается в один и тот же день."]
  },
  "film-animals-speak":{
    "The Plague Dogs":["The two escaped dogs talk to each other as they try to survive.","Два сбежавших пса разговаривают друг с другом и пытаются выжить."]
  },
  "films-with-trains":{
    "The Narrow Margin":["A detective escorts a witness on a train where killers are also on board.","Детектив сопровождает свидетеля в поезде, где едут и наёмные убийцы."]
  },
  "films-with-dinosaurs":{
    "Gertie the Dinosaur":["Winsor McCay animated Gertie in 1914 and performed as though she could hear his commands.","В 1914 году Уинзор Маккей вывел Герти на экран и обращался к ней так, будто она слышала его команды."],
    "Night at the Museum":["The museum's T. rex skeleton comes to life after dark.","Ночью в музее оживает скелет тираннозавра."]
  },
  "films-with-pirates":{
    "Anne of the Indies":["The lead character is a pirate captain called Anne Providence.","Главная героиня — капитан пиратов Энн Провиденс."]
  },
  "drum-family":{
    "kendang":["This double-headed drum helps lead tempo changes in Indonesian gamelan music.","Этот двусторонний барабан помогает задавать темп в индонезийском гамелане."]
  },
  "keyboard-instruments":{
    "clavioline":["This early electronic keyboard makes one note at a time and can put a bright, reedy sound on a recording.","Этот ранний электронный клавишный инструмент играет по одной ноте и узнаваем по яркому, тростниковому тембру."],
    "piano":["Each key moves a hammer that strikes a string.","При нажатии клавиши молоточек ударяет по струне."]
  },
  "titles-sing-colors":{
    "Black Coffee in Bed":["Squeeze's song begins its title with the color black.","Название песни группы Squeeze начинается со слова «чёрный»."]
  },
  "songs-with-names":{
    "A Song for Jeffrey":["Jeffrey is Jeffrey Hammond, who later became the bassist for Jethro Tull.","Джеффри — Джеффри Хэммонд, впоследствии басист Jethro Tull."]
  },
  "films-at-sea":{
    "A Night to Remember":["This 1958 film follows the Titanic's final night in the Atlantic.","Фильм 1958 года показывает последнюю ночь «Титаника» в Атлантике."]
  },
  "songs-with-animals":{
    "Albatross":["Fleetwood Mac named this instrumental after the seabird. It didn't need a lyric to qualify.","Fleetwood Mac назвали инструментальную композицию в честь морской птицы. Даже без слов ответ подходит."],
    "Blackbird":["The Beatles song is named after a bird, the blackbird.","Название песни The Beatles — это название птицы, чёрного дрозда."]
  },
  "bands-with-numbers":{
    "65daysofstatic":["The British band writes 65 as digits at the start of its name.","В начале названия британской группы число 65 записано цифрами."]
  },
  "music-duos":{
    "Everything But the Girl":["Tracey Thorn and Ben Watt formed the duo in the 1980s.","Трейси Торн и Бен Уотт образовали этот дуэт в 1980-х."]
  },
  "car-brands-s":{
    "Sachsenring":["This East German manufacturer built the Trabant. The original spelling begins with S.","Этот восточногерманский производитель выпускал «Трабант». В оригинале название начинается на S."],
    "Škoda":["The Czech name uses Š, the marked form of S explicitly allowed in the question.","В чешском названии стоит Š, вариант S с гачеком. Условие включает обе буквы."]
  }
};

Object.assign(mineAnswerNotes,{
  "daily-heist-films":{
    "Topkapi":["A crew sets out to steal a jeweled dagger from Istanbul's Topkapı Palace.","Команда пытается похитить драгоценный кинжал из дворца Топкапы в Стамбуле."],
    "The Bad Guys":["The animal gang specializes in elaborate robberies.","Команда зверей промышляет хитрыми ограблениями."]
  },
  "daily-metropolitan-capitals":{
    "Yerevan":["The Armenian capital's first metro line opened in 1981.","Первая линия метро в столице Армении открылась в 1981 году."]
  },
  "daily-cooking-anime":{
    "Mister Ajikko":["The young cook Yōichi takes part in cooking contests.","Юный повар Ёити участвует в кулинарных поединках."],
    "Delicious in Dungeon":["The adventurers make meals out of the monsters they encounter.","Герои готовят блюда из монстров, встреченных в подземелье."]
  },
  "daily-rain-titles":{
    "Cold Rain and Snow":["The Grateful Dead recorded a version of this folk song for their debut album.","Grateful Dead записали свою версию этой народной песни для дебютного альбома."]
  },
  "daily-fishing-games":{
    "Legend of the River King":["Catching fish is the main activity in this Game Boy role-playing game.","Ловля рыбы — основное занятие в этой ролевой игре для Game Boy."],
    "Hades":["Zagreus can catch fish at spots he finds during his escape attempts.","Загрей может ловить рыбу в водоёмах, которые встречает на пути во время побегов."]
  },
  "daily-seventies-guitarists":{
    "Mick Box":["He played guitar on Uriah Heep's classic 1970s albums, including Demons and Wizards.","Он играл на гитаре на классических альбомах Uriah Heep 1970-х, включая Demons and Wizards."]
  },
  "daily-dipping-foods":{
    "Fried pickles":["The breaded slices are often served with ranch dressing for dipping.","Обжаренные ломтики огурцов в панировке часто подают с соусом ранч."]
  },
  "daily-without-hands":{
    "Oxalis leaves":["Oxalis leaflets fold together in the dark and spread again in the light.","Листочки кислицы складываются в темноте и снова раскрываются на свету."],
    "mouth":["It opens and closes when you talk.","Рот открывается и закрывается, когда вы говорите."],
    "Venus flytrap":["Its trap closes when its trigger hairs are touched and can reopen later.","Ловушка захлопывается при прикосновении к чувствительным волоскам, а затем может снова раскрыться."]
  }
});

Object.assign(mineAnswerNotes, {
  "films-with-submarines":{"Destination Tokyo":["A US submarine enters Tokyo Bay on a secret mission in this 1943 film.","В этом фильме 1943 года американская подлодка отправляется с секретным заданием в Токийский залив."]},
  "films-with-storms":{"The Hurricane (1937)":["A tropical cyclone strikes the island where the story takes place.","Тропический циклон обрушивается на остров, где разворачивается действие фильма."]},
  "instruments-with-hammers":{"khim":["The Thai khim has metal strings struck with light bamboo beaters.","Струны тайского кхима звучат от ударов лёгких бамбуковых колотушек."]},
  "albums-with-animals":{"The Fox (Elton John)":["The title of Elton John's 1981 album names a fox.","В названии альбома Элтона Джона 1981 года упоминается лиса."]},
  "things-with-hand-cranks":{"hurdy-gurdy":["Turning the handle makes a rosined wheel rub against the strings.","Ручка вращает натёртое канифолью колесо, которое трётся о струны."]},
  "things-that-squeak":{"curd cheese":["Fresh cheese curds can squeak against your teeth when you bite into them.","Свежие сырные зёрна могут скрипеть на зубах."]},
  "foods-on-skewers":{"shishito kushiyaki":["The peppers are threaded onto skewers and grilled.","Перцы сисито нанизывают на шпажки и жарят на гриле."]},
  "foods-in-edible-wraps":{"inari sushi":["The rice sits in a fried tofu pouch that you eat with the filling.","Рис кладут в мешочек из жареного тофу, который едят вместе с начинкой."]},
  "marsupials":{"monito del monte":["It lives in the temperate forests of Chile and Argentina.","Этот сумчатый зверёк живёт в умеренных лесах Чили и Аргентины."]},
  "animals-that-build-nests":{"Betta splendens":["The male builds a nest of bubbles at the surface and guards the eggs there.","Самец строит гнездо из пузырьков у поверхности воды и охраняет в нём икру."]},
  "plants-with-thorns":{"sandbox tree":["The trunk is covered with stout conical prickles.","Ствол хуры покрыт крупными коническими шипами."]},
  "animals-that-change-color":{"mimic octopus":["It can change the color and pattern of its skin as it imitates other sea animals.","Этот осьминог меняет цвет и рисунок кожи, подражая другим морским животным."]},
  "lake-countries":{"Zambia":["Lake Tanganyika borders Zambia, Tanzania, Burundi and the Democratic Republic of the Congo.","Озеро Танганьика омывает берега Замбии, Танзании, Бурунди и Демократической Республики Конго."]},
  "volcanic-islands":{"Surtsey":["An eruption off Iceland created the island in the 1960s.","Остров возник у берегов Исландии в результате извержения в 1960-х."]},
  "rivers-through-capitals":{"Rímac":["It flows from the Andes through Lima to the Pacific.","Римак течёт с Анд через Лиму и впадает в Тихий океан."]},
  "bridge-cities":{"Višegrad":["The Mehmed Paša Sokolović Bridge crosses the Drina in Višegrad.","В Вишеграде мост Мехмеда-паши Соколовича перекинут через Дрину."]},
  "solar-system-moons":{"Namaka":["Namaka is the smaller of the two known moons of the dwarf planet Haumea.","Намака — меньший из двух известных спутников карликовой планеты Хаумеа."]},
  "goal-sports":{"goalball":["Players roll a ball with bells inside into the opposing goal.","Игроки катят мяч с колокольчиками внутри, стараясь забить гол сопернику."]},
  "ice-sports":{"ice golf":["Some tournaments lay out their courses directly on the ice of a frozen lake.","На некоторых турнирах поле размечают прямо на льду замёрзшего озера."]},
  "tile-laying-games":{"Aquaretto":["Players lay tiles to expand their aquatic parks and add animals.","Игроки выкладывают тайлы, расширяя свой водный парк и заселяя его животными."]},
  "games-with-a-glider":{"Superflight":["You steer a wingsuit close to cliffs to earn points.","Вы управляете полётом в вингсьюте и набираете очки, пролетая рядом со скалами."]},
  "races-with-wheels":{"cycle speedway":["Riders race lightweight bicycles on a short oval dirt track.","Гонщики на лёгких велосипедах едут по короткому овальному треку с грунтовым покрытием."]},
  "dice-games":{"Sagrada":["Colored dice are drafted, rolled as a shared pool, and placed into stained-glass windows.","Игроки бросают цветные кубики, выбирают их из общего запаса и собирают витражи."]}
});
