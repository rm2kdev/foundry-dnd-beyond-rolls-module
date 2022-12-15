import {DEBUG, SETTINGS} from "../settings/settings";
import {getCobaltSocketSessionFromCobaltToken} from "../helpers/ddbhelpers";
import {generateFakeRoll, generateFakeRollFromDDBRoll} from "../helpers/rollhelper";

let socket = {};

export function Connect(){

    if(!DEBUG.DISABLE_DDB_CALLS) {
        getSocketAndConnect();
    }else{
        ui.notifications.info(SETTINGS.MODULE_NAME + " - DDB Calls Disabled");

    }

}

function getSocketAndConnect() {
    console.log("use cobalt cookie to get cobalt socket token")
    getCobaltSocketSessionFromCobaltToken().then(result => {
        console.log("RESULT " + result.token)
        connectSocket(result.token);
    })
}

function connectSocket(socketToken) {

    let game_ID = game.settings.get(SETTINGS.MODULE_ID, SETTINGS.GAME_ID);
    let player_ID = game.settings.get(SETTINGS.MODULE_ID, SETTINGS.PLAYER_ID);
    let moduleEnabled = game.settings.get(SETTINGS.MODULE_ID, SETTINGS.ENABLED);
    if(moduleEnabled){
        ui.notifications.info(SETTINGS.MODULE_NAME + " - Attempting DDB Connection")
        socket = new WebSocket('wss://game-log-api-live.dndbeyond.com/v1?gameId=' + game_ID + '&userId=' + player_ID + '&stt=' + socketToken);

        socket.onopen = function(e) {
            console.log("DDB CONNNECTED")
            ui.notifications.info(SETTINGS.MODULE_NAME + " - Connected to DDB");

            //send heartbeat to server every 5 minutes.
            setInterval(() => {
                socket.send('{"data":"ping"}')
            }, 300000)
        };

        socket.onmessage = function(event) {
            if(event.data != "pong") {
                let ddbData = JSON.parse(event.data);
                if (ddbData.eventType == "dice/roll/fulfilled") {
                    generateFakeRollFromDDBRoll(ddbData.data);
                }
            }
            // ui.notifications.info(`[message] Data received from server: ${event.data}`);
        };

        socket.onclose = function(event) {
            console.log("DDB DISCONNECTED")
            console.log("DDB DISCONNECTED1")
            console.log("DDB DISCONNECTED2")
            console.log("DDB DISCONNECTED3")
            console.log("DDB DISCONNECTED4")
            console.log("DDB DISCONNECTED5")
            console.log("DDB DISCONNECTED6")
            console.log("DDB DISCONNECTED7")
            ui.notifications.warn(SETTINGS.MODULE_NAME + ' - Connection to D&D Beyond Lost, wait 5 seconds, reconnect');
            setTimeout(function(){
                getSocketAndConnect();
            }, 5000)
        };
    }


}
