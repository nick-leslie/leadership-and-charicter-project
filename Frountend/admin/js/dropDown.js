setTimeout(()=> {addEventLissener()},100)
function addEventLissener () {
    $('.user').click(function() {
        console.log("test")
       let txtStatus =  $(this).children("div").attr("data-status")
       let boolStatus = parsStatus(txtStatus);
       if(boolStatus == true) {
            $(this).children("div").css("display","none")
            $(this).children("div").attr("data-status","false")
       } else {
            $(this).children("div").css("display","inline")
            $(this).children("div").attr("data-status","true")
       }
    }) 
}

function parsStatus(status) {
    if(status == "false") {
        return false;
    } else {
        return true;
    }
}