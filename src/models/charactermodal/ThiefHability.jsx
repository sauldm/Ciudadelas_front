export default function ThiefHability({ onExecute, onClose, characterId, gameId }) {

    const targets = [
        { id: 3, name: "Mago" },
        { id: 4, name: "Rey" },
        { id: 5, name: "Inquisidor" },
        { id: 6, name: "Mercader" },
        { id: 7, name: "Arquitecto" },
        { id: 8, name: "Militar" },
    ];

    return (
        <div className="space-y-4 text-center">
            <h3 className="text-game-highlight">Robar a personaje</h3>

            <div className="flex flex-col gap-2">

                {targets.map(t => (
                    <button
                        key={t.id}
                        onClick={() => {
                            onExecute({
                                characterId: characterId,
                                gameId: gameId,
                                targetId: t.id
                            });
                            onClose();
                        }}
                    >
                        {t.name}
                    </button>
                ))}
            </div>
        </div>
    );
}
