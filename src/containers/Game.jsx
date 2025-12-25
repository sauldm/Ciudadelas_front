import { useEffect, useRef, useState } from "react";
import { useSocket } from "../services/webSocket/socketProvider";
import mazo from "../utils/images/mazo.png";
import fondo from "../utils/images/fondo.jpg";
import Card from "../models/Card";
import GameEventManager from "../services/GameEventManager";
import { useGame } from "../providers/gameProvider";
import CharacterHabilityManager from "../services/CharacterHabilityManager";
import { scrollLeft, scrollRight } from "../utils/horizontalScroll";
import ScrollableCardRow from "../components/ScrollableCardRow";


const Game = () => {
    const {
        gameState,
        events,
        privateInfo,
        chooseCoin,
        chooseCard,
        nextStep,
        executeCharacterHability,
        buildDistrict,
        executeDistrictHability
    } = useGame();

    const { nick } = useSocket();

    const [enemy, setEnemy] = useState(null);
    const [player, setPlayer] = useState(null);
    const [isPlayerTurn, setIsPlayerTurn] = useState(false);
    const [showCharacterHability, setShowCharacterHability] = useState(false);
    const [canBuild, setCanBuild] = useState(false);
    const [characterTurn, setCharacterTurn] = useState(null);
    const builtAreaRef = useRef(null);
    const handAreaRef = useRef(null);
    const buildAreaRef = useRef(null);
    const [hasOverflow, setHasOverflow] = useState(false);



    useEffect(() => {
        if (!gameState?.playerCommonInfoDTOS || !nick) return;

        setEnemy(
            gameState.playerCommonInfoDTOS.find(p => p.nickName !== nick) ?? null
        );

        setPlayer(
            gameState.playerCommonInfoDTOS.find(p => p.nickName === nick) ?? null
        );
    }, [gameState, nick]);

    useEffect(() => {
        if (!privateInfo || !gameState) return;

        setIsPlayerTurn(
            privateInfo.characterCards.some(
                c => c.id === gameState.characterTurnId
            )
        );
        const characterTurn =
            player?.characterCardsPlayed?.find(
                c => c.id === gameState.characterTurnId
            ) ??
            enemy?.characterCardsPlayed?.find(
                c => c.id === gameState.characterTurnId
            ) ??
            null;

        setCharacterTurn(characterTurn);

    }, [privateInfo, gameState]);


    console.log(gameState)
    console.log(events)
    console.log(privateInfo?.districtsCardsGained)


    const mustChoose = isPlayerTurn && !gameState?.turnCompleted;

    const canUseCharacterHability = isPlayerTurn && !gameState?.characterHabilityUsed;

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                canBuild &&
                builtAreaRef.current &&
                !builtAreaRef.current.contains(e.target)
            ) {
                setCanBuild(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [canBuild]);


    const ScrollButtons = ({ scrollRef }) => (
        <>
            <button
                onClick={() => scrollLeft(scrollRef)}
                className="absolute left-1 top-1/2 -translate-y-1/2 z-10
                 bg-black/60 hover:bg-black text-white
                 w-8 h-8 rounded-full shadow-lg"
            >
                ◀
            </button>

            <button
                onClick={() => scrollRight(scrollRef)}
                className="absolute right-1 top-1/2 -translate-y-1/2 z-10
                 bg-black/60 hover:bg-black text-white
                 w-8 h-8 rounded-full shadow-lg"
            >
                ▶
            </button>
        </>
    );



    if (!gameState || !privateInfo || !player || !enemy) {
        return (
            <div className="w-screen h-screen flex items-center justify-center bg-game-bg">
                Cargando tablero...
            </div>
        );
    }

    return (
        <div className="w-screen h-screen bg-game-bg overflow-hidden parent-perspective">
            <div className="w-full h-full px-4 pt-4 pb-6 md:px-6 md:pt-6 md:pb-8">

                <GameEventManager
                    events={events}
                    onChooseCoin={chooseCoin}
                    onChooseCard={chooseCard}
                    mustChoose={mustChoose}
                    privateInfo={privateInfo}
                    isPlayerTurn={isPlayerTurn}
                />

                {showCharacterHability && (
                    <CharacterHabilityManager
                        onClose={() => setShowCharacterHability(false)}
                        executeCharacterHability={executeCharacterHability}
                        gameId={gameState.id}
                        characterId={gameState.characterTurnId}
                        deckCardsBuilt={enemy.districtsBuilt}
                        enemy={enemy}
                    />
                )}
                <div className="grid grid-cols-3 items-center">
                    <h2 className="text-white text-left">
                        {player.gold} 🪙
                    </h2>

                    <h3 className="text-white text-center">
                        {player.nickName}
                    </h3>

                    <h3 className="text-white text-right">
                        {characterTurn?.name}
                    </h3>
                </div>




                <div
                    className="w-full h-full rounded-xl shadow-2xl overflow-hidden bg-no-repeat bg-center bg-cover"
                    style={{ backgroundImage: `url(${fondo})` }}
                >
                    <div className="tablero">
                        {Array.from({ length: 12 }).map((_, index) => (
                            <div key={index} className="celda border">

                                {index === 1 && enemy.numberDistrictsInHand}

                                {index === 2 && (
                                    <div>
                                        {enemy.characterCardsPlayed.map(c => (
                                            <Card key={c.id} card={c} />
                                        ))}
                                    </div>
                                )}

                                {index === 4 && (
                                    <ScrollableCardRow>
                                        {enemy?.districtsBuilt.map(d => (
                                            <Card key={d.id} card={d} />
                                        ))}
                                    </ScrollableCardRow>

                                )}

                                {index === 3 && (
                                    <img src={mazo} alt="Mazo" className="imagen-centro" />
                                )}

                                {index === 7 && (
                                    <ScrollableCardRow>
                                        {player.districtsBuilt.map(d => (
                                            <Card
                                                key={d.id}
                                                card={d}
                                                isBuilt
                                                executeDistrictHability={executeDistrictHability}
                                                gameId={gameState.id}
                                                districtHabilityUsed={gameState.districtHabilityUsed}
                                                isPlayerTurn={isPlayerTurn}
                                            />
                                        ))}
                                    </ScrollableCardRow>
                                )}



                                {index === 9 && (
                                    <div className="flex gap-4 flex-wrap justify-center">
                                        {privateInfo.characterCards.map(c => (
                                            <Card key={c.id} card={c} className="card" />
                                        ))}
                                    </div>
                                )}

                                {index === 10 && (
                                    <ScrollableCardRow>
                                        {privateInfo.districtsInHand.map(d => (
                                            <Card
                                                key={d.id}
                                                card={d}
                                                canBuild={canBuild}
                                                className="card"
                                                onBuild={() => {
                                                    buildDistrict({
                                                        gameId: gameState.id,
                                                        districtId: d.id,
                                                        characterId: gameState.characterTurnId,
                                                    });
                                                    setCanBuild(false);
                                                }}
                                            />
                                        ))}
                                    </ScrollableCardRow>
                                )}


                                {index === 11 && (

                                    <div className="grid grid-cols-1 gap-4">
                                        <button
                                            disabled={!isPlayerTurn}
                                            onClick={() => setCanBuild(!canBuild)}
                                        >
                                            Comprar distrito
                                        </button>
                                        <button
                                            disabled={!canUseCharacterHability}
                                            onClick={() => setShowCharacterHability(true)}
                                        >
                                            Habilidad personaje
                                        </button>
                                        <button
                                            disabled={!isPlayerTurn}
                                            onClick={nextStep}
                                        >
                                            Terminar turno
                                        </button>
                                    </div>
                                )}

                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Game;
