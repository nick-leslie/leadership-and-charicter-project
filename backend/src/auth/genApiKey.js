const jwt = require('jsonwebtoken')
//this genarates a new token with a permision level and username
module.exports.addNewKey = (username,perm) => {
    var token = jwt.sign({name:username,permisionLVL:perm}, process.env.TOKEN_SECRET, {
        expiresIn:process.env.TOKEN_LIFE_TIME
    })
    return token
}