# Agent Context & Project Overview

Welcome! If you are an AI agent or developer assigned to work on this repository, this file is your starting point. It provides a high-level summary of the project, architecture, file structure, and development guidelines.

## Project Summary
Progress Tracker is a pure frontend Progressive Web App (PWA) designed primarily for mobile devices. It allows users to track personal goals with flexible scheduling (daily, weekly, custom). The app is built with a strong focus on a premium, aesthetic, Swiss Minimalist UI that supports both light and dark modes.

All data is completely private and stored locally on the user's device using IndexedDB, meaning the app works perfectly offline. The app also supports exporting and importing data as JSON.

## Architecture & Tech Stack
- **Framework**: React (built with Vite)
- **Styling**: Vanilla CSS (`index.css`) utilizing CSS variables for theme tokens (Light/Dark mode) and modern layouts (Grid/Flexbox). No Tailwind.
- **PWA Capabilities**: Managed via `vite-plugin-pwa` for service workers and offline support.
- **Data Storage**: Local IndexedDB via the `idb` library.
- **Icons**: Lucide React.
- **Routing**: Client-side view orchestrator (mobile-focused).

## File Structure
- `/src`: Contains the core React application.
  - `/src/components`: UI components (`Welcome.tsx`, `GoalList.tsx`, `GoalDetail.tsx`, `Heatmap.tsx`, etc.).
  - `/src/lib`: Data models, storage logic, and IndexedDB wrappers.
  - `/src/index.css`: The central design system containing CSS variables, micro-animations, and component styles.
  - `/src/App.tsx`: Main application shell, theme toggle, and view orchestrator.
- `/docs`: Contains agent plan documents and the deployed production build files.
- `AGENTS.md`: Crucial instructions for agents regarding planning, version control, and publishing workflows. **Must read** for operational rules!
- `vite.config.ts`: Vite configuration, including PWA setup and GitHub Pages base URL (`/progress-tracker/`).

## Agent Guidelines
- **Publishing**: The app is deployed to GitHub Pages via the `release` branch. See `AGENTS.md` for the exact publishing protocol.
- **Aesthetics First**: Any new UI must adhere to the established premium aesthetic (animations, glassmorphism, precise spacing) defined in `index.css`.
- **Planning**: Before implementing large features, write a plan in the `/docs` directory.
- **Context Updates**: Update this `context.md` file whenever significant architectural or state changes occur.

## Current State & Recent Work
- Transitioned to a light/dark adjustable Swiss Minimalist design with robust widgets, animated progress bars, metric cards, and an intensity-scaled heatmap.
- GitHub Pages deployment configured with the correct Vite base path (`/progress-tracker/`).
- Mobile layout bugs (scrolling, z-index overlays) resolved for seamless usage.
