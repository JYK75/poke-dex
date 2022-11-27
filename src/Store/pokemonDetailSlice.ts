import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '.'
import { fetchPokemonDetailAPI, PokemonDetailType } from '../Service/PokemonService'

export const fetchPokemonsDetail = createAsyncThunk(
  'pokemon/fetchPokemonsDetail',
  async (name:string) => {
    const response = await fetchPokemonDetailAPI(name)
    return response
  }, {
    condition: (name, { getState }) => {
      const { pokemonDetail } = getState() as RootState
      const pokemon = pokemonDetail.pokemonDetails[name]

      return !pokemon;
    }
  }
)

interface PokemonsDtailState {
  pokemonDetails: Record<string, PokemonDetailType>
}

const initialState = {
  pokemonDetails: {
  },
} as PokemonsDtailState

const pokemonDetailSlice = createSlice({
  name: 'pokemonDetail',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(fetchPokemonsDetail.fulfilled, (state, action:PayloadAction<PokemonDetailType>) => {
      state.pokemonDetails = {
        ...state.pokemonDetails,
        [action.payload.name]: action.payload
      }
    })
  }
})

export const pokemonsDetailReducer = pokemonDetailSlice.reducer