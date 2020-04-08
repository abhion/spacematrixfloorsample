let clientId = localStorage.getItem('clientId') || 'client-' + randomIntFromInterval(1, 10000);
// var client = new Paho.Client('115.114.49.252', 1884, clientId);
// var client = new Paho.Client('10.1.62.10', 1884, clientId);
var client = new Paho.Client('164.52.193.83', 1884, clientId);

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
    client.subscribe("Energy/KWH");
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

function saveValuesToDb(){
    
}

function updateChart() {
    thisHourPieObj.update();
}

function onMessageArrived(message) {
    console.log(message);
    debugger
    // if (storeDataAfterFifteen) {
    // alert("9sec");

    storeDataAfterFifteen = false;
    let saveToDbArray = [];
    if (message["topic"].includes("Energy/")) {
         
        
        // if (message["topic"].includes("EM/UPS")) {
            
            saveToDbArray.push({
                type:  'UPS',
                value: message.payloadString,
                // insert_date: (moment().format('YYYY-MM-DD HH:MM:SS'))
                insert_date: '2020-01-01 10:10:10+05:30'
            })

        // }
        // if (message["topic"].includes("EM/RAW") || message["topic"].includes("EM/HVAC")) {
        //     let type = (message["topic"].split('/')[1] === 'RAW' ? message["topic"].split('/')[1] : null) ||
        //             (message["topic"].split('/')[1] === 'HVAC' ? message["topic"].split('/')[1] === 'HVAC' : null);
        //     saveToDbArray.push({
        //         type: type,
        //         value: message.payloadString,
        //         insert_date: moment()
        //     })

        // }
        // if (message["topic"].includes("EM/DG")) {
            
        //     saveToDbArray.push({
        //         type: message["topic"].split('/')[1],
        //         value: message.payloadString,
        //         insert_date: (moment()),
        //     })
        // }
        // if (message["topic"].includes("EM/LTG")) {
        //    saveToDbArray.push({
        //         type: message["topic"].split('/')[1],
        //         insert_date: (moment()),
        //         value : message.payloadString,
        //     })
        // }

    }
    if(saveToDbArray.length){
        fetch('http://127.0.0.1:3000/saveEnergyMeterValToDb',{
            method: 'post',
            headers: new Headers({'content-type': 'application/json'}), 
            body: JSON.stringify(saveToDbArray)
        })
        .then(res => {
            console.log(res);
        })
    }
    calculateChartValues();
    updateChart();
    // }
}

// {"payloadString":"26.533333333333335","payloadBytes":{"0":50,"1":54,"2":46,"3":53,"4":51,"5":51,"6":51,"7":51,"8":51,"9":51,"10":51,"11":51,"12":51,"13":51,"14":51,"15":51,"16":51,"17":53},"destinationName":"room/temp","qos":0,"retained":false,"topic":"room/temp","duplicate":false}