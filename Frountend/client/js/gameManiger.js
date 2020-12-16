let playerChoise;
let fakeTweet;
let currentGame;
// make a call to the server and get game info
function startTheGame() {
    $.ajax({
        type: 'POST',
        dataType: 'JSON',
        url:  ip() +'game/start',
        data: {token: sessionStorage.Token},
        success: function(jsondata){
            console.log(jsondata)
            displayGameInfo(jsondata)
            currentGame = jsondata;
            startCLickEventHandler();
        }
    })
}
async function displayGameInfo(gameData) {
    $('.tweet').fadeIn(); 
    let real = gameData.gameState.real
    console.log(real[0])
    let fake = gameData.gameState.fake
    fakeTweet = fake;
    let tweets = document.getElementsByClassName('tweet');
    let gameArray = real
    gameArray.push(fake);
    gameArray = await shuffle(gameArray);
    //TODO add shuffling
    // this sets the inner html to values
    for (let i = 0; i < tweets.length; i++) {
        tweets[i].innerHTML = gameArray[i]
    }
    sendGameData();
}

//this is not mine but it shuffles an array
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }
function startCLickEventHandler(){
    $('.tweet').click(async function() {
        playerChoise = this.innerHTML;
        let outCome = "loss"
        if(playerChoise === fakeTweet) {
            outCome="win"
        }
        await $('.tweet').fadeOut();
        setTimeout(() => {
            //$('.gameOutcome').css("display","none")
            $('.gameOutcome').html(`you ${outCome}`)
            $('.gameOutcome').fadeIn(); 
            $('.playAgain').fadeIn()
            $('.playAgain').hover(function() {
                $(this).css("border","9px solid black")
                $(this).css("color","white")
            },function () {
                $(this).css("border","5px solid black");
                $(this).css("color","black");
            }) 
            console.log(outCome)
            sendEndStatus(outCome);
            $('.playAgain').click(()=> {
                $('.gameOutcome').fadeOut(); 
                $('.playAgain').fadeOut()
                setTimeout(() => {
                    startTheGame();
                }, 500);
            })
        },500)
    })
    $('.tweet').hover(function() {
        $(this).css("border","9px solid black")
        $(this).css("color","white")
    },function () {
        $(this).css("border","5px solid black");
        $(this).css("color","black");
    }) 
  }
function sendGameData() {
    console.log(currentGame);
    $.ajax({
        type: 'POST',
        dataType: 'JSON',
        url:  ip() +'users/gameDataOngoing',
        data: {
            token:sessionStorage.Token,
            ongoingGame:currentGame
        },
        success: function(jsondata){
            console.log(jsondata)
        }
    })
}
// this will send the ending status but im lazy so I will do it latter
async function sendEndStatus(outcome) {
    let endData = await formatEndData(outcome);
    $.ajax({
        type: 'POST',
        dataType: 'JSON',
        url:  ip() +'users/finishedGame',
        data: {
            token:sessionStorage.Token,
            finishedGame:endData
        },
        success: function(jsondata){
            console.log(jsondata)
        }
    })
}
function formatEndData(outCome) {
    let endJson = {}
    endJson.game = currentGame;
    endJson.playerChoise = playerChoise
    endJson.status = outCome
    console.log(endJson)
    return endJson
}