import { Link } from "react-router-dom";
import { Player } from "../types/players";
import { UserIcon } from "@heroicons/react/24/solid";

export default function List({ players }: { players: Player[] }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {players.map((player) => (
        <Link to={`player/${player.id}`} key={player.id}>
          <ListPlayerCard player={player} />
        </Link>
      ))}
    </div>
  );
}

export function ListPlayerCard({ player }: { player: Player }) {
  return (
    <>
      <div className="flex gap-4 p-5 border-2 border-slate-400 rounded-lg hover:shadow-lg transition-all duration-200">
        <UserIcon className=" size-14 rounded-full" />
        <div className="w-full space-y-2.5">
          <div className="flex justify-between">
            <h3 className="font-bold">
              {player.first_name} {player.last_name}
            </h3>
            <span className="block text-2xl font-bold">
              #{player.jersey_number}{" "}
            </span>
          </div>
          <span>Pos : {player.position}</span>
          <h4>Height : {player.height}</h4>
          <h5> {player.team.full_name} </h5>
        </div>
      </div>
    </>
  );
}
