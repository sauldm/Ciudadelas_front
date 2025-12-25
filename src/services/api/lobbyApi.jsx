export async function createLobbyHttp() {
    const res = await fetch("http://localhost:8080/api/lobbies", {
        method: "POST",
    });

    if (!res.ok) {
        throw new Error("Error creando lobby");
    }

    return await res.json();
}

export async function joinLobbyHttp( id, nickName ) {
    const res = await fetch("http://localhost:8080/api/joinLobby", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, nickName }),
    });

    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || "Error al unirse al lobby");
    }

    const contentType = res.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
        return await res.json();
    }
    return null;
}

export async function createGameHttp(id, players) {
    const res = await fetch("http://localhost:8080/api/createGame", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, players }),
    });

    if (!res.ok) {
        throw new Error("Error creando game");
    }

    return await res.json();
}
export default { createLobbyHttp, joinLobbyHttp, createGameHttp }
