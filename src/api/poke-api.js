import axios from "axios";

export const getPokemons = async (limit = 12, offset = 0) => {
  let url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
  try {
    const rsp = await axios.get(url);
    const data = await rsp.data;
    return data;
  } catch(error) {
    return error;
  }
}

export const getPokemonData = async (pokemon) => {
  try {
    const rsp = await axios.get(pokemon);
    const data = await rsp.data;
    return data;
  } catch (error) {
    return error;
  }
}
