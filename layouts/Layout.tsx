import { HomeIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { PlayerContext } from "../contexts/players";
import { Link, Outlet, useLocation } from "react-router-dom";
import PlayerCard from "../components/PlayerCard";
/**
 * Renders application layout\
 * Containing search input with combobox\
 * Got interaction with ` PlayerContext `
 */
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
          {/* Combobox displaying 3 or less matching players */}
          <ul
            ref={comboboxRef}
            className="divide-y divide-solid absolute top-0 mt-10 bg-white max-h-96 overflow-y-scroll w-2/3"
            onMouseLeave={() => setDisplayCombobox(false)}
          >
            {comboboxPlayers &&
              displayCombobox &&
              !isHomePage &&
              comboboxPlayers.map((player) => {
                return (
                  // Combobox Cards to be displayed
                  <Link
                    to={"player/" + player.id}
                    key={
                      "combobox-" +
                      Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)
                    }
                    data-testid={`player-link-${player.id}`}
                  >
                    <div className="hover:bg-gray-200 transition-all duration-300">
                      <PlayerCard size="xs" player={player} />
                    </div>
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
