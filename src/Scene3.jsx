import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Audio, staticFile } from 'remotion';

export const Scene3 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const categories = ["AI & TECH", "GEOPOLITICA", "FINANZA", "STARTUP", "SCIENZA"];

  return (
    <AbsoluteFill className="bg-zinc-900 flex flex-col items-center justify-center p-10 overflow-hidden">
      <Audio src={staticFile('whoosh.wav')} startFrom={0} volume={0.7} />
      <Audio src={staticFile('data_bleep.wav')} startFrom={20} volume={0.4} />

      <h2
        className="text-6xl font-bold text-white mb-16 text-center"
        style={{
          opacity: interpolate(frame, [0, 15], [0, 1]),
          transform: `translateY(${interpolate(frame, [0, 15], [-50, 0])}px)`
        }}
      >
        Segnali ad alta priorità
      </h2>

      <div className="flex flex-wrap justify-center gap-6 max-w-5xl">
        {categories.map((cat, i) => {
          const delay = i * 10;
          const scale = spring({
            frame: frame - delay - 15,
            fps,
            config: { damping: 14, mass: 0.8 },
          });

          return (
            <div
              key={i}
              className="bg-zinc-800 border border-zinc-700 px-8 py-4 rounded-xl shadow-lg"
              style={{ transform: `scale(${scale})`, opacity: scale }}
            >
              <span className="text-3xl font-mono font-semibold text-blue-400">{cat}</span>
            </div>
          );
        })}
      </div>

      <div
        className="mt-20 flex items-center gap-4"
        style={{ opacity: interpolate(frame, [80, 100], [0, 1]) }}
      >
        <div className="w-16 h-16 rounded-full border-t-4 border-r-4 border-blue-500 animate-spin" style={{ animationDuration: '3s'}}></div>
        <div className="text-3xl font-light text-zinc-300">
          Flusso editoriale <span className="font-bold text-white">100% gestito da AI</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
