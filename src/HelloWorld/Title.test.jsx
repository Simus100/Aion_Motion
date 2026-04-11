import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Title } from "./Title";

describe("Title", () => {
  it("renders correctly with given title text and color", () => {
    const { getByText } = render(<Title titleText="Hello World" titleColor="red" />);

    expect(getByText("Hello")).toBeInTheDocument();
    expect(getByText("World")).toBeInTheDocument();
    expect(getByText("Hello")).toHaveStyle({ color: "rgb(255, 0, 0)" });
    expect(getByText("World")).toHaveStyle({ color: "rgb(255, 0, 0)" });
  });
});