# Portfolio — Lucas Mesias

Personal portfolio site built with [Astro](https://astro.build/), [Svelte 5](https://svelte.dev/), and [Tailwind CSS 4](https://tailwindcss.com/).

## Tech Stack

- **Astro 7** — static site generation with island architecture
- **Svelte 5** — interactive islands (calculadora, D3 visualizations)
- **Tailwind CSS 4** — utility-first styling via Vite plugin
- **TypeScript** — type safety across the project
- **D3.js** — force-directed graph and signal visualizations
- **Bun** — package manager and runtime

## Getting Started

```bash
bun install
bun run dev
```

Open [http://localhost:4321](http://localhost:4321) in your browser.

## Commands

| Command           | Description               |
| ----------------- | ------------------------- |
| `bun run dev`     | Start development server  |
| `bun run build`   | Build for production      |
| `bun run preview` | Preview production build  |
| `bun run check`   | Run type checking         |
| `bun run format`  | Format code with Prettier |

## Project Structure

```
src/
├── components/       # Svelte 5 islands + Astro components
├── content/          # Content collections (curriculum data)
├── layouts/          # Page layouts
├── lib/              # Shared utilities (calculadora, D3 canvas)
├── pages/            # File-based routes
└── styles/           # Global CSS (Tailwind + neobrutalist utilities)
```

## Pages

- `/` — Engineering curriculum grid (malla)
- `/calculadora` — GPA calculator with localStorage persistence
- `/eda` — Interactive D3 force-directed graph
- `/psi` — Signal/vector visualization with D3
