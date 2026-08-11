import { db } from "./database";

export async function saveMatchData(match) {
    console.log("Saving Match:", match);
    await db.matchData.put({
        ...match,
        scoutName: localStorage.getItem("scoutName") || "",
        exported: false
    });

}

/* Alliance scouting */

export async function saveAllianceData(
    alliance
) {

    return await db.allianceData.add({

        ...alliance,

        exported: false

    });

}


export async function loadAllAllianceData() {

    return await db
        .allianceData
        .toArray();

}


export async function loadUnexportedAllianceData() {

    const alliances =
        await db.allianceData.toArray();

    return alliances.filter(
        alliance => alliance.exported === false
    );

}


export async function markAllianceAsExported(
    databaseIDs
) {

    await db.transaction(
        "rw",
        db.allianceData,

        async () => {

            for (
                const databaseID
                of databaseIDs
            ) {

                await db.allianceData.update(
                    databaseID,
                    {
                        exported: true
                    }
                );

            }

        }
    );

}

export async function updateCurrentMatch(match) {
    const matchID = Number(localStorage.getItem("matchID"));

    // Look for an existing match
    const existingMatch = await db.matchData
        .where("matchID")
        .equals(matchID)
        .first();

    if (existingMatch) {
        // Match already exists, so update it
        await db.matchData
            .where("matchID")
            .equals(matchID)
            .modify({
                team: match.team,
                alliance: match.alliance,
                autoPoints: match.autoPoints,
                teleopPoints: match.teleopPoints,
                teleopPassPoints: match.teleopPassPoints,
                climb: match.climb,
                notes: match.notes,
                trench: match.trench,
                broke: match.broke,
                autoStartPosition: match.autoStartPosition
            });

        console.log(`Updated Match ${matchID}`);
    } else {
        // Match doesn't exist, so create it
        await db.matchData.add({
            ...match,
            matchID: matchID,
            exported: false
        });

        console.log(`Created Match ${matchID}`);
    }
}

export async function loadMatchData(databaseID) {
    return await db.matchData.get(databaseID);
    
}

export async function loadMatchDataByMatchID(matchID) {
    return await db.matchData.where("matchID").equals(matchID).first();
    
}

export async function loadAllMatchData() {

    return await db.matchData.toArray();

}


export async function loadUnexportedMatches() {
    const matches = await db.matchData.toArray();

    return matches.filter(
        match => match.exported === false
    );
}


export async function markMatchesAsExported(databaseIDs) {

    await db.matchData
        .where("databaseID")
        .anyOf(databaseIDs)
        .modify({
            exported: true
        });

}


export async function deleteMatch(databaseID) {

    await db.matchData.delete(databaseID);

}

export async function debugAllMatches() {
    const matches = await db.matchData.toArray();

    console.log("ALL MATCHES IN INDEXEDDB:");

    matches.forEach(match => {
        console.log(
            "databaseID:",
            match.databaseID,
            "matchID:",
            match.matchID,
            "type:",
            typeof match.matchID,
            match
        );
    });

    return matches;
}