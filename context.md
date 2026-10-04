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
- Repository initialized.
- Core documentation (`README.md`, `agents.md`, `context.md`) created.
- Initial plan formulated and stored in `docs/2026-10-04-plan.md`.
- **Next Step**: Scaffold the Vite project and set up the basic PWA skeleton.

## Data Model (Proposed)
- **Goal**: `id`, `title`, `hasEndGoal`, `targetValue`, `schedule` (type, frequency), `createdAt`
- **CheckIn**: `id`, `goalId`, `date`, `value`, `notes`
