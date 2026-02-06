# 🚀 Quick Start Guide

## Prerequisites Check

```bash
node --version  # Should be >= 18.0.0
npm --version   # Should be >= 9.0.0
```

## Installation & Setup

### Step 1: Install Dependencies

```bash
cd /Users/jenishbajracharya/my-files/shreeya/musicGPT
npm install
```

### Step 2: Start Development Server

```bash
npm run dev
```

### Step 3: Open Browser

Navigate to: http://localhost:3000

---

## 🎯 What to Test

1. **Empty State**
   - Visit the page - you'll see a beautiful empty state

2. **Prompt Submission**
   - Type a music prompt (e.g., "Create upbeat electronic music")
   - Click "Generate Music"
   - Watch the real-time progress!

3. **Real-Time Sync**
   - Click the profile icon (top right)
   - Submit a new generation
   - **Watch both panels update simultaneously!**

4. **Generation States**
   - ⚙️ **Generating**: Progress bar with shimmer effect
   - ✅ **Completed**: Track cards with waveform
   - ❌ **Failed**: Error message (10% failure rate for demo)

5. **Music Player**
   - Click on a completed track
   - See the floating music player appear
   - Play/pause functionality

6. **Bonus Features**
   - "Surprise Me" button fills random prompt
   - Animated placeholder cycling
   - Smooth hover/active states

---

## 📊 Expected Behavior

### Timeline of a Generation:

- **0ms**: Submit prompt → API creates generation ID
- **100ms**: WebSocket starts emitting progress
- **800ms intervals**: Progress updates (10% → 25% → 40% → ... → 95%)
- **~7 seconds**: Completion with 1-2 tracks
- **< 50ms**: Both panels sync simultaneously

### Success Rate:

- 90% success (generates tracks)
- 10% failure (network error simulation)

---

## 🎨 Design Highlights

✅ **Pixel-perfect Tailwind implementation**
✅ **Framer Motion animations** with custom easing curves
✅ **Real-time WebSocket** synchronization
✅ **Zustand state management** for global state
✅ **TypeScript** for type safety
✅ **Responsive design** (mobile, tablet, desktop)

---

## 🐛 Troubleshooting

### Issue: "Port 3000 already in use"

```bash
# Kill the process using port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
PORT=3001 npm run dev
```

### Issue: WebSocket not connecting

- Ensure you're using `npm run dev` (not `next dev`)
- Check browser console for connection errors
- Verify no firewall blocking localhost

### Issue: Animations choppy

- Disable browser extensions
- Use Chrome/Firefox latest version
- Check GPU acceleration is enabled

---

## 📹 Screen Recording Checklist

When recording your demo, show:

1. ✅ Initial page load (empty state)
2. ✅ Prompt box animation (border glow on first render)
3. ✅ Placeholder text cycling
4. ✅ "Surprise Me" button functionality
5. ✅ Submit a prompt
6. ✅ **Real-time progress in both panels** (Profile + Recent)
7. ✅ Generation completion
8. ✅ Click on track to open music player
9. ✅ Submit another while first is playing
10. ✅ Show failed state (submit multiple times)

---

## 🎯 Assignment Requirements ✅

| Requirement                   | Status | Location                                      |
| ----------------------------- | ------ | --------------------------------------------- |
| Figma Design Implementation   | ✅     | All components                                |
| Animation Specifications      | ✅     | Framer Motion + Tailwind                      |
| WebSocket Real-Time           | ✅     | `lib/socket-server.ts`                        |
| State Synchronization         | ✅     | Zustand store                                 |
| 5 Generation States           | ✅     | Empty, Pending, Generating, Completed, Failed |
| Profile Popup                 | ✅     | `components/ProfilePopup.tsx`                 |
| Recent Generations            | ✅     | `components/RecentGenerations.tsx`            |
| Comprehensive README          | ✅     | `README.md`                                   |
| **Bonus**: Music Player       | ✅     | `components/FloatingMusicPlayer.tsx`          |
| **Bonus**: Content Caching    | ✅     | Zustand persistence                           |
| **Bonus**: Functional Buttons | ✅     | All prompt box buttons                        |

---

## 💡 Pro Tips

1. **Fast Testing**: Use "Surprise Me" for quick prompts
2. **Sync Testing**: Open Profile Popup before submitting
3. **Failed State**: Submit 5-10 generations to see failure
4. **Performance**: Open DevTools → Performance tab
5. **Mobile**: Use Chrome DevTools device emulation

---

## 📦 Build for Production

```bash
npm run build
npm run start
```

---

**Need Help?** Check the full README.md for detailed documentation!

**Estimated Time**: ~2 hours to review and test thoroughly
