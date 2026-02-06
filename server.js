const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const { Server } = require('socket.io');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

// Initialize Socket.IO instance
let io;

function initSocketServer(httpServer) {
  io = new Server(httpServer, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });

  return io;
}

async function simulateGeneration(generationId, prompt) {
  if (!io) return;

  const progressSteps = [10, 25, 40, 55, 70, 85, 95];

  for (const progress of progressSteps) {
    await new Promise((resolve) => setTimeout(resolve, 800));

    io.emit('GENERATION_PROGRESS', {
      id: generationId,
      progress,
      status: 'generating',
      message: getProgressMessage(progress)
    });
  }

  const success = Math.random() > 0.1;

  if (success) {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const tracks = generateMockTracks();

    io.emit('GENERATION_COMPLETE', {
      id: generationId,
      status: 'completed',
      progress: 100,
      completedAt: new Date(),
      tracks
    });
  } else {
    await new Promise((resolve) => setTimeout(resolve, 500));

    io.emit('GENERATION_FAILED', {
      id: generationId,
      status: 'failed',
      progress: 0,
      error: 'Network connection failed. Please try again.'
    });
  }
}

function getProgressMessage(progress) {
  if (progress < 30) return 'Initializing sound models...';
  if (progress < 60) return 'Composing melodies...';
  if (progress < 90) return 'Adding harmonies...';
  return 'Finalizing your track...';
}

function generateMockTracks() {
  const numTracks = Math.random() > 0.5 ? 2 : 1;
  const tracks = [];

  for (let i = 0; i < numTracks; i++) {
    tracks.push({
      id: `track-${Date.now()}-${i}`,
      title: `Generated Track ${i + 1}`,
      duration: Math.floor(Math.random() * 60) + 120,
      url: `/mock-audio-${i}.mp3`,
      waveform: Array.from({ length: 100 }, () => Math.random()),
      coverUrl: `https://picsum.photos/seed/${Date.now()}-${i}/400/400`
    });
  }

  return tracks;
}

// Export for use in API routes
global.simulateGeneration = simulateGeneration;

app.prepare().then(() => {
  const server = createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  });

  initSocketServer(server);

  server.listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
    console.log(`> WebSocket server initialized`);
  });
});
