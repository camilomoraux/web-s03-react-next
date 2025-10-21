import { useState, useEffect, useCallback } from "react";

export default function Player() {
  const [playingData, setPlayingData] = useState(null);

  const fetchData = useCallback(() => {
    fetch("https://radio.contrabando.org/api/nowplaying/contrabando")
      .then((r) => r.json())
      .then((info) => setPlayingData(info))
      .catch((err) => console.error("Error:", err));
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const title = playingData?.now_playing?.song?.title || "Sin título";
  const artist = playingData?.now_playing?.song?.artist || "Desconocido";
  const album = playingData?.now_playing?.song?.album || "";
  const image = playingData?.now_playing?.song?.art;
  const streamer = playingData?.live?.streamer_name || "—";
  const totalListeners = playingData?.listeners?.total ?? null;

  return (
    // Contenedor padre ocupa toda la pantalla y contiene la imagen borrosa como fondo
    <div
      className="flex items-center justify-center min-h-screen p-8"
      style={{ position: "relative", overflow: "hidden" }}
    >
      {/* Imagen de fondo (cafetería). objectFit: 'cover' mantiene la proporción y llena el área */}
      <img
        src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1950&q=80"
        alt="Cafetería"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover", // mantiene proporción y rellena el contenedor
          filter: "blur(8px)", // efecto de desenfoque
          transform: "scale(1.03)", // evita bordes visibles al aplicar blur
          zIndex: 0,
        }}
      />

      {/* Contenido encima del fondo borroso */}
      <section
        className="flex flex-col items-center w-full max-w-xs mx-auto shadow-2xl"
        style={{
          position: "relative",
          zIndex: 1,
          border: "1px solid rgba(0,0,0,0.12)",
          borderRadius: "8px",
          padding: "1rem",
          width: "300px",
          backgroundColor: "rgba(255,255,255,0.8)", // ligera capa para legibilidad
        }}
      >
        <h1>Estamos reproduciendo:</h1>

      <div className="flex gap-2">
        <p className="font-bold">Título:</p>
        <p>{title}</p>
      </div>

      <div className="flex gap-2">  
        <p className="font-bold">Artista:</p>
        <p>{artist}</p>
      </div>

      <div className="flex gap-2">
        <p className="font-bold">Álbum:</p>
        <p>{album}</p>
      </div>
      
        {image && <img src={image} alt={title} width="100%" />}

      <div className="flex gap-2">
        <p className="font-bold">Streamer:</p>
        <p>{streamer}</p>
      </div>

      <div className="flex gap-2">
        <p className="font-bold">Total de oyentes:</p>
        <p>{totalListeners ?? "—"}</p>
      </div>
      </section>
    </div>
  );
}
