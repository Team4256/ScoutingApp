import { db } from "./database";

export async function saveMatchData(match) {
    await db.matchData.put({
        id: 1,
        ...match
    })

}

export async function loadMatchData() {
    return await db.matchData.get(1);
    
}