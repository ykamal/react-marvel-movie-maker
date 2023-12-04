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
      className={`relative overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg ${
        variant === "default" ? "w-full" : "w-[7.5rem]"
      }`}
    >
      {withClear && onClear && (
        <button
          data-testid="clearBtn"
          className="flex items-center justify-center w-4 h-4 text-pink-100 transition-colors duration-150 bg-pink-700 rounded-lg focus:shadow-outline hover:bg-pink-800 text-sm absolute top-1 right-1 p-0.5"
          onClick={() => onClear()}
        >
          <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 512 512"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M405 136.798L375.202 107 256 226.202 136.798 107 107 136.798 226.202 256 107 375.202 136.798 405 256 285.798 375.202 405 405 375.202 285.798 256z"></path>
          </svg>
        </button>
      )}
      <img
        className={` ${
          variant === "default"
            ? "h-[8rem] w-full lg:h-[unset] lg:w-[unset]"
            : "h-[7rem] w-full"
        }`}
        src={portrait}
        alt={name}
        draggable="false"
      />
      <h4
        className={`mb-2 block font-sans font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased ${
          variant === "default"
            ? "text-sm xs:text-base md:text-lg lg:text-xl"
            : "text-medium"
        }`}
      >
        {name}
      </h4>
    </div>
  );
};

export default CharacterCard;
