# Project Context

## Overview
Progress Tracker is a pure frontend Progressive Web App (PWA) designed for mobile devices. It tracks user-defined goals with flexible schedules, utilizing local storage (IndexedDB) with import/export capabilities, and features a premium, highly aesthetic UI.

## Architecture
- **Framework**: React (via Vite)
- **Styling**: Vanilla CSS (Premium design, dark mode, glassmorphism)
- **PWA**: vite-plugin-pwa
- **Storage**: IndexedDB (using a lightweight wrapper like `idb`)
- **Icons**: Lucide React

## Current State
- Core documentation (`README.md`, `agents.md`, `context.md`) created.
- Initial plan formulated and stored in `docs/2026-10-04-plan.md`.
- **Phase 1 Complete**: Scaffolded Vite React project, configured `vite-plugin-pwa`, initialized dark mode glassmorphism UI in `index.css`, and set up IndexedDB access logic (`idb`) in `src/lib/db.js`.
- **Next Step**: Proceed to Phase 2 (Core Logic & Services) to hook up state management, build the goals API, and create UI components to display them.

## Data Model (Proposed)
- **Goal**: `id`, `title`, `hasEndGoal`, `targetValue`, `schedule` (type, frequency), `createdAt`
- **CheckIn**: `id`, `goalId`, `date`, `value`, `notes`
