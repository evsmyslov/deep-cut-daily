"use strict";

const premiere = "2026-11-23";
const editions = [
  ["Movie Magic", "Film", "A stop on the studio backlot, from the first take to the deepest cut.", [
    ["What do filmmakers call the board snapped shut at the start of a take?", "It often shows the scene and take numbers.", "Clapperboard|clapper board|clapboard|slate|clapper|film slate|clapper slate", "The snap helps align separately recorded picture and sound."],
    ["What is the craft of re-creating footsteps, rustling clothes and similar sounds in sync with a film?", "The craft is named after a sound-effects artist.", "Foley|foley art|foley sound|foley effects|foley recording|jack foley", "Foley artists perform sounds to match the action on screen."],
    ["What is the film-editing effect in which the same neutral face seems to convey different emotions depending on the adjacent shot?", "It is named after a Soviet filmmaker named Lev.", "Kuleshov effect|the kuleshov effect|kuleshov|lev kuleshov", "The Kuleshov effect illustrates how viewers infer meaning from the relationship between shots."]
  ]],
  ["On the Record", "Music", "Needles, grooves and the language of recorded music.", [
    ["What rotating device plays a vinyl record?", "The name describes a rotating platform.", "Turntable|record player|phonograph|gramophone", "A stylus moves along the record groove as the platter rotates."],
    ["What part of a record player actually touches the groove?", "It is also called a needle.", "Stylus|needle|record needle|phonograph needle", "The stylus tracks the groove, and the cartridge turns that motion into an electrical signal."],
    ["What four-letter abbreviation names the standard playback equalization curve used for most vinyl records?", "The letters stand for Recording Industry Association of America.", "RIAA|r i a a|riaa curve|riaa equalization|recording industry association of america", "The playback curve reverses the corresponding equalization applied when the record is cut."]
  ]],
  ["Early Web", "Internet culture", "Back to the home pages, protocols and pixels of the early web.", [
    ["What does the first W in WWW stand for?", "The full phrase has three words, all starting with W.", "World", "The full phrase is World Wide Web."],
    ["Who invented the World Wide Web while working at CERN?", "His first name is Tim.", "Tim Berners-Lee|Tim Berners Lee|Berners-Lee|berners lee|Timothy Berners-Lee", "Berners-Lee wrote the first browser and web server at CERN."],
    ["Which 1993 web browser developed at NCSA helped popularize pages with inline images?", "The name also means an image assembled from small pieces.", "Mosaic|ncsa mosaic", "Mosaic helped make the graphical web accessible to a broad audience."]
  ]],
  ["Animated Worlds", "Film", "From animated characters to the machines that make them move.", [
    ["What is the name of the cowboy toy in the original Toy Story?", "Tom Hanks voices him.", "Woody|sheriff woody|woody pride", "Woody and Buzz Lightyear begin as rivals in the film."],
    ["What Japanese animation studio produced Spirited Away?", "Its name starts with G.", "Studio Ghibli|ghibli", "Spirited Away was written and directed by Hayao Miyazaki."],
    ["What slotted spinning drum lets viewers see a series of images as a looping animation?", "The name begins with zoo.", "Zoetrope|zoëtrope", "The slots give viewers brief glimpses of each successive image."]
  ]],
  ["Music in Motion", "Music", "Words musicians use to tell time, change pace and build tension.", [
    ["What device marks a steady beat during music practice?", "Many versions tick or click.", "Metronome", "A metronome gives the player a steady pulse at a chosen tempo."],
    ["What Italian musical direction means to gradually get louder?", "It begins with cresc.", "Crescendo|cresc", "Crescendo describes an increase in loudness."],
    ["What term describes two or more contrasting rhythms heard together, such as three evenly spaced beats against two?", "The prefix means many.", "Polyrhythm|polyrhythms|poly rhythm|cross rhythm|cross-rhythm", "Three against two is a common example of a polyrhythm."]
  ]],
  ["Internet Shortcuts", "Internet culture", "The language and small inventions that shaped everyday browsing.", [
    ["What three-letter abbreviation is used for a web address?", "The first letter stands for uniform.", "URL|u r l|uniform resource locator", "A URL identifies a resource and describes how to access it."],
    ["In an internet address, what is the name of the part after #?", "It can point to a section within the page.", "Fragment|fragment identifier|url fragment|anchor|hash fragment", "A fragment can navigate to a specific element on a page."],
    ["Which Japanese company introduced the QR code in 1994?", "Its name starts with D, and it was part of the Toyota group.", "Denso Wave|denso|nippondenso", "Denso Wave developed QR codes to track components in manufacturing."]
  ]],
  ["Big Screen Science", "Science", "Space facts that belong in a cinema as much as an observatory.", [
    ["Which planet is known for the Great Red Spot?", "It is the largest planet in the Solar System.", "Jupiter", "The spot is an enormous storm."],
    ["Which moon of Saturn has a dense atmosphere and lakes of liquid hydrocarbons?", "Its name also describes an ancient Greek divine figure.", "Titan", "Methane and ethane are found in its lakes and seas."],
    ["What term names the boundary beyond which light cannot escape a black hole?", "It has two words, the second meaning a limit of sight.", "Event horizon|the event horizon", "The event horizon is the boundary beyond which signals cannot reach distant observers."]
  ]],
  ["Screen Names", "Film", "The people and places behind familiar films.", [
    ["Who directed the 1993 film Jurassic Park?", "He also directed Jaws.", "Steven Spielberg|spielberg", "Jurassic Park adapts Michael Crichton’s novel."],
    ["Who directed the 2019 film Parasite?", "He also directed Snowpiercer and Okja.", "Bong Joon-ho|bong joon ho|bong", "Parasite won both Best Picture and International Feature Film at the 2020 Oscars."],
    ["Which Italian composer wrote the score for The Good, the Bad and the Ugly?", "He also composed for Once Upon a Time in the West.", "Ennio Morricone|morricone", "Morricone collaborated on multiple films with director Sergio Leone."]
  ]],
  ["Play Button", "Internet culture", "A few details behind streaming video and digital sound.", [
    ["Which online video platform was acquired by Google in 2006?", "Its name ends in Tube.", "YouTube|you tube", "YouTube launched in 2005."],
    ["What do we call written text that identifies speech and relevant sound in a video for accessibility?", "Players often label the control CC.", "Closed captions|closed captioning|captions|captioning|cc|subtitles for the deaf and hard of hearing|sdh", "Captions can describe sound effects as well as transcribe dialogue."],
    ["What is the title of the Blender Foundation’s 2008 open film about a large rabbit?", "Its three-word title ends in Bunny.", "Big Buck Bunny", "The film was created as an open project using Blender."]
  ]],
  ["String Theory", "Music", "Plucked, bowed and amplified strings.", [
    ["How many strings does a standard guitar have?", "It is one more than a standard five-string banjo.", "Six|6", "Six strings are standard on both classical and many electric guitars."],
    ["What device clamps across a guitar’s fretboard to raise the effective pitch of its open strings?", "Its name starts with C.", "Capo|capodastro|capotasto", "A capo lets guitarists use familiar chord shapes in a higher key."],
    ["What is the highest-pitched open string on a standard violin?", "Its note name is one letter.", "E|e string|high e", "The standard open strings, from low to high, are G, D, A and E."]
  ]],
  ["Lost to Time", "History", "What survived, what vanished and how we know the difference.", [
    ["Which Roman city was buried by Vesuvius in AD 79 and is famous for casts of people caught in the eruption?", "Its name starts with P.", "Pompeii|pompei", "The casts were made from voids left in hardened volcanic deposits."],
    ["What stone with the same decree in three scripts helped scholars decipher Egyptian hieroglyphs?", "It is named for the place where it was discovered.", "Rosetta Stone|the rosetta stone|rosetta", "Ancient Greek on the stone helped scholars interpret the Egyptian writing."],
    ["What method dates timber by matching sequences of wide and narrow annual growth rings?", "Its technical name starts with dendro.", "Dendrochronology|tree ring dating|tree-ring dating|tree ring analysis", "Overlapping ring patterns can be matched against dated sequences."]
  ]],
  ["Arcade Memory", "Games", "The machines, sprites and ideas behind classic video games.", [
    ["What yellow arcade character eats dots and evades ghosts?", "The original game was released by Namco.", "Pac-Man|pac man|pacman", "Power pellets briefly let Pac-Man chase the ghosts."],
    ["What name is given to the four-square pieces used in Tetris?", "Its prefix means four.", "Tetromino|tetrominoes|tetrominos|tetrimino|tetriminos|tetriminoes", "There are seven distinct Tetris pieces when rotations are treated as the same piece."],
    ["Which designer created the original Tetris in the Soviet Union?", "His first name is Alexey.", "Alexey Pajitnov|alexei pajitnov|aleksei pazhitnov|alexey pazhitnov|pajitnov|pazhitnov", "Pajitnov created Tetris while working at the Soviet Academy of Sciences."]
  ]],
  ["The Color Cut", "Film", "What happens when the colors on screen become part of the story.", [
    ["In the 1939 film The Wizard of Oz, what color are Dorothy’s slippers?", "The film names them after a gemstone.", "Ruby red|ruby|red", "Dorothy’s slippers are silver in the original novel."],
    ["In film production, what is the name of the technique of replacing a selected background color with another image?", "Think of what a green screen makes possible.", "Chroma key|chroma keying|chromakey|chromakeying|color keying|green screen|greenscreen", "Green and blue are common key colors because they can be separated from many foreground subjects."],
    ["What color process used three black-and-white negatives to record separate color information in many classic Hollywood productions?", "The name starts with Techni.", "Technicolor|three strip technicolor|three-strip technicolor|3 strip technicolor", "The three-strip process recorded different portions of the spectrum on separate strips of film."]
  ]],
  ["Remix Culture", "Music and internet", "A set about borrowing, transforming and passing sounds along.", [
    ["What is it called when a producer reuses a short recording from another piece of music?", "The borrowed bit is called a sample.", "Sampling|sampling music|music sampling|sample", "A sample is a piece of recorded audio reused in another track."],
    ["What word describes a track made by combining recognizable elements of different songs, often one vocal and another backing track?", "The name suggests squeezing things together.", "Mashup|mash-up|mash up|bootleg mashup", "A mashup can pair the vocal of one recording with the instrumental of another."],
    ["What six-second drum break from the Winstons’ 1969 recording became a foundation of jungle and drum and bass?", "It takes its name from the song Amen, Brother.", "Amen break|the amen break|amen brother", "The break was performed by drummer Gregory Coleman."]
  ]]
];
