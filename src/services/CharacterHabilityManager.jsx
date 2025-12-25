import AssassinHability from "../models/charactermodal/AssassinHability";
import MagicianHability from "../models/charactermodal/MagicianHability";
import MilitarHability from "../models/charactermodal/MilitarHability";
import ThiefHability from "../models/charactermodal/ThiefHability";


export function CharacterHabilityManager({
    characterId,
    executeCharacterHability,
    onClose,
    gameId,
    deckCardsBuilt,
    enemy
}) {

    const renderHability = () => {
        switch (characterId) {

            case 1:
                return (
                    <AssassinHability
                        onExecute={executeCharacterHability}
                        onClose={onClose}
                        gameId={gameId}
                        characterId={characterId}
                    />
                );

            case 2:
                return (
                    <ThiefHability
                        onExecute={executeCharacterHability}
                        onClose={onClose}
                        gameId={gameId}
                        characterId={characterId}

                    />
                );

            case 3:
                return (
                    <MagicianHability
                        onExecute={executeCharacterHability}
                        onClose={onClose}
                        gameId={gameId}
                        characterId={characterId}
                        enemy={enemy}
                    />
                );

            case 8:
                return (
                    <MilitarHability
                        onExecute={executeCharacterHability}
                        onClose={onClose}
                        gameId={gameId}
                        characterId={characterId}
                        deckCardsBuilt={deckCardsBuilt}
                    />
                );

            default:
                return (
                    onClose()
                );
        }
    };

    return (
        <>
            <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" />

            <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div className="modal-content w-[400px]">
                    {renderHability()}
                </div>
            </div>
        </>
    );
}

export default CharacterHabilityManager;
