import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Droppable from "@components/movieForm/Droppable";

const title = "Droppable Area";
const onDropMock = vi.fn();

describe("Droppable", () => {
  it("Renders Droppable component", () => {
    render(
      <Droppable title={title} onDrop={onDropMock}>
        <div>Draggable Content</div>
      </Droppable>
    );

    const droppableTitle = screen.getByText(/Droppable Area/i);
    expect(droppableTitle).toBeInTheDocument();
  });

  it("Toggles class based on dropOver", () => {
    render(
      <Droppable title={title} onDrop={onDropMock}>
        <div>Draggable Content</div>
      </Droppable>
    );

    const droppableArea =
      screen.getByText(/Draggable Content/i).parentElement?.parentElement;
    expect(droppableArea).not.toHaveClass(
      "border-dotted border-2 border-purple-500 inset"
    );

    fireEvent.dragOver(droppableArea, { preventDefault: vi.fn() });

    expect(droppableArea).toHaveClass(
      "border-dotted border-2 border-purple-500 inset"
    );

    fireEvent.dragExit(droppableArea);

    expect(droppableArea).not.toHaveClass(
      "border-dotted border-2 border-purple-500 inset"
    );
  });

  it("Triggers the onDrop function", () => {
    render(
      <Droppable title={title} onDrop={onDropMock}>
        <div>Draggable Content</div>
      </Droppable>
    );

    const droppableArea =
      screen.getByText(/Draggable Content/i).parentElement?.parentElement;

    fireEvent.drop(droppableArea);

    expect(onDropMock).toHaveBeenCalledTimes(1);
  });
});
