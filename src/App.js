import { Spin } from "antd";
import { useEffect, useState } from "react";
import { getPokemonData, getPokemons } from "./api/poke-api";
import "./App.css";
import { Pokedex } from "./components/Pokedex";

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPokemons();
  }, []);

  const loadPokemons = async () => {
    try {
      const data = await getPokemons();
      const promises = data.results.map(
        async (d) => await getPokemonData(d.url)
      );
      const result = await Promise.all(promises);
      setPokemons(result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="Poke-Houm">PokeHoum</h1>
      </header>
      {loading ? (
        <div className="example">
          <Spin tip="Loading..." />
        </div>
      ) : (
        <Pokedex pokemons={pokemons} />
      )}
    </div>
  );
}

export default App;
