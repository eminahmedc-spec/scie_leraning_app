# Learn & Play

A small, kid-friendly learning site for ages 6–12, with short lessons and multiple-choice quizzes in **math**, **English**, and **science**.

It is plain static HTML, CSS, and JavaScript — no build step, no dependencies, no framework.

## Pages

| Page | Contents |
| --- | --- |
| `index.html` | Home page with a subject picker and a "fun fact" strip |
| `math.html` | Addition/subtraction, multiplication, shapes and halves — 5-question quiz |
| `english.html` | Nouns and verbs, plurals, sentence building — 5-question quiz |
| `science.html` | Living things, the planets, solids/liquids/gases — 5-question quiz |

## Project structure

```
index.html              Home
math.html               Math subject page + quiz data
english.html            English subject page + quiz data
science.html            Science subject page + quiz data
css/styles.css          All styling (CSS custom properties in :root)
js/quiz.js              Shared quiz engine
```

## Running it

Open `index.html` in a browser — that's it. The site also works from any static file server:

```bash
python -m http.server 8000
# then visit http://localhost:8000
```

A server is only needed if you prefer not to open the file directly; there is no fetch, module, or backend code.

## How the quiz works

Each subject page declares its own questions in an inline `window.QUIZ` object, and `js/quiz.js` renders them:

```html
<script>
  window.QUIZ = {
    subject: "math",
    questions: [
      { q: "What is 7 + 5?", options: ["10", "11", "12", "13"], answer: 2,
        why: "7 + 5 = 12. Count on from 7: 8, 9, 10, 11, 12." }
    ]
  };
</script>
<script src="js/quiz.js"></script>
```

- `answer` is the zero-based index of the correct option.
- `why` is shown as feedback after an answer is chosen.
- The engine handles scoring, a progress bar, per-question feedback, and a results screen with retry.

To add a question, append an object to the `questions` array on the relevant page. Nothing else needs changing.

## Styling

All styles live in `css/styles.css`. Shared colors, radius, and shadow are CSS variables in `:root`, and each subject has an accent theme via a body class (`math`, `english`, `science`). Fonts are Fredoka and Nunito, loaded from Google Fonts.

## Deploying

Any static host works — GitHub Pages, Netlify, Vercel, or a plain web server. Publish the repository root; there is nothing to compile.

## Accessibility notes

Quizzes expose quiz feedback through `aria-live`, the progress bar uses `role="progressbar"`, the active nav link is marked with `aria-current="page"`, and decorative art is hidden from screen readers with `aria-hidden="true"`.

## License

Content and code are for personal and educational use.
