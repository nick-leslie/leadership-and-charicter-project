let lastRecordedtime = 0;
let reordTime = 1000
let mousePosBuffer = []
//let timeSinceLastMove = 0;

$(document).ready(() => {
        lastRecordedtime = Date.now()
        grabMouseData()
        $(document).mouseleave(()=> {
            onLeave()
        })
    }
); 

function grabMouseData() {
    $(document).mousemove(function( event ) {
        currentTime = Date.now()
        if(currentTime - lastRecordedtime > reordTime) {
            let mousePos = "(x:" + event.pageX + ",  y:" + event.pageY + " )Time:";
            let currentDate = new Date().toLocaleTimeString()
            mousePos += currentDate
            lastRecordedtime = Date.now()
            mousePosBuffer.push(mousePos)
            //timeSinceLastMove = 0;
        }
    });
}
setInterval(()=> {
    sendMouseBuffer()
},5000);
function sendMouseBuffer() {
    console.log(mousePosBuffer);
    $.ajax({
        type: 'POST',
        dataType: 'JSON',
        url:  ip() +'users/mousePos',
        data: { 
            token:sessionStorage.Token,
            mousePos:mousePosBuffer
        },
        success: function(jsondata){
            console.log(jsondata);
            mousePosBuffer = [];
        }
    })
    // timeSinceLastMove = Date.now();
    // if(Date.now - timeSinceLastMove >= 60000) {
    //     onLeave();
    // }
}
function onLeave() {
    console.log('gamer')
    $.ajax({
        type: 'POST',
        dataType: 'JSON',
        url:  ip() +'users/onLeave',
        data: { 
            token:sessionStorage.Token,
            timeLeft:new Date().toLocaleTimeString()
        },
        success: function(jsondata){
        }
    })
}