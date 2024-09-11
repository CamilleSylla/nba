import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Player } from "../../types/players";

export default function PlayerPage() {
  const { id } = useParams();
  const [player, setPlayer] = useState<Player | null>(null);
  const [playerStats, setPlayerStats] = useState([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_pending, setPending] = useState<boolean>(true);
  const tableColumns = useMemo(() => {
    return playerStats.length > 0 ? Object.keys(playerStats?.[0]) : [];
  }, [playerStats]);
  useEffect(() => {
    try {
      //fetching player profile data
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

      //fetching player stats data
      fetch(
        `${import.meta.env.VITE_API_BASE_URL}/stats?seasons[]=2023&player_ids[]=${id}`,
        {
          method: "GET",
          headers: {
            Authorization: import.meta.env.VITE_API_KEY,
          },
        },
      )
        .then((res) => res.json())
        .then(({ data }) => {
          const stats = data.reduce((acc, item) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { player, team, game, ...stats } = item;
            delete stats.id;
            if (!acc) {
              acc = [{ date: game.date, ...stats }];
            } else {
              acc = [...acc, { date: game.date, ...stats }];
            }
            return acc;
          }, []);
          setPlayerStats(stats);
        });
      setPending(false);
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
            <table className="table-fixed border-collapse rounded-lg px-5 text-center w-full overflow-hidden">
              <thead className="bg-gray-200">
                <tr>
                  {tableColumns.map((key: string, i: string | number) => {
                    return (
                      <th key={"tr" + key + i} className="h-14">
                        {key.toUpperCase()}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody className="">
                {playerStats.map((stats, row) => {
                  return (
                    <tr className="border-b border-slate-400 hover:bg-slate-200 transition-all duration-300 ">
                      {Object.keys(stats).map((key, i) => {
                        return (
                          <td key={row + i + key}>
                            {key !== "date"
                              ? Math.round(playerStats[row][key] * 100) / 100
                              : playerStats[row][key]}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        ) : (
          "pending..."
        )}
      </div>
    </>
  );
}
