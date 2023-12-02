import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import CustomButton  from ".";

describe("CustomButton", () => {
  it("renders the button with the correct label", () => {
    const label = "Click me";
    render(<CustomButton children={label} />);
    const button = screen.getByTestId("Button");
    expect(button).toBeInTheDocument();
  });

  it("invokes the onClick handler when clicked", () => {
    const onClickMock = jest.fn();
    render(<CustomButton children="Click me" onClick={onClickMock} />);
    const button = screen.getByTestId("Button");
    fireEvent.click(button);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it("renders the button as disabled", () => {
    render(<CustomButton children="Click me" disabled />);
    const button = screen.getByTestId("Button");
    expect(button).toBeDisabled();
  });

});