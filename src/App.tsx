import PlayersProvider from "../contexts/players";
import List from "../components/List";
import Layout from "../layouts/Layout";
import "./index.css";

function App() {
  return (
    <>
      <PlayersProvider>
        <Layout>
          <List />
        </Layout>
      </PlayersProvider>
    </>
  );
}

export default App;
