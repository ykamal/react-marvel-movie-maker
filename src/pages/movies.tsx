import React, { useContext } from "react";
import { RootContext } from "../context/root-context";
import NoMoviesFound from "../components/movies/noMoviesFound";

export default function Movies() {
  const {
    state: { movies },
    dispatch,
  } = useContext(RootContext);

  console.log({ movies }, typeof movies);

  if (!movies || !movies.length) return <NoMoviesFound />;
}
