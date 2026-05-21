import React, { useMemo } from 'react';
import { AbsoluteFill, useCurrentFrame, Img } from 'remotion';
import { noise2D } from '@remotion/noise';
import { BackgroundConfig } from '../schema';

interface BackgroundProps {
  config?: BackgroundConfig;
  backgroundColor?: string;
  className?: string;
  children?: React.ReactNode;
}

export const Background: React.FC<BackgroundProps> = ({
  config,
  backgroundColor = 'black',
  className = '',
  children,
}) => {
  const frame = useCurrentFrame();

  const renderBackground = () => {
    if (!config) {
      return <AbsoluteFill className={className} style={{ backgroundColor, zIndex: 0 }} />;
    }

    const { type, color1, color2, opacity = 1 } = config;

    if (type === 'solid') {
      return <AbsoluteFill className={className} style={{ backgroundColor: color1 || backgroundColor, opacity, zIndex: 0 }} />;
    }

    if (type === 'gradient') {
      const defaultColor1 = color1 || '#1e293b';
      const defaultColor2 = color2 || '#0f172a';

      // Animate gradient angle over time
      const angle = (frame * 0.5) % 360;

      return (
        <AbsoluteFill
          className={className}
          style={{
            background: `linear-gradient(${angle}deg, ${defaultColor1}, ${defaultColor2})`,
            opacity,
            zIndex: 0,
          }}
        />
      );
    }

    if (type === 'noise') {
      const defaultColor1 = color1 || '#1e293b';

      return (
        <AbsoluteFill className={className} style={{ backgroundColor: defaultColor1, opacity, zIndex: 0 }}>
          <NoiseLayer />
        </AbsoluteFill>
      );
    }

    return <AbsoluteFill className={className} style={{ backgroundColor, zIndex: 0 }} />;
  };

  return (
    <AbsoluteFill className={className}>
      {renderBackground()}
      {children && (
         <AbsoluteFill style={{ zIndex: 1 }}>
           <div className={`w-full h-full ${className}`}>
             {children}
           </div>
         </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

const NoiseLayer: React.FC = () => {
  const frame = useCurrentFrame();

  // Create static noise pattern
  const noiseUrl = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    if (!ctx) return '';

    const imgData = ctx.createImageData(512, 512);
    const data = imgData.data;

    for (let i = 0; i < data.length; i += 4) {
      const v = (noise2D("noise", (i/4) % 512, Math.floor((i/4) / 512)) + 1) * 128; // value 0 to 255
      data[i] = v;
      data[i + 1] = v;
      data[i + 2] = v;
      data[i + 3] = 20; // very low opacity for noise effect
    }

    ctx.putImageData(imgData, 0, 0);
    return canvas.toDataURL();
  }, []);

  // Animate the noise layer slightly
  const offsetX = -((frame * 2) % 512);
  const offsetY = -((frame * 2) % 512);

  return (
    <AbsoluteFill style={{ overflow: 'hidden', pointerEvents: 'none', mixBlendMode: 'overlay' }}>
       {/* Use a large image that covers the screen even when translated */}
      <Img
        src={noiseUrl}
        style={{
          width: '200%',
          height: '200%',
          transform: `translate(${offsetX}px, ${offsetY}px)`
        }}
      />
    </AbsoluteFill>
  );
};
