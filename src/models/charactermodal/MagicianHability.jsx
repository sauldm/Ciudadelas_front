export default function MagicianHability({ onExecute, onClose, characterId, gameId, enemy }) {

    const targets = [
        { id: 0, name: "Mazo" },
        { id: enemy.id, name: enemy.nickName },
    ];

    return (
        <div className="space-y-4 text-center">
            <h3 className="text-game-highlight">Cmabiar cartas con</h3>

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
    );
}
