//this creates an event handler that ties the buttion to a post request
setTimeout(() => {
    console.log('setup')
    $(".login_buttion").click(() => {
        console.log('fuck')
        $.ajax({
            type: 'POST',
            dataType: 'JSON',
            url:  ip() +'users/create',
            data: {username: $(".login").val()},
            success: function(jsondata){
                console.log(jsondata)
                sessionStorage.Token = jsondata.token
            }
        })
    })
},200)


function ip() {
    let serverAdress = window.location.href
    return serverAdress;
}