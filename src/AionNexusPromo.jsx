import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { Scene1 } from './Scene1';
import { Scene2 } from './Scene2';
import { Scene3 } from './Scene3';
import { Scene4 } from './Scene4';
import { Scene5 } from './Scene5';

export const AionNexusPromo = () => {
  // Total duration: 600 frames (20 seconds @ 30fps)
  // Scene durations:
  // Scene 1: 120 frames (4s)
  // Scene 2: 120 frames (4s)
  // Scene 3: 120 frames (4s)
  // Scene 4: 120 frames (4s)
  // Scene 5: 120 frames (4s)

  return (
    <AbsoluteFill className="bg-black">
      <Sequence from={0} durationInFrames={120}>
        <Scene1 />
      </Sequence>

      <Sequence from={120} durationInFrames={120}>
        <Scene2 />
      </Sequence>

      <Sequence from={240} durationInFrames={120}>
        <Scene3 />
      </Sequence>

      <Sequence from={360} durationInFrames={120}>
        <Scene4 />
      </Sequence>

      <Sequence from={480} durationInFrames={120}>
        <Scene5 />
      </Sequence>
    </AbsoluteFill>
  );
};
