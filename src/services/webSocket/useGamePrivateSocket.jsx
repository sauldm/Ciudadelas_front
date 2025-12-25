import { useEffect, useState } from "react";
import { useSocket } from "./socketProvider";

export function useGamePrivateSocket(gameId) {
    const { connected, stompReady, subscribe, publish } = useSocket();

    const [privateInfo, setPrivateInfo] = useState(null);

    useEffect(() => {
        if (!connected || !stompReady || !gameId) return;

        const sub = subscribe(
            `/user/queue/game/${gameId}`,
            (message) => {
                setPrivateInfo(JSON.parse(message.body));
            }
        );
        publish(`/app/game/${gameId}/private`, {});


        return () => sub?.unsubscribe?.();
    }, [connected, stompReady, gameId]);


    return { privateInfo };
}
