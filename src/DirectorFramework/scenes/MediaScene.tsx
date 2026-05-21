import React from 'react';
import { AbsoluteFill, Img, Video, useCurrentFrame, interpolate } from 'remotion';
import { MediaSceneData } from '../schema';
import { AnimatedText } from '../components/AnimatedText';

export const MediaScene: React.FC<{ data: MediaSceneData }> = ({ data }) => {
  const {
    mediaUrl,
    mediaType,
    overlayText,
    overlayAnimation = 'fade-up',
    kenBurns = false,
  } = data;

  const frame = useCurrentFrame();

  // Calculate Ken Burns scale and position if enabled
  const scale = kenBurns ? interpolate(frame, [0, data.durationInFrames], [1, 1.15], { extrapolateRight: 'clamp' }) : 1;
  const translateX = kenBurns ? interpolate(frame, [0, data.durationInFrames], [0, -2], { extrapolateRight: 'clamp' }) : 0;
  const translateY = kenBurns ? interpolate(frame, [0, data.durationInFrames], [0, -2], { extrapolateRight: 'clamp' }) : 0;

  const mediaStyle: React.CSSProperties = {
    objectFit: 'cover',
    transform: `scale(${scale}) translate(${translateX}%, ${translateY}%)`,
    transformOrigin: 'center center',
  };

  return (
    <AbsoluteFill className="bg-black overflow-hidden">
      {mediaType === 'image' ? (
        <Img src={mediaUrl} className="w-full h-full opacity-80" style={mediaStyle} />
      ) : (
        <Video src={mediaUrl} className="w-full h-full opacity-80" style={mediaStyle} loop muted />
      )}

      {overlayText && (
        <AbsoluteFill className="flex flex-col items-center justify-center p-8 bg-black/40">
          <AnimatedText
            text={overlayText}
            animationStyle={overlayAnimation}
            className="text-6xl font-bold text-white text-center drop-shadow-xl"
          />
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
