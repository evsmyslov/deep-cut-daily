# Answer catalog sources

## Science and nature

Programming language names use PLDB records tagged as programming languages or esolangs. Astronomical observatories use Wikidata facility labels and named observing facilities from the Minor Planet Center. Planetary satellite names and provisional designations come from JPL. Space probes use payload entries from the General Catalog of Artificial Space Objects deep-space catalog. [PLDB](https://pldb.io/) · [Minor Planet Center](https://minorplanetcenter.net/iau/lists/ObsCodes.html) · [JPL satellite discoveries](https://ssd.jpl.nasa.gov/sats/discovery.html) · [GCAT](https://planet4589.org/space/gcat/)

Species lists use iNaturalist taxonomy, English and Russian vernacular names where available, and scientific names. Family, genus and species selections depend on the question. Nocturnal activity uses the EltonTraits data. Fossil genera use the Paleobiology Database. Food and plant entries combine editorial selections with English Wikipedia subject categories and Russian labels where available. [iNaturalist taxonomy exports](https://www.inaturalist.org/pages/developers) · [EltonTraits](https://doi.org/10.6084/m9.figshare.c.3306933) · [Paleobiology Database](https://paleobiodb.org/) · [DBpedia](https://www.dbpedia.org/)

## Film and television

Title selections use Wikidata and DBpedia subject categories, with additional filters for questions about characters or settings. Genre and category coverage varies between films. [Wikidata](https://www.wikidata.org/) · [DBpedia](https://www.dbpedia.org/)

## Geographic answer sources

The mountain, river, island and volcanic-island catalogs use English and Russian labels from Wikidata's structured data (CC0). The selection uses direct instances of Q8502, Q4022, Q23442 and Q1161185 respectively. Duplicate names are skipped. The river and mountain selections are bounded to keep the catalog small. [Wikidata data reuse](https://www.wikidata.org/wiki/Wikidata:Licensing)

Bridge cities are settlements classified as cities in Wikidata. Each has a Wikidata bridge with an English label, an administrative location in that city (P131), and a crossing (P177) of an entity classified as a river. Russian names use Wikidata labels and Natural Earth populated-place labels where available. [Natural Earth populated places](https://www.naturalearthdata.com/downloads/10m-cultural-vectors/10m-populated-places/)

Lunar names use the IAU-approved names in the USGS Gazetteer of Planetary Nomenclature. The selection includes named craters and individually designated satellite craters such as Marco Polo P. Lettered variants were taken from the Gazetteer, with a match to a named parent crater. Russian names use Wikidata labels where available. The official spelling is accepted in either language. [Gazetteer GIS downloads](https://planetarynames.wr.usgs.gov/GIS_Downloads)

Additional reviewed entries include rivers through capitals (for example the Sava in Belgrade and the Bagmati in Kathmandu), volcanic islands, and countries with shared lakes (for example Lake Assal is internal to Djibouti, while Lake Abbe straddles the Djibouti–Ethiopia border). Costa Rica's state flag carries the seven stars on the national coat of arms.

## Games, sports and fictional worlds

- The 2022 and 2025 BoardGameGeek snapshots link each game to its mechanics. The board question uses evidence of a board, grid or movement track. The dice and tile questions use the Dice Rolling and Tile Placement mechanics. Base-game expansions are excluded. The game ID joins editions to Wikidata Russian labels where available. Cyrillic alternate titles from the newer snapshot are accepted as input. [2022 data](https://github.com/rfordatascience/tidytuesday/tree/master/data/2022/2022-01-25) · [2025 data](https://huggingface.co/datasets/mmpa/board_game_analysis/blob/main/games_detailed_info2025.csv)
- Pagat’s alphabetical index identifies the equipment used for traditional games. The import selects named games whose French-suited card counts explicitly include one 52-card pack. [Pagat game index](https://www.pagat.com/alpha/)
- Wikidata supplies English and available Russian names. The video-game selection uses instances of video game with articles on English Wikipedia and labels in both languages. The fishing category uses the fishing-video-game genre. Other selections use the types for fictional cities, planets, islands, vehicles, robots, weapons and Greek deities. Sports selections and gliding games include editorial selections. [Wikidata](https://www.wikidata.org/wiki/Wikidata:Main_Page)
- Named solar systems in EVE Online come from the CCP static data export converted to CSV by Fuzzwork. The selection excludes alphanumeric system designations. [Solar systems](https://www.fuzzwork.co.uk/dump/latest/csv/mapSolarSystems.csv)
- PokéAPI supplies winged Pokémon forms and names of in-game cities, forests and other locations. The character selection uses the wings and bug-wings body shapes. Star Wars planet names come from SWAPI. [PokéAPI](https://github.com/PokeAPI/pokeapi/tree/master/data/v2/csv) · [SWAPI](https://github.com/phalt/swapi/blob/master/resources/fixtures/planets.json)

## Music and books

Song names come from individual track titles in the Spotify track metadata published by RecSysTUM and from Wikidata song and single labels. The import matches whole color words, animal names, selected given names, and rain terms in the title. The rain question uses English terms. The other three questions also accept Cyrillic titles. The import filters out explicit remaster and remix credits, karaoke, high-speech and high-instrumental recordings in the track dataset, and common classical movement and sound-effect labels. It retains original titles in both interfaces when a Russian title is unavailable. [RecSysTUM track metadata](https://huggingface.co/datasets/RecSysTUM/Million_Song_Dataset) · [Wikidata](https://www.wikidata.org/)

Album titles were drawn from Wikidata album, studio album, compilation and live album records. Band names were filtered for digits in musical group names, and duos were selected using the musical duo classification (Q9212979). The guitarist additions are editorial selections of players active in 1970s rock. The instrument catalogs use Wikidata labels and classifications, MusicBrainz instrument identifiers, and editorial additions for instruments struck with mallets or hammers. [MusicBrainz instrument list](https://musicbrainz.org/instruments) · [Wikidata](https://www.wikidata.org/)

Additional English rain titles come from the artist/title table of the Million Song Dataset. The novel list combines Wikidata genre assignments under “novel” with English descriptions that explicitly identify the item as a novel. [Million Song Dataset](http://millionsongdataset.com/) · [Wikidata](https://www.wikidata.org/)

## Household items

The small bilingual sets were selected for the condition in each prompt. Product model names keep the manufacturer's spelling in both languages.

- Phone and tablet model names and specifications come from the [GSMArena dataset snapshot](https://github.com/foykes/gsm-arena-dataset/tree/d27d82b679eab3339030bdc9efe1a589f22e87aa). Entries listed as available or discontinued qualify. Lens entries require an identified camera. Portable light entries require an Android or iOS camera device with an LED flash. The buttons set uses handheld Android and iOS devices. The folding and hinge sets use devices with dimensions explicitly identified as folded and unfolded.
- Bicycle models come from [Bicycle Brands & Models](https://github.com/reaatech/bicycle-brands-models/tree/9639d9ed63405d887860018f790c2eab453262fa). The selection uses identified pedal bicycle families and excludes listings marked electric and standalone frames. Product names describe specific examples of objects with wheels.
- Historical headwear and headwear types use paired English and Russian labels from [Wikidata headgear](https://www.wikidata.org/wiki/Q14952). Catalogue fragments, category records and several ceremonial pieces are excluded.
- Helmet manufacturer and model pairs come from the [Snell Memorial Foundation's public certification lists](https://smf.org/cert). Sizes and certification years are omitted.
- Hinged laptop models come from [Ubuntu Certified laptops](https://ubuntu.com/certified/laptops). Processor and memory configurations in parentheses are omitted. Detachable models are excluded, and the folding subset uses convertible laptop families.
