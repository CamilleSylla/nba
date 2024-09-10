import PlayersProvider from "../contexts/players";
import List from "../components/List";
import "./index.css";

function App() {
  return (
    <>
      <PlayersProvider>
        <div className="w-3/4 my-0 mx-auto py-10">
          <List />
        </div>
      </PlayersProvider>
    </>
  );
}

export default App;
