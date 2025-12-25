export const GAME_EVENT_CONFIG = {

    NEXT_TURN: {
        type: "choice",
        label: "Es tu turno. ¿Qué quieres hacer?",
        actions: ["chooseCoin", "chooseCard"],
    },

    NEXT_ROUND: {
        type: "info",
    },

    CHARACTER_CARD_ELIMINATED: {
        type: "info",
    },

    CHARACTER_CARD_STEALED: {
        type: "info",
    },

    DISTRICT_CARD_DESTROYED: {
        type: "info",
    },

    HANDS_SWAPPED: {
        type: "info",
    },

    GAME_ENDED: {
        type: "info",
    },
    IMPOSIBLE_ACTION: {
        type: "private"
    },
    MESSAGE: {
        type: "info"
    }
};
