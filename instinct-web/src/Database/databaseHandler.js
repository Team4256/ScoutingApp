import { db } from "./database";

export async function saveMatchData(points) {
    await db.matchData.put({
        id: 1,
        points: points,
    })

}

export async function loadMatchData() {
    return await db.matchData.get(1);
    
}