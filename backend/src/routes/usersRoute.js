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
    //if token cant be varified for what ever reason fall out
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

});
//this route will be used to update user data the request will include 
router.post('/update',(req,res)=> {
  let token = req.cookies.token
  let verifyedToken = tokenVerification.verifyFunc(token)
  if(verifyedToken != false) {
    let user = req.body.user;

    let mouseInfo = req.body.mouseInfo;
    let pastCites = req.body.pastCites;
    let keyStrokes = req.body.keyStrokes;
    let osVerson = req.body.osVerson;
    let browser = req.body.browser;
    let ipAdress = req.body.ipAdress;
    let timeEntered = req.body.timeEntered;
    let timeLeft = req.body.timeLeft;
    let game = req.body.game;

    userState.update(user,mouseInfo,pastCites,keyStrokes,osVerson,browser,ipAdress,timeEntered,timeLeft,game)
  }

});



module.exports = router