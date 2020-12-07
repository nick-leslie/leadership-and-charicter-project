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
        }
    })
}
function displayGameInfo(gameData) {
    let real = gameData.gameState.real
    console.log(real)
    let fake = gameData.gameState.fake
    console.log(fake)
    let tiles = grabTiles()
    console.log(tiles)
}
function grabTiles() {
   let all = $('.tweet').map(()=> {
        return this.innerHTML()
    }).get();
    return all
}