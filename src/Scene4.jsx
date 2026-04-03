import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Audio, staticFile } from 'remotion';

export const Scene4 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleScale = spring({
    frame,
    fps,
    config: { damping: 15 },
  });

  return (
    <AbsoluteFill className="bg-black text-white p-16 flex flex-col justify-center relative overflow-hidden">
      <Audio src={staticFile('impact.wav')} startFrom={0} volume={0.8} />

      {/* Background UI elements */}
      <div className="absolute top-0 right-0 p-8 opacity-20 font-mono text-xl text-blue-400">
        LIVE FEED / {Math.floor(frame / 5)} / SYNC
      </div>
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-blue-900/30 to-transparent"></div>

      <div className="z-10 w-full max-w-4xl mx-auto">
        <h2
          className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-200 mb-8"
          style={{ transform: `scale(${titleScale})` }}
        >
          Aion Brief
        </h2>

        <div
          className="bg-zinc-900/80 border-l-4 border-blue-500 p-8 rounded-r-2xl shadow-2xl backdrop-blur-sm"
          style={{
            opacity: interpolate(frame, [15, 30], [0, 1]),
            transform: `translateX(${interpolate(frame, [15, 30], [-100, 0])}px)`
          }}
        >
          <h3 className="text-4xl font-bold mb-4">Sintesi del giorno</h3>
          <p className="text-2xl text-zinc-300 font-light leading-relaxed mb-6">
            Organizziamo la complessità.<br/>
            Segnali dominanti, temi principali e cosa osservare, distillati in tempo reale.
          </p>

          <div className="flex gap-4 font-mono text-sm">
            <span className="bg-blue-900/50 text-blue-200 px-3 py-1 rounded">Segnale Dominante</span>
            <span className="bg-zinc-800 text-zinc-400 px-3 py-1 rounded">Top Stories</span>
            <span className="bg-zinc-800 text-zinc-400 px-3 py-1 rounded">Radar</span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
