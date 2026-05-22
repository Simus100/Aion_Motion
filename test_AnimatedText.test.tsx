import { render } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';

// Mock Remotion hooks
vi.mock('remotion', () => ({
  useCurrentFrame: () => 10,
  useVideoConfig: () => ({ fps: 30 }),
  spring: () => 1,
  interpolate: () => 1,
}));

import { AnimatedText } from './src/DirectorFramework/components/AnimatedText';

describe('AnimatedText', () => {
  it('renders typewriter', () => {
    const { getByText } = render(<AnimatedText text="Hello" animationStyle="typewriter" />);
    expect(getByText('H')).toBeDefined();
  });
});
