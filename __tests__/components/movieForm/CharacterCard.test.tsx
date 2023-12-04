import {
  getByRole,
  getByText,
  render,
  screen,
  fireEvent,
} from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import CharacterCard from "@components/movieForm/CharacterCard";

const mockCharacter = {
  name: "Test Character",
  portrait: "http://i.annihil.us/u/prod/marvel/i/mg/9/c0/53176aa9df48d.jpg",
};

describe("Character Card", () => {
  it("renders CharacterCard component with default variant", () => {
    render(<CharacterCard {...mockCharacter} />);

    const characterName = screen.getByText(/Test Character/i);
    expect(characterName).toBeInTheDocument();

    const clearButton = screen.queryByText(/×/i);
    expect(clearButton).not.toBeInTheDocument();
  });

  it("renders CharacterCard component with small variant and clear button", () => {
    const onClearMock = vi.fn();

    render(
      <CharacterCard
        {...mockCharacter}
        variant="small"
        withClear
        onClear={onClearMock}
      />
    );

    const characterName = screen.getByText(/Test Character/i);
    expect(characterName).toBeInTheDocument();

    const clearButton = screen.getByTestId("clearBtn");
    expect(clearButton).toBeInTheDocument();

    fireEvent.click(clearButton);

    expect(onClearMock).toHaveBeenCalledTimes(1);
  });
});
