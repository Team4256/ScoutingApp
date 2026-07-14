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
    

} 