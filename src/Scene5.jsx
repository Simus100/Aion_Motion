import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Audio, staticFile } from 'remotion';

export const Scene5 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const containerScale = spring({
    frame,
    fps,
    config: { damping: 12, mass: 0.8 },
  });

  return (
    <AbsoluteFill className="bg-zinc-950 flex flex-col items-center justify-center relative">
      <Audio src={staticFile('riser.wav')} startFrom={0} volume={0.6} />
      <Audio src={staticFile('impact.wav')} startFrom={30} volume={1} />

      <div
        className="flex flex-col items-center justify-center text-center z-10"
        style={{ transform: `scale(${containerScale})` }}
      >
        <h1 className="text-8xl font-black text-white tracking-widest mb-6">
          AION NEXUS
        </h1>

        <div
          className="text-3xl text-zinc-400 font-light mb-12"
          style={{ opacity: interpolate(frame, [20, 40], [0, 1]) }}
        >
          Automation Intelligence by Universalis Produzioni
        </div>

        <div
          className="bg-blue-600 px-10 py-4 rounded-xl shadow-[0_0_50px_rgba(37,99,235,0.6)]"
          style={{
            opacity: interpolate(frame, [40, 60], [0, 1]),
            transform: `translateY(${interpolate(frame, [40, 60], [20, 0])}px)`
          }}
        >
          <span className="text-4xl font-bold text-white font-mono">
            nexus.universalis.it/site
          </span>
        </div>
      </div>

      {/* Glitch overlay at the very end */}
      {frame > 100 && (
         <div
           className="absolute inset-0 bg-white mix-blend-difference"
           style={{ opacity: Math.random() > 0.5 ? 0.8 : 0 }}
         />
      )}
    </AbsoluteFill>
  );
};
