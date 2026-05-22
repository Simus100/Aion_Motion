import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { AnimatedText } from "./AnimatedText";
import * as remotion from "remotion";

vi.mock("remotion", async () => {
  const actual = await vi.importActual("remotion");
  return {
    ...actual,
    useCurrentFrame: vi.fn(),
    useVideoConfig: vi.fn(),
  };
});

describe("AnimatedText", () => {
  beforeEach(() => {
    vi.mocked(remotion.useCurrentFrame).mockReturnValue(60);
    vi.mocked(remotion.useVideoConfig).mockReturnValue({
      fps: 30,
      durationInFrames: 300,
      width: 1920,
      height: 1080,
      id: "composition",
      defaultProps: {},
    } as unknown as remotion.VideoConfig);
  });

  it("renders 'none' animation style correctly", () => {
    const { container } = render(<AnimatedText text="Hello World" animationStyle="none" className="test-class" style={{ color: 'red' }} />);
    const div = container.firstChild as HTMLElement;
    expect(div.textContent).toBe("Hello World");
    expect(div.className).toBe("test-class");
    expect(div.style.color).toBe("red");
  });

  it("renders 'fade-up' animation style correctly at frame 60", () => {
    const { container } = render(<AnimatedText text="Hello World" animationStyle="fade-up" />);
    const div = container.firstChild as HTMLElement;

    const spans = div.querySelectorAll("span");
    expect(spans.length).toBe(2);
    expect(spans[0].textContent).toBe("Hello");
    expect(spans[1].textContent).toBe("World");

    // Since frame is 60 and delay is 0, progress should be 1
    // translateY should be 0, opacity 1
    const opacity = parseFloat(spans[0].style.opacity);
    expect(opacity).toBeGreaterThanOrEqual(0.99);

    const match = spans[0].style.transform.match(/translateY\((.+)px\)/);
    const translateY = parseFloat(match![1]);
    expect(translateY).toBeLessThan(0.01);
  });

  it("renders 'fade-up' animation style correctly at frame 0", () => {
    vi.mocked(remotion.useCurrentFrame).mockReturnValue(0);
    const { container } = render(<AnimatedText text="Hello World" animationStyle="fade-up" />);
    const div = container.firstChild as HTMLElement;

    const spans = div.querySelectorAll("span");
    expect(spans[0].style.opacity).toBe("0");
    expect(spans[0].style.transform).toBe("translateY(50px)");
  });

  it("renders 'scale-in' animation style correctly at frame 60", () => {
    const { container } = render(<AnimatedText text="Hello World" animationStyle="scale-in" />);
    const div = container.firstChild as HTMLElement;

    const spans = div.querySelectorAll("span");
    expect(spans.length).toBe(2);
    expect(spans[0].textContent).toBe("Hello");
    expect(spans[1].textContent).toBe("World");

    // progress should be 1, scale(1), opacity 1
    const opacity = parseFloat(spans[0].style.opacity);
    expect(opacity).toBeGreaterThanOrEqual(0.99);

    const match = spans[0].style.transform.match(/scale\((.+)\)/);
    const scale = parseFloat(match![1]);
    expect(scale).toBeGreaterThanOrEqual(0.99);
    expect(scale).toBeLessThan(1.01);
  });

  it("renders 'scale-in' animation style correctly at frame 0", () => {
    vi.mocked(remotion.useCurrentFrame).mockReturnValue(0);
    const { container } = render(<AnimatedText text="Hello World" animationStyle="scale-in" />);
    const div = container.firstChild as HTMLElement;

    const spans = div.querySelectorAll("span");
    // progress should be 0, scale(0), opacity 0
    expect(spans[0].style.opacity).toBe("0");
    expect(spans[0].style.transform).toBe("scale(0)");
  });

  it("renders 'typewriter' animation style correctly at frame 60", () => {
    const { container } = render(<AnimatedText text="Hello" animationStyle="typewriter" delay={0} />);
    const div = container.firstChild as HTMLElement;

    const spans = div.querySelectorAll("span");
    expect(spans.length).toBe(5);
    expect(spans[0].textContent).toBe("H");
    expect(spans[1].textContent).toBe("e");
    expect(spans[2].textContent).toBe("l");
    expect(spans[3].textContent).toBe("l");
    expect(spans[4].textContent).toBe("o");

    // frame is 60, all should be visible (opacity 1)
    expect(spans[0].style.opacity).toBe("1");
    expect(spans[4].style.opacity).toBe("1");
  });

  it("renders 'typewriter' animation style correctly at frame 0", () => {
    vi.mocked(remotion.useCurrentFrame).mockReturnValue(0);
    const { container } = render(<AnimatedText text="Hello" animationStyle="typewriter" delay={10} />);
    const div = container.firstChild as HTMLElement;

    const spans = div.querySelectorAll("span");
    // frame is 0, delay is 10, so should be invisible (opacity 0)
    expect(spans[0].style.opacity).toBe("0");
  });
});
