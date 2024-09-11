import { PlayerContext } from "../../contexts/players";
import List from "../../components/List";
import { useContext } from "react";
export default function Home() {
  const { players } = useContext(PlayerContext);
  return (
    <>
      <List players={players} />
    </>
  );
}
