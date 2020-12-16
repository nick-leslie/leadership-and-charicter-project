setTimeout(()=> {
    $.ajax({
        type: 'GET',
        dataType: 'JSON',
        url:  ip() +'users/all',
        success: function(jsondata){
            console.log(jsondata)
            createDropDownFromJson(jsondata.data)
        }
    })
},100)
function ip() {
    let serverAdress = window.location.href
    serverAdress = serverAdress.replace(/\/admin/gm, "")
    console.log(serverAdress )
    return serverAdress;
}