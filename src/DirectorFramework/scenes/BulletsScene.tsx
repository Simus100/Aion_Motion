import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { BulletsSceneData } from '../schema';
import { AnimatedText } from '../components/AnimatedText';
import { Background } from '../components/Background';
import { CheckCircle2 } from 'lucide-react';

export const BulletsScene: React.FC<{ data: BulletsSceneData }> = ({ data }) => {
  const {
    title,
    bullets,
    textColor = 'white',
    backgroundColor = 'black',
    backgroundConfig,
    animationStyle = 'fade-up',
  } = data;

  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <Background config={backgroundConfig} backgroundColor={backgroundColor} className="flex flex-col items-start justify-center p-24">
      <div className="w-full max-w-5xl mx-auto">
        <AnimatedText
          text={title}
          animationStyle={animationStyle}
          className="text-7xl font-bold mb-16"
          style={{ color: textColor }}
        />

        <div className="flex flex-col gap-8">
          {bullets.map((bullet, index) => {
            const delay = 30 + index * 15;
            const itemFrame = Math.max(0, frame - delay);
            const progress = spring({
              frame: itemFrame,
              fps,
              config: { damping: 14, mass: 0.8 },
            });

            const translateX = interpolate(progress, [0, 1], [-50, 0], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });

            return (
              <div
                key={`bullet-${index}`}
                className="flex items-center gap-6"
                style={{
                  opacity: progress,
                  transform: `translateX(${translateX}px)`,
                }}
              >
                <CheckCircle2 className="w-10 h-10 text-blue-400 flex-shrink-0" />
                <span className="text-4xl font-medium" style={{ color: textColor }}>
                  {bullet}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </Background>
  );
};
