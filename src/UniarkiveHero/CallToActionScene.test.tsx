import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import { CallToActionScene } from "./CallToActionScene";

// Mock remotion hooks
vi.mock("remotion", async () => {
  const actual = await vi.importActual("remotion");
  return {
    ...actual,
    useCurrentFrame: () => 60,
    useVideoConfig: () => ({ fps: 30, durationInFrames: 300, width: 1920, height: 1080 }),
    interpolate: () => 1,
    spring: () => 1,
    AbsoluteFill: ({ children, style }: { children: React.ReactNode, style: React.CSSProperties }) => <div style={style}>{children}</div>,
  };
});

// Mock google fonts
vi.mock("@remotion/google-fonts/PlayfairDisplay", () => ({
  loadFont: () => ({ fontFamily: "Playfair Display" }),
}));

describe("CallToActionScene", () => {
  it("renders the text correctly", () => {
    const { getByText } = render(<CallToActionScene />);
    expect(getByText("Esplora il nostro catalogo")).toBeTruthy();
  });
});
