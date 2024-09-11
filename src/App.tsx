import PlayersProvider from "../contexts/players";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../layouts/Layout";
import "./index.css";
import Home from "./pages/Home";
import PlayerPage from "./pages/PlayerPage";
import { Chart } from "chart.js/auto";
import { CategoryScale } from "chart.js";

Chart.register(CategoryScale);

function App() {
  return (
    <>
      <PlayersProvider>
        <BrowserRouter basename={import.meta.env.DEV ? "/" : "/nba/"}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="player/:id" element={<PlayerPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </PlayersProvider>
    </>
  );
}

export default App;
