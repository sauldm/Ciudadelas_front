import { useEffect, useRef, useState } from "react";
import { useSocket } from "./socketProvider";

export function useGameSocket(gameId) {
    const { connected, publish, subscribe, stompReady } = useSocket();

    const [gameState, setGameState] = useState(null);
    const [backendEvents, setBackendEvents] = useState([]);


    useEffect(() => {
        if (!connected || !stompReady || !gameId) return;

        const sub = subscribe(`/topic/game/${gameId}`, (message) => {
            const data = JSON.parse(message.body);

            if (data?.gameCommonInfoDTO) {
                setGameState(data.gameCommonInfoDTO);
            }

            if (Array.isArray(data?.eventsMessagesDTO)) {
                setBackendEvents(data.eventsMessagesDTO);
            }
        });

        publish(`/app/game/${gameId}/state`, {});

        return () => sub?.unsubscribe?.();
    }, [connected, stompReady, gameId, publish, subscribe]);

    return {
        connected,
        gameState,
        backendEvents,

        deleteGame: () =>
            publish(`/app/deleteGame/${gameId}`, {}),

        nextStep: () =>
            publish("/app/nextStep", gameId.toString()),

        chooseCoin: () =>
            publish("/app/chooseCoin", gameId.toString()),

        chooseCard: () =>
            publish("/app/chooseCard", gameId.toString()),

        executeCharacterHability: (dto) =>
            publish("/app/CharacterHability", dto),

        executeDistrictHability: (dto) =>
            publish("/app/DistrictHability", dto),

        buildDistrict: (dto) =>
            publish("/app/build", dto),
    };
}
