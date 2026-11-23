# Deep Cut Daily

Three open-answer questions on one topic, with a new edition at 00:00 UTC. Answers become more demanding and worth more points as the round progresses. Taking a hint costs one point. The challenge link reopens the same edition and reveals the friend’s target score after the round.

The initial slate contains 14 editions. It loops after the first two weeks. To add a new edition before the loop, append it to `episodes.js`. Keep already published editions in order so their challenge links keep working. Scores live in the browser and challenge URLs are for friendly play.

## Run locally

Open `index.html` in a browser. For an HTTP preview with working clipboard support on localhost, run `python -m http.server 8000` in the repository root and open `http://localhost:8000/`.

## GitHub Pages

Publish the root of the `main` branch under Settings, then Pages, then Deploy from a branch. There is no build step. Relative paths let the site run at a GitHub project URL.

[GitHub Pages publishing settings](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
