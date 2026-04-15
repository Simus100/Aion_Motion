import { vi } from 'vitest';

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // Deprecated
    removeListener: vi.fn(), // Deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock remotion hooks
vi.mock('remotion', async () => {
  const actual = await vi.importActual('remotion');
  return {
    ...actual,
    useVideoConfig: () => ({ fps: 30, durationInFrames: 300 }),
    useCurrentFrame: () => 0,
    spring: () => 1,
    interpolate: () => 0,
    AbsoluteFill: ({ children, className }) => <div className={className}>{children}</div>,
  };
});
