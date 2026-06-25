# CycleGRPO — Project Page

Static project page for the CycleGRPO paper. Built on the
[Academic Project Page Template](https://github.com/eliahuhorwitz/Academic-project-page-template)
(Nerfies / Bulma style). This is a **separate repo from the code** — link the two
with the "Code" / "Project Page" buttons.

## Structure

```
index.html              # the page (edit content here)
static/
  css/index.css         # styling + figure placeholders
  js/                   # optional scripts (carousels, etc.)
  images/               # teaser.png, method.png, qualitative.png, ...
  videos/               # teaser.mp4, ...
  pdfs/                 # paper.pdf
.nojekyll               # tell GitHub Pages to serve files as-is
```

## Preview locally

```bash
python3 -m http.server 8000     # then open http://localhost:8000
```

## Deploy on GitHub Pages

1. Create a repo, e.g. `CycleGRPO-page`, and push these files.
2. Settings → Pages → Source = `Deploy from a branch`, Branch = `main`, folder = `/ (root)`.
3. Page goes live at `https://<user>.github.io/CycleGRPO-page/`.

(Alternatively put this folder under your personal `username.github.io` repo as
`projects/CycleGRPO/` to get `username.github.io/projects/CycleGRPO/`, like SAMTok.)

## TODO before publishing

Search `index.html` for `TODO` and `#` placeholder links, then fill in:

- [ ] Title / subtitle, authors, affiliations, equal-contribution / corresponding marks
- [ ] Button links: Paper PDF, arXiv, **Code repo URL**, checkpoints
- [ ] `teaser`, `method`, `qualitative` figures → drop files into `static/images/`
- [ ] Abstract (a draft is in place — replace with the final one)
- [ ] Results table numbers + qualitative grid
- [ ] BibTeX entry

Keep the footer template/Nerfies credit (license requirement).
