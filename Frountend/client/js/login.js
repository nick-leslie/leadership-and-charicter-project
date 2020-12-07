//this creates an event handler that ties the buttion to a post request
setTimeout(() => {
    $(".login_buttion").click(() => {
        $.ajax({
            type: 'POST',
            dataType: 'JSON',
            url:  ip() +'users/create',
            data: {username: $(".login").val()},
            success: function(jsondata){
                console.log(jsondata)
                sessionStorage.Token = jsondata.token
                console.log(sessionStorage.Token)
                showGame()
                startTheGame();
            }
        })
    })
},200)


function ip() {
    let serverAdress = window.location.href
    return serverAdress;
}
function showGame() {
    $(".login_container").css("display","none")
    $(".game").css("display","initial")
}