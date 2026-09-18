# Tiimo UI

A runnable React Native + Web recreation of the core screens of Tiimo, the visual planner for Android — built from real components, text and state, not screenshots.

**First batch:** Today plan (create, complete, undo), task action menu, Update-task sheet, focus timer (start, pause, resume, progress arc) and delete confirmation.

## Run it

```bash
npm install
npm run web          # development server
npm run build:web    # static build in dist/
npm run typecheck
```

Stack: Expo 57, React Native 0.86, React Native Web 0.21, React 19, TypeScript. Design tokens live in `src/tokens.ts`; the design summary is in `DESIGN.md`.

## Differences from the app

- **Task emoji.** Tiimo picks a task's emoji automatically from its name. This prototype does not reproduce that and always shows 📝.
- **Serif font.** Tiimo uses Recoleta, a commercial typeface. This prototype uses the open Fraunces, sized to the same widths.
- **Artwork.** The profile character is replaced by a plain gradient; a few small vector icons are close approximations.
- **Not yet built:** timer completion at 00:00, sub-task editing, the date picker, and the To-do list / Repeat picker / quick-create screens of the next batch.

This is an independent study project. It is not affiliated with or endorsed by Tiimo; "Tiimo" is a trademark of its owner.

## Licenses

- Code: see `LICENSE`.
- Fonts in `assets/fonts/`: Roboto and Fraunces under the SIL Open Font License 1.1 (`Roboto-OFL.txt`, `Fraunces-OFL.txt`); icon fonts under their own licenses (`ICON-FONTS-LICENSES.txt`, `expo-vector-icons-LICENSE.txt`).
