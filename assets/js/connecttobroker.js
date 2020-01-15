let clientId = localStorage.getItem('clientId') || 'client-' + randomIntFromInterval(1, 10000);
// var client = new Paho.Client('115.114.49.252', 1884, clientId);
var client = new Paho.Client('10.1.62.10', 1884, clientId);

// console.log(client);


client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

client.connect({ onSuccess: onConnect, useSSL: false });
Date.prototype.toJSON = function(){ return moment(this).format(); }



function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}


function onConnect() {
    console.log("onConnect");
    client.subscribe("EM/#");
    // client.subscribe("GF/#");
    // client.subscribe("1F/#");
    // client.subscribe("2F/#");
    // client.subscribe("3F/#");

}

function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost:" + responseObject.errorMessage);
    }
}

let storeDataAfterFifteen = true;

setInterval(function () {
    storeDataAfterFifteen = !storeDataAfterFifteen;

}, 1000)



function updateChart() {
    thisHourPieObj.update();
}

function onMessageArrived(message) {
    console.log(message);
    debugger
    if (storeDataAfterFifteen) {
    // alert("9sec");

    storeDataAfterFifteen = false;
    if (message["topic"].includes("EM/")) {
        let localStorageObj = {};
        if (localStorage.getItem('energy_meter')) {
            localStorageObj = JSON.parse(localStorage.getItem('energy_meter'));
            // for (const key in localStorageObj) {
            //     if (localStorageObj.hasOwnProperty(key)) {
            //         localStorageObj[key].forEach(function (obj) {
            //             obj["time"] = (moment(obj["time"]));
    
            //         })
    
            //     }
            // }
        }
        
        if (message["topic"].includes("EM/UPS")) {
            if (!localStorageObj.ups) {
                localStorageObj.ups = [];
            }
            localStorageObj.ups.push({
                upsId: message["topic"].split('/')[1],
                time: (moment()),
                message: message.payloadString
            })

        }
        if (message["topic"].includes("EM/RAW") || message["topic"].includes("EM/HVAC")) {
            if (!localStorageObj.raw) {
                localStorageObj.raw = [];
            }
            localStorageObj.raw.push({
                rawId: message["topic"].split('/')[1] === 'RAW' ? message["topic"].split('/')[1] : null,
                hvacId: message["topic"].split('/')[1] === 'HVAC' ? message["topic"].split('/')[1] === 'HVAC' : null,
                time: (moment()),
                message: message.payloadString,
                floorNo: message["topic"].split('/')[2] || null
            })

        }
        if (message["topic"].includes("EM/DG")) {
            if (!localStorageObj.dg) {
                localStorageObj.dg = [];
            }
            localStorageObj.dg.push({
                dgId: message["topic"].split('/')[1],
                time: (moment()),
                message: message.payloadString
            })
        }
        if (message["topic"].includes("EM/LTG")) {
            if (!localStorageObj.ltg) {
                localStorageObj.ltg = [];
            }
            localStorageObj.ltg.push({
                ltgId: message["topic"].split('/')[1],
                time: (moment()),
                message: message.payloadString,
                floorNo: message["topic"].split('/')[2] || null
            })
        }
        localStorage.setItem("energy_meter", JSON.stringify(localStorageObj));

    }
    calculateChartValues();
    updateChart();
    }
}

// {"payloadString":"26.533333333333335","payloadBytes":{"0":50,"1":54,"2":46,"3":53,"4":51,"5":51,"6":51,"7":51,"8":51,"9":51,"10":51,"11":51,"12":51,"13":51,"14":51,"15":51,"16":51,"17":53},"destinationName":"room/temp","qos":0,"retained":false,"topic":"room/temp","duplicate":false}