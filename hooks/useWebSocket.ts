'use client';

import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { useGenerationStore } from '@/store/generationStore';
import { Generation, Track } from '@/types/generation';

export function useWebSocket() {
  const socketRef = useRef<Socket | null>(null);
  const { addGenerations, updateGeneration, replaceGenerationWithTrack } =
    useGenerationStore();

  useEffect(() => {
    // Initialize socket connection
    const socket = io(
      process.env.NEXT_PUBLIC_WS_URL || 'http://localhost:3000',
      {
        transports: ['websocket', 'polling']
      }
    );

    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('WebSocket connected');
    });

    socket.on('disconnect', () => {
      console.log('WebSocket disconnected');
    });

    // Handle when generation starts - create placeholder entries for each track
    socket.on(
      'GENERATION_STARTED',
      (data: {
        parentId: string;
        trackIds: string[];
        prompt: string;
        totalTracks: number;
      }) => {
        const generatingEntries: Generation[] = data.trackIds.map(
          (trackId, index) => ({
            id: trackId,
            prompt: data.prompt,
            status: 'generating',
            progress: 0,
            createdAt: new Date(),
            trackIndex: index + 1,
            totalTracks: data.totalTracks,
            parentId: data.parentId
          })
        );

        addGenerations(generatingEntries);
      }
    );

    // Handle individual track progress
    socket.on(
      'TRACK_PROGRESS',
      (data: {
        id: string;
        parentId: string;
        trackIndex: number;
        progress: number;
        status: string;
        message?: string;
      }) => {
        updateGeneration(data.id, {
          progress: data.progress,
          status: 'generating'
        });
      }
    );

    // Handle individual track completion - replace generating entry with completed track
    socket.on(
      'TRACK_COMPLETE',
      (data: {
        id: string;
        parentId: string;
        trackIndex: number;
        status: string;
        progress: number;
        completedAt: Date;
        track: Track;
      }) => {
        replaceGenerationWithTrack(data.id, {
          status: 'completed',
          progress: 100,
          completedAt: data.completedAt,
          tracks: [data.track]
        });
      }
    );

    // Handle individual track failure
    socket.on(
      'TRACK_FAILED',
      (data: {
        id: string;
        parentId: string;
        trackIndex: number;
        status: string;
        progress: number;
        error: string;
      }) => {
        updateGeneration(data.id, {
          status: 'failed',
          progress: 0,
          error: data.error
        });
      }
    );

    // Keep legacy handlers for backward compatibility
    socket.on('GENERATION_PROGRESS', (data: Partial<Generation>) => {
      updateGeneration(data.id!, {
        progress: data.progress,
        status: data.status
      });
    });

    socket.on('GENERATION_COMPLETE', (data: Partial<Generation>) => {
      updateGeneration(data.id!, {
        status: 'completed',
        progress: 100,
        completedAt: data.completedAt,
        tracks: data.tracks
      });
    });

    socket.on('GENERATION_FAILED', (data: Partial<Generation>) => {
      updateGeneration(data.id!, {
        status: 'failed',
        progress: 0,
        error: data.error
      });
    });

    return () => {
      socket.disconnect();
    };
  }, [addGenerations, updateGeneration, replaceGenerationWithTrack]);

  return socketRef.current;
}
