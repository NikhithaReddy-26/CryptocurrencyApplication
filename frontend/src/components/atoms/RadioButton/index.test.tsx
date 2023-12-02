import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import RadioButton from ".";

describe("RadioButton", () => {
  test("renders properly", () => {
    const onChangeMock = jest.fn();
    render(<RadioButton checked={true} onChange={onChangeMock} />);
    const radioButtonElement = screen.getByTestId("radioButton");
    expect(radioButtonElement).toBeInTheDocument();
  });

  test("onClick works properly", () => {
    const onClickMock = jest.fn();
    render(<RadioButton onClick={onClickMock} />);
    const radioButtonElement = screen.getByTestId("radioButton");
    fireEvent.click(radioButtonElement);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  test("onChange works properly", () => {
    const onChange = jest.fn();
    render(
      <>
        <RadioButton name="radio" value="one" onChange={onChange} />
        <RadioButton name="radio" value="two" onChange={onChange} />
      </>
    );
    fireEvent.click(screen.getByDisplayValue("two"));
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
