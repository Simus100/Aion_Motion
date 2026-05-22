import React, { useMemo } from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { AnimationStyle } from '../schema';

export const AnimatedText: React.FC<{
  text: string;
  className?: string;
  animationStyle?: AnimationStyle;
  delay?: number;
  style?: React.CSSProperties;
}> = ({ text, className = '', animationStyle = 'fade-up', delay = 0, style = {} }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const words = useMemo(() => text.split(' '), [text]);
  const chars = useMemo(() => text.split(''), [text]);

  if (animationStyle === 'none') {
    return <div className={className} style={style}>{text}</div>;
  }

  if (animationStyle === 'fade-up') {
    return (
      <div className={className} style={style}>
        {words.map((word, index) => {
          const wordDelay = delay + index * 3;
          const wordFrame = Math.max(0, frame - wordDelay);
          const progress = spring({
            frame: wordFrame,
            fps,
            config: { damping: 12 },
          });

          const translateY = interpolate(progress, [0, 1], [50, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });

          return (
            <span
              key={`${word}-${index}`}
              style={{
                display: 'inline-block',
                opacity: progress,
                transform: `translateY(${translateY}px)`,
                marginRight: '0.25em',
              }}
            >
              {word}
            </span>
          );
        })}
      </div>
    );
  }

  if (animationStyle === 'scale-in') {
    return (
      <div className={className} style={style}>
        {words.map((word, index) => {
          const wordDelay = delay + index * 2;
          const wordFrame = Math.max(0, frame - wordDelay);
          const progress = spring({
            frame: wordFrame,
            fps,
            config: { damping: 10, mass: 0.8 },
          });

          return (
            <span
              key={`${word}-${index}`}
              style={{
                display: 'inline-block',
                opacity: interpolate(progress, [0, 0.5], [0, 1], {
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                }),
                transform: `scale(${progress})`,
                marginRight: '0.25em',
              }}
            >
              {word}
            </span>
          );
        })}
      </div>
    );
  }

  if (animationStyle === 'typewriter') {
    return (
      <div className={className} style={style}>
        {chars.map((char, index) => {
          const charDelay = delay + index * 1.5;
          const isVisible = frame >= charDelay;
          return (
            <span
              key={`${char}-${index}`}
              style={{
                opacity: isVisible ? 1 : 0,
              }}
            >
              {char}
            </span>
          );
        })}
      </div>
    );
  }

  if (animationStyle === 'blur-in') {
    return (
      <div className={className} style={style}>
        {words.map((word, index) => {
          const wordDelay = delay + index * 3;
          const wordFrame = Math.max(0, frame - wordDelay);
          const progress = spring({
            frame: wordFrame,
            fps,
            config: { damping: 14, mass: 0.8 },
          });

          const blur = interpolate(progress, [0, 1], [10, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });

          return (
            <span
              key={`${word}-${index}`}
              style={{
                display: 'inline-block',
                opacity: progress,
                filter: `blur(${blur}px)`,
                marginRight: '0.25em',
              }}
            >
              {word}
            </span>
          );
        })}
      </div>
    );
  }

  if (animationStyle === 'reveal') {
    return (
      <div className={className} style={style}>
        {words.map((word, index) => {
          const wordDelay = delay + index * 4;
          const wordFrame = Math.max(0, frame - wordDelay);
          const progress = spring({
            frame: wordFrame,
            fps,
            config: { damping: 16, mass: 0.5 },
          });

          const translateY = interpolate(progress, [0, 1], [100, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });

          return (
            <div key={`${word}-${index}`} style={{ display: 'inline-block', overflow: 'hidden', marginRight: '0.25em', verticalAlign: 'bottom' }}>
              <span
                style={{
                  display: 'inline-block',
                  transform: `translateY(${translateY}%)`,
                }}
              >
                {word}
              </span>
            </div>
          );
        })}
      </div>
    );
  }

  return <div className={className} style={style}>{text}</div>;
};
