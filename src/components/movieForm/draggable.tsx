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
      className="relative flex w-full xs:w-full flex-col rounded-xl bg-clip-border text-gray-700 cursor-move"
      key={uid}
      data-testid={uid}
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
