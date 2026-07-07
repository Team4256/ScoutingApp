import Dexie from "dexie";

export const db = new Dexie("Database");

db.version(2).stores({
    matchData: "id"
});