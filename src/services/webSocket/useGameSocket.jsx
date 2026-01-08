import { useEffect, useRef, useState } from "react";
import { useSocket } from "./socketProvider";

/**
 * Hook que expone el estado y acciones de una partida a través de STOMP.
 *
 * Se suscribe a `/topic/game/{gameId}` para recibir actualizaciones globales
 * del estado de la partida y publica en `/app/game/{gameId}/state` para solicitar
 * el estado inicial.
 *
 * @param {string|number} gameId - Identificador de la partida.
 * @returns {{
 *   connected: boolean,
 *   gameState: any,
 *   backendEvents: any[],
 *   deleteGame: function,
 *   nextStep: function,
 *   chooseCoin: function,
 *   chooseCard: function,
 *   executeCharacterHability: function,
 *   executeDistrictHability: function,
 *   buildDistrict: function
 * }} Objeto con el estado de la partida y funciones para interactuar con el backend.
 */
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

        /**
         * Solicita al backend borrar la partida actual.
         * @returns {void}
         */
        deleteGame: () => publish(`/app/deleteGame/${gameId}`, {}),

        /**
         * Indica al backend avanzar al siguiente paso del juego.
         * @returns {void}
         */
        nextStep: () => publish("/app/nextStep", gameId.toString()),

        /**
         * Indica al backend que el jugador elige cara/moneda.
         * @returns {void}
         */
        chooseCoin: () => publish("/app/chooseCoin", gameId.toString()),

        /**
         * Indica al backend que el jugador elige una carta.
         * @returns {void}
         */
        chooseCard: () => publish("/app/chooseCard", gameId.toString()),

        /**
         * Ejecuta la habilidad de un personaje enviando el DTO necesario.
         * @param {object} dto - Datos de la habilidad de personaje.
         * @returns {void}
         */
        executeCharacterHability: (dto) => publish("/app/CharacterHability", dto),

        /**
         * Ejecuta la habilidad de un distrito enviando el DTO necesario.
         * @param {object} dto - Datos de la habilidad de distrito.
         * @returns {void}
         */
        executeDistrictHability: (dto) => publish("/app/DistrictHability", dto),

        /**
         * Solicita la construcción de un distrito enviando el DTO correspondiente.
         * @param {object} dto - Datos requeridos para construir el distrito.
         * @returns {void}
         */
        buildDistrict: (dto) => publish("/app/build", dto),
    };
}
