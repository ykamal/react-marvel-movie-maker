import { useParams } from "react-router-dom";
import MovieForm from "../components/movieForm/MovieForm";
import { RootContext } from "../context/root-context";
import { useContext } from "react";
import useTitle from "../hooks/useTitle";
import { Movie } from "../context/types";

export default function EditMovie() {
  const { id } = useParams();
  const {
    state: { movies },
  } = useContext(RootContext);

  const movie = movies.find((m: Movie) => m.id === id);

  useTitle(`Edit Movie: ${movie?.title ?? "Not found"}`);

  if (!id || !movie) return <p>Not found</p>;

  return <MovieForm movie={movie} />;
}
