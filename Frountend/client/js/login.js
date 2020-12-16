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
                setTimeout(() => {
                    initalSend();
                }, 500);
                console.log(grabBrowser())
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
function initalSend() {
    $.ajax({
        type: 'POST',
        dataType: 'JSON',
        url:  ip() +'users/inital',
        data: {
            token:sessionStorage.Token,
            osVerson:navigator.platform,
            browser:grabBrowser(),
            timeEntered:new Date().toLocaleTimeString(),
            citesThisSession:history.length

        },
        success: function(jsondata){
        }
    })
}
function grabBrowser() {
    var result = bowser.getParser(navigator.userAgent).getResult();
    return result.browser.name + ':' + result.browser.version
}