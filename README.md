# Time Calculator

A tiny, fast web app to quickly add up lots of time entries. I built it for situations where I need to sum many hours/minutes and want the result immediately.

Live in the browser, no backend required.

## Features

- Simple textarea: paste or type multiple time entries
- Instant parsing and total calculation as you type
- Clear breakdown of each entry (valid/invalid)
- Friendly formatting of totals (e.g. `2 hrs 15 mins`)
- Built with Svelte + TypeScript + Vite

## Supported input formats

Each entry can be written on a new line or separated by commas. Accepted formats include:

- Hours only: `1 hr`, `2hr`, `10 hrs`
- Minutes only: `15 min`, `30min`, `90 mins`
- Hours and minutes: `1:30 hr`, `1:05hr`

Notes:

- In `H:MM hr`, minutes must be between `00` and `59`.
- Spacing is flexible (e.g., `1hr`, `1 hr`, `1:30hr` are all valid).
- Capitalization does not matter (`HR`, `hr`, `Hr`).

## Examples

Input (each on its own line or separated by commas):

```
1 hr
30 min
1:45 hr
20min
```

Total: `3 hrs 35 mins`

Invalid examples (these will be highlighted and not included in the total):

```
1:75 hr   // minutes cannot be 75
abc       // unknown format
```

## How to run locally

- Prerequisites: Node.js 18+

Commands:

- Install dependencies: `npm install`
- Start dev server: `npm run dev`
- Build for production: `npm run build`
- Preview production build: `npm run preview`

These scripts are defined in `package.json` and use Vite under the hood.

## Using the app

- Open the dev URL printed by Vite (usually `http://localhost:5173`).
- Type or paste your time entries into the textarea.
- The total and a per-entry breakdown update instantly.

## Project structure

- `src/App.svelte` — mounts the calculator component
- `src/lib/TimeCalculator.svelte` — UI and reactive logic for the calculator
- `src/lib/timeParser.ts` — parsing and formatting logic

## Technical details

Core logic is implemented in `src/lib/timeParser.ts`:

- `parseTimeEntry(entry: string)` — parses a single entry into minutes; supports hour-only, minute-only, and `H:MM hr` formats
- `parseTimeEntries(input: string)` — splits input by new lines or commas, parses all entries, returns a list, total minutes, and an overall validity flag
- `formatTotalTime(totalMinutes: number)` — returns a friendly string such as `0 min`, `45 min`, `1 hr`, or `2 hrs 5 mins`

UI is handled by `src/lib/TimeCalculator.svelte`:

- A textarea bound to input
- Reactive parsing using `parseTimeEntries`
- Total is displayed with `formatTotalTime`
- A breakdown list shows original input, the parsed minutes, or an invalid indicator

## Embed as a component (optional)

You can reuse the calculator inside another Svelte app by importing the component:

```svelte
<script lang="ts">
  import TimeCalculator from './lib/TimeCalculator.svelte';
</script>

<TimeCalculator />
```

## License

MIT. Feel free to use, modify, and share.
