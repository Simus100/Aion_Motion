import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Audio, staticFile } from 'remotion';

export const Scene1 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animations
  const opacity = spring({
    frame,
    fps,
    config: { damping: 200 },
  });

  const glitch = interpolate(frame, [0, 15, 30, 45, 60], [0, 20, -20, 10, 0], {
    extrapolateRight: 'clamp',
  });

  const words = ["Rumore", "Disordine", "Caos", "Overload", "Fake News", "Informazione"];

  return (
    <AbsoluteFill className="bg-black text-white flex items-center justify-center overflow-hidden">
      <Audio src={staticFile('riser.wav')} startFrom={0} endAt={90} volume={0.8} />
      <Audio src={staticFile('data_bleep.wav')} startFrom={0} volume={0.5} />

      {frame < 90 ? (
        <div className="relative w-full h-full flex flex-wrap items-center justify-center p-10 opacity-70">
          {words.map((word, i) => {
             const randomX = Math.sin(frame * (i + 1)) * 50;
             const randomY = Math.cos(frame * (i + 1)) * 50;
             const wordOpacity = interpolate(frame, [0, 90], [1, 0]);
             return (
               <div
                 key={i}
                 className="absolute font-mono text-4xl text-red-500/50 uppercase font-bold"
                 style={{
                   transform: `translate(${randomX * glitch}px, ${randomY * glitch}px) scale(${1 + (frame/100)})`,
                   left: `${10 + (i * 15)}%`,
                   top: `${20 + (i * 10)}%`,
                   opacity: wordOpacity
                 }}
               >
                 {word}
               </div>
             )
          })}

          <div className="absolute inset-0 flex items-center justify-center">
             <h1
               className="text-8xl font-black text-white text-center leading-tight tracking-tighter mix-blend-difference"
               style={{
                 transform: `scale(${interpolate(frame, [0, 90], [1, 1.5])})`,
                 opacity: interpolate(frame, [60, 90], [1, 0])
               }}
             >
               TROVATORI DI SEGNALI<br/>NEL RUMORE
             </h1>
          </div>
        </div>
      ) : null}

      {frame >= 90 && (
         <div className="absolute inset-0 bg-white flex items-center justify-center" style={{ opacity: interpolate(frame, [90, 100], [0, 1]) }}>
            <h1 className="text-7xl font-bold text-black tracking-tight">Le notizie che contano.</h1>
         </div>
      )}
    </AbsoluteFill>
  );
};
