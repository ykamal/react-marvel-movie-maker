import MovieForm from "@components/movieForm/MovieForm";
import useTitle from "@hooks/useTitle";

export default function NewMovie() {
  useTitle("New Movie");

  return <MovieForm />;
}
