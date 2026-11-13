# Small VLA Survey

A static page comparing 27 vision-language-action robot policies under one billion
parameters: size, benchmark results, architecture, training recipe and compute.
Every number is the paper's own reported result for its own model.

There is no build step: open `index.html`, or serve the folder with any static server.

```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

| Path | What it holds |
|---|---|
| `index.html` | The page |
| `assets/site.css` | Styles, in the theme of VLA Hub |
| `assets/app.js` | The data (tables, notes, per-paper summaries) and the script that renders it |
