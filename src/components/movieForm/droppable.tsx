import { ReactNode } from "react";

interface DroppableProps {
  title: string;
  children?: ReactNode;
  onDrop: () => void;
}

const Droppable: React.FC<DroppableProps> = ({ title, children, onDrop }) => {
  return (
    <div
      key={title}
      onDragOver={(e) => e.preventDefault()}
      onDrop={() => onDrop()}
    >
      <p>{title}</p>

      <div className="flex flex-row">{children}</div>
    </div>
  );
};

export default Droppable;
