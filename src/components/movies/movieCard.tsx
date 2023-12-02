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
      {/* Heading for each Movie Card */}
      <h2 className="text-lg font-bold text-purple-900 mb-2">Movie</h2>

      <Link
        to={`/movies/${id}/edit`}
        className="relative movie-card overflow-hidden rounded-lg border border-gray-100f p-4 w-full sm:w-full transition-all duration-300 hover:shadow-2xl xs:h-[240px] flex flex-col gap-2 card-gradient-bg max-w-[22rem] sm:max-w-full m-auto"
      >
        {/* gradient */}
        <div className="w-full absolute inset-x-0 card-bottom-gradient bottom-0 h-2"></div>

        {/* Movie Title Heading */}
        <h3 className="text-lg font-bold text-slate-800 sm:text-xl">{title}</h3>
        <p className="mt-1 text-xs font-medium text-slate-500">{synopsis}</p>

        {/* desktop */}
        <div className="hidden xs:flex justify-between w-full mt-10 md:px-2 mx-auto">
          {/* heros */}
          {heroes?.length > 0 &&
            heroes.map((c) => (
              <img
                key={`${id}_${c.id}`}
                className="w-10 h-10 rounded-full -m-2"
                src={c.portrait}
                alt="Rounded avatar"
              />
            ))}

          {/* villains */}

          {villains?.length > 0 && <p className="mx-3">vs</p>}
          {villains?.length > 0 &&
            villains.map((c) => (
              <img
                key={`${id}_${c.id}`}
                className="w-10 h-10 rounded-full -m-2"
                src={c.portrait}
                alt="Rounded avatar"
              />
            ))}

          {/* cameos */}

          {cameos?.length > 0 && <p className="mx-3">ft</p>}
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
        {/* mobile */}
        <div className="xs:hidden grid gap-2 w-full py-4 mt-4 justify-center items-center md:px-2 mx-auto">
          {/* heros */}
          <div className="heros flex gap-1.5">
            {heroes?.length > 0 &&
              heroes.map((c) => (
                <img
                  key={`${id}_${c.id}`}
                  className="w-14 h-14 rounded-full"
                  src={c.portrait}
                  alt="Rounded avatar"
                />
              ))}
          </div>

          {/* villains */}
          {villains?.length > 0 && <p className="mx-3 font-bold">vs</p>}
          <div className="villains flex justify-center items-center gap-1.5">
            {villains?.length > 0 &&
              villains.map((c) => (
                <img
                  key={`${id}_${c.id}`}
                  className="w-14 h-14 rounded-full"
                  src={c.portrait}
                  alt="Rounded avatar"
                />
              ))}
          </div>
          {/* cameos */}
          {cameos?.length > 0 && <p className="mx-3 font-bold">ft</p>}
          <div className="comeos flex justify-center items-center gap-1.5">
            {cameos?.length > 0 &&
              cameos.map((c) => (
                <img
                  key={`${id}_${c.id}`}
                  className="w-14 h-14 rounded-full"
                  src={c.portrait}
                  alt="Rounded avatar"
                />
              ))}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
