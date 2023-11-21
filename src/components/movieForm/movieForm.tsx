import { Character, Movie } from "../../context/types";
import React, {
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { redirect } from "react-router-dom";
import nameSearch from "../../lib/api";
import CharacterCard from "./characterCard";
import Draggable from "./draggable";
import Droppable from "./droppable";
import { RootContext } from "../../context/root-context";

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

/**
 * Setting up state actions via reducers
 */
enum ACTIONS {
  SET_TITLE = "SET_TITLE",
  SET_SYNOPSIS = "SET_SYNOPSIS",
  SET_HEROES = "SET_HEROES",
  SET_VILLAINS = "SET_VILLAINS",
  SET_CAMEOS = "SET_CAMEOS",
  SET_STATUS = "SET_STATUS",
}

interface MovieFormState {
  movie: Movie;
}

interface MovieReducerAction {
  type: ACTIONS;
  payload: string | Character[] | "DRAFT" | "SAVED" | Movie;
}

const movieReducer = (
  state: MovieFormState,
  action: MovieReducerAction
): MovieFormState => {
  switch (action.type) {
    case ACTIONS.SET_TITLE:
      return {
        ...state,
        movie: {
          ...state.movie,
          title: action.payload as string,
        },
      };

    case ACTIONS.SET_SYNOPSIS:
      return {
        ...state,
        movie: {
          ...state.movie,
          synopsis: action.payload as string,
        },
      };

    case ACTIONS.SET_STATUS:
      return {
        ...state,
        movie: {
          ...state.movie,
          status: action.payload as "DRAFT" | "SAVED",
        },
      };

    case ACTIONS.SET_HEROES:
      return {
        ...state,
        movie: {
          ...state.movie,
          heroes: action.payload as Character[],
        },
      };

    case ACTIONS.SET_VILLAINS:
      return {
        ...state,
        movie: {
          ...state.movie,
          villains: action.payload as Character[],
        },
      };

    case ACTIONS.SET_CAMEOS:
      return {
        ...state,
        movie: {
          ...state.movie,
          cameos: action.payload as Character[],
        },
      };

    default:
      return state;
  }
};

// interface for the api response
interface MarvelResponse {
  id: number;
  name: string;
  thumbnail: { path: string; extension: string };
}

const MovieForm: React.FC<MovieProps> = ({ movie }) => {
  const [name, setName] = useState("");
  const [debouncedName, setDebouncedName] = useState(name);
  const [characters, setCharacters] = useState<Character[]>([]);

  const [state, stateDispatch] = useReducer(movieReducer, {
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

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    console.log({ movieData });
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
      .catch((error) => console.log({ error }));
  }, [debouncedName]);

  return (
    <section id="movieForm">
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-lg bg-white p-8 shadow-lg lg:p-12">
          <form
            action="#"
            className="space-y-4"
            onSubmit={(e) => handleSubmit(e)}
          >
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

            <h2 className="text-left">Cast</h2>
            <p>
              Drag and drop a character from the Caracters list to the sections
              on the right. You can also search for a character.
            </p>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
              <div className="rounded-lg bg-gray-200">
                <p>Characters</p>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <div className="min-h-[150px] max-h-[500px] overflow-y-auto">
                  {characters.map((character) => (
                    <Draggable
                      key={character.id}
                      uid={character.id}
                      dragStart={() => (currentDraggedItem.current = character)}
                    >
                      <CharacterCard {...character} />
                    </Draggable>
                  ))}
                </div>
              </div>
              <div className="min-h-[150px] rounded-lg bg-gray-200 lg:col-span-2 pb-10">
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

            <div className="mt-4">
              <button
                type="submit"
                className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
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
