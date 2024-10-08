import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { GetStatsQuery, Player, Stats } from "../../types";
import { Line } from "react-chartjs-2";
import InfiniteSpinner from "../../components/InfiniteSpinner";
import PlayerCard from "../../components/PlayerCard";

export default function PlayerPage() {
  const { id } = useParams();
  const [player, setPlayer] = useState<Player | null>(null);
  const [playerStats, setPlayerStats] = useState<
    Array<{ date: string } | Stats>
  >([]);
  const [playerAverages, setPlayerAverages] = useState<Stats | null>(null);
  const [playerInfosPending, setPlayerInfosPending] = useState<boolean>(true);
  const [playerStatsPending, setPlayerStatsPending] = useState<boolean>(true);

  const tableColumns = useMemo(() => {
    return playerStats.length > 0 ? Object.keys(playerStats?.[0]) : [];
  }, [playerStats]);

  // Line Graph Data based on points scored each games
  const lineGraphData = useMemo(() => {
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
      //fetching player profile data based on player id from url param
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

      //fetching player stats data based on player id from url param
      fetch(
        `${import.meta.env.VITE_API_BASE_URL}/stats?per_page=100&postseason=false&seasons[]=2023&player_ids[]=${id}`,
        {
          method: "GET",
          headers: {
            Authorization: import.meta.env.VITE_API_KEY,
          },
        },
      )
        .then((res) => res.json())
        .then(({ data }: GetStatsQuery) => {
          const stats = data.reduce(
            (acc, item) => {
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              const { player, team, game, ...stats } = item;
              delete stats.id;
              if (!acc) {
                acc = [{ date: game.date, ...stats }];
              } else {
                acc = [...acc, { date: game.date, ...stats }];
              }
              return acc;
            },
            [] as Array<{ date: string } | Stats>,
          );
          setPlayerStats(stats);
          setPlayerStatsPending(false);
        });

      //fetching player stats averages data based on player id from url param
      fetch(
        `${import.meta.env.VITE_API_BASE_URL}/season_averages/?player_ids[]=${id}&season=2023`,
        {
          method: "GET",
          headers: {
            Authorization: import.meta.env.VITE_API_KEY,
          },
        },
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.data.length > 0) {
            // turn min into number
            const min = data.data[0].min.split(":");
            setPlayerAverages({ ...data.data[0], min: Number(min.join(".")) });
          }
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
            {/* Player Info Card */}
            <div className="flex-1">
              {!playerInfosPending && player ? (
                <div className="border-2 border-slate-400 rounded-lg overflow-hidden">
                  <PlayerCard player={player} size="lg" draft mensurations />
                </div>
              ) : (
                <InfiniteSpinner />
              )}
            </div>
            {/* Point Evolution Chart */}
            <div className="flex-1  ">
              {!playerStatsPending ? (
                !lineGraphData ? (
                  "No data.."
                ) : (
                  <Line
                    data={lineGraphData}
                    className="max-w-full h-11 border-2 border-slate-400 rounded-lg overflow-hidden p-5"
                  />
                )
              ) : (
                <InfiniteSpinner />
              )}
            </div>
          </div>
          <div>
            {!playerStatsPending ? (
              !tableColumns || playerStats.length === 0 || !playerAverages ? (
                "No data.."
              ) : (
                <>
                  <p className="italic">
                    This table represents {playerStats.length} game stats in our
                    database for season 2023
                  </p>
                  <div className="border-2 border-slate-400 rounded-lg p-5">
                    <div className="bg-white overflow-hidden max-h-96 overflow-y-scroll">
                      <DataTable
                        columns={tableColumns}
                        rows={playerStats}
                        averages={playerAverages}
                      />
                    </div>
                  </div>
                </>
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

/**
 *
 * Basic table component
 * @param {string[]} columns data render in head section of the table
 * @param {(Stats | { date: string })[]} rows table rows mapped and rendered in table body
 * @param {Stats} averages data render in footer section of the table
 */
const DataTable = ({
  columns,
  rows,
  averages,
}: {
  columns: string[];
  rows: (Stats | { date: string })[];
  averages: Stats;
}) => {
  return (
    <table className="w-full border-collapse text-center">
      <thead className="bg-gray-200 sticky table-fixed top-0 left-0">
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
      <tbody>
        {rows.map((row, index) => {
          return (
            <tr
              className="border-b border-slate-400 hover:bg-slate-200 transition-all duration-300"
              key={"row" + index}
            >
              {Object.keys(row).map((key, i) => {
                return (
                  <td key={"td" + i + key}>
                    {key !== "date"
                      ? Math.round(rows[index][key] * 100) / 100
                      : rows[index][key]}
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
          {/* slice to remove date prop at first element of the array */}
          {columns.slice(1).map((key: string, i: string | number) => {
            return (
              <th key={"tr" + key + i} className="h-14 text-xs">
                {Math.round(
                  Number(averages[key as keyof typeof averages]) * 100,
                ) / 100}
              </th>
            );
          })}
        </tr>
      </tfoot>
    </table>
  );
};
