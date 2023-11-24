import { Character, Movie } from "../types";

export enum ACTIONS {
  SET_TITLE = "SET_TITLE",
  SET_SYNOPSIS = "SET_SYNOPSIS",
  SET_HEROES = "SET_HEROES",
  SET_VILLAINS = "SET_VILLAINS",
  SET_CAMEOS = "SET_CAMEOS",
  SET_STATUS = "SET_STATUS",
}


export interface MovieReducerAction {
  type: ACTIONS;
  payload: string | Character[] | "DRAFT" | "SAVED" | Movie;
}

interface MovieFormState {
  movie: Movie;
}

export const movieFormReducer = (
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