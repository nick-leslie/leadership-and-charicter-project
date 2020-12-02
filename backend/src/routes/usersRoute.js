const e = require('express');
const express = require('express');
const router = express.Router();
const userState = require('../state/users')
//creates a user profile that is assoc
router.post('/create', (req,res) => {
  let username = req.body.username;
  if(username != undefined || username != null) {
    if(userState.createUser(username) == true) {  
    //sends back token to interact with the webcite
      res.status(200).send({message:`user ${username} created`, token:"WILL BE CREATED LATTER"});
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
    let token = req.body.token

    let userProfile = userState.findUser(username);
    //checks if user exsists if they dont return false
    if(userProfile != false) {
      res.status(200).send({message:"found user", user:userProfile})
    } else {
      res.status(401).send({message:"user dose not exsist"})
    }
});
// returns all users
router.post('/all',(req,res) => {

})



module.exports = router