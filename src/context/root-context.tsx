import React, { createContext, useEffect, useReducer } from "react";
import { Movie } from "./types";

const getMoviesFromLocalstorage = () => {
  const movies = localStorage.getItem("yk_movies");
  return movies ? JSON.parse(movies) : [];
};

// Define initial state
const initialState = {
  movies: getMoviesFromLocalstorage(),
};

// Define action types
const ADD_MOVIE = "ADD_MOVIE";
const REMOVE_MOVIE = "REMOVE_MOVIE";

// Define reducer function to handle state updates
const moviesReducer = (
  state: { movies: Movie[] },
  action: { type: string; movie: Movie; id: string }
) => {
  switch (action.type) {
    case ADD_MOVIE:
      return {
        ...state,
        movies: [...state.movies, action.movie],
      };
    case REMOVE_MOVIE:
      return {
        ...state,
        movies: state.movies.filter((movie) => movie.id !== action.id),
      };
    default:
      return state;
  }
};

// Create context
export const RootContext = createContext();

// Create provider component
export const RootContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(moviesReducer, initialState);

  useEffect(() => {
    localStorage.setItem("yk_movies", JSON.stringify(state.movies));
  }, [state]);

  return (
    <RootContext.Provider value={{ state, dispatch }}>
      {children}
    </RootContext.Provider>
  );
};
