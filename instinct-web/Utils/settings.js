export function getScoutName() {
    return localStorage.getItem("scoutName") || "";
}

export function getDefaultAlliance() {
    return localStorage.getItem("defaultAlliance") || "blue";
}

export function getFieldFlipped() {
    return localStorage.getItem("fieldFlipped") === "true";
}

export function setScoutName(name) {
    localStorage.setItem("scoutName", name);
}

export function setDefaultAlliance(alliance) {
    localStorage.setItem("defaultAlliance", alliance);
}

export function setFieldFlipped(flipped) {
    localStorage.setItem(
        "fieldFlipped",
        String(flipped)
    );
}