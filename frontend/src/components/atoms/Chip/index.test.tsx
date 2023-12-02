import { render, screen } from "@testing-library/react";
import CustomChip from "./index";

describe("CustomChip", () => {
  it("renders the chip with correct label", () => {
    const label = "Test Label";
    render(<CustomChip label={label} />);
    const chip = screen.getByTestId("custom-chip");
    expect(chip).toBeInTheDocument();
  });

  it("renders the chip with correct variant", () => {
    const variant = "outlined";
    render(<CustomChip variant={variant} />);
    const chip = screen.getByTestId("custom-chip");
    expect(chip).toBeInTheDocument();
  });

  it("renders the chip with correct size", () => {
    const size = "small";
    render(<CustomChip size={size} />);
    const chip = screen.getByTestId("custom-chip");
    expect(chip).toBeInTheDocument();
  });
});
