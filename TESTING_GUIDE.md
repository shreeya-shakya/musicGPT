# 🧪 Testing Guide - MusicGPT

## Pre-Testing Checklist

- [ ] Dependencies installed (`npm install`)
- [ ] Server running on port 3000
- [ ] Browser DevTools open (for network/console inspection)

---

## 🎯 Test Scenarios

### Test 1: Initial Load & Empty State

**Expected Behavior:**

1. Page loads with beautiful gradient background
2. Empty state shows "Start Creating Music" message
3. Prompt box has animated border glow (first 2 seconds)
4. Placeholder text cycles every 4 seconds
5. Profile popup shows "0 generations"

**Verification:**

- [ ] Empty state visible
- [ ] Border glow animation plays once
- [ ] Placeholder cycles through 4 different prompts
- [ ] No console errors

---

### Test 2: Prompt Submission Flow

**Steps:**

1. Click "Surprise Me" button
2. Observe prompt fills with random suggestion
3. Click "Generate Music" button

**Expected Behavior:**

- Button shows "Generating..." state
- New generation appears at top of list
- Progress bar animates from 0% → 100%
- Profile popup badge shows "Generating..."
- Both panels update simultaneously

**Verification:**

- [ ] Prompt box disabled during generation
- [ ] Progress updates every ~800ms
- [ ] Profile popup shows real-time progress
- [ ] Recent Generations shows same progress
- [ ] < 50ms sync delay between panels

---

### Test 3: Successful Generation Completion

**Expected Behavior:**

- After ~7 seconds, generation completes
- 1-2 track cards appear
- Each track shows:
  - Track title
  - Duration (MM:SS format)
  - Waveform visualization (20 bars)
  - Album cover (or music icon)
- Success indicator (green checkmark)

**Verification:**

- [ ] Smooth transition from generating → completed
- [ ] Track cards are clickable
- [ ] Waveform visualization renders
- [ ] Both panels show completion simultaneously

---

### Test 4: Music Player Interaction

**Steps:**

1. Wait for a generation to complete
2. Click on a track card

**Expected Behavior:**

- Floating music player appears from bottom
- Shows track title and prompt
- Play/pause button functional
- Progress bar updates every second
- Time display shows current/total time

**Verification:**

- [ ] Player animates smoothly (spring physics)
- [ ] Play/pause toggles correctly
- [ ] Progress bar synchronized with time
- [ ] Player persists when submitting new generations

---

### Test 5: Failed Generation

**Steps:**

1. Submit 5-10 generations quickly
2. Wait for a failure (10% probability)

**Expected Behavior:**

- Generation fails after partial progress
- Red error indicator appears
- Error message: "Network connection failed. Please try again."
- "Try Again" button visible

**Verification:**

- [ ] Failure state clearly visible
- [ ] Error message displayed
- [ ] Both panels show failure simultaneously
- [ ] Try Again button present

---

### Test 6: Profile Popup Synchronization

**Steps:**

1. Open Profile Popup (top-right)
2. Keep it open
3. Submit a new generation
4. Watch both panels simultaneously

**Expected Behavior:**

- Profile popup updates in real-time
- Shows progress percentage
- Progress bar in popup syncs with main panel
- < 50ms delay between updates

**Verification:**

- [ ] Popup doesn't close during updates
- [ ] Progress syncs perfectly
- [ ] No flickering or jumping
- [ ] Smooth animations throughout

---

### Test 7: Multiple Concurrent Generations

**Steps:**

1. Submit 3 generations in quick succession

**Expected Behavior:**

- All 3 appear in the list
- Each has independent progress
- Profile popup shows most recent as active
- All update simultaneously via WebSocket

**Verification:**

- [ ] Each generation tracks independently
- [ ] No race conditions
- [ ] Correct ordering (newest first)
- [ ] All complete successfully (or fail independently)

---

### Test 8: Animation Performance

**Steps:**

1. Open Chrome DevTools → Performance tab
2. Start recording
3. Submit a generation
4. Stop recording after completion

**Expected Metrics:**

- FPS: 55-60 fps consistently
- No layout thrashing
- Smooth progress bar animation
- GPU-accelerated transforms

**Verification:**

- [ ] 60 FPS maintained
- [ ] No frame drops during animations
- [ ] Smooth scrolling
- [ ] No janky transitions

---

### Test 9: Responsive Design

**Steps:**

1. Open Chrome DevTools
2. Toggle device toolbar (Cmd+Shift+M)
3. Test these breakpoints:
   - Mobile: 375px
   - Tablet: 768px
   - Desktop: 1440px

**Expected Behavior:**

