const { use } = require("../../../../../multi langwage programs/learning-light/webServer/app");

let users = {}

module.exports.createUser = (username) => {
    if(userExsists(username) == true) {
        //this is createing the json shema for a user
        username['mousePos'] = [];
        username['histroy'] = [];
        username['keyStrokes'] = [];
        //returns true if user can be created
        return true
    } else {
        // if there is a conflict it returns false
        return false
    }
}
//checks if the user name is taken by looping through them and returning false if it aready exsists
function userExsists(username) {
    for (var usernames in users) {
        if(username == usernames) {
            return false;
        }
    }
    return true
}