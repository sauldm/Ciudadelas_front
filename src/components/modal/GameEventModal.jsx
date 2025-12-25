import { useEffect } from "react";
import Card from "../../models/Card";

export default function GameEventModal({
  event,
  onClose,
  onChooseCoin,
  onChooseCard,
  mustChoose,
  privateInfo,
  isPlayerTurn
}) {

  console.log(event?.events)

  useEffect(() => {
    if (event && event.events != "ARCHITECT" && event.events != "PRIVATE") {
      const t = setTimeout(onClose, 2000);
      return () => clearTimeout(t);
    }
  }, [event]);

  if (!event && !mustChoose) return null;

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" />

      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="modal-content text-center space-y-4">
          <h3 className="text-game-highlight">Evento</h3>

          <p className="text-lg text-game-text-secondary">
            {event?.message}
          </p>

          {!event && mustChoose && (
            <div className="flex gap-4 justify-center mt-4">
              <button onClick={onChooseCoin}>
                Elige monedas
              </button>
              <button onClick={onChooseCard}>
                Elige cartas
              </button>
            </div>
          )}
          {event?.events == "ARQUITECT" && isPlayerTurn && (
            <div className="flex gap-4 justify-center mt-4">
              {privateInfo.districtsCardsGained.map(d => (
                <Card key={d.id} card={d} />
              ))}
            </div>
          )}
          {event?.events == "PRIVATE" && (
            <div className="flex gap-4 justify-center mt-4">
              {privateInfo.districtsCardsGained.map(d => (
                <Card key={d.id} card={d} />
              ))}
              <button onClick={onClose}>x</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
