import { Link } from "react-router-dom";
import { Movie } from "../../context/types";

interface MovieProps extends Movie {}

const MovieCard: React.FC<MovieProps> = ({
  title,
  id,
  synopsis,
  heroes,
  villains,
  cameos,
}) => {
  return (
    <div key={id} className="mb-1">
      <Link
        to={`/movies/${id}/edit`}
        className="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8 md:max-w-[320px] sm:w-full hover:shadow-xl h-[240px]"
      >
        <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>
        <h3 className="text-lg font-bold text-gray-900 sm:text-xl">{title}</h3>

        <p className="mt-1 text-xs font-medium text-gray-600">{synopsis}</p>

        <div className="flex justify-between mt-10">
          {heroes?.length > 0 &&
            heroes.map((c) => (
              <img
                key={`${id}_${c.id}`}
                className="w-10 h-10 rounded-full -m-2"
                src={c.portrait}
                alt="Rounded avatar"
              />
            ))}
          {villains?.length > 0 && <p className="mx-4">vs</p>}
          {villains?.length > 0 &&
            villains.map((c) => (
              <img
                key={`${id}_${c.id}`}
                className="w-10 h-10 rounded-full -m-2"
                src={c.portrait}
                alt="Rounded avatar"
              />
            ))}
          {cameos?.length > 0 && <p className="mx-5">ft</p>}
          {cameos?.length > 0 &&
            cameos.map((c) => (
              <img
                key={`${id}_${c.id}`}
                className="w-10 h-10 rounded-full -m-2"
                src={c.portrait}
                alt="Rounded avatar"
              />
            ))}
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
