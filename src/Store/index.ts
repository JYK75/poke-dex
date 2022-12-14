import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { imageTypeReducer } from "./imageTypeSlice";
import { pokemonsDetailReducer } from "./pokemonDetailSlice";
import { pokemonsReducer } from "./pokemonsSlice";

export const store = configureStore({
  reducer: {
    imageType: imageTypeReducer,
    pokemons: pokemonsReducer,
    pokemonDetail: pokemonsDetailReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()