import {SETTINGS, initializeSettings} from "./settings/settings";
import {Connect} from "./ddbclient/ddbclient";

Hooks.on("init", function() {

    initializeSettings();
});

Hooks.on("ready", function() {

    let moduleEnabled = game.settings.get(SETTINGS.MODULE_ID, SETTINGS.ENABLED);
    if(moduleEnabled){

        Connect();

    }

});
