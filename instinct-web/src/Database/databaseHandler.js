import { db } from "./database";

export async function saveMatchData(match) {
    console.log(match);
    await db.matchData.put(
        match
    )

}

export async function loadMatchData(matchid) {
    return await db.matchData.get(matchid);
    
}

export async function loadLastMatchID() {
    return await db.matchData.orderBy("id").last().then(lastMatch => lastMatch ? lastMatch.id : 0);

}