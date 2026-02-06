# 🚀 Quick Start Guide - MusicGPT

## Installation (30 seconds)

```bash
npm install
```

## Run Development Server

```bash
npm run dev
```

Visit: **http://localhost:3000**

---

## What You'll See

1. **Sidebar** - Left navigation with MusicGPT logo
2. **Main Screen** - "What Song to Create?" hero text
3. **Prompt Box** - Large input area with orange border glow animation
4. **Action Buttons** - Attach, Settings, Audio, +Lyrics, Tools dropdown

---

## Try It Out!

### Test 1: Submit a Generation

1. Type: "Create an upbeat electronic track with synth"
2. Click the circular arrow button
3. Watch real-time progress appear

### Test 2: Check Synchronization

1. Click your profile icon (top-right)
2. Submit another generation
3. See **both** the popup and main list update at the same time!

### Test 3: View Different States

- **Generating**: Progress bar animates
- **Completed**: Track cards with waveforms appear
- **Failed**: Red error message (10% chance, simulated)

---

## Key Features to Explore

✅ **Animated Border** - Orange glow on first load  
✅ **Real-Time Updates** - WebSocket synchronization  
✅ **Smooth Animations** - Framer Motion transitions  
✅ **Multiple States** - Empty, Generating, Completed, Failed  
✅ **Floating Player** - Click a completed track (bonus!)

---

## File Structure (What to Look At)

```
📁 components/
  ├── Sidebar.tsx          ← Left navigation
  ├── PromptBox.tsx        ← Main input (orange border)
  ├── GenerationCard.tsx   ← Individual generation
  └── ProfilePopup.tsx     ← Top-right dropdown

📁 store/
  └── generationStore.ts   ← Zustand state management

📄 server.js               ← WebSocket server
📄 tailwind.config.js      ← Orange color theme (#FF6B2C)
```

---

## Troubleshooting

### "Port 3000 already in use"

```bash
lsof -ti :3000 | xargs kill -9
npm run dev
```

### "Module not found"

```bash
rm -rf node_modules package-lock.json
npm install
```

### WebSocket not connecting?

- Check console for errors
- DevTools → Network → WS tab
- Should see connection to `ws://localhost:3000`

---

## Next Steps

1. ✅ Test all features
2. 📹 Record a demo video
3. 📝 Review README.md for full documentation
4. 🚀 Deploy to Vercel/Railway

**Happy Coding! 🎵**
