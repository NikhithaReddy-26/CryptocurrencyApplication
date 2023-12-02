import React from "react";
import { screen, render } from "@testing-library/react";
import Icon from "./index";

test("should render Icon component", () => {
    render(<Icon />);
});

test("should render Icon props alternate text component", () => {
    render(<Icon alt="an-image" />);
});
test("should render Icon props with one dimension", () => {
    render(<Icon alt="an-image" width="24px" />);
});
test("should render Icon props with two dimension", () => {
    render(<Icon alt="an-image" width="24px" height="24px"/>);
});