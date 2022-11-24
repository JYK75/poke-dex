import axios from "axios";

const remote = axios.create()

export const fetchPokemons = async () => {
  const defaultUrl = 'https://pokeapi.co/api/v2/pokemon'

  const response = await remote.get(defaultUrl)

  return response;
}