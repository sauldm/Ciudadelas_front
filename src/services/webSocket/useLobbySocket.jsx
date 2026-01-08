import { useEffect, useRef, useState } from "react";
import { useSocket } from "./socketProvider";
import { useParams } from "react-router-dom";

/**
 * Hook que maneja la lógica de lobbies y jugadores mediante STOMP.
 *
 * - Se suscribe a `/topic/lobbies` para recibir la lista de lobbies.
 * - Permite fijar el `lobbyId` actual y escuchar `/topic/players/{lobbyId}`
 *   y `/topic/gameCreated/{lobbyId}` para recibir actualizaciones.
 *
 * @returns {{
 *   connected: boolean,
 *   game: any,
 *   setLobbyId: function,
 *   lobbyId: string|null,
 *   lobbies: Array<string>,
 *   players: Array<string>,
 *   unjoinLobby: function
 * }} API pública del hook para uso en componentes.
 */
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
        /**
         * Solicita abandonar un lobby.
         * @param {object} dto - Datos necesarios para abandonar el lobby (por ejemplo `{ id, nickName }`).
         * @returns {void}
         */
        unjoinLobby: (dto) => publish("/app/unjoinLobby", dto),
    };
}

export default useLobbySocket;
