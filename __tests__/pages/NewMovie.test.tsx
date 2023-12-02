import {
  getByRole,
  getByText,
  render,
  screen,
  fireEvent,
} from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import NewMovie from "@pages/NewMovie";
import Layout from "../../src/layout";

describe("New Movie Form", () => {
  it("renders NewMovie component and submits the form", async () => {
    const handleSubmitMock = vi.fn();

    render(
      <MemoryRouter>
        <NewMovie onSubmit={handleSubmitMock()} />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/Title/i), {
      target: { value: "Test Movie" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Synopsys/i), {
      target: { value: "Test Synopsys" },
    });

    fireEvent.submit(screen.getByRole("button", { name: /save/i }));

    expect(handleSubmitMock).toHaveBeenCalled();
  });
});
