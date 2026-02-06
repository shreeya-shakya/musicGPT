import { Server as HTTPServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { Generation, GenerationStatus } from '@/types/generation';

let io: SocketIOServer | null = null;

export function initSocketServer(httpServer: HTTPServer) {
  io = new SocketIOServer(httpServer, {
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

export function getSocketServer(): SocketIOServer | null {
  return io;
}

// Simulate generation progress
export async function simulateGeneration(generationId: string, prompt: string) {
  if (!io) return;

  // Determine number of tracks to generate (1-3)
  const numTracks = Math.floor(Math.random() * 3) + 1;
  const trackIds: string[] = [];

  // Create track IDs for each track that will be generated
  for (let i = 0; i < numTracks; i++) {
    trackIds.push(`${generationId}-track-${i}`);
  }

  // Emit initial track info so client knows how many tracks to expect
  io?.emit('GENERATION_STARTED', {
    parentId: generationId,
    trackIds,
    prompt,
    totalTracks: numTracks
  });

  // Simulate progress for each track independently
  const trackPromises = trackIds.map((trackId, index) => 
    simulateTrackGeneration(trackId, generationId, prompt, index, numTracks)
  );

  await Promise.all(trackPromises);
}

async function simulateTrackGeneration(
  trackId: string, 
  parentId: string, 
  prompt: string, 
  trackIndex: number,
  totalTracks: number
) {
  if (!io) return;

  const progressSteps = [10, 25, 40, 55, 70, 85, 95];
  
  // Add slight random delay for each track so they don't progress identically
  const baseDelay = 600 + (trackIndex * 200);

  // Simulate progress updates for this track
  for (const progress of progressSteps) {
    await new Promise((resolve) => setTimeout(resolve, baseDelay + Math.random() * 400));

    io?.emit('TRACK_PROGRESS', {
      id: trackId,
      parentId,
      trackIndex,
      totalTracks,
      progress,
      status: 'generating' as GenerationStatus,
      message: getProgressMessage(progress)
    });
  }

  // Random success/failure (90% success rate per track)
  const success = Math.random() > 0.1;

  if (success) {
    await new Promise((resolve) => setTimeout(resolve, 800));

    const track = generateMockTrack(trackIndex);

    io?.emit('TRACK_COMPLETE', {
      id: trackId,
      parentId,
      trackIndex,
      status: 'completed' as GenerationStatus,
      progress: 100,
      completedAt: new Date(),
      track
    });
  } else {
    await new Promise((resolve) => setTimeout(resolve, 500));

    io?.emit('TRACK_FAILED', {
      id: trackId,
      parentId,
      trackIndex,
      status: 'failed' as GenerationStatus,
      progress: 0,
      error: 'Network connection failed. Please try again.'
    });
  }
}

function getProgressMessage(progress: number): string {
  if (progress < 30) return 'Initializing sound models...';
  if (progress < 60) return 'Composing melodies...';
  if (progress < 90) return 'Adding harmonies...';
  return 'Finalizing your track...';
}

function generateMockTrack(index: number) {
  return {
    id: `track-${Date.now()}-${index}`,
    title: `Generated Track ${index + 1}`,
    duration: Math.floor(Math.random() * 60) + 120, // 120-180 seconds
    url: `/mock-audio-${index}.mp3`,
    waveform: Array.from({ length: 100 }, () => Math.random()),
    coverUrl: `https://picsum.photos/seed/${Date.now()}-${index}/400/400`
  };
}
