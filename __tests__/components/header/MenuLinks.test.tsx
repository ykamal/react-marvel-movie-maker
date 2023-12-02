import { getByRole, getByText, render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import MenuLinks from "@components/header/MenuLinks";

describe("Menu Items", () => {
  it(`Renders menu items`, () => {
    const { getByRole } = render(
      <MemoryRouter>
        <MenuLinks />
      </MemoryRouter>
    );

    const menuItems = ["Movies", "Add New"];

    menuItems.forEach((item) => {
      const link = getByRole("link", { name: item });
      expect(link).toBeInTheDocument();
    });
  });

  // TODO: add active menu link check
  // using toHaveClass
});
