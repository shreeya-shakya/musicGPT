# 🎵 MusicGPT - AI Music Generation Platform

> A high-fidelity, production-ready implementation of the MusicGPT music generation interface with real-time WebSocket synchronization, beautiful animations, and seamless state management.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-14.2.5-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## 📌 Project Overview

This project is a **pixel-perfect implementation** of the MusicGPT "Create Music" interface, featuring:

- ✅ **Exact Figma Design Match** - Every pixel, color, and spacing matches the design specifications
- ✅ **Real-Time WebSocket Sync** - Profile popup and Recent Generations update simultaneously
- ✅ **Smooth Animations** - Framer Motion powers all transitions with custom easing curves
- ✅ **State Management** - Zustand for efficient, reactive global state
- ✅ **Responsive UI** - Optimized for desktop and tablet experiences
- ✅ **Production-Ready** - Clean architecture, TypeScript, and best practices

---

## 🖼️ Figma Design Reference

- **Design**: [Figma Design File](https://www.figma.com/design/RLCJ9w4VqAUBLENOZvgAHp/Web-Development-Task?node-id=0-1&t=rgL1pOowjzvGSUD5-1)
- **Prototype**: [Interactive Prototype](https://www.figma.com/proto/RLCJ9w4VqAUBLENOZvgAHp/Web-Development-Task)

---

## 🛠 Tech Stack

| Component                   | Technology              | Rationale                                                              |
| --------------------------- | ----------------------- | ---------------------------------------------------------------------- |
| **Frontend Framework**      | Next.js 14 (App Router) | Server components, optimal performance, and modern React patterns      |
| **Styling**                 | Tailwind CSS            | Utility-first approach for rapid, precise styling matching Figma specs |
| **State Management**        | Zustand                 | Minimal boilerplate, fast, perfect for global generation state         |
| **Real-Time Communication** | Socket.IO               | Reliable WebSocket implementation for live progress updates            |
| **Animation**               | Framer Motion           | Industry-standard animation library with layout animations             |
| **Icons**                   | Lucide React            | Beautiful, consistent icon system                                      |
| **Type Safety**             | TypeScript              | Full type coverage for reliability and developer experience            |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Start the development server
npm run dev
```

The application will be available at **http://localhost:3000**

You should see:

```
╔════════════════════════════════════════╗
║                                        ║
║   🎵 MusicGPT Server Running! 🎵      ║
║                                        ║
║   ➜  Local:   http://localhost:3000   ║
║   ➜  WebSocket Ready ✅                ║
║                                        ║
╚════════════════════════════════════════╝
```

### Build for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

---

## 📦 Project Structure

```
musicGPT/
├── app/
│   ├── api/generate/route.ts     # Generation REST endpoint
│   ├── globals.css               # Global styles & animations
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Main "Create" page
├── components/
│   ├── EmptyState.tsx            # No generations placeholder
│   ├── FloatingMusicPlayer.tsx   # Bottom music player
│   ├── GenerationCard.tsx        # Individual generation display
│   ├── ProfilePopup.tsx          # Top-right user menu
│   ├── PromptBox.tsx             # Main input interface ⭐
│   ├── RecentGenerations.tsx     # Generation history list
│   └── Sidebar.tsx               # Left navigation menu ⭐
├── hooks/
│   └── useWebSocket.ts           # WebSocket connection hook
├── store/
│   └── generationStore.ts        # Zustand global state
├── types/
│   └── generation.ts             # TypeScript interfaces
├── server.js                     # Custom Next.js + Socket.IO server
└── tailwind.config.js            # Design system configuration
```

---

## 🎨 Design Implementation

### Color System (Figma-Matched)

```javascript
Primary (Orange):  #FF6B2C
Background:        #000000
Card Background:   #0F0F0F
Text Primary:      #FFFFFF
Text Secondary:    #8E8E93
Border:            #2C2C2E
```

### Animation Specifications

| Element               | Animation          | Duration | Easing                       |
| --------------------- | ------------------ | -------- | ---------------------------- |
| **Prompt Box Border** | Glow + color shift | 2.5s     | ease-in-out                  |
| **Generation Card**   | Fade + slide up    | 0.3s     | cubic-bezier(0.4, 0, 0.2, 1) |
| **Progress Bar**      | Width expansion    | 0.5s     | ease-out                     |
| **Profile Popup**     | Scale + opacity    | 0.2s     | cubic-bezier(0.4, 0, 0.2, 1) |

---

## ⚙️ Feature Checklist

### ✅ Core Features

#### Prompt Box

- [x] Animated gradient border on first render
- [x] Clean textarea with placeholder
- [x] Bottom action bar (Attach, Settings, Audio, Lyrics buttons)
- [x] Tools dropdown menu
- [x] Circular submit button
- [x] Smooth hover & active states

#### Generation States

- [x] 🫙 Empty State - "Start Creating Music"
- [x] ⚙️ Generating State - Progress bar + percentage
- [x] ✅ Completed State - Track cards with waveforms
- [x] ❌ Failed State - Error message + retry button

#### Real-Time Synchronization

- [x] Profile Popup shows live progress
- [x] Recent Generations updates simultaneously
- [x] < 100ms sync latency
- [x] Smooth layout animations

#### Sidebar Navigation

- [x] Logo with active indicator
- [x] Search bar (⌘K shortcut)
- [x] Active page highlighting
- [x] Library section

### 🎁 Bonus Features

- [x] Floating Music Player
- [x] Play/Pause State Management
- [x] Progress Bar with time display
- [x] Functional toolbar buttons

---

## 🧪 Testing Guide

### 1. Prompt Submission Flow

```bash
1. Open http://localhost:3000
2. Type a prompt: "Create an upbeat electronic track"
3. Click submit (circular arrow button)
4. Watch the generation start in real-time
```

### 2. Real-Time Sync Verification

```bash
1. Open Profile Popup (top-right)
2. Submit a new generation
3. Observe BOTH panels update simultaneously:
   - Profile Popup shows progress
   - Recent Generations shows new card
4. Check DevTools → Network → WS for WebSocket messages
```

### 3. Animation Quality

```bash
1. Refresh the page
2. Watch the prompt box border glow (orange)
3. Type in the prompt box (focus border animates)
4. Submit and watch the card slide in smoothly
```

---

## 🔄 WebSocket Events

### Server → Client

#### `GENERATION_PROGRESS`

```typescript
{
  id: string;
  progress: number; // 0-100
  status: 'generating';
  message: string;
}
```

#### `GENERATION_COMPLETE`

```typescript
{
  id: string;
  status: 'completed';
  progress: 100;
  completedAt: Date;
  tracks: Track[];
}
```

#### `GENERATION_FAILED`

```typescript
{
  id: string;
  status: 'failed';
  error: string;
}
```

---

## 📊 Architecture

### State Flow

```
User Input → POST /api/generate → WebSocket Server
                                        ↓
                         ┌──────────────┴──────────────┐
                         ↓                             ↓
                  Profile Popup                 Recent Generations
                         ↓                             ↓
                         └──────────┬──────────────────┘
                                    ↓
                            Zustand Store
```

### Key Design Decisions

1. **Custom WebSocket Server** - Integrated Socket.IO with Next.js
2. **Single Source of Truth** - Zustand manages all generations
3. **Optimistic Updates** - UI updates immediately
4. **Component Isolation** - Reusable, self-contained components
5. **GPU Acceleration** - Transform-based animations for 60fps

---

## 🐛 Troubleshooting

### WebSocket Not Connecting

```bash
# Check server is running
lsof -i :3000

# Verify in DevTools → Network → WS
# Should see: ws://localhost:3000/socket.io/
```

### Port Already in Use

```bash
# Kill process on port 3000
lsof -ti :3000 | xargs kill -9

# Or use different port
PORT=3001 npm run dev
```

---

## 📹 Screen Recording Checklist

Record these scenarios for submission:

- [ ] Initial page load with animated border glow
- [ ] Sidebar navigation interaction
- [ ] Prompt submission with real-time progress
- [ ] Profile Popup and Recent Generations syncing simultaneously
- [ ] Multiple generation states (generating, completed, failed)
- [ ] Floating music player (bonus feature)
- [ ] Smooth animations throughout

**Tools**: Loom, QuickTime, OBS Studio, Screen Studio

---

## 🚀 Deployment

### Vercel

```bash
vercel --prod
```

### Railway / Render

Connect GitHub repo and use start command: `node server.js`

---

## 📄 License

MIT License - Free to use for your projects!

---

## 👤 Author

Built as a senior frontend developer assignment demonstrating:

- Pixel-perfect Figma implementation
- Advanced animation techniques
- Real-time WebSocket architecture
- Production-ready code quality

---

<div align="center">

**Built with ❤️ using Next.js, TypeScript, and Framer Motion**

[⬆ back to top](#-musicgpt---ai-music-generation-platform)

</div>
