import { createContext, useContext } from "react";
import { useParams } from "react-router-dom";
import { useLobbySocket } from "../services/webSocket/useLobbySocket";

const LobbyContext = createContext(null);

export function LobbyProvider({ children }) {
    const lobbyState = useLobbySocket();

    return (
        <LobbyContext.Provider value={lobbyState}>
            {children}
        </LobbyContext.Provider>
    );
}

export function useLobby() {
    const ctx = useContext(LobbyContext);
    if (!ctx) {
        throw new Error("useLobby must be used inside LobbyProvider");
    }
    return ctx;
}
