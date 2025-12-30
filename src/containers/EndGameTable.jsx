import { useEffect, useState } from "react";
import getClassificationTable from "../services/api/classificationTableApi";
import { useNavigate } from "react-router-dom";

export const EndGameTable = () => {

    const [tableState, setTableState] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function getTable() {
            setTableState(await getClassificationTable());
        }
        getTable();
    }, [])

    if (!tableState) {
        return "cargando...";
    }
    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-900 text-white p-6">
            <h1 className="text-3xl font-bold mb-6">Clasificación Global</h1>

            <table className="w-full max-w-xl border border-gray-700 rounded-lg overflow-hidden">
                <thead className="bg-gray-800">
                    <tr>
                        <th className="px-4 py-2 text-left">Posición</th>
                        <th className="px-4 py-2 text-left">Jugador</th>
                        <th className="px-4 py-2 text-right">Wins</th>
                    </tr>
                </thead>
                <tbody>
                    {tableState.map((player, index) => (
                        <tr
                            key={player.nickName}
                            className={index === 0 ? "bg-yellow-700 font-bold" : "bg-gray-800"}
                        >
                            <td className="px-4 py-2">{index + 1}</td>
                            <td className="px-4 py-2">{player.nickName}</td>
                            <td className="px-4 py-2 text-right">{player.wins}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button
                onClick={() => navigate("/")}
                className="mt-8 px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded"
            >
                Continuar
            </button>
        </div>
    )
}

export default EndGameTable;