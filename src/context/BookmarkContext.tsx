"use client";

import { createContext, useContext, useReducer, ReactNode } from "react";
import {Employee} from "@/types/generaltypes";




type BookmarkAction =
  | { type: "ADD_BOOKMARK"; payload: Employee }
  | { type: "REMOVE_BOOKMARK"; payload: number };

type BookmarkState = {
  bookmarks: Employee[];
};


const initialState: BookmarkState = {
  bookmarks: [],
};

function bookmarkReducer(state: BookmarkState, action: BookmarkAction): BookmarkState {
  switch (action.type) {
    case "ADD_BOOKMARK":
      return {
        bookmarks: [...state.bookmarks, action.payload],
      };
    case "REMOVE_BOOKMARK":
      return {
        bookmarks: state.bookmarks.filter(Employee => Employee.id !== action.payload),
      };
    default:
      return state;
  }
}


const BookmarkContext = createContext<{
  state: BookmarkState;
  dispatch: React.Dispatch<BookmarkAction>;
}>({
  state: initialState,
  dispatch: () => {},
});

export const BookmarkProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(bookmarkReducer, initialState);

  return (
    <BookmarkContext.Provider value={{ state, dispatch }}>
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmarkContext = () => useContext(BookmarkContext);
