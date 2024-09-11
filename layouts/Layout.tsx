import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { ReactNode, useContext } from "react";
import { PlayerContext } from "../contexts/players";

export default function Layout({ children }: { children: ReactNode }) {
  const { setQuery } = useContext(PlayerContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value.toLowerCase());
  };
  return (
    <div className="w-3/4 my-0 mx-auto py-10 space-y-5">
      <div className="flex items-center gap-5 w-1/2 p-2 rounded-lg border-2 border-slate-400">
        <MagnifyingGlassIcon className="size-5" />
        <input type="text" className="flex-1" onChange={handleChange} />
      </div>
      <div>{children}</div>
    </div>
  );
}
