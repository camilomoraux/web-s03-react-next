import { useState } from "react";

export default function Player() {
  const [playingData, setPlayingData] = useState(null);

  const fetchData = () => {
    fetch("https://radio.contrabando.org/api/nowplaying/contrabando")
      .then((r) => r.json())
      .then((info) => setPlayingData(info))
      .catch((err) => console.error("Error:", err));
  };

  const title = playingData?.now_playing?.song?.title || "Sin título";
  const artist = playingData?.now_playing?.song?.artist || "Desconocido";
  const album = playingData?.now_playing?.song?.album || "";
  const image = playingData?.now_playing?.song?.art;
  const streamer = playingData?.live?.streamer_name || "—";

  return (
    <section
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "1rem",
        width: "300px",
      }}
    >
      <button onClick={fetchData}>Ver</button>
      <h1>Estamos reproduciendo:</h1>
      <p>{title}</p>
      <p>{artist}</p>
      <p>{album}</p>
      {image && <img src={image} alt={title} width="100%" />}
      <p>{streamer}</p>
    </section>
  );
}
