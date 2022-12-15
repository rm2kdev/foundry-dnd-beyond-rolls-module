export function generateFakeRollFromDDBRoll(ddbData){

    let ddbRoll = ddbData.rolls[0]
    console.log(ddbRoll)
    let myRollObject = generateRollObject(ddbRoll.diceNotationStr, ddbRoll.result.total);

    ddbRoll.diceNotation.set.forEach(set => {
        set.dice.forEach(die => {
            console.log(die)
            myRollObject.terms.push(generateRollTerm(Number(die.dieType.slice(1)), Number(die.dieValue)));
        })
    })

    let r = Roll.fromData(myRollObject);

    let chatOptions = {
        type: CONST.CHAT_MESSAGE_TYPES.ROLL,
        speaker: {alias: ddbData.context.name},
        flavor: ddbData.action + " " + ddbRoll.rollType + " " + ddbRoll.rollKind,
        rolls: [r],
        rollMode: game.settings.get("core", "rollMode"),
    };
    ChatMessage.create(chatOptions, {});

}
export async function generateFakeRoll() {

    let myRollObject = generateRollObject("My Roll Object", 15);
    myRollObject.terms.push(generateRollTerm(20, 5));
    myRollObject.terms.push(generateRollTerm(20, 5));
    myRollObject.terms.push(generateRollTerm(20, 5));

    let r = Roll.fromData(myRollObject);

    let chatOptions = {
        type: CONST.CHAT_MESSAGE_TYPES.ROLL,
        speaker: {alias: "D&D Beyond Dice"},
        flavor: "Hit Check Roll",
        rolls: [r],
        rollMode: game.settings.get("core", "rollMode"),
    };
    ChatMessage.create(chatOptions, {});

}

function generateRollObject(formula, total) {
    return {
        "class": "Roll",
        "options": {},
        "dice": [],
        "formula": formula,
        "terms": [],
        "total": total,
    }
}

function generateRollTerm(faces, result){
    return {
        "class": "Die",
        "options": {},
        "number": 1,
        "faces": faces,
        "modifiers": [],
        "results": [
        {
            "result": result,
            "active": true
        }
    ]
    }
}
