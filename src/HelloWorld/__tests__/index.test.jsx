import { render } from '@testing-library/react';
import { HelloWorld } from '../index';
import { vi, describe, it, expect, beforeEach } from 'vitest';

// Mock remotion hooks as specified in the memory
vi.mock('remotion', async () => {
  const actual = await vi.importActual('remotion');
  return {
    ...actual,
    useCurrentFrame: vi.fn(() => 0),
    useVideoConfig: vi.fn(() => ({ durationInFrames: 100, fps: 30 })),
    spring: vi.fn(() => 0),
    interpolate: vi.fn(() => 0),
    AbsoluteFill: ({ children, style }) => <div data-testid="absolute-fill" style={style}>{children}</div>,
    Sequence: ({ children, from }) => <div data-testid="sequence" data-from={from}>{children}</div>,
  };
});

import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

// Mock components
vi.mock('../Logo', () => ({
  Logo: () => <div data-testid="logo">Logo</div>,
}));

vi.mock('../Subtitle', () => ({
  Subtitle: () => <div data-testid="subtitle">Subtitle</div>,
}));

vi.mock('../Title', () => ({
  Title: ({ titleText, titleColor }) => <div data-testid="title" data-title-text={titleText} data-title-color={titleColor}>Title</div>,
}));

describe('HelloWorld', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly with default mock values', () => {
    useCurrentFrame.mockReturnValue(0);
    useVideoConfig.mockReturnValue({ durationInFrames: 100, fps: 30 });
    spring.mockReturnValue(0);
    interpolate.mockReturnValue(0);

    const { getByTestId } = render(<HelloWorld titleText="Hello" titleColor="red" />);

    expect(getByTestId('logo')).toBeInTheDocument();

    const title = getByTestId('title');
    expect(title).toBeInTheDocument();
    expect(title).toHaveAttribute('data-title-text', 'Hello');
    expect(title).toHaveAttribute('data-title-color', 'red');

    const subtitle = getByTestId('subtitle');
    expect(subtitle).toBeInTheDocument();
  });

  it('calls remotion hooks correctly', () => {
    useCurrentFrame.mockReturnValue(50);
    useVideoConfig.mockReturnValue({ durationInFrames: 150, fps: 60 });

    render(<HelloWorld titleText="Test" titleColor="blue" />);

    expect(useCurrentFrame).toHaveBeenCalled();
    expect(useVideoConfig).toHaveBeenCalled();

    expect(spring).toHaveBeenCalledWith({
      frame: 50 - 25, // frame - 25
      fps: 60,
      config: { damping: 100 },
    });
  });

  it('passes correct props to interpolation', () => {
    useCurrentFrame.mockReturnValue(80);
    useVideoConfig.mockReturnValue({ durationInFrames: 100, fps: 30 });
    spring.mockReturnValue(0.5);

    render(<HelloWorld titleText="Test" titleColor="blue" />);

    expect(interpolate).toHaveBeenCalledWith(
      0.5, // logoTranslationProgress
      [0, 1],
      [0, -150]
    );

    expect(interpolate).toHaveBeenCalledWith(
      80, // frame
      [100 - 25, 100 - 15], // [durationInFrames - 25, durationInFrames - 15]
      [1, 0],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }
    );
  });
});
