import React, { useContext } from "react";
import { RootContext } from "../context/root-context";
import NoMoviesFound from "../components/movies/noMoviesFound";
import CharacterCard from "../components/movieForm/characterCard";
import { Link } from "react-router-dom";

export default function Movies() {
  const {
    state: { movies },
    dispatch,
  } = useContext(RootContext);

  if (!movies || !movies.length) return <NoMoviesFound />;

  return (
    <div className="relative">
      <h1 className="text-2xl py-4">Marvelous Movies</h1>
      <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-8">
        {movies.map((movie) => (
          <div key={movie.id} className="mb-1">
            <Link
              to={`/movies/${movie.id}/edit`}
              className="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8 md:max-w-[320px] sm:w-full hover:shadow-xl"
            >
              <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>
              <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
                {movie.title}
              </h3>

              <p className="mt-1 text-xs font-medium text-gray-600">
                {movie.synopsis}
              </p>

              <div className="flex justify-between mt-10">
                {movie.heroes?.length &&
                  movie.heroes.map((c) => (
                    <img
                      key={`${movie.id}_${c.id}`}
                      className="w-10 h-10 rounded-full -m-2"
                      src={c.portrait}
                      alt="Rounded avatar"
                    />
                  ))}
                <p className="mx-5">vs</p>
                {movie.villains?.length &&
                  movie.villains.map((c) => (
                    <img
                      key={`${movie.id}_${c.id}`}
                      className="w-10 h-10 rounded-full -m-2"
                      src={c.portrait}
                      alt="Rounded avatar"
                    />
                  ))}
                <p className="mx-5">ft</p>
                {movie.cameos?.length &&
                  movie.cameos.map((c) => (
                    <img
                      key={`${movie.id}_${c.id}`}
                      className="w-10 h-10 rounded-full -m-2"
                      src={c.portrait}
                      alt="Rounded avatar"
                    />
                  ))}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
