export default function MilitarHability({ onExecute, onClose, characterId, gameId, deckCardsBuilt }) {


    return (
        <div className="space-y-4 text-center">
            <h3 className="text-game-highlight">Destruir carta</h3>

            <div className="flex flex-col gap-2">
                {deckCardsBuilt.map(c => (
                    <button
                        key={c.id}
                        onClick={() => {
                            onExecute({
                                characterId: characterId,
                                gameId: gameId,
                                targetId: c.id
                            });
                            onClose();
                        }}
                    >
                        {c.name}
                        {" " + c.gold + " -> " + (parseInt(c.gold) + 1)}
                    </button>
                ))}
            </div>
        </div>
    );
}
