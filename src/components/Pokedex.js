import React from "react";
import { Pokemon } from "./Pokemon";

export const Pokedex = ({ pokemons }) => {
  return (
    <div className="pokedex-grid">
      {pokemons.map((pokemon) => (
        <Pokemon key={pokemon.id} pokemon={pokemon}/>
      ))}
    </div>
  );
};
