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
        <button
          className="inline-flex items-center justify-center w-4 h-4 text-pink-100 transition-colors duration-150 bg-pink-700 rounded-lg focus:shadow-outline hover:bg-pink-800 text-sm absolute top-1 right-1"
          onClick={() => onClear()}
        >
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
