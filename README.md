# Shadow Regimen

A production-ready fitness tracking web application inspired by the Solo Leveling System interface.

## Tech Stack

- **React 18** + **TypeScript** + **Vite**
- **Tailwind CSS** with custom glassmorphism theme
- **Framer Motion** for animations
- **Zustand** for global state management with persistence

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

## Architecture

### Core Components

- **SystemBoot**: Boot sequence component with typing/glitch effects
- **hunterStore**: Zustand store managing all hunter state and persistence

### State Management

The `hunterStore` uses Zustand with localStorage persistence:
- Automatic data validation and recovery
- Graceful handling of corrupted data
- IndexedDB fallback (ready for future implementation)

### Key Features

- **EXP System**: Level² × 100 formula for progression
- **Rank System**: E → D → C → B → A → S based on level thresholds
- **Daily Quests**: Auto-generated quests that reset every 24 hours
- **Streak Tracking**: Date-aware streak system
- **Stat Progression**: Intelligent stat increases on level up

## Project Structure

```
src/
├── components/     # React components
├── store/         # Zustand stores
├── types/         # TypeScript interfaces
└── utils/         # Pure functions and calculations
```

## Design Principles

- System black background (#0a0a0a)
- Cyan glow accents (#00ffff)
- Glassmorphism UI with backdrop blur
- Respects `prefers-reduced-motion`
- Production-grade code quality

# Shadow_Regimen
