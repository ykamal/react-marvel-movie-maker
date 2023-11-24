import React, { useContext } from "react";
import { RootContext } from "../context/root-context";
import NoMoviesFound from "../components/movies/noMoviesFound";
import CharacterCard from "../components/movieForm/characterCard";
import { Link } from "react-router-dom";
import MovieCard from "../components/movies/movieCard";

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
          <MovieCard key={movie.id} {...movie} />
        ))}
      </div>
    </div>
  );
}
