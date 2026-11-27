# Rare Below

An English/Russian quiz where specific answers earn points for rarity. The miner digs deeper as the score increases. A zero-point answer leaves the miner at the same depth. Suitable answers earn 10, 25, 55, 85 or 120 points. Each question has a 30-second deadline that survives a reload.

- Daily has eight questions and opens at 00:00 UTC.
- Endless shuffles the open prompts in successive cycles and can be ended at any point.
- Themed expeditions draw 7 or 12 questions from a chosen topic. Group rooms let 2–8 players join by code or link, play 5, 7 or 10 questions and compare answers after each round.
- Friend duels start when both players press Ready. The same eight questions and timers run on both devices; the first submitted answer limits the other player’s remaining time to ten seconds. Scores are compared after the last question. Older asynchronous room links still work. New invitations open the guest seat directly. Players can also enter the room code from the game menu.
- After the daily round, community picks are ordered by observed frequency once there are three completed rounds. Scores use fixed rarity tiers.
- The score chart compares completed daily runs for the same edition or personal bests for the same theme and run length. The chart uses anonymous counts and appears once three players have finished.

The game checks answers when they are submitted. Catalog matches are instant. The server checks additional names against Wikidata where available and can ask an answer model for unfamiliar entries. Prior versions and their links are kept in `shaft/`, `expedition/`, and `classic/`.

## Question bank

New editorial questions live in `theme-questions.js`. Each question has a stable ID, both prompt languages, and bilingual answer rows with aliases and a rarity tier. Use `node scripts/check-content.mjs` to check new entries and pack coverage. Append answers to keep their existing numeric IDs stable in saved rounds.

Bulk reference answers and aliases live in `answer-expansions.js`, grouped by question ID. Append entries within each group, since their numeric IDs follow the original answers. Imported answers start at +55 until their tiers are reviewed with play data. Round review offers bilingual search and pagination for the full catalog.

Questions written for themed expeditions live in `pack-questions.js`. The topic pools live in `open-questions.js`.

### Writing questions and answers

1. Start with a familiar category and one clear condition. Try the question in both languages. Each should offer an obvious answer within a few seconds and leave multiple directions for rarer answers. As a practical target, prepare at least 15 distinct answers before releasing a question.
2. Decide what fits before assigning points. The answer should satisfy the wording directly or use an established meaning of a word that works in both languages. A zipper has teeth in both English and Russian. A letter clue must name a shared spelling standard. Put translations, common spellings and nicknames under the same answer.
3. Include answers that are surprising for a reason. For striped animals, a young zebra shark has stripes, even though adults are spotted. In `answer-notes.js`, add a short original note in both languages under the question ID and its canonical English answer label. Explain which part of the clue it satisfies. The game shows these notes when it reveals the answer and in the round review.
4. Set initial rarity tiers after checking the answer set. Each question has one +120 answer. After editorial review, add the question to the active calendar and decks. Use counts from completed daily expeditions to review tiers as sufficient data becomes available. Confirm any score changes manually in a new question ID for future editions so old results retain their scores.

The former manual review queue is retained in the private `DB.mine_answer_review` table. Deploy the same question source to the site and the answer service when activating a new catalog.

### Live answer checks

On the Sites Worker, set either `GROQ_API_KEY` or `OPENAI_API_KEY` as a runtime secret to enable model verification. Optional `AI_ANSWER_MODEL` overrides the provider default. The server sends the question and answer text, caches the verdict, and shows a short explanation in both languages. New answers accepted by the model start at +55, with player frequency displayed separately when there are enough finished daily games. `AI_CHECKS_PER_DAY` controls the number of uncached model checks per UTC day (default 200). The solo timer pauses during verification. Multiplayer keeps its shared clock.

## Deployment

The front end is static GitHub Pages, served from `main` at the repository root. Run `python -m http.server 8000` to open a local copy. Online modes use a separate Sites Worker with a D1 database. The production service accepts requests from the GitHub Pages origin.

[Answer counts by question](docs/answer-coverage.tsv) · [Additional catalog sources](docs/answer-sources.md)

## Data sources

- [Country and regional data](https://github.com/mledoze/countries)
- [UN member states](https://www.un.org/en/about-us/member-states)
- [Periodic table facts](https://github.com/Bowserinator/Periodic-Table-JSON)
- [IAU constellation names](https://iauarchive.eso.org/public/themes/constellations/)
- [IOC World Bird List, edition 15.2](https://www.worldbirdnames.org/new/ioc-lists/master-list-2/)
- [Natural Earth, 1:10m cultural and physical data](https://www.naturalearthdata.com/downloads/10m-physical-vectors/)
- [Film title and release metadata](https://github.com/prust/wikipedia-movie-data)
- [Anime Offline Database (ODbL), including feature length and title data](https://github.com/manami-project/anime-offline-database)
- [Shikimori title metadata where available](https://shikimori.one/api/doc)
- [Billboard Hot 100 chart archive](https://github.com/mhollingshead/billboard-hot-100)
- [Wikidata entity search](https://www.mediawiki.org/wiki/Wikibase/API)

[BBFC: The Fellowship of the Ring and its runtime](https://www.bbfc.co.uk/release/the-lord-of-the-rings-the-fellowship-of-the-ring-q29sbgvjdglvbjpwwc0zntaxmda)
