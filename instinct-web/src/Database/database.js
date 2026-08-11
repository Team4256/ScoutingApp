import Dexie from "dexie";

export const db = new Dexie("Database");

db.version(6).stores({
    matchData: "++databaseID, exported, matchID",
    allianceData: "++databaseID, matchID, exported"
});