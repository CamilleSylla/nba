import React, { useState, createContext, ReactNode, useEffect } from "react";
import { Player } from "../types/players";

type PlayerContextType = [
  Player[],
  React.Dispatch<React.SetStateAction<Player[]>>,
  boolean,
];

export const PlayerContext = createContext<PlayerContextType>(
  {} as PlayerContextType,
);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [players, setPlayers] = useState<Player[]>([]);
  const [playersPending, setPlayersPending] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/players?per_page=100`, {
      method: "GET",
      headers: {
        Authorization: import.meta.env.VITE_API_KEY,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPlayers(data.data);
      })
      .catch((error) => {
        console.error("Error fetching players:", error);
      });
    setPlayersPending(false);
  }, []);

  return (
    <PlayerContext.Provider value={[players, setPlayers, playersPending]}>
      {children}
    </PlayerContext.Provider>
  );
}

export default PlayerProvider;
