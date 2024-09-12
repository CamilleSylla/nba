import React, {
  useState,
  createContext,
  ReactNode,
  useEffect,
  useMemo,
} from "react";
import { Player, PlayerContextType } from "../types";

// Create a context to share state and hooks everywhere inside the app
export const PlayerContext = createContext<PlayerContextType>(
  {} as PlayerContextType,
);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [players, setPlayers] = useState<Player[]>([]);
  const [playersPending, setPlayersPending] = useState(true);
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    // fetching player data from api on app init
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

  // filtering player data by query value
  const filteredPlayer = useMemo(
    () =>
      players
        .filter((player) => {
          if (
            player.first_name.toLowerCase().includes(query) ||
            player.last_name.toLowerCase().includes(query)
          )
            return player;
        })
        .sort((a, b) => a.first_name.localeCompare(b.first_name)),
    [query, players],
  );

  return (
    <PlayerContext.Provider
      value={{
        players: filteredPlayer,
        pending: playersPending,
        query,
        setQuery,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export default PlayerProvider;
