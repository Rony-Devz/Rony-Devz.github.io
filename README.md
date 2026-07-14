# Portfolio Website

Personal portfolio for a game designer focused on mobile live-service games, with a data-driven / market-intelligence background.

**Live site (target):** https://rony-devz.github.io/

## Tech
- Static site: HTML + [Tailwind CSS](https://tailwindcss.com/) (Play CDN) + vanilla JavaScript.
- **No build step** — open `index.html` directly, or serve the folder with any static server.

## Local preview
Any static file server works. For example, with Python installed:

```bash
python -m http.server 8000
```

Then open http://localhost:8000/ in your browser.

(Opening `index.html` directly also works, but a local server more closely matches how GitHub Pages serves the site.)

## Structure
```
.
├── index.html              # Landing page (all sections)
├── projects/
│   ├── swap-heroes.html     # Case study
│   └── dojo-app.html        # Case study
├── assets/
│   ├── css/styles.css       # Design tokens + component styles
│   ├── js/main.js           # Nav, mobile menu, scroll reveal
│   ├── img/                 # Screenshots, diagrams, headshot
│   └── docs/                # CV (PDF)
├── .nojekyll                # Serve files as-is on GitHub Pages
└── README.md
```

## Deployment (GitHub Pages)
1. Create a repo named `Rony-Devz.github.io`.
2. Push the contents of this folder to the `main` branch.
3. In the repo: **Settings → Pages → Deploy from branch → `main` / root**.
4. Visit https://rony-devz.github.io/.
