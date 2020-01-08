let clientId = localStorage.getItem('clientId') || 'client-' + randomIntFromInterval(1, 10000);
var client = new Paho.Client('164.52.193.83', 1884, clientId);

console.log(client);


client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

client.connect({ onSuccess: onConnect, useSSL: true });



function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}


function onConnect() {
    console.log("onConnect");
    client.subscribe("room/temp");

}

function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost:" + responseObject.errorMessage);
    }
}
function onMessageArrived(message) {
    // $('#room1Id').tooltipster('content', 'Room 1');
    // $('#room2Id').tooltipster('content', 'Room 2');
    if(message["topic"] === "room/temp"){
        let supplyTemp = (+message["payloadString"]).toFixed(2);
        $('#suppTemp').text('Supply temp: ' + supplyTemp + '°C');
        $('#retTemp').text('Return temp: ' + supplyTemp + '°C');
        $('#room1Temp').tooltipster(
            'content',  $('#some'))
        
    }
}

// {"payloadString":"26.533333333333335","payloadBytes":{"0":50,"1":54,"2":46,"3":53,"4":51,"5":51,"6":51,"7":51,"8":51,"9":51,"10":51,"11":51,"12":51,"13":51,"14":51,"15":51,"16":51,"17":53},"destinationName":"room/temp","qos":0,"retained":false,"topic":"room/temp","duplicate":false}