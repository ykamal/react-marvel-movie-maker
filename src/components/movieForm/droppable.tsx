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
      className={`h-full lg:h-[238px] rounded-2xl border-4 py-3 px-4 bg-white card-gradient-bg ${
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

      <div className="flex flex-row flex-wrap gap-4 mt-2 items-start">
        {children}
      </div>
    </div>
  );
};

export default Droppable;
