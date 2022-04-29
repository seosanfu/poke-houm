import { Alert, Spin } from "antd";
import Search from "antd/lib/input/Search";
import { useEffect, useState } from "react";
import { getPokemonByName, getPokemonData, getPokemons } from "./api/poke-api";
import "./App.css";
import { PaginationPoke } from "./components/Pagination";
import { Pokedex } from "./components/Pokedex";

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
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
      setTotal(data.count);
      const result = await Promise.all(promises);
      setPokemons(result);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const onSearch = async (value) => {
    setLoading(true);
    setError(false);
    if (value === '') {
      loadPokemons();
    } else {
      const data = await getPokemonByName(value.toLowerCase());
      if (!data) {
        setError(true);
      } else {
        setTotal(1);
        setPokemons([data]);
      } 
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="Poke-Houm">PokeHoum</h1>
      </header>
      <div className="searchbar-container">
        <Search placeholder="Buscar Pokemon" onSearch={onSearch} enterButton />
      </div>
      {error ? (
        <Alert
          message="Error"
          description="Error al obtener los datos..."
          type="error"
          showIcon
        />
      ) : (
        <>
          {loading ? (
            <div className="example">
              <Spin tip="Loading..." />
            </div>
          ) : (
            <Pokedex pokemons={pokemons} />
          )}
          <PaginationPoke setPage={setPage} page={page} total={total} />
        </>
      )}
    </div>
  );
}

export default App;
