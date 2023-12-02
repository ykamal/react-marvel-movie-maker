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
      className={`h-[100px] lg:min-h-[140px] rounded-2xl border-4 p-4 bg-white card-gradient-bg ${
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
      onTouchMove={() => {
        setDraggedOver(false);
        onDrop();
      }}
    >
      <h3 className="text-lg text-left px-1 font-semibold text-slate-800">
        {title}
      </h3>

      <div className="flex flex-row gap-4 mt-2">{children}</div>
    </div>
  );
};

export default Droppable;
