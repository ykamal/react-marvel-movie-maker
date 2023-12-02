import { useParams } from "react-router-dom";
import MovieForm from "../components/movieForm/MovieForm";
import { RootContext } from "../context/root-context";
import { useContext } from "react";
import useTitle from "../hooks/useTitle";

export default function EditMovie() {
  useTitle("Edit Movie");

  const { id } = useParams();
  const {
    state: { movies },
  } = useContext(RootContext);

  const movie = movies.find((m) => m.id === id);

  if (!id || !movie) return "<p>Not found</p>";

  return <MovieForm movie={movie} />;
}
