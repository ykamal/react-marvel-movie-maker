import { beforeEach, expect, vi, describe, it, afterEach } from "vitest";
import {
  render,
  screen,
  fireEvent,
  cleanup,
  waitFor,
  act,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RootContext } from "@context/root-context";
import MovieForm from "@components/movieForm/MovieForm";
import React from "react";
import { nameSearch } from "@lib/api";

const mockIronMan = {
  id: 1009368,
  name: "Iron Man",
  thumbnail: {
    path: "http://i.annihil.us/u/prod/marvel/i/mg/9/c0/527bb7b37ff55",
    extension: "jpg",
  },
};

const mockIronManData = {
  id: 1009368,
  name: "Iron Man",
  thumbnail:
    "http://i.annihil.us/u/prod/marvel/i/mg/9/c0/527bb7b37ff55/portrait_fantastic.jpg",
};

const mockDragEvent = {
  preventDefault: vi.fn(),
  dataTransfer: {
    getData: vi.fn(),
    setData: vi.fn(),
  },
};

global.fetch = vi.fn();

describe("MovieForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    vi.mock("@lib/api", async () => {
      const actual = await vi.importActual("@lib/api");
      return {
        ...actual,
        nameSearch: vi.fn(() => Promise.resolve({ data: {} })),
      };
    });

    vi.mocked(nameSearch).mockResolvedValueOnce({
      data: {
        results: [mockIronMan],
      },
    });
  });

  it("renders inputs and allows entering values", async () => {
    render(<MovieForm />);

    const titleInput = screen.getByLabelText(/title/i);
    const synopsysTextArea = screen.getByLabelText(/synopsys/i);

    await userEvent.type(titleInput, "My Movie Title");
    await userEvent.type(synopsysTextArea, "Movie synopsis");

    expect(titleInput).toHaveValue("My Movie Title");
    expect(synopsysTextArea).toHaveValue("Movie synopsis");
  });

  it("makes API call and displays results on search", async () => {
    render(<MovieForm />);

    const input = screen.getByTestId("characterSearch");

    await waitFor(() => {
      expect(input).toBeEnabled();
    });

    await act(async () => {
      userEvent.type(input, "iron man");
    });

    await waitFor(() => {
      expect(input).toHaveValue("iron man");
    });

    await waitFor(() => expect(nameSearch).toHaveBeenCalledWith("iron man"));

    await waitFor(() =>
      expect(screen.getAllByText(mockIronMan.name)).to.not.toBeNull()
    );
  });

  it("handles drag and drop to add character", async () => {
    render(<MovieForm />);

    const input = screen.getByTestId("characterSearch");

    await waitFor(() => {
      expect(input).toBeEnabled();
    });

    await act(async () => {
      userEvent.type(input, "iron man");
    });

    await waitFor(() => {
      expect(input).toHaveValue("iron man");
    });

    await waitFor(() => expect(nameSearch).toHaveBeenCalledWith("iron man"));

    await waitFor(() =>
      expect(screen.getAllByAltText(mockIronMan.name)).to.not.toBeNull()
    );

    const character = screen
      .getAllByTestId(mockIronMan.id)[0]
      .closest("div[draggable='true']");

    fireEvent.dragStart(character!, {
      dataTransfer: { setData: () => mockIronManData },
    });

    const droppable = screen.getByText("Heroes: (max: 3)").closest("div");

    fireEvent.drop(droppable!);

    await waitFor(() => expect(droppable).toHaveTextContent(mockIronMan.name));
  });
});
