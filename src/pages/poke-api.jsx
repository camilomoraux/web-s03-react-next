import { useState } from "react";
import { Input } from "@/components/base/input/input";
import { Button } from "@/components/base/buttons/button";

export default function PokeApi() {
  let [name, setName] = useState("");
  let [pokemonData, setPokemonData] = useState(null);
  let nameDelete = function() {setName("")}
  let fetchData = function() {fetch("https://pokeapi.co/api/v2/pokemon/"+name).then(res=>res.json()).then(res=>setPokemonData(res))}
  return (
    <section className="flex flex-col items-center justify-center min-h-screen text-center space-y-6">
      <h1 className="text-display-sm font-semibold text-gray-900">
        Página de Poke API
      </h1>
      <p className="text-gray-600 max-w-md">
        Aquí puedes trabajar con la API de Pokémon.
      </p>
      <Input isRequired value={name} onChange={(e)=> setName(e)} label="Escribe el nombre del pokemón que deseas buscar." placeholder="Nombre"/>
      <Button isDisabled={name === ""} onClick={fetchData} color="primary" size="xl">Buscar</Button>
      <Button isDisabled={name === ""} onClick={nameDelete} color="secondary" size='xl'>Borrar</Button>
      
      {pokemonData?.name}<br/>
      {pokemonData?.id}<br/>
      <img src={pokemonData?.sprites?.front_default}/>

    </section>
  );
}
