import { PlayerContext } from "../../contexts/players";
import List from "../../components/List";
import { useContext } from "react";
import InfiniteSpinner from "../../components/InfiniteSpinner";
export default function Home() {
  const { players, pending } = useContext(PlayerContext);
  return <>{pending ? <InfiniteSpinner /> : <List players={players} />}</>;
}
