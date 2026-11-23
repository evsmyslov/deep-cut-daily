# Deep Cut Daily

A bilingual daily quiz set on a journey from Earth's surface to its core. Each of the eight questions advances the miner one layer, including when a player skips. A new round opens at 00:00 UTC. The initial bank contains 44 prompts that rotate across four subject groups.

English and Russian aliases share the same canonical concept and editorial rarity tier (25, 55, 85, or 120 points). Progress, language, and achievements live in browser storage. Challenge URLs carry the edition and score. Older formats remain available at `expedition/` and `classic/`.

After a round, the answer survey shows the answer key by rarity and anonymous community picks once at least three expeditions have been submitted for that date. The aggregate service accepts canonical answer IDs and an edition-scoped browser identifier. The quiz retains the typed answer locally.

## Run locally

Open `index.html` in a browser or run `python -m http.server 8000` from the project directory. The community endpoint accepts submissions from the published GitHub Pages origin.

## GitHub Pages

Publish the root of `main` using **Settings → Pages → Deploy from a branch**. No build step is needed.

[GitHub Pages publishing settings](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
