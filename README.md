# Zhenkun Lu's Academic Homepage

Source of <https://econsolider.github.io>, a static site served by GitHub Pages (no build step).

## Structure

```
.
├── index.html            # page skeleton: navbar, sections, footer
├── contents/
│   ├── config.yml        # site title, header text, copyright (keys map to element ids)
│   └── *.md              # one Markdown file per section
└── static/
    ├── assets/img/       # background.jpeg, photo.png
    ├── css/main.css      # custom styles (styles.css is the Bootstrap theme)
    └── js/scripts.js     # loads config.yml and renders contents/*.md
```

## Editing

- **Update content**: edit the matching file in `contents/`.
- **Add a section**: add a `<section>` and a nav link in `index.html`, add the name to `section_names` in `static/js/scripts.js`, and create `contents/<name>.md`.

## Local preview

Content is loaded with `fetch`, so opening `index.html` directly from disk shows empty sections. Serve the folder over HTTP instead:

```
python -m http.server 8000
```

Then open <http://localhost:8000>.

## Credits

Based on [academic-homepage-template](https://github.com/senli1073/academic-homepage-template) by Sen Li (MIT License).
