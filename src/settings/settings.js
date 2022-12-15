import {Connect} from "../ddbclient/ddbclient";

export const DEBUG = {
    DISABLE_DDB_CALLS: false
}

export const SETTINGS = {
    MODULE_NAME: 'D&D Beyond Rolls Module',
    MODULE_ID: 'dd-beyond-rolls-module',
    PROXY_URL: 'cobaltProxy',
    COBALT_COOKIE: 'cobaltCookie',
    GAME_ID: 'gid',
    PLAYER_ID: 'pid',
    ENABLED: 'moduleEnabled',
}

export function initializeSettings(){
    game.settings.register(SETTINGS.MODULE_ID, SETTINGS.PROXY_URL, {
        name: 'Cobalt Proxy Url',
        hint: 'Url of the locally running companion app. (See instructions on github)',
        scope: 'client',
        config: true,
        type: String,
        default: 'http://localhost:8745'
    });

    game.settings.register(SETTINGS.MODULE_ID, SETTINGS.COBALT_COOKIE, {
        name: 'Cobalt Cookie',
        hint: 'D&D Beyond Cobalt Cookie used for authentication with DDB.',
        scope: 'client',
        config: true,
        type: String,
        default: ''
    });

    game.settings.register(SETTINGS.MODULE_ID, SETTINGS.GAME_ID, {
        name: 'Game ID',
        hint: 'D&D Beyond Game ID used to define which campaign you are connecting in.',
        scope: 'client',
        config: true,
        type: String,
        default: ''
    });

    game.settings.register(SETTINGS.MODULE_ID, SETTINGS.PLAYER_ID, {
        name: 'Player ID',
        hint: 'D&D Beyond Player ID used to define which player is observing rolls.',
        scope: 'client',
        config: true,
        type: String,
        default: ''
    });

    game.settings.register(SETTINGS.MODULE_ID, SETTINGS.ENABLED, {
        name: 'Enable Module',
        hint: 'When enabled module will attempt connection with DDB.',
        scope: 'client',
        config: true,
        type: Boolean,
        default: false,
        onChange: (value) => { // value is the new value of the setting
            if(value){
                Connect();
            }
        },
    });

    game.settings.registerMenu(SETTINGS.MODULE_ID, "mySettingsMenu", {
        name: "Please Donate",
        label: "DONATE HERE",      // The text label used in the button
        hint: "This is my first plugin for foundry, a love letter and thank you to everyone else who has spent the time to go through this process to extend foundry for me and my friends so that we could play D&D in the coolest ways, I have an ungodly amount of time learning foundry development to build this, understanding dnd beyond protocols and debugging and testing this plugin, please dear god buy me a beer if this is useful for you <3",
        icon: "fas fa-donate",               // A Font Awesome icon used in the submenu button
        type: MySubmenuApplicationClass,   // A FormApplication subclass
        restricted: true,                   // Restrict this submenu to gamemaster only?
        config: true,
    });

}

class MySubmenuApplicationClass extends FormApplication {

    getData() {
        window.open("https://www.paypal.me/rm2kdev");
    }

}


export function disableModule(reason){
    ui.notifications.error('DISABLED: ' + SETTINGS.MODULE_NAME + ', ' + reason);
    game.settings.set(SETTINGS.MODULE_ID, SETTINGS.ENABLED, false);
}
