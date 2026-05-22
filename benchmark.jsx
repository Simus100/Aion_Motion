import React from 'react';
import { renderToString } from 'react-dom/server';
import { AnimatedText } from './src/DirectorFramework/components/AnimatedText.tsx';

// Mock remotion hooks
jest.mock('remotion', () => ({
  useCurrentFrame: () => 10,
  useVideoConfig: () => ({ fps: 30 }),
  spring: () => 0.5,
  interpolate: () => 0.5,
}));

function runBenchmark() {
  const text = "This is a reasonably long text that will be split into characters. ".repeat(10);

  const start = performance.now();
  for (let i = 0; i < 10000; i++) {
    renderToString(<AnimatedText text={text} animationStyle="typewriter" />);
  }
  const end = performance.now();

  console.log(`Rendered 10000 times in ${end - start} ms`);
}

runBenchmark();
