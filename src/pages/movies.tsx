import React, { useContext } from "react";
import { RootContext } from "../context/root-context";
import NoMoviesFound from "../components/movies/noMoviesFound";
import CharacterCard from "../components/movieForm/characterCard";
import MovieCard from "../components/movies/movieCard";

export default function Movies() {
  const {
    state: { movies },
    dispatch,
  } = useContext(RootContext);

  if (!movies || !movies.length) return <NoMoviesFound />;

  return (
    <div className="relative">
      <h1 className="text-3xl xs:text-4xl font-bold py-4 text-purple-900 mt-6">
        Marvelous Movies
      </h1>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-5">
        {movies.map((movie: object, id: number) => (
          <MovieCard key={id} {...movie} />
        ))}
      </div>
    </div>
  );
}
