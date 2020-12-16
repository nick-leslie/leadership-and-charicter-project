// users[username] = {
//     "mousePos":[],
//     "citesThisSession":0,
//     "osVerson": "",
//     "browser": "",
//     "ipAdress": "",
//     "location": "",
//     "timeEntered":"",
//     "timeLeft":"",
//     "games": {
//         "won":[],
//         "lost":[]
//     },
//     "onGoingGame":{}

// };

function createDropDownFromJson(json) {
    let container = document.getElementById("cont");
    for (let key of Object.keys(json)) {
        console.log(key + " -> " + json[key])
        let card = document.createElement('div')
        let txt = document.createElement('span')
        txt.innerText = key.toString();
        card.className = "user row"
        card.appendChild(txt);
        container.appendChild(card)
        let userContent = document.createElement('div')
        userContent.className = "userContent"
        card.appendChild(userContent)
        for (let subKey of Object.keys(json[key])) {
            let innerELements = document.createElement('div')
            console.log(typeof json[key][subKey])
            if(typeof json[key][subKey] == "string") {
                if(json[key][subKey] != "location") {
                    innerELements.innerText = subKey.toString()+":"+json[key][subKey];
                }
            } else if(Array.isArray(json[key][subKey])) {
                
                console.log("being called")
                innerELements.className = "dropdown"
                innerELements.innerText = subKey.toString()
                let arrayHolder = document.createElement('div');
                arrayHolder.className = "dropdown-content";
                innerELements.appendChild(arrayHolder);
            
                for (let i = 0; i < json[key][subKey].length; i++) {
                    let arrayDiv = document.createElement('div');
                    arrayDiv.innerText = json[key][subKey][i]
                    arrayHolder.appendChild(arrayDiv);

                }
            }
            userContent.appendChild(innerELements)
        }
    }
    addEventLissener();
}