# Progress Tracker PWA

A mobile-oriented Progressive Web App for tracking personal goals and progress. Features scheduled check-ins, beautiful heatmaps, and full offline support. All data is stored locally on your device for complete privacy, with options to export and import.

## Live Demo
Check out the live app here: **[Progress Tracker](https://mayankmathur.github.io/progress-tracker/)**

## Features
- **Local Storage**: All data stored locally on your browser (IndexedDB).
- **Progress Tracking**: Set up goals with scheduled check-ins (daily, weekly, custom intervals).
- **Infinite Goals**: Track habits without an end goal.
- **Heatmaps**: Visual representation of your check-in history.
- **Data Portability**: Export and import your data as JSON.
- **Offline First**: Works without an internet connection as a PWA.

## Tech Stack
- **React**: UI library for building components.
- **Vite**: Ultra-fast frontend build tool.
- **Vite PWA**: Zero-config PWA framework for Vite.
- **IndexedDB**: Client-side storage for offline capabilities.
- **Lucide React**: Beautiful and consistent iconography.

## Developer & Agent Context
If you are an AI agent or a developer looking to contribute to or understand the project structure, please read the **[context.md](context.md)** file for a quick and comprehensive overview of the repository.

## Getting Started

To run the project locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/mayankmathur/progress-tracker.git
   cd progress-tracker
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Run the development server:**
   ```bash
   npm run dev
   ```

## Deployment

The application is deployed to GitHub Pages from the `release` branch. The deployment setup is configured in `vite.config.ts` using the base path `'/progress-tracker/'`.
