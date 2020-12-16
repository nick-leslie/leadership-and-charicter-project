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
    let username = req.body.username;
    
    //TODO add it so you need admin server auth
    let token = req.body.token
    let verifyedToken = tokenVerification.verifyFunc(token)
    //if token cant be varified for what ever reason fall out
    if(verifyedToken == false) {
      res.status(403).send({message:"bad token"})
    }
    console.log(username);
    let userProfile = userState.findUser(username);
    //checks if user exsists if they dont return false
    if(userProfile != false) {
      res.status(200).send({message:"found user", user:userProfile})
    } else {
      res.status(401).send({message:"user dose not exsist"})
    }

});
// returns all users requares admin auth
router.get('/all',(req,res) => {
  let userData = userState.getUsers();
  res.status(200).send({message:"grabed all", data:userData})
});
//this route will be used to update user data the request will include 
router.post('/update',(req,res)=> {
  let token = req.body.token
  let verifyedToken = tokenVerification.verifyFunc(token)
  if(verifyedToken != false) {
    let user = verifyedToken.user
    let mouseInfo = req.body.mouseInfo;
    let keyStrokes = req.body.keyStrokes;
    let osVerson = req.body.osVerson;
    let browser = req.body.browser;
    let ipAdress = req.body.ipAdress;
    let timeEntered = req.body.timeEntered;
    let timeLeft = req.body.timeLeft;
    let game = req.body.game;

    userState.update(user,mouseInfo,keyStrokes,osVerson,browser,ipAdress,timeEntered,timeLeft,game)
  }
});
//this is the intal call for things like os verson ip adress time enterd and browser
router.post('/inital',(req,res) => {
  let token = req.body.token
  let verifyedToken = tokenVerification.verifyFunc(token)
  if(verifyedToken != false) {
    let user = verifyedToken.name
    console.log(user);
    let osVerson = req.body.osVerson;
    let browser = req.body.browser;
    let ipAdress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log(ipAdress)
    ipAdress = ipAdress.slice(0, -1)
    ipAdress = ipAdress.slice(0, -1)
    console.log(ipAdress)
    let timeEntered = req.body.timeEntered;
    let citesThisSession = req.body.citesThisSession;
    userState.initalData(user,osVerson,browser,ipAdress,timeEntered,citesThisSession);
    res.status(200).send({message:"got data"})
  }
});

router.post('/mousePos',(req,res)=> {
  let token = req.body.token
  let verifyedToken = tokenVerification.verifyFunc(token)
  if(verifyedToken != false) {
    let user = verifyedToken.name
    let mousePos = req.body.mousePos;
    userState.addMouseData(user,mousePos);
    res.status(200).send({message:"got data"})
  } else {
    res.status(401).send({message:"no token"})
  }
})
router.post('/gameDataOngoing',(req,res) => {
  let token = req.body.token
  let verifyedToken = tokenVerification.verifyFunc(token)
  if(verifyedToken != false) {
    let ongoingGame = req.body.ongoingGame
    console.log(ongoingGame);
    userState.logOngoingGame(verifyedToken.name,ongoingGame)
    res.status(200).send({message:"got data"})
  } else {
    res.status(401).send({message:"no token"})
  }
})
router.post('/finishedGame',(req,res)=> {
  let token = req.body.token
  let verifyedToken = tokenVerification.verifyFunc(token)
  if(verifyedToken != false) {
      let user = verifyedToken.name;
      let finshedGame = req.body.finishedGame;
      console.log(req.body);
      console.log(finshedGame);
      userState.logFinishedGame(user,finshedGame)
      res.status(200).send({message:"got data", data:userState.findUser(user)} )
  } else {
    res.status(401).send({message:"no token"})
  }
});
router.post('/onLeave', (req,res)=> {
  let token = req.body.token
  console.log(req.body.timeLeft)
  let verifyedToken = tokenVerification.verifyFunc(token)
  if(verifyedToken != false) {
      let user = verifyedToken.name;
      let timeLeft = req.body.timeLeft;

      userState.onLeave(user,timeLeft);
  }
})
module.exports = router