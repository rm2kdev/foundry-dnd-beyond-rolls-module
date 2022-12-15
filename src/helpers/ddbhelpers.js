import {disableModule, SETTINGS, DEBUG} from "../settings/settings";

export function getCobaltSocketSessionFromCobaltToken(){
    //Get Cobalt Cookie From Settings.
    let cobaltCookie = game.settings.get(SETTINGS.MODULE_ID, SETTINGS.COBALT_COOKIE);
    let cobaltProxyUrl = game.settings.get(SETTINGS.MODULE_ID, SETTINGS.PROXY_URL);

    //Ask Local API to get Cobalt Socket Session.
    let myPromise = new Promise((resolve, reject) => {
        fetch(cobaltProxyUrl + '/' + cobaltCookie, {
            method: 'POST'
        }).then(function(result){

            result.json().then(d => {
                console.log("Successfully got socket token")
                resolve(d)
            })

        }).catch(function(error){
            disableModule('Error getting cobalt socket token.');
            reject()
        })
    });
    return myPromise
}
