import { useEffect, useRef, useState } from "react";
import GameEventModal from "../components/modal/gameEventModal";
import { loadShownEvents, saveShownEvents } from "../hooks/loadShownEvents";

export default function GameEventManager({
    events,
    onChooseCoin,
    onChooseCard,
    mustChoose,
    privateInfo,
    isPlayerTurn,
    setGameEnded
}) {
    const [queue, setQueue] = useState([]);
    const [current, setCurrent] = useState(null);

    const processedIds = useRef(loadShownEvents());

    useEffect(() => {
        if (!events || events.length === 0) return;

        const newEvents = events.filter(e => {
            if (!e?.id) return false;
            if (processedIds.current.has(e.id)) return false;

            processedIds.current.add(e.id);
            return true;
        });

        if (newEvents.length > 0) {
            saveShownEvents(processedIds.current);
            setQueue(q => [...q, ...newEvents]);
        }
    }, [events]);

    useEffect(() => {
        if (!current && queue.length > 0) {
            setCurrent(queue[0]);
            setQueue(q => q.slice(1));
        }
    }, [queue, current]);

    if (!current && !mustChoose) return null;

    const close = () => setCurrent(null);

    return (
        <GameEventModal
            event={current}
            onClose={close}
            onChooseCoin={() => {
                onChooseCoin();
                close();
            }}
            onChooseCard={() => {
                onChooseCard();
                close();
            }}
            mustChoose={mustChoose}
            privateInfo={privateInfo}
            isPlayerTurn={isPlayerTurn}
            setGameEnded={setGameEnded}
        />
    );
}
