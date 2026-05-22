import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import { AnimatedText } from "./AnimatedText";

// Mock remotion hooks
vi.mock("remotion", async () => {
  const actual = await vi.importActual("remotion");
  return {
    ...actual,
    useCurrentFrame: () => 60,
    useVideoConfig: () => ({ fps: 30, durationInFrames: 300, width: 1920, height: 1080 }),
    interpolate: () => 1,
    spring: () => 1,
  };
});

describe("AnimatedText", () => {
  it("renders correctly with animationStyle='none'", () => {
    const { getByText } = render(<AnimatedText text="Hello world" animationStyle="none" />);
    expect(getByText("Hello world")).toBeTruthy();
  });

  it("renders correctly with animationStyle='fade-up'", () => {
    const { getByText } = render(<AnimatedText text="Fade up words" animationStyle="fade-up" />);
    expect(getByText("Fade")).toBeTruthy();
    expect(getByText("up")).toBeTruthy();
    expect(getByText("words")).toBeTruthy();
  });

  it("renders correctly with animationStyle='scale-in'", () => {
    const { getByText } = render(<AnimatedText text="Scale in phrase" animationStyle="scale-in" />);
    expect(getByText("Scale")).toBeTruthy();
    expect(getByText("in")).toBeTruthy();
    expect(getByText("phrase")).toBeTruthy();
  });

  it("renders correctly with animationStyle='typewriter'", () => {
    const { getByText } = render(<AnimatedText text="Type" animationStyle="typewriter" />);
    expect(getByText("T")).toBeTruthy();
    expect(getByText("y")).toBeTruthy();
    expect(getByText("p")).toBeTruthy();
    expect(getByText("e")).toBeTruthy();
  });
});
