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
- **Phase 1 Complete**: Scaffolded Vite React project, configured `vite-plugin-pwa`, initialized dark mode glassmorphism UI, and set up IndexedDB.
- **Phase 2 Complete**: Migrated to TypeScript, implemented Goal creation form, dashboard list, statistics engine (`stats.ts`), and basic check-in logic.
- **Next Step**: Phase 3 - Implement Goal Detail View (Heatmap, General Track, Schedule Track, and individual goal stats).

## Data Model (Proposed)
- **Goal**: `id`, `title`, `hasEndGoal`, `targetValue`, `schedule` (type, frequency), `createdAt`
- **CheckIn**: `id`, `goalId`, `date`, `value`, `notes`
