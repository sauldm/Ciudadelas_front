import { useEffect, useRef, useState } from "react";
import { useSocket } from "./socketProvider";
import { useParams } from "react-router-dom";

export function useLobbySocket() {
    const { connected: wsConnected, publish, subscribe } = useSocket();

    const [lobbies, setLobbies] = useState([]);
    const [players, setPlayers] = useState([]);
    const [lobbyId, setLobbyId] = useState(null);
    const [game, setGame] = useState(null);


    const fetchedLobbiesRef = useRef(false);

    useEffect(() => {
        if (!wsConnected) return;

        const sub = subscribe("/topic/lobbies", (message) => {
            try {
                setLobbies(JSON.parse(message.body));
            } catch { }
        });

        if (!fetchedLobbiesRef.current) {
            fetchedLobbiesRef.current = true;
            publish("/app/getLobbies", {});
        }

        return () => sub?.unsubscribe?.();
    }, [wsConnected, subscribe, publish]);

    useEffect(() => {
        if (!wsConnected || !lobbyId) return;

        const subPlayers = subscribe(`/topic/players/${lobbyId}`, (message) => {
            try {
                setPlayers(JSON.parse(message.body));
            } catch { }
        });
        return () => subPlayers?.unsubscribe?.();
    }, [wsConnected, lobbyId, subscribe]);


    useEffect(() => {
        if (!wsConnected || !lobbyId) return;

        const subPlayers = subscribe(`/topic/gameCreated/${lobbyId}`, (message) => {
            try {
                setGame(JSON.parse(message.body));
            } catch { }
        });
        return () => subPlayers?.unsubscribe?.();
    }, [wsConnected, lobbyId, subscribe]);

    return {
        connected: wsConnected,
        game,
        setLobbyId,
        lobbyId,
        lobbies,
        players,
        unjoinLobby: (dto) => publish("/app/unjoinLobby", dto),
    };
}

export default useLobbySocket;
