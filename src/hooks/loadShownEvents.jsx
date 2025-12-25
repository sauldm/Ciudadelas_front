const STORAGE_KEY = "shownGameEvents";

export function loadShownEvents() {
    try {
        return new Set(JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? "[]"));
    } catch {
        return new Set();
    }
};

export function saveShownEvents(set) {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify([...set]));
};

export default { loadShownEvents, saveShownEvents }