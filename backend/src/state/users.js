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
            "mousePos":[],
            "citesThisSession":0,
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
        console.log(users)
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
module.exports.getUsers = () => {
    return users;
}
// this updates the current user profile 
module.exports.updateUserProfile = (user,mouseInfo,citesThisSession,osVerson,browser,ipAdress,location,timeEntered,timeLeft,game) => {
    users[user].mousePos.push(mouseInfo);
    users[user].citesThisSession = citesThisSession;
    users[user]['osVerson'] = osVerson;
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
module.exports.initalData = (user,osVerson,browser,ipAdress,timeEntered,citesThisSession) => {
    console.log(users[user] + ' user');
    console.log(users[user].osVerson + 'is verson');
    users[user]['osVerson'] = osVerson
    users[user]['citesThisSession'] = citesThisSession;
    users[user].browser = browser
    users[user].ipAdress = ipAdress
    users[user].timeEntered = timeEntered
    console.log(users[user]);
}
module.exports.addMouseData = (user,mousePos) => {
    if(mousePos != undefined) {
    console.log('being called')
        let mousePosCopy = users[user]['mousePos'];
        for (let i = 0; i < mousePos.length; i++) {
            const element = mousePos[i];
            mousePosCopy.push(element);
        }
        users[user]['mousePos'] = mousePosCopy;
    }
}
module.exports.logOngoingGame = (user,game) => {
    users[user]['onGoingGame'] = game;
    console.log(users[user]);
}
module.exports.logFinishedGame = (user,finshedGame) => {
    console.log(finshedGame);
    console.log(users[user])
    if(finshedGame.status == 'win') {
        users[user].games.won.push(finshedGame)
    } else {
        users[user].games.lost.push(finshedGame)
    }
    console.log(users[user]);
}
module.exports.onLeave = (user,timeLeft) => {
    users[user]['timeLeft'] = timeLeft;
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