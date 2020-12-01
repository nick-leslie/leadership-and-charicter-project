const express = require('express');
const router = express.Router();
const userState = require('../state/users')
//creates a user profile that is assoc
router.post('/create', (req,res) => {
   let username = req.body.userName;
   if(userState.createUser(username) == true) {
       
    //sends back token to interact with the webcite
     res.status(200).send({message:"user created", token:"WILL BE CREATED LATTER"});
   } else {
       res.status(401).send("user aready created")
   }
});

//grabs the user profile ie all of the data we collect
router.post('/profile',(req,res) => {

})



module.exports = router