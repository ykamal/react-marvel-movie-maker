import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Logo from "../Logo";

describe("Logo", () => {
  it("renders logo link", () => {
    const { getByRole } = render(
      <MemoryRouter>
        <Logo />
      </MemoryRouter>
    );
    
    expect(getByRole("link")).toHaveAttribute("href", "/");

    expect(getByRole("img")).toHaveAttribute("width", "48px");
    expect(getByRole("img")).toHaveAttribute("height", "48px");
  });

  it("has accessible name for screen readers", () => {
    const { getByText } = render(
      <MemoryRouter>
        <Logo />  
      </MemoryRouter>
    );
    
    expect(getByText("Home")).toHaveClass("sr-only"); 
  });
});