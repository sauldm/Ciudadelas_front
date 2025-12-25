// src/socket/SocketProvider.jsx
import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

const SocketCtx = createContext(null);

export function SocketProvider({ children }) {
    const clientRef = useRef(null);

    const [nick, setNick] = useState(() => localStorage.getItem("nick") || "");
    const [connected, setConnected] = useState(false);
    const [stompReady, setStompReady] = useState(false);

    useEffect(() => {
        if (!nick) return;

        const socket = new SockJS("http://localhost:8080/ws");

        const client = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 4000,
            connectHeaders: { login: nick },

            onConnect: () => {
                setConnected(true);

                setTimeout(() => setStompReady(true), 0);
            },

            onDisconnect: () => {
                setConnected(false);
                setStompReady(false);
            },

            onStompError: (frame) => {
                console.error("STOMP error", frame);
            },
        });

        clientRef.current = client;
        client.activate();

        return () => {
            setStompReady(false);
            setConnected(false);
            client.deactivate();
            clientRef.current = null;
        };
    }, [nick]);

    const api = useMemo(() => {
        const publish = (destination, body) => {
            const c = clientRef.current;
            if (!c || !c.connected) return;
            c.publish({
                destination,
                body: JSON.stringify(body ?? {}),
            });
        };

        const subscribe = (destination, handler) => {
            const c = clientRef.current;
            if (!c || !c.connected) return null;
            return c.subscribe(destination, handler);
        };

        const setNickAndConnect = (value) => {
            const clean = (value ?? "").trim();
            if (!clean) return;
            localStorage.setItem("nick", clean);
            setNick(clean);
        };

        return {
            nick,
            connected,
            stompReady,
            publish,
            subscribe,
            setNickAndConnect,
        };
    }, [nick, connected, stompReady]);

    return (
        <SocketCtx.Provider value={api}>
            {children}
        </SocketCtx.Provider>
    );
}

export const useSocket = () => useContext(SocketCtx);
