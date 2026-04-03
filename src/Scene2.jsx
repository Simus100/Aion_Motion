import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Img, Audio, staticFile } from 'remotion';

export const Scene2 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({
    frame: frame - 10,
    fps,
    config: { damping: 12, mass: 0.5 },
  });

  const textOpacity = interpolate(frame, [30, 45], [0, 1], { extrapolateRight: 'clamp' });
  const textTranslateY = interpolate(frame, [30, 45], [20, 0], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill className="bg-zinc-950 flex flex-col items-center justify-center">
      <Audio src={staticFile('impact.wav')} startFrom={0} volume={1} />
      <Audio src={staticFile('ambient.wav')} startFrom={0} volume={0.6} />

      <div
        className="flex flex-col items-center justify-center"
        style={{ transform: `scale(${logoScale})` }}
      >
        {/* Placeholder for the actual logo if downloaded, using text for now to ensure it looks good without external assets failing */}
        <div className="text-8xl font-black text-white tracking-widest mb-4 border-b-4 border-blue-500 pb-2">
          AION NEXUS
        </div>

        <div
          className="text-2xl font-light text-zinc-400 tracking-widest uppercase mt-4"
          style={{ opacity: textOpacity, transform: `translateY(${textTranslateY}px)` }}
        >
          Automation Intelligence
        </div>
        <div
          className="text-lg text-zinc-500 mt-2"
          style={{ opacity: textOpacity, transform: `translateY(${textTranslateY}px)` }}
        >
          by Universalis Produzioni
        </div>
      </div>

      {frame > 60 && (
         <div className="absolute bottom-20 left-0 right-0 flex justify-center opacity-0 animate-fade-in" style={{ opacity: interpolate(frame, [60, 90], [0, 1])}}>
           <div className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold text-xl tracking-wide shadow-[0_0_30px_rgba(37,99,235,0.5)]">
             Il primo flusso editoriale fully backed by AI
           </div>
         </div>
      )}
    </AbsoluteFill>
  );
};
