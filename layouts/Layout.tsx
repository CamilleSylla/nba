import {
  HomeIcon,
  MagnifyingGlassIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { PlayerContext } from "../contexts/players";
import { Link, Outlet, useLocation } from "react-router-dom";

export default function Layout() {
  const { query, setQuery, players } = useContext(PlayerContext);
  const [displayCombobox, setDisplayCombobox] = useState<boolean>(true);
  const { pathname } = useLocation();
  const comboboxRef = useRef();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value.toLowerCase());
    setDisplayCombobox(true);
  };

  // Display 3 first matching player or less
  const comboboxPlayers = useMemo(() => {
    return query
      ? players.slice(players.length > 3 ? 2 : players.length - 1)
      : null;
  }, [query, players]);

  // remove query on every route path change
  useEffect(() => setQuery(""), [pathname]);

  // We dont want to display combobox on home page because of player listing
  const isHomePage = useMemo(() => pathname === "/", [pathname]);

  return (
    <div className="w-[90%] my-0 mx-auto py-10 space-y-5">
      <div className="flex items-center gap-5">
        <Link to={"/"}>
          <HomeIcon className="size-10" />
        </Link>
        <div className="flex items-center gap-5 w-1/2 p-2 rounded-lg border-2 border-slate-400 relative">
          <MagnifyingGlassIcon className="size-5" />
          <input
            type="text"
            value={query}
            placeholder="Search for a player"
            className="flex-1"
            onFocus={() => query && setDisplayCombobox(true)}
            onChange={handleInputChange}
            data-testid="search-input"
          />
          {/* Combobox displaying 3 are less matching players */}
          <ul
            ref={comboboxRef}
            className="absolute top-0 mt-10 bg-white max-h-96 overflow-y-scroll w-2/3"
            onMouseLeave={() => setDisplayCombobox(false)}
          >
            {comboboxPlayers &&
              displayCombobox &&
              !isHomePage &&
              comboboxPlayers.map((player, i) => {
                return (
                  // Combobox Cards to be displayed
                  <Link
                    to={"player/" + player.id}
                    key={player.id + i + "combo"}
                    data-testid={`player-link-${player.id}`}
                  >
                    <li className="flex gap-5 justify-between w-full p-5 border border-slate-200">
                      <UserIcon className="size-10" />
                      <div className="flex justify-between w-full">
                        <h3 className="text-lg font-bold">
                          {player.first_name} {player.last_name}{" "}
                          <span className="block text-base">
                            {player.position} - {player.team.full_name}
                          </span>
                          <span className="block text-sm">
                            From {player.country}
                          </span>
                        </h3>
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
      </div>
      <p>Stats only available for 2023 season</p>
      {/* Outlet is used instead of children prop because of react router dom */}
      <Outlet />
    </div>
  );
}
