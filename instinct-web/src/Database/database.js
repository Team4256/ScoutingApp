import Dexie from "dexie";

export const db = new Dexie("Database");

db.version(1).stores({
    matchData: "id"
});