let users = {}

module.exports.createUser = (username) => {
    if(userExsists(username) == false) {
        //this is createing the json shema for a user
        // each will be an empty array latter to be filled with there respective items

        //keyStrokes will be timestamps and corads
        //location will be given baced apon ip address
        //games will be broken into wins and losses 
        //wins will have real fake and choice losses will have the same 
        users[username] = {
            "mousePos":{},
            "history":[],
            "keyStrokes":[],
            "osVerson": "",
            "browser": "",
            "ipAdress": "",
            "location": "",
            "timeEntered":"",
            "timeLeft":"",
            "games": {
                "won":[],
                "lost":[]
            },
            "onGoingGame":{}
        };
        //returns true if user can be created
        return true
    } else {
        // if there is a conflict it returns false
        return false
    }
}
// returns the profile of user in the state
module.exports.findUser = (username) => {
    if(userExsists(username) == true) {
        return users[username]
    } else {
        return false;
    }
}
// this updates the current user profile 
module.exports.updateUserProfile(user,mouseInfo,pastCites,keyStrokes,osVerson,browser,ipAdress,location,timeEntered,timeLeft,game) {
    users[user].mousePos.push(mouseInfo);
    users[user].history=pastCites;
    users[user].keyStrokes.push(keyStrokes);
    users[user].osVerson = osVerson;
    users[user].browser = browser;
    users[user].ipAdress = ipAdress;
    //location gose there that is derived from ipadress
    users[user].timeEntered = timeEntered;
    //this will be blank untill they leave
    users[user].timeLeft = timeLeft;
    if(game.status == "won") {
        users[user].games['wins'] = game;
    } else if(game.status == "lost") {
        users[user].games['losses'] = game;
    } else if(game.status == "ongoing") {
        users[user].onGoingGame = game
    }

}

//checks if the user name is taken by looping through them and returning true if it aready exsists
function userExsists(username) {
    for (var usernames in users) {
        if(username == usernames) {
            return true;
        }
    }
    return false
}