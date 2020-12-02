const express = require('express');
const router = express.Router();

//this will send back a json object containg a array of real tweets and one fake tweet
//user must send in a token to be authorised 
router.post('/start',(req,res)=> {
    let token = req.body.token;
});
router
// we export router so that it can be served in the app file
module.exports = router