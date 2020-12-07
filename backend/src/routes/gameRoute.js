const express = require('express');
const router = express.Router();
const gameState = require('../state/gameState');
const verification = require('../auth/verifyApiKey');
//this will send back a json object containg a array of real tweets and one fake tweet
//user must send in a token to be authorised 
router.post('/start',(req,res)=> {
    let token = req.body.token;
    console.log(verification.verifyFunc(token))
    if(verification.verifyFunc(token) != false) {
        let tweet = gameState.grabTweets();
        res.status(200).send({gameState:tweet});
    } else {
        res.status(401).send({message:"bad token"})
    }
});
// we export router so that it can be served in the app file
module.exports = router