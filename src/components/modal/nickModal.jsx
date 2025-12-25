// src/components/NickModal.jsx
import { useState } from "react";
import { useSocket } from "../../services/webSocket/socketProvider";

export default function NickModal() {
    const { setNickAndConnect } = useSocket();
    const [value, setValue] = useState("");

    const submit = () => {
        const clean = value.trim();
        if (!clean) return;
        setNickAndConnect(clean);
    };

    return (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4">
            <div className="w-full max-w-md rounded-xl bg-white p-6 space-y-4">
                <h2 className="text-xl font-semibold">Elige tu nick</h2>
                <input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Tu nombre"
                    autoFocus
                    onKeyDown={(e) => e.key === "Enter" && submit()}
                    className="w-full"
                />
                <button onClick={submit} disabled={!value.trim()} className="w-full">
                    Entrar
                </button>
            </div>
        </div>
    );
}
