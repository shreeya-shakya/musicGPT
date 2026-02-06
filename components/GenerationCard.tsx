'use client';

import { motion } from 'framer-motion';
import { Generation } from '@/types/generation';
import { useGenerationStore } from '@/store/generationStore';
import ErrorCard from './ErrorCard';
import GeneratingCard from './GeneratingCard';

interface GenerationCardProps {
  generation: Generation;
  onClick?: () => void;
}

export default function GenerationCard({
  generation,
  onClick
}: GenerationCardProps) {
  const { status, progress, prompt, error, tracks, trackIndex, totalTracks } =
    generation;
  const newestCompletedId = useGenerationStore(
    (state) => state.newestCompletedId
  );
  const isNewestCompleted = generation.id === newestCompletedId;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      onClick={onClick}
    >
      {/* Generating State */}
      {status === 'generating' && (
        <GeneratingCard
          progress={progress}
          prompt={prompt}
          trackIndex={trackIndex}
          totalTracks={totalTracks}
          isCompleted={false}
        />
      )}

      {/* Completed State - uses same card with smooth transition */}
      {status === 'completed' && tracks && tracks.length > 0 && (
        <>
          {tracks.map((track, index) => (
            <GeneratingCard
              key={track.id}
              progress={100}
              prompt={prompt}
              trackIndex={trackIndex || index + 1}
              totalTracks={totalTracks || tracks.length}
              isCompleted={true}
              isNew={isNewestCompleted}
              track={track}
            />
          ))}
        </>
      )}

      {/* Failed State */}
      {status === 'failed' && (
        <ErrorCard
          error={error || 'Server timeout - please try again.'}
          onClick={() => {}}
        />
      )}
    </motion.div>
  );
}
