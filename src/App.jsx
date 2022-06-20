import React, { useState } from "react";
import "./App.css";
import axios from "axios"; //esta parte se encarga de usar el modulo de la libreria axios para una consulta en html

const App = () => {
  const [pokemon, setPokemon] = useState("pikachu");
  const [pokemonData, setPokemonData] = useState([]);
  const [pokemonType, setPokemonType] = useState("");

  const handleChange = (e) => {
    setPokemon(e.target.value.toLowerCase()); //de esta forma es indiferente si se ingresa en minuscula
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    getPokemon();
  };
  const getPokemon = async () => {
    const toArray = [];
    try {
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;//uso de la pokeapi, donde el valor en llaves es el pokemon
      const res = await axios.get(url);{/*se usa axios para hacer una consulta y buscar la url que coincide con el pokemon*/}
      toArray.push(res.data);
      setPokemonType(res.data.types[0].type.name);
      setPokemonData(toArray);
    } catch (e) {
      console.log(e);
    }
  };
  console.log(pokemonData);

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <h1 style={{ color: 'white' }}>ROTOMDEX</h1>
        <label>
          <input
            type="text"
            onChange={handleChange}
            placeholder="Busca en Rotomdex"//se pide el pokemon a buscar
          />
        </label>
      </form>
        <h3>Hecho por LuisEUS</h3>
      {/* Esta parte muestra la tabla con datos del pokemon */}
      {/* primero escoge el sprite frontal del pokemon*/}
      {pokemonData.map((data) => {
        return (
          <div className="container">
            <img src={data.sprites["front_default"]} />
            <div className="divTable">
              <div className="divTableBody">
                <div className="divTableRow">
                  <div className="divTableCell">Tipo</div>
                  <div className="divTableCell">{pokemonType}</div>
                </div>
                <div className="divTableRow">
                  <div className="divTableCell">Altura</div>
                  <div className="divTableCell">
                    {" "}
                    {(data.height / 10)} mts
                  </div>
                </div>
                <div className="divTableRow">
                  <div className="divTableCell">Peso</div>
                  <div className="divTableCell">
                    {" "}
                    {(data.weight / 10)} kg
                  </div>
                </div>
                <div className="divTableRow">
                  <div className="divTableCell">Número</div>
                  <div className="divTableCell">{data.id}</div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default App;
