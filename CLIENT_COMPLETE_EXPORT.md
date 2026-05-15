# StadiumOS Client - Complete Export

## Project Structure

```
client/
├── src/
│   ├── components/
│   │   ├── AgentCard.jsx
│   │   ├── AgentPanel.jsx
│   │   ├── CinematicNotification.jsx
│   │   ├── EnergyViz.jsx
│   │   ├── Feed.jsx
│   │   ├── FanZone.jsx
│   │   ├── Hero.jsx
│   │   ├── MomentumChart.jsx
│   │   ├── ParticleBackground.jsx
│   │   └── ThinkingStatus.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   ├── index.css
│   └── stadium.css
├── public/
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── eslint.config.js
├── .gitignore
├── README.md
└── standalone.html (pre-built)
```

## Configuration Files

### package.json
```json
{
  "name": "stadium-os",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "framer-motion": "^11.15.0",
    "lucide-react": "^0.468.0",
    "react": "^19.2.6",
    "react-dom": "^19.2.6",
    "recharts": "^2.12.0"
  },
  "devDependencies": {
    "@eslint/js": "^10.0.1",
    "@types/react": "^19.2.14",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^6.0.1",
    "autoprefixer": "^10.4.20",
    "eslint": "^10.3.0",
    "eslint-plugin-react-hooks": "^7.1.1",
    "eslint-plugin-react-refresh": "^0.5.2",
    "globals": "^15.0.0",
    "postcss": "^8.4.49",
    "tailwindcss": "^3.4.17",
    "vite": "^8.0.12"
  }
}
```

### vite.config.js
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

### tailwind.config.js
```javascript
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          blue: '#00d4ff',
          purple: '#a855f7',
          cyan: '#22d3ee',
          pink: '#ec4899',
          green: '#10b981',
          yellow: '#facc15',
          orange: '#f97316',
        },
        dark: {
          900: '#0a0a0f',
          800: '#12121a',
          700: '#1a1a25',
          600: '#252530',
          500: '#323240',
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
        'spin-slow': 'spin 8s linear infinite',
        'pulse-ring': 'pulseRing 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient': 'gradient 8s ease infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(0, 212, 255, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(0, 212, 255, 0.6)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        pulseRing: {
          '0%': { transform: 'scale(0.8)', opacity: '1' },
          '100%': { transform: 'scale(1.5)', opacity: '0' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'grid-pattern': 'linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid': '30px 30px',
      },
    },
  },
  plugins: [],
}
```

### postcss.config.js
```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

### eslint.config.js
```javascript
import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: { react: { version: '18.3' } },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      'react/jsx-no-target-blank': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
]
```

## Source Files

### src/main.jsx
```javascript
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

### src/App.jsx
Complete React component managing all state and UI logic for StadiumOS dashboard.
- Manages energy levels, active agents, feed items, reactions
- Simulates live event data with interval updates
- Handles user interactions (reactions via emojis)
- Renders all child components in responsive grid layout

### src/components/Hero.jsx
Hero banner component displaying:
- Main title "StadiumOS — Live Command Center"
- LIVE status indicator
- AI agents active count
- Crowd energy percentage
- Next event info and latency

### src/components/AgentCard.jsx
Individual agent card showing:
- Agent name with color gradient
- Subtitle describing agent purpose
- Current activity status
- Progress bar showing activity level

### src/components/AgentPanel.jsx
Container component rendering 5 agent cards in responsive grid.

### src/components/Feed.jsx
Event feed component displaying:
- Latest 12 events from live feed
- Event tags (G, W, M, F, R for Goal, Wicket, Momentum, Fan, Reaction)
- Time stamps
- Impact levels (High, Medium, Low)

### src/components/EnergyViz.jsx
Circular energy visualization with:
- SVG circular progress indicator
- Gradient colors (cyan to purple)
- Real-time energy percentage display
- Descriptive text

### src/components/MomentumChart.jsx
Line chart using Recharts library:
- Displays energy momentum over time
- Last 20 readings shown
- Real-time updates every 1.2 seconds
- Grid and tooltip for interaction

### src/components/ThinkingStatus.jsx
AI thinking status display:
- Shows current AI processes running
- Animated pulse indicators
- Messages like "Analyzing crowd reactions..."

### src/components/FanZone.jsx
Interactive fan engagement section:
- "Predict: Team A wins" button
- "Start Poll" button
- 4 emoji reaction buttons (🔥, 👏, ⚡, ❤️)
- On-click handlers for user engagement

### src/components/ParticleBackground.jsx
Canvas-based animated particle system:
- 40 floating particles with random motion
- Fade effect with canvas overlay
- Responsive to window resizing
- Creates immersive background effect

### src/components/CinematicNotification.jsx
Toast notification component:
- Slides in from top
- Displays title, subtitle, and icon
- Auto-dismisses after 3-4 seconds
- Gradient purple/pink styling

### src/index.css
Base styles and CSS variables for dark theme.

### src/App.css
Additional component-specific styles.

### src/stadium.css
Supplemental styles:
- Glass morphism effects
- Hero banner responsive sizing

## HTML Entry Point

### index.html
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>client</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

## Running the Project

### Development Mode
```bash
npm install
npm run dev
```
Starts Vite dev server with HMR at http://localhost:5173

### Production Build
```bash
npm run build
```
Creates optimized build in `dist/` folder

### Lint
```bash
npm run lint
```

### Preview Build
```bash
npm run preview
```

## Features

✅ **Real-time Dashboard**: Live event feed with simulated data
✅ **Multi-Agent System**: 5 AI agents monitoring different aspects
✅ **Energy Tracking**: Circular visualization of crowd energy
✅ **Momentum Chart**: Timeline graph of energy fluctuations
✅ **Interactive Elements**: Fan zone with emoji reactions
✅ **Animations**: Framer Motion for smooth transitions
✅ **Responsive Design**: Mobile-first Tailwind CSS layout
✅ **Particle Effects**: Canvas-based background animation
✅ **Cinematic Notifications**: Toast alerts for key events

## Dependencies
- **React 19.2.6**: UI framework
- **Vite 8.0.12**: Build tool with HMR
- **Tailwind CSS 3.4.17**: Utility-first styling
- **Framer Motion 11.15.0**: Animation library
- **Recharts 2.12.0**: Chart components
- **Lucide React 0.468.0**: Icon library

## Key Files for Modification
- `src/App.jsx` - Main logic and state management
- `src/components/*.jsx` - Individual UI components
- `tailwind.config.js` - Design tokens and animations
- `vite.config.js` - Build configuration

## Standalone Version
A pre-built `standalone.html` file is included that runs without build tools - perfect for quick demos or sharing!
