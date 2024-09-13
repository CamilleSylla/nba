import { PlayerContext } from "../../contexts/players";
import { useContext } from "react";
import InfiniteSpinner from "../../components/InfiniteSpinner";
import PlayerCard from "../../components/PlayerCard";
import { Link } from "react-router-dom";
export default function Home() {
  const { players, pending } = useContext(PlayerContext);
  return (
    <>
      {pending ? (
        <InfiniteSpinner />
      ) : (
        <ul className="grid grid-cols-3 gap-4">
          {players.map((player) => (
            <div className="border-2 border-slate-400 rounded-lg overflow-hidden hover:bg-slate-400 transition-all duration-300">
              <Link to={`player/${player.id}`} key={player.id}>
                <PlayerCard player={player} />
              </Link>
            </div>
          ))}
        </ul>
      )}
    </>
  );
}
