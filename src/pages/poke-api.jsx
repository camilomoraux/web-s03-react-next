import CardPlayer from "@/components/custom-components/card-player";
import { useState } from "react";
import { Button } from "@/components/base/buttons/button";
import { useEffect } from "react";

export default function PokeApi() {
  let [player1, setPlayer1] = useState(null);
  let [player2, setPlayer2] = useState(null);
  let [pokemonLife1, setPokemonLife1] = useState(player1?.stats[0]?.base_stat);
  let [pokemonLife2, setPokemonLife2] = useState(player2?.stats[0]?.base_stat);
  let [turnos, setTurnos] = useState([]);
  // Nuevo estado para controlar si la batalla está activa
  let [isBattleActive, setIsBattleActive] = useState(false);

  // Efecto para manejar los turnos de la batalla
  useEffect(() => {
    if (!isBattleActive) return;

    // Si alguien perdió, terminar batalla
    if (pokemonLife1 <= 0 || pokemonLife2 <= 0) {
      setIsBattleActive(false);
      const winner = pokemonLife1 <= 0 ? player2.name : player1.name;
      setTurnos((prev) => [...prev, `¡${winner} ha ganado la batalla!`]);
      return;
    }

    // Ejecutar siguiente turno
    const timer = setTimeout(() => {
      if (player1.base_experience > player2.base_experience) {
        attackPokemon1();
      } else {
        attackPokemon2();
      }
    }, 1000); // Delay entre turnos

    return () => clearTimeout(timer);
  }, [isBattleActive, pokemonLife1, pokemonLife2]);

  let startBattle = function () {
    if (player1 === null || player2 === null) return;

    // Reiniciar batalla
    setPokemonLife1(player1?.stats[0]?.base_stat);
    setPokemonLife2(player2?.stats[0]?.base_stat);
    setTurnos([]);
    setIsBattleActive(true);
  };

  let attackPokemon1 = function () {
    if (player1 === null || player2 === null) return;
    let habilitySelected =
      player1?.abilities[Math.floor(Math.random() * player1?.abilities.length)]
        ?.ability.name;
    let attackPoints = player1?.stats[1]?.base_stat;
    let defensePoints = player2?.stats[2]?.base_stat;
    let damage = Math.max(attackPoints - defensePoints, 0);
    setPokemonLife2((life) => Math.max(life - damage, 0));
    setTurnos((turnos) => [
      ...turnos,
      `El pokemón ${player1.name} usó ${habilitySelected} y causó ${damage} puntos de daño.`,
    ]);
  };

  let attackPokemon2 = function () {
    if (player1 === null || player2 === null) return;
    let habilitySelected =
      player2?.abilities[Math.floor(Math.random() * player2?.abilities.length)]
        ?.ability.name;
    let attackPoints = player2?.stats[1]?.base_stat;
    let defensePoints = player1?.stats[2]?.base_stat;
    let damage = Math.max(attackPoints - defensePoints, 0);
    setPokemonLife1((life) => Math.max(life - damage, 0));
    setTurnos((turnos) => [
      ...turnos,
      `El pokemón ${player2.name} usó ${habilitySelected} y causó ${damage} puntos de daño.`,
    ]);
  };

  return (
    <section>
      <div className="prose prose-centered-quote mx-auto text-center">
        <h1>Batalla Pokemón</h1>
      </div>

      <div className="flex flex-row gap-4 justify-center items-start">
        <CardPlayer onSelectedPokemon={setPlayer1} />
        <CardPlayer onSelectedPokemon={setPlayer2} />
      </div>

      <div className="flex flex-col justify-center mt-8">
        <Button
          isDisabled={player1 === null || player2 === null}
          color="primary"
          size="xl"
          onClick={startBattle}
        >
          ¡A pelear!
        </Button>
        {turnos.map((turno, index) => (
          <p key={index}>{turno}</p>
        ))}
      </div>
    </section>
  );
}
