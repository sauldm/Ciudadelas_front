export async function getClassificationTable() {
    const res = await fetch("http://localhost:8080/getClassificationTable");
    if (!res.ok) {
        throw new Error("Error creando lobby");
    }
    return await res.json();
}

export default getClassificationTable;