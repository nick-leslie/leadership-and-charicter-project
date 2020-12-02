const e = require('express');
const express = require('express');
const router = express.Router();
const userState = require('../state/users');
const tokenCreation = require('../auth/genApiKey');
const tokenVerification = require('../auth/verifyApiKey');
//creates a user profile that is assoc
router.post('/create', (req,res) => {
  let username = req.body.username;

  if(username != undefined || username != null) {
    if(userState.createUser(username) == true) {  
      //1 is the defalt permsion level for non admin users
      let token = tokenCreation.addNewKey(username,1);

      //sends back token to interact with the webcite
      res.status(200).send({message:`user ${username} created`, token:token});
    } else {

        res.status(401).send("user aready created")
    }
  } else {
    res.status(401).send("bad Packet")
  }
});

//returns the user profile ie all of the data we collect
router.post('/profile',(req,res) => {
    //this takes a username to find the user
    let username = req.body.userName;
    
    //TODO add it so you need admin server auth
    let token = req.cookies.token
    let verifyedToken = tokenVerification.verifyFunc(token)
    //if token cant be varified for what ever reson fall out
    if(verifyedToken == false) {
      res.status(403).send({message:"bad token"})
    }
    let userProfile = userState.findUser(username);
    //checks if user exsists if they dont return false
    if(userProfile != false) {
      res.status(200).send({message:"found user", user:userProfile})
    } else {
      res.status(401).send({message:"user dose not exsist"})
    }

});
// returns all users requares admin auth
router.post('/all',(req,res) => {

})



module.exports = router