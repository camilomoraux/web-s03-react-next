import { useState } from "react";
import { Input } from "@/components/base/input/input";
import { Button } from "@/components/base/buttons/button";

export default function CardPlayer({onSelectedPokemon}) {
  let [notFound, setNotFound] = useState(false);
  let [name, setName] = useState("");
  let [pokemonData, setPokemonData] = useState(null);
  let pokemonDelete = function() {setName(""); setPokemonData(null); setNotFound(false); onSelectedPokemon(null)}
  let fetchData = function() {
    fetch("https://pokeapi.co/api/v2/pokemon/"+name)
    .then(res=>res.status==404?  setNotFound(true): res.json())
    .then(res=>{setPokemonData(res); onSelectedPokemon(res)})
  }
 
  return (
    <section className="flex flex-col items-center space-y-6">
    <div className="bg-white/80 rounded-xl shadow-xl p-8 flex flex-col gap-4">
      <Input isInvalid={notFound === true}  hint={notFound === true? "Este pokemón no existe." : ""} isRequired value={name} onChange={(e)=> setName(e)} label="Escribe el nombre de tu pokemón:" placeholder="Nombre"/>

      <div className="flex gap-2">
        <Button className="w-full" isDisabled={name === ""} onClick={fetchData} color="primary" size="xl">Buscar</Button>
        <Button className="w-full" isDisabled={name === ""} onClick={pokemonDelete} color="secondary" size='xl'>Borrar</Button>
      </div>
      <span className="text-2xl">{pokemonData?.name}</span><br/>
      <img width="300px" src={pokemonData?.sprites?.front_default}/>   
      <span>Vida: {pokemonData?.stats[0]?.base_stat}</span>
      <span>Experiencia: {pokemonData?.base_experience}</span>
      </div>
    </section>
  );
}
