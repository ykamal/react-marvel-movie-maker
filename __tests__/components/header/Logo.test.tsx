import { getByRole, getByText, render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Logo from "@components/header/Logo";

describe("Logo", () => {
  it(`Renders Logo`, () => {
    const { getByRole, getByText } = render(
      <MemoryRouter>
        <Logo />
      </MemoryRouter>
    );

    const linkElement = getByRole("link");
    expect(linkElement).toBeInTheDocument();

    const svgElement = getByRole("image");
    expect(svgElement).toBeInTheDocument();

    const homeSpan = getByText("Home");
    expect(homeSpan).toBeInTheDocument();
  });
});
