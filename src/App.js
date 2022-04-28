import { Spin } from "antd";
import { useEffect, useState } from "react";
import { getPokemonData, getPokemons } from "./api/poke-api";
import "./App.css";
import { PaginationPoke } from "./components/Pagination";
import { Pokedex } from "./components/Pokedex";

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    loadPokemons();
  }, [page]);

  const loadPokemons = async () => {
    setLoading(true);
    try {
      const data = await getPokemons(12, 12 * page);
      const promises = data.results.map(
        async (d) => await getPokemonData(d.url)
      );
      setTotal(data.count)
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
      <PaginationPoke setPage={setPage} page={page} total={total} />
    </div>
  );
}

export default App;
