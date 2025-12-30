import { BrowserRouter, Route, Routes } from "react-router-dom";
import Game from "./containers/Game";
import Home from "./containers/Home";
import Lobby from "./containers/Lobby";
import { LobbyProvider } from "./providers/lobbyProvider";
import { GameProvider } from "./providers/gameProvider";
import EndGameTable from "./containers/EndGameTable";

export default function App() {
  return (
    <BrowserRouter>
      <LobbyProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lobby/:id" element={
            <Lobby />
          } />
          <Route path="/game/:id" element={
            <GameProvider>
              <Game />
            </GameProvider>
          } />
          <Route path="/ranking" element={<EndGameTable />} />

        </Routes>
      </LobbyProvider>
    </BrowserRouter>
  )
}
