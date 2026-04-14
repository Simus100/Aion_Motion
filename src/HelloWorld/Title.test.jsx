import { render } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { Title } from "./Title";

// Mock Remotion hooks
vi.mock("remotion", async () => {
  const actual = await vi.importActual("remotion");
  return {
    ...actual,
    useVideoConfig: vi.fn(() => ({ fps: 30 })),
    useCurrentFrame: vi.fn(() => 10),
    spring: vi.fn(() => 1),
  };
});

describe("Title", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders correctly with normal string", () => {
    const { container } = render(
      <Title titleText="Hello World" titleColor="black" />
    );
    // Find all spans which represent words
    const spans = container.querySelectorAll("span");
    expect(spans.length).toBe(2);
    expect(spans[0].textContent).toBe("Hello");
    expect(spans[1].textContent).toBe("World");
  });

  it("handles empty string gracefully", () => {
    const { container } = render(<Title titleText="" titleColor="black" />);
    const spans = container.querySelectorAll("span");

    // An empty string split by " " produces an array with one empty string: [""]
    expect(spans.length).toBe(1);
    expect(spans[0].textContent).toBe("");
  });

  it("handles string with multiple spaces gracefully", () => {
    const { container } = render(<Title titleText="Hello  World" titleColor="black" />);
    const spans = container.querySelectorAll("span");

    // "Hello  World".split(" ") produces ["Hello", "", "World"]
    expect(spans.length).toBe(3);
    expect(spans[0].textContent).toBe("Hello");
    expect(spans[1].textContent).toBe("");
    expect(spans[2].textContent).toBe("World");
  });

  it("handles string with leading and trailing spaces", () => {
    const { container } = render(<Title titleText=" Hello " titleColor="black" />);
    const spans = container.querySelectorAll("span");

    // " Hello ".split(" ") produces ["", "Hello", ""]
    expect(spans.length).toBe(3);
    expect(spans[0].textContent).toBe("");
    expect(spans[1].textContent).toBe("Hello");
    expect(spans[2].textContent).toBe("");
  });
});
