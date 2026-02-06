import { create } from 'zustand';
import { Generation, GenerationStatus } from '@/types/generation';

interface GenerationStore {
  generations: Generation[];
  currentTrack: { generationId: string; trackId: string } | null;
  isPlaying: boolean;
  newestCompletedId: string | null;

  // Actions
  addGeneration: (generation: Generation) => void;
  setNewestCompletedId: (id: string | null) => void;
  addGenerations: (generations: Generation[]) => void;
  updateGeneration: (id: string, updates: Partial<Generation>) => void;
  replaceGenerationWithTrack: (
    generatingId: string,
    trackData: Partial<Generation>
  ) => void;
  removeGeneration: (id: string) => void;
  setCurrentTrack: (generationId: string, trackId: string) => void;
  togglePlayPause: () => void;
  clearGenerations: () => void;
}

export const useGenerationStore = create<GenerationStore>((set) => ({
  generations: [
    {
      id: '1',
      prompt: 'Epic orchestral theme with dramatic strings',
      status: 'completed',
      progress: 100,
      createdAt: new Date(Date.now() - 3600000),
      completedAt: new Date(Date.now() - 3500000),
      tracks: [
        {
          id: 'track-1',
          title: 'Epic Orchestral Theme',
          duration: 180,
          url: '/audio/sample1.mp3',
          waveform: Array(50)
            .fill(0)
            .map(() => Math.random()),
          coverUrl: `https://picsum.photos/seed/2026-02-06-1/400/400`
        }
      ]
    }
  ],
  currentTrack: null,
  isPlaying: false,
  newestCompletedId: null,

  setNewestCompletedId: (id) => set({ newestCompletedId: id }),

  addGeneration: (generation) =>
    set((state) => ({
      generations: [generation, ...state.generations],
      newestCompletedId: null // Clear the newest completed indicator when new generation starts
    })),

  addGenerations: (generations) =>
    set((state) => ({
      generations: [...generations, ...state.generations]
    })),

  updateGeneration: (id, updates) =>
    set((state) => ({
      generations: state.generations.map((gen) =>
        gen.id === id ? { ...gen, ...updates } : gen
      ),
      // Set newestCompletedId when a generation completes
      newestCompletedId:
        updates.status === 'completed' ? id : state.newestCompletedId
    })),

  replaceGenerationWithTrack: (generatingId, trackData) =>
    set((state) => ({
      generations: state.generations.map((gen) =>
        gen.id === generatingId
          ? { ...gen, ...trackData, status: 'completed' as GenerationStatus }
          : gen
      ),
      newestCompletedId: generatingId
    })),

  removeGeneration: (id) =>
    set((state) => ({
      generations: state.generations.filter((gen) => gen.id !== id)
    })),

  setCurrentTrack: (generationId, trackId) =>
    set({ currentTrack: { generationId, trackId }, isPlaying: true }),

  togglePlayPause: () => set((state) => ({ isPlaying: !state.isPlaying })),

  clearGenerations: () =>
    set({ generations: [], currentTrack: null, isPlaying: false })
}));
