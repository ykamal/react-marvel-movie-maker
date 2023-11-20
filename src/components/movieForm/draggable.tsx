import { ReactNode } from "react";

interface DraggableProps {
  uid: string | number;
  dragStart: (key: string | number) => void;
  dragStop?: (key: string | number) => void;
  children: ReactNode;
}

const Draggable: React.FC<DraggableProps> = ({
  uid,
  children,
  dragStart,
  dragStop,
}) => {
  return (
    <div
      className="relative flex w-48 flex-col rounded-xl bg-clip-border text-gray-700 my-2 cursor-move"
      key={uid}
      draggable
      onDragStart={() => dragStart(uid)}
      onDragOver={(e) => {
        e.preventDefault();
        !!dragStop && dragStop(uid);
      }}
    >
      {children}
    </div>
  );
};

export default Draggable;