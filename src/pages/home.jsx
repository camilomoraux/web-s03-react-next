import { Button } from "@/components/base/buttons/button.tsx";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen text-center space-y-6">
      <div className="space-y-6 max-w-xl px-6">
        <h1 className="text-display-sm font-semibold text-gray-900">
          Bienvenido a Untitled UI React
        </h1>
        <p className="text-gray-600 max-w-md">
          Hoy vamos a crear una aplicacion que usa componentes de Untitled UI
          React y consume datos de la PokeAPI.
        </p>
        <p className="text-gray-600 max-w-md">
          Para ello, vamos a seguir los siguientes pasos:
        </p>
        <ul className="list-disc list-inside text-gray-600 max-w-md">
          <li>Instalar las dependencias necesarias</li>
          <li>Crear los componentes de la interfaz de usuario</li>
          <li>Consumir los datos de la PokeAPI</li>
        </ul>
        <Button onClick={() => (window.location.href = "/poke-api")}>
          Ir a trabajar!
        </Button>
          <Button onClick={() => (window.location.href = "/player")}>
          Ver player
        </Button>
              <Button onClick={() => (window.location.href = "/portfolio")}>
          Ver portfolio
        </Button>
      </div>
    </section>
  );
}
