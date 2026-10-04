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
- **Phase 3 & 4 Complete**: Implemented Goal Detail View (Heatmap, General Track, Schedule Track, individual goal stats) and Settings view (Data Export/Import). Micro-animations and responsive CSS applied.
- **Feedback Received**: Moving away from dark-only neon glassmorphism to a light/dark adjustable Swiss Minimalist design. Enhancing check-ins to be quantitative (value-based) rather than just day-count, and expanding frequency options.
- **New Plan Formulated**: A massive UI/UX revamp plan to elevate the app to a premium SaaS product is stored in `docs/2026-10-04-plan-2.md`.
- **Next Step**: Execute Phase 1 of the new Premium UI Revamp (Design System & Theming Engine).

## Data Model (Proposed Updates)
- **Goal**: `id`, `title`, `hasEndGoal`, `targetValue`, `targetUnit` (new), `scheduleType` (expanded options), `createdAt`
- **CheckIn**: `id`, `goalId`, `date`, `value` (now mandatory for quantitative tracking), `notes`
