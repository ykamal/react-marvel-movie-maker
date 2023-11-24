import { ReactNode, useState } from "react";

interface DroppableProps {
  title: string;
  children?: ReactNode;
  onDrop: () => void;
}

const Droppable: React.FC<DroppableProps> = ({ title, children, onDrop }) => {
  const [draggedOver, setDraggedOver] = useState(false);
  return (
    <div
      className={`min-h-[100px] rounded m-2 p-4 bg-white ${
        draggedOver ? "border-dotted border-2 border-purple-500 inset" : ""
      }`}
      key={title}
      onDragOver={(e) => {
        e.preventDefault();
        setDraggedOver(true);
      }}
      onDragExit={() => setDraggedOver(false)}
      onDrop={() => {
        setDraggedOver(false);
        onDrop();
      }}
    >
      <h3 className="text-lg text-left px-1 py-2">{title}</h3>

      <div className="flex flex-row">{children}</div>
    </div>
  );
};

export default Droppable;