- Layout adapts gracefully
- No horizontal scroll
- Touch-friendly buttons
- Readable text at all sizes

**Verification:**

- [ ] Mobile layout works
- [ ] Tablet layout works
- [ ] Desktop layout works
- [ ] No content overflow

---

### Test 10: WebSocket Reconnection

**Steps:**

1. Start a generation
2. In DevTools → Network tab, go offline
3. Wait 2 seconds
4. Go back online

**Expected Behavior:**

- Socket.io auto-reconnects
- Generation continues
- No data loss
- Console shows reconnection event

**Verification:**

- [ ] Auto-reconnection works
- [ ] Generation resumes
- [ ] No duplicate events
- [ ] Clean error handling

---

## 🐛 Edge Cases to Test

### Edge Case 1: Empty Prompt Submission

- Type spaces only
- Click Generate
- **Expected**: Button remains disabled or shows validation error

### Edge Case 2: Very Long Prompt

- Paste 1000+ character prompt
- Submit
- **Expected**: Prompt truncates or displays ellipsis

### Edge Case 3: Rapid Button Clicking

- Click Generate Music 10 times rapidly
- **Expected**: Only 1 generation starts, button properly disabled

### Edge Case 4: Browser Tab Switching

- Start generation
- Switch to another tab for 5 seconds
- Return
- **Expected**: Progress continues, no missed updates

### Edge Case 5: Page Refresh During Generation

- Start generation
- Refresh page (Cmd+R)
- **Expected**: State resets, no errors

---

## 📊 Performance Benchmarks

| Metric                     | Target  | Acceptable | Failing |
| -------------------------- | ------- | ---------- | ------- |
| **Initial Load**           | < 1s    | < 2s       | > 2s    |
| **Prompt Submit**          | < 100ms | < 200ms    | > 200ms |
| **WS Message → UI Update** | < 50ms  | < 100ms    | > 100ms |
| **Animation FPS**          | 60      | 55+        | < 55    |
| **Bundle Size (gzipped)**  | < 200KB | < 300KB    | > 300KB |

---

## 🔍 Debug Checklist

If something doesn't work:

1. **Check Console Errors**

   ```javascript
   // Should see:
   'WebSocket connected';
   'Client connected: [socket-id]';
   ```

2. **Check Network Tab**
   - WebSocket connection should show status 101 (Switching Protocols)
   - API calls should return 200

3. **Check React DevTools**
   - Verify Zustand state updates
   - Check component re-renders

4. **Check Server Logs**
   ```bash
   # Should see:
   > Ready on http://localhost:3000
   > WebSocket server initialized
   Client connected: [id]
   ```

---

## ✅ Final Acceptance Criteria

Before submitting, verify:

- [ ] All 10 test scenarios pass
- [ ] All 5 edge cases handled
- [ ] Performance benchmarks met
- [ ] No console errors
- [ ] No TypeScript errors
- [ ] Responsive on all breakpoints
- [ ] Animations smooth at 60fps
- [ ] WebSocket reconnection works
- [ ] < 50ms synchronization between panels
- [ ] All bonus features functional

---

## 📹 Screen Recording Checklist

Record these in order:

1. [ ] Initial page load (show empty state)
2. [ ] Border glow animation (first render)
3. [ ] Placeholder cycling (wait 8 seconds)
4. [ ] Click "Surprise Me" button
5. [ ] Submit generation
6. [ ] **Open Profile Popup WHILE generating** (key sync demo)
7. [ ] Show real-time progress in both panels
8. [ ] Generation completes → track cards appear
9. [ ] Click track → music player appears
10. [ ] Submit another generation while player is open
11. [ ] Show failed state (may need multiple attempts)
12. [ ] Show responsive design (resize browser)

**Recommended Tool**: QuickTime Player (macOS) or OBS Studio

**Duration**: 3-5 minutes

**Format**: MP4, 1080p, 30fps minimum

---

## 🎯 Success Indicators

You've passed if:

✅ All animations are buttery smooth
✅ WebSocket updates feel instantaneous
✅ Both panels sync within 50ms
✅ Failed states handle gracefully
✅ Music player works perfectly
✅ No visual glitches or flickering
✅ Code is clean and maintainable
✅ README is comprehensive

---

## 💡 Testing Tips

1. **Use "Surprise Me"** for faster testing
2. **Keep DevTools open** to monitor performance
3. **Test in incognito** to avoid extension interference
4. **Use multiple browser tabs** to verify state isolation
5. **Clear cache** between major changes
6. **Test on actual devices** not just emulation

---

**Happy Testing! 🚀**

If you find any issues, check the troubleshooting section in README.md
