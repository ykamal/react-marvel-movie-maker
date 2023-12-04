import { Character, Movie } from "@context/types";
import React, {
  FormEvent,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { redirect } from "react-router-dom";
import { nameSearch } from "@lib/api";
import CharacterCard from "./CharacterCard";
import Droppable from "./Droppable";
import { RootContext } from "@context/root-context";
import CharacterList from "./CharacterList";
import { ACTIONS, movieFormReducer } from "@context/reducers/movieFormReducer";

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

// interface for the api response
interface MarvelResponse {
  id: number;
  name: string;
  thumbnail: { path: string; extension: string };
}

const MovieForm: React.FC<MovieProps> = ({ movie }) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [debouncedName, setDebouncedName] = useState(name);
  const [characters, setCharacters] = useState<Character[]>([]);

  const [state, stateDispatch] = useReducer(movieFormReducer, {
    movie: movie ?? newMovieData,
  });

  const { state: rootState, dispatch } = useContext(RootContext);

  const { movie: movieData } = state;

  const isNew: boolean = !movie;

  enum CastGroups {
    HEROES = "Heroes",
    VILLAINS = "Villains",
    CAMEOS = "Cameos",
  }

  const castRows = [
    { title: CastGroups.HEROES, max: 3, data: movieData?.heroes },
    { title: CastGroups.VILLAINS, max: 1, data: movieData?.villains },
    { title: CastGroups.CAMEOS, max: 2, data: movieData?.cameos },
  ];

  const currentDraggedItem = useRef<any>(null);

  const isUnique = (id: number): boolean => {
    return (
      !movieData.heroes.some((c) => c.id === id) &&
      !movieData.villains.some((c) => c.id === id) &&
      !movieData.cameos.some((c) => c.id === id)
    );
  };

  const handleDrop = (column: string, max = 1) => {
    if (!isUnique(currentDraggedItem.current.id)) return;
    switch (column) {
      case CastGroups.HEROES:
        if (movieData.heroes.length >= max) return;
        stateDispatch({
          type: ACTIONS.SET_HEROES,
          payload: [...movieData.heroes, currentDraggedItem.current],
        });
        break;
      case CastGroups.VILLAINS:
        if (movieData.villains.length >= max) return;
        stateDispatch({
          type: ACTIONS.SET_VILLAINS,
          payload: [...movieData.villains, currentDraggedItem.current],
        });
        break;
      case CastGroups.CAMEOS:
        if (movieData.cameos.length >= max) return;
        stateDispatch({
          type: ACTIONS.SET_CAMEOS,
          payload: [...movieData.cameos, currentDraggedItem.current],
        });
        break;
      default:
        break;
    }
  };

  const handleRemoval = (id: number, type: string) => {
    switch (type) {
      case CastGroups.HEROES:
        stateDispatch({
          type: ACTIONS.SET_HEROES,
          payload: movieData.heroes.filter((c) => c.id !== id),
        });
        break;
      case CastGroups.VILLAINS:
        stateDispatch({
          type: ACTIONS.SET_VILLAINS,
          payload: movieData.villains.filter((c) => c.id !== id),
        });
        break;
      case CastGroups.CAMEOS:
        stateDispatch({
          type: ACTIONS.SET_CAMEOS,
          payload: movieData.cameos.filter((c) => c.id !== id),
        });
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (movieData.status === "DRAFT")
      stateDispatch({ type: ACTIONS.SET_STATUS, payload: "SAVED" });
    // TODO: turn into enum
    if (isNew)
      dispatch({ type: "ADD_MOVIE", movie: movieData, id: movieData.id });
    if (!isNew)
      dispatch({ type: "UPDATE_MOVIE", movie: movieData, id: movieData.id });
    return redirect("/");
  };

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedName(name), 500);

    return () => {
      clearTimeout(timer);
    };
  }, [name]);

  useEffect(() => {
    setLoading(true);
    nameSearch(debouncedName)
      .then((resp) =>
        setCharacters(
          resp
            ? resp.data.results.map(
                ({ id, name, thumbnail }: MarvelResponse) => ({
                  id,
                  name,
                  portrait: thumbnail.path + "." + thumbnail.extension,
                })
              )
            : []
        )
      )
      .catch((error) => console.log({ error }))
      .finally(() => setLoading(false));
  }, [debouncedName]);

  return (
    <section id="movieForm">
      <div className="mx-auto max-w-screen-xl xs:px-4 py-16 md:px-6 lg:px-8">
        <div className="rounded-lg md:p-8 lg:shadow-lg">
          <form
            action="#"
            className="space-y-4"
            onSubmit={(e) => handleSubmit(e)}
          >
            <div className="flex justify-between">
              <h1 className="text-left text-2xl font-bold text-purple-900 sm:text-3xl">
                {isNew ? "Add a new movie" : `Update Movie`}
              </h1>
            </div>
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
                value={movieData.title}
                onChange={(e) =>
                  stateDispatch({
                    type: ACTIONS.SET_TITLE,
                    payload: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <label className="sr-only" htmlFor="synopsys">
                Synopsys
              </label>

              <textarea
                className="w-full rounded-lg border-gray-200 p-3 text-sm"
                placeholder="Synopsys"
                rows={4}
                id="synopsys"
                maxLength={150}
                value={movieData.synopsis}
                onChange={(e) =>
                  stateDispatch({
                    type: ACTIONS.SET_SYNOPSIS,
                    payload: e.target.value,
                  })
                }
              ></textarea>
            </div>

            {/* Cast */}
            <div className="hidden lg:grid lg:grid-cols-11 lg:gap-8">
              <h2
                className="text-left font-bold text-purple-900 col-span-2"
                style={{ fontSize: "1.2rem" }}
              >
                Cast
              </h2>
              <p className="text-left align-center font-bold text-purple-900 col-span-9">
                Drag and drop a character from the Caracters list to the
                sections on the right. You can also search for a character
              </p>
            </div>
            <div className="grid lg:grid-cols-11 lg:gap-8">
              <div className="heading lg:hidden">
                <h2 className="text-left font-bold text-purple-900 text-[1.2rem]">
                  Cast
                </h2>
              </div>
              <div className="rounded-lg lg:col-span-2">
                <input
                  className={`w-full rounded-lg border-gray-200 p-3 text-sm mb-2 ${
                    loading ? "bg-gray-200" : ""
                  }`}
                  placeholder="Search for characters"
                  data-testid="characterSearch"
                  type="text"
                  disabled={loading}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <CharacterList
                  loading={loading}
                  characters={characters}
                  dragStart={(character) =>
                    (currentDraggedItem.current = character)
                  }
                />
              </div>
              <div className="lg:min-h-[220px] h-full rounded-lg lg:col-span-9">
                <div className="heading lg:hidden mb-4">
                  <p
                    className="text-start font-bold
                   text-purple-900"
                  >
                    Drag and drop a character from the Caracters list to the
                    below sections.You can also search for a character
                  </p>
                </div>
                <div className="wrap flex flex-col lg:grid h-full gap-2 pb-10 lg:pb-0">
                  {castRows.map(({ title, max, data }) => (
                    <Droppable
                      key={title}
                      title={`${title}: (max: ${max})`}
                      onDrop={() => handleDrop(title, max)}
                    >
                      {data.map((character) => (
                        <CharacterCard
                          variant="small"
                          withClear={true}
                          onClear={() => handleRemoval(character.id, title)}
                          key={"castRow_" + character.id}
                          {...character}
                        />
                      ))}
                    </Droppable>
                  ))}
                </div>
              </div>
            </div>

            <div className="btn mb-4">
              <button
                type="submit"
                className="block rounded-lg bg-purple-900 px-5 py-3 font-medium text-white"
              >
                {movieData.status === "SAVED" ? "UPDATE" : "SAVE"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default MovieForm;
