import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Draggable from "@components/movieForm/Draggable";

describe("Draggable", () => {
  it("renders Draggable component and triggers drag events", () => {
    const uid = "1";
    const dragStartMock = vi.fn();
    const dragStopMock = vi.fn();

    render(
      <Draggable uid={uid} dragStart={dragStartMock} dragStop={dragStopMock}>
        <div>Draggable Content</div>
      </Draggable>
    );

    const draggableContent = screen.getByText(/Draggable Content/i);
    expect(draggableContent).toBeInTheDocument();

    fireEvent.dragStart(draggableContent, {
      dataTransfer: { setData: () => {} },
    });

    expect(dragStartMock).toHaveBeenCalledWith(uid);

    fireEvent.dragOver(draggableContent, { preventDefault: vi.fn() });

    expect(dragStopMock).toHaveBeenCalledWith(uid);
  });

  it("renders Draggable component without dragStop callback", () => {
    const uid = "2";
    const dragStartMock = vi.fn();

    render(
      <Draggable uid={uid} dragStart={dragStartMock}>
        <div>Draggable Content</div>
      </Draggable>
    );

    const draggableContent = screen.getByText(/Draggable Content/i);
    expect(draggableContent).toBeInTheDocument();

    fireEvent.dragStart(draggableContent, {
      dataTransfer: { setData: () => {} },
    });

    expect(dragStartMock).toHaveBeenCalledWith(uid);
  });
});
