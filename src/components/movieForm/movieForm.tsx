import { Movie } from "../../context/types";
import React, { useState } from "react";

interface MovieProps {
  movie?: Movie;
}

const newMovieData: Movie = {
  id: Math.random().toString(36).replace("0.", "mov_"),
  title: "",
  synopsis: "",
  heroes: [],
  villains: [],
  cameos: [],
  status: "DRAFT",
};

const MovieForm: React.FC<MovieProps> = ({ movie }) => {
  const [movieData, setMovieData] = useState(movie ?? newMovieData);

  const isNew: boolean = !movie;

  return (
    <section id="movieForm">
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-lg bg-white p-8 shadow-lg lg:p-12">
          <form action="" className="space-y-4">
            <h1 className="text-left text-2xl font-bold text-purple-600 sm:text-3xl">
              {isNew ? "Add a new movie" : `Update Movie`}
            </h1>

            <div>
              <label className="sr-only" htmlFor="title">
                Title
              </label>
              <input
                className="w-full rounded-lg border-gray-200 p-3 text-sm"
                placeholder="Title"
                type="text"
                id="title"
                maxLength={50}
              />
            </div>

            <div>
              <label className="sr-only" htmlFor="synopsys">
                Synopsys
              </label>

              <textarea
                className="w-full rounded-lg border-gray-200 p-3 text-sm"
                placeholder="Synopsys"
                rows="4"
                id="synopsys"
                maxLength={150}
              ></textarea>
            </div>

            {/* Cast */}

            <h2 className="text-left">Cast</h2>
            <p>
              Drag and drop a character from the Caracters list to the sections
              on the right. You can also search for a character.
            </p>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
              <div className="h-32 rounded-lg bg-gray-200">Characters</div>
              <div className="h-32 rounded-lg bg-gray-200 lg:col-span-2">
                <p>Heroes</p>
                <p>Villains</p>
                <p>Cameos</p>
              </div>
            </div>

            <div className="mt-4">
              <button
                type="submit"
                className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
              >
                Send Enquiry
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default MovieForm;
