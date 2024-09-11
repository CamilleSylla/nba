import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Player } from "../../types/players";
import { Line } from "react-chartjs-2";
import { UserIcon } from "@heroicons/react/24/solid";
import InfiniteSpinner from "../../components/InfiniteSpinner";

export default function PlayerPage() {
  const { id } = useParams();
  const [player, setPlayer] = useState<Player | null>(null);
  const [playerStats, setPlayerStats] = useState([]);
  const [playerInfosPending, setPlayerInfosPending] = useState<boolean>(true);
  const [playerStatsPending, setPlayerStatsPending] = useState<boolean>(true);

  const tableColumns = useMemo(() => {
    return playerStats.length > 0 ? Object.keys(playerStats?.[0]) : [];
  }, [playerStats]);

  // Table Data
  const statsAvergages = useMemo(() => {
    if (playerStats.length > 0 && tableColumns.length > 0) {
      const totals = {};
      playerStats.forEach((row) => {
        tableColumns.forEach((key) => {
          if (!totals[key]) {
            totals[key] = [Number(row[key])];
          } else {
            totals[key].push(Number(row[key]));
          }
        });
      });

      delete totals.date;
      const averages = {};
      for (const key of Object.keys(totals)) {
        const sum = totals[key].reduce(
          (acc: number, value: number) => acc + value,
          0,
        );
        averages[key] = Math.round((sum / totals[key].length) * 100) / 100;
      }
      return averages;
    } else {
      return null;
    }
  }, [playerStats, tableColumns]);

  // Line Graph Data
  const pointEvoData = useMemo(() => {
    if (playerStats.length > 0) {
      const result: {
        labels: string[];
        datasets: { label: string; data: string[] | number[] }[];
      } = {
        labels: [],
        datasets: [{ label: "Points", data: [] }],
      };
      playerStats.forEach((item) => {
        const { date, pts } = item;
        result.labels.push(date);
        result.datasets[0].data.push(pts);
      });
      return result;
    } else {
      return null;
    }
  }, [playerStats]);

  // Data fetching
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
          setPlayerInfosPending(false);
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
          setPlayerStatsPending(false);
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
        <div className="space-y-5">
          <div className="flex gap-2">
            <div className="flex-1">
              {!playerInfosPending ? (
                <PlayerCard player={player} />
              ) : (
                <InfiniteSpinner />
              )}
            </div>
            {/* Point Evolution Chart */}
            <div className="flex-1 border-2 border-slate-400 rounded-lg overflow-hidden p-5">
              {!playerStatsPending ? (
                !pointEvoData ? (
                  "No data.."
                ) : (
                  <Line data={pointEvoData} className="max-w-full h-11" />
                )
              ) : (
                <InfiniteSpinner />
              )}
            </div>
          </div>
          <div>
            {!playerStatsPending ? (
              !tableColumns || playerStats.length === 0 || !statsAvergages ? (
                "No data.."
              ) : (
                <StatsTable
                  columns={tableColumns}
                  data={playerStats}
                  totals={statsAvergages}
                />
              )
            ) : (
              <InfiniteSpinner />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

const PlayerCard = ({ player }: { player: Player }) => {
  return (
    <div className="flex gap-10 border-2 h-full border-slate-400 rounded-lg p-5 overflow-hidden">
      <UserIcon className="size-40 rounded-full overflow-hidden border-2 border-slate-400 object-cover" />
      <div className="flex-1 space-y-5">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold">
            {player.first_name} {player.last_name}{" "}
            <span className="block text-2xl">
              {player.position} - {player.team.full_name}
            </span>
            <span className="block text-lg">From {player.country}</span>
          </h1>
          <p className="font-bold text-6xl">#{player.jersey_number}</p>
        </div>
        <div className="flex justify-between w-2/3">
          {/* Draft Infos */}
          <ul>
            <li className="font-bold">
              College : <span className="font-normal">{player.college}</span>
            </li>
            <li className="font-bold">
              Draft year :{" "}
              <span className="font-normal">{player.draft_year}</span>
            </li>
            <li className="font-bold">
              round : <span className="font-normal">{player.draft_round}</span>,
              pick : <span className="font-normal">{player.draft_number}</span>
            </li>
          </ul>
          {/* Physical attributes */}
          <ul>
            <li className="font-bold">
              Height : <span className="font-normal">{player.height}</span>
            </li>
            <li className="font-bold">
              Weight : <span className="font-normal">{player.weight}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const StatsTable = ({
  columns,
  data,
  totals,
}: {
  columns: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  totals: any[];
}) => {
  return (
    <table className="w-full table-fixed border-collapse rounded-lg px-5 text-center overflow-hidden">
      <thead className="bg-gray-200">
        <tr>
          {columns.map((key: string, i: string | number) => {
            return (
              <th key={"tr" + key + i} className="h-14 text-xs">
                {key.toUpperCase()}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody className="">
        {data.map((stats, row) => {
          return (
            <tr className="border-b border-slate-400 hover:bg-slate-200 transition-all duration-300 ">
              {Object.keys(stats).map((key, i) => {
                return (
                  <td key={row + i + key}>
                    {key !== "date"
                      ? Math.round(data[row][key] * 100) / 100
                      : data[row][key]}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
      <tfoot className="bg-slate-200">
        <tr className="font-semibold">
          <td>Totals</td>
          {Object.keys(totals).map((key, i) => {
            return <td key={"totals" + key + i}>{totals[key]}</td>;
          })}
        </tr>
      </tfoot>
    </table>
  );
};
