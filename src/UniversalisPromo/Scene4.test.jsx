import { render } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Scene4 } from "./Scene4";
import * as remotion from "remotion";

vi.mock("remotion", async () => {
  const actual = await vi.importActual("remotion");
  return {
    ...actual,
    useCurrentFrame: vi.fn(),
    useVideoConfig: () => ({ fps: 30 }),
    spring: () => 1,
    interpolate: vi.fn(), // Mock interpolate
    AbsoluteFill: ({ children }) => <div>{children}</div>,
  };
});

vi.mock("@remotion/noise", () => ({
  noise2D: () => 0.5,
}));

describe("Scene4", () => {
  it("renders correctly with '+' suffix", () => {
    vi.mocked(remotion.useCurrentFrame).mockReturnValue(60);
    // At frame 60, interpolate will return 10 for "10+" and 100 for "100%"
    vi.mocked(remotion.interpolate).mockImplementation((value, input, output) => {
      return output[1];
    });

    const { getAllByText } = render(<Scene4 />);

    expect(getAllByText("10+")).toBeDefined();
    expect(getAllByText("Progetti Completati")).toBeDefined();
  });

  it("renders correctly with '%' suffix", () => {
    vi.mocked(remotion.useCurrentFrame).mockReturnValue(90);
    // Mock interpolate
    vi.mocked(remotion.interpolate).mockImplementation((value, input, output) => {
      return output[1];
    });

    const { getAllByText } = render(<Scene4 />);

    expect(getAllByText("100%")).toBeDefined();
    expect(getAllByText("Clienti Soddisfatti")).toBeDefined();
  });

  it("handles empty or zero state correctly at frame 0", () => {
    vi.mocked(remotion.useCurrentFrame).mockReturnValue(0);
    // At frame 0, interpolate should return 0
    vi.mocked(remotion.interpolate).mockImplementation((value, input, output) => {
      return 0;
    });

    const { getAllByText } = render(<Scene4 />);

    expect(getAllByText("0+")).toBeDefined();
    expect(getAllByText("0%")).toBeDefined();
  });
});
