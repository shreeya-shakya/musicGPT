export type GenerationStatus =
  | 'pending'
  | 'generating'
  | 'completed'
  | 'failed';

export interface Generation {
  id: string;
  prompt: string;
  status: GenerationStatus;
  progress: number;
  createdAt: Date;
  completedAt?: Date;
  error?: string;
  tracks?: Track[];
  trackIndex?: number; // Index of the track being generated (for generating status)
  totalTracks?: number; // Total number of tracks being generated
  parentId?: string; // Parent generation ID for grouped tracks
}

export interface Track {
  id: string;
  title: string;
  duration: number;
  url: string;
  waveform: number[];
  coverUrl?: string;
}

export interface GenerationProgress {
  id: string;
  progress: number;
  status: GenerationStatus;
  message?: string;
}

export interface WebSocketMessage {
  type: 'GENERATION_PROGRESS' | 'GENERATION_COMPLETE' | 'GENERATION_FAILED';
  data: GenerationProgress | Generation;
}
