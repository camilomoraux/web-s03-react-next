import { useState, useEffect, useCallback } from "react";
import { BadgeWithDot } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";

const toLocal = (ts) =>
  new Date(ts * 1000).toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  });

// Componente: chat incrustado que solo monta cuando hay live
function LiveChat({ isLive }) {
  if (!isLive) return null;

  return (
    <div className="relative z-10 w-full max-w-xs mx-auto">
      <div className="bg-white/80 rounded-xl shadow-xl p-4">
        <div className="w-full h-[420px] sm:h-[520px]">
          <iframe
            src="https://chat.contrabando.org/channel/general?layout=embedded&toolbar=false"
            className="w-full h-full rounded-lg border-0"
            allow="camera; microphone"
            loading="lazy"
            title="Chat en vivo"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </div>
  );
}

export default function Player() {
  const [playingData, setPlayingData] = useState(null);

  // Fondos - definir rutas
  const cafeUrl = "/img/coffe.jpg";
  const skateUrl = "/img/skate.jpg";
  const cityUrl = "/img/city.jpg";

  // Estado para el fondo actual (inicializado con café)
  const [bgUrl, setBgUrl] = useState(cafeUrl);

  // Fetch
  const fetchData = useCallback(() => {
    fetch("https://radio.contrabando.org/api/nowplaying/contrabando")
      .then((r) => r.json())
      .then(setPlayingData)
      .catch((e) => console.error(e));
  }, []);
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Derivados
  const title = playingData?.now_playing?.song?.title || "Sin título";
  const artist = playingData?.now_playing?.song?.artist || "Desconocido";
  const album = playingData?.now_playing?.song?.album || "";
  const image = playingData?.now_playing?.song?.art;
  const streamer = playingData?.live?.streamer_name || "—";
  const isLive = playingData?.live?.is_live ?? false;
  const total = playingData?.listeners?.total ?? "—";
  const history = playingData?.song_history ?? [];

  return (
    <div
      className="relative min-h-screen p-8 flex flex-col gap-4"
      style={{ overflow: "hidden" }}
    >
      {/* Fondo con imagen actual */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${bgUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          filter: "blur(8px)",
          transform: "scale(1.03)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      {/* Player */}
      <section className="relative z-10 w-full max-w-xs mx-auto p-4 bg-white/80 rounded shadow flex">
        {image && (
          <div className="w-1/3 mr-4">
            <img
              className="w-full aspect-square rounded object-cover"
              src={image}
              alt={title}
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="grid grid-cols-[auto,1fr] items-center gap-2">
            <p className="font-bold whitespace-nowrap">Título:</p>
            <p className="truncate">{title}</p>
          </div>
          <div className="grid grid-cols-[auto,1fr] items-center gap-2 mt-2">
            <p className="font-bold whitespace-nowrap">Artista:</p>
            <p className="truncate">{artist}</p>
          </div>
          <div className="grid grid-cols-[auto,1fr] items-center gap-2 mt-2">
            <p className="font-bold whitespace-nowrap">Álbum:</p>
            <p className="truncate">{album}</p>
          </div>
        </div>
      </section>

      {/* Live */}
      <div className="relative z-10 w-full max-w-xs mx-auto">
        <div className="bg-white/80 rounded-xl p-4 shadow-xl">
          {isLive ? (
            <div className="flex items-center gap-3">
              <BadgeWithDot type="modern" color="success" size="lg">
                ¡Live!
              </BadgeWithDot>
              <p className="font-bold">Streamer:</p>
              <p>{streamer}</p>
            </div>
          ) : (
            <p className="text-gray-600">No hay transmisión en vivo activa</p>
          )}
        </div>
      </div>

      {/* Chat en vivo (solo cuando isLive === true) */}
      <LiveChat isLive={isLive} />

      {/* Oyentes */}
      <section className="relative z-10 w-full max-w-xs mx-auto p-4 bg-white/80 rounded-xl shadow-xl mt-3">
        <div className="flex gap-2">
          <p className="font-bold">Total de oyentes:</p>
          <p>{total}</p>
        </div>
      </section>

      {/* Historial */}
      <section className="relative z-10 w-full max-w-xs mx-auto p-4 bg-white/80 shadow-xl rounded-xl mt-3">
        <h2 className="font-bold mb-2">Historial de reproducciones</h2>
        {history.length ? (
          <ul className="w-full">
            {history.map((h) => (
              <li
                key={h.sh_id}
                className="flex justify-between items-center pb-1"
              >
                <span className="flex-1">{h.song?.title || "—"}</span>
                <small className="text-gray-500 ml-2">
                  {toLocal(h.played_at)}
                </small>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No hay historial disponible</p>
        )}
      </section>

      {/* Botones */}
      <div className="relative z-10 mt-3 w-full max-w-xs mx-auto flex gap-2 justify-center">
        <Button color="primary" onClick={() => setBgUrl(cafeUrl)}>
          Café
        </Button>
        <Button color="primary" onClick={() => setBgUrl(skateUrl)}>
          Skate
        </Button>
        <Button color="primary" onClick={() => setBgUrl(cityUrl)}>
          Ciudad
        </Button>
      </div>

      <div className="relative z-10 w-full max-w-xs mx-auto">
        <div className="bg-white/80 rounded-xl shadow-xl p-4 text-center">
          <iframe
            src="https://radio.contrabando.org/public/contrabando/embed?theme=light&hide_header=false&show_art=true&hide_footer=true"
            className="w-full h-[130px] rounded-lg border-0 overflow-hidden"
            allow="autoplay"
            loading="lazy"
            title="Reproductor Contrabando Radio"
          />
        </div>
      </div>
    </div>
  );
}
