# Rare Below

An English/Russian quiz where specific answers earn points for rarity. The miner digs deeper as the score increases. A zero-point answer leaves the miner at the same depth. Suitable answers earn 10, 25, 55, 85 or 120 points. Each question has a 30-second deadline that survives a reload.

- Daily has eight questions and opens at 00:00 UTC.
- Endless shuffles the open prompts in successive cycles and can be ended at any point.
- Friend duels use the same eight prompts for two people. The room lasts seven days. Each player takes their own turn, and scores appear after both finish.
- After the daily round, community picks are ordered by observed frequency once there are three completed rounds. Scores use fixed rarity tiers.

The local catalog contains 39 open questions and 1,649 topic-specific entries. Some categories verify additional names against Wikidata. Coverage varies with the catalog and Wikidata. Typed text for a lookup is sent to the answer service, which stores only the recognized entity and its public labels. Prior versions and their links are kept in `shaft/`, `expedition/`, and `classic/`.

## Deployment

The front end is static GitHub Pages, served from `main` at the repository root. Run `python -m http.server 8000` to open a local copy. Online modes use a separate Sites Worker with a D1 database. The production service accepts requests from the GitHub Pages origin.

## Data sources

- [Country and regional data](https://github.com/mledoze/countries)
- [Periodic table facts](https://github.com/Bowserinator/Periodic-Table-JSON)
- [Wikidata entity search](https://www.mediawiki.org/wiki/Wikibase/API)
