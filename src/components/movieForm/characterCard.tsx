import { Character } from "../../context/types";

interface CharacterCardProps extends Character {
  variant?: "default" | "small";
  withClear?: boolean;
  onClear?: () => void;
}

const CharacterCard: React.FC<CharacterCardProps> = ({
  name,
  portrait,
  variant = "default",
  withClear = false,
  onClear,
}) => {
  return (
    <div
      className={`relative mx-4 mt-4 overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg ${
        variant === "default" ? "mh-84 w-84" : "mh-32 w-24"
      }`}
    >
      {withClear && onClear && (
        <button className="absolute top-0 right-2" onClick={() => onClear()}>
          &times;
        </button>
      )}
      <img src={portrait} alt={name} draggable="false" />
      <h4
        className={`mb-2 block font-sans font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased ${
          variant === "default" ? "text-xl" : "text-medium"
        }`}
      >
        {name}
      </h4>
    </div>
  );
};

export default CharacterCard;
