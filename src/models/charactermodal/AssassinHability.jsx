export default function AssassinHability({ onExecute, onClose, characterId, gameId }) {

    const characters = [
        { id: 2, name: "Ladrón" },
        { id: 3, name: "Mago" },
        { id: 5, name: "Inquisidor" },
        { id: 6, name: "Mercader" },
        { id: 7, name: "Arquitecto" },
        { id: 8, name: "Militar" },
    ];

    console.log(characterId)


    return (
        <div className="space-y-4 text-center">
            <h3 className="text-game-highlight">Asesinar personaje</h3>

            <div className="flex flex-col gap-2">
                {characters.map(c => (
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
                        <p>{c.name}</p>
                    </button>
                ))}
            </div>
        </div>
    );
}
