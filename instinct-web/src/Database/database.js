import Dexie from "dexie";

export const db = new Dexie("Database");

db.version(5).stores({
    matchData: "++databaseID, exported, matchID"
});