const fs = require('fs')
const path = require('path');
const REAL_NEEDED = 5;
let state = convertToJson();
let real = getReal();

module.exports.grabTweets = () => {
    let finalRealTweets = []
    let finalfakeTweet;
    let finalTweets = {}
    let pool = [];// the tweets that have not been grabed
    for (let i = 0; i < real.length; i++) {
        pool[i] = real[i];
    }
    //get a random tweet and remove the one that has been grabed
    for (let i = 0; i < REAL_NEEDED; i++) {
        let indexGrabed = Math.floor(Math.random() * pool.length)
        finalRealTweets[i] = pool[indexGrabed]
        pool.splice(indexGrabed,1);
    }
    // geting the fake
    finalfakeTweet = getFake()[Math.floor(Math.random() * getFake().length )]

    //seting up the json
    finalTweets['real'] = finalRealTweets;
    finalTweets['fake'] = finalfakeTweet;
    return finalTweets;
}
//reads the file in any format
function readFile() {
    try {
        const data = fs.readFileSync(path.join(__dirname,'/gameState.json'),'utf-8');
        //console.log(data);
        return data;
      } catch (error) {
          console.log(error);
          return false;
    }
}
//convets format to json
function convertToJson() {
    let raw = readFile()
    let json = JSON.parse(raw);
    return json;
}
//grabs the real tweets
function getReal() {
   return state['real']
}
//grabs the fake tweets
function getFake() {
    return state['fake']
}