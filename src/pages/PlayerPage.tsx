import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Player } from "../../types/players";

export default function PlayerPage() {
  const { id } = useParams();
  const [player, setPlayer] = useState<Player | null>(null);
  // const [playerStats, setPlayerStats] = useState({});
  useEffect(() => {
    try {
      fetch(`${import.meta.env.VITE_API_BASE_URL}/players/${id}`, {
        method: "GET",
        headers: {
          Authorization: import.meta.env.VITE_API_KEY,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setPlayer(data.data);
        });
    } catch (error) {
      console.error(error);
      throw new Error(
        "Something occured during data fetching, please comeback later",
      );
    }
  }, [id]);
  return (
    <>
      <div>
        {player ? (
          <>
            <h1>
              {player.first_name} {player.last_name}
            </h1>
          </>
        ) : (
          "pending..."
        )}
      </div>
    </>
  );
}
