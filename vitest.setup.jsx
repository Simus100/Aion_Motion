import "@testing-library/jest-dom";
import { vi } from "vitest";

vi.mock("remotion", () => ({
  spring: vi.fn(() => 1),
  useCurrentFrame: vi.fn(() => 10),
  useVideoConfig: vi.fn(() => ({ fps: 30, durationInFrames: 100 })),
  AbsoluteFill: ({ children, style }) => <div style={style}>{children}</div>,
  Sequence: ({ children }) => <div>{children}</div>,
  interpolate: vi.fn(() => 1),
  random: vi.fn(() => 0.5),
  Composition: () => null,
}));