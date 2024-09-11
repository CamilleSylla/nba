import { MagnifyingGlassIcon, UserIcon } from "@heroicons/react/24/solid";
import { useContext, useEffect, useMemo } from "react";
import { PlayerContext } from "../contexts/players";
import { Link, Outlet, useLocation } from "react-router-dom";

export default function Layout() {
  const { query, setQuery, players } = useContext(PlayerContext);
  const { pathname } = useLocation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value.toLowerCase());
  };

  const searchPlayers = useMemo(() => {
    return query
      ? players.slice(players.length > 3 ? 2 : players.length - 1)
      : null;
  }, [query, players]);

  useEffect(() => setQuery(""), [pathname]);

  const isHomePage = useMemo(() => pathname === "/", [pathname]);

  return (
    <div className="w-[90%] my-0 mx-auto py-10 space-y-5">
      <div className="flex items-center gap-5 w-1/2 p-2 rounded-lg border-2 border-slate-400 relative">
        <MagnifyingGlassIcon className="size-5" />
        <input
          type="text"
          value={query}
          className="flex-1"
          onChange={handleChange}
        />
        <ul className="absolute top-0 mt-10 bg-white max-h-96 overflow-y-scroll w-2/3">
          {searchPlayers &&
            !isHomePage &&
            searchPlayers.map((player, i) => {
              return (
                <Link to={"player/" + player.id} key={player.id + i + "combo"}>
                  <li className="flex gap-5 justify-between w-full p-5 border border-slate-200">
                    <UserIcon className="size-10" />
                    <div className="flex justify-between w-full">
                      <h1 className="text-lg font-bold">
                        {player.first_name} {player.last_name}{" "}
                        <span className="block text-base">
                          {player.position} - {player.team.full_name}
                        </span>
                        <span className="block text-sm">
                          From {player.country}
                        </span>
                      </h1>
                      <p className="font-bold text-xl">
                        #{player.jersey_number}
                      </p>
                    </div>
                  </li>
                </Link>
              );
            })}
        </ul>
      </div>
      <p>Stats only available for 2023 season</p>
      <Outlet />
    </div>
  );
}
