var image = $('#floorImgId');
let hideShowRoomNameCheck = null;
let showAllBtn = null;
let showIndividualBtn = null;
let allControlBoxes = null;
const roomNameIds = ['receptionAreaId','excelRoomId','respRoomId','innovationRoomId','pantryRoomId','valueRoomId','liftLobbyRoomId'];
const roomNames = ['Reception', 'Excellence', 'Responsibility', 'Innovation', 'Pantry', 'Value', 'Lift lobby'];

let groundFloorVavIds = ['excelVavId','innovationVavId','liftLobbyVavId','respVavId','valueVavId'];
let groundFloorVavNames = ['Excellence VAV', 'Innovation VAV','Lift Lobby VAV', 'Responsibility VAV', 'Value VAV'];

let groundFloorMainSelect = null, mainPageContainer = null, floorContainer = null, vavDescriptionContainerForTooltip = null;

let minimizeBtn = null, currentlyActiveVavId = null, selectedVavDescTitle = null;

let tooltipIdsArray = ['receptionAreaId',
    'excelRoomId','excelVavId','innovationRoomId','innovationVavId','liftLobbyVavId',
    'respRoomId','respVavId','duct1Id','duct2Id','liftLobbyRoomId','vrfFanId','pantryFanId',
    'valueVavId','valueFanId','pantryRoomId','duct1SensorId','duct2SensorId','liftLobbyId','pantrySensorId'
];

let doughnutChartCtx = document.querySelector('#doughnutChart').getContext('2d');

let lastHourPieChartCtx = document.querySelector('#lastHourPieChart').getContext('2d');
let thisHourPieChartCtx = document.querySelector('#thisHourPieChart').getContext('2d');
let lastDayPieChartCtx = document.querySelector('#lastDayPiePieChart').getContext('2d');
let thisDayChartCtx = document.querySelector('#thisDayChart').getContext('2d');
let lastMonthPieChartCtx = document.querySelector('#lastMonthPieChart').getContext('2d');
let thisMonthPieChartCtx = document.querySelector('#thisMonthPieChart').getContext('2d');

window.addEventListener('orientationchange', function(){
  setTimeout(() => {
    $('map').imageMapResize();
  }, 1000);
})



let doughnutObj = new Chart(doughnutChartCtx, {
    type: 'doughnut',
    data: {
      labels: ["Jan", "Feb", "March"],
      datasets: [
        {
          label: "kWh",
          backgroundColor: ["yellow", "#00f3ff","#ff6d86"],
          data: [150,220,250]
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'kWh',
        fontColor: 'white'
      },
      responsive: true,
      legend:{
        labels: {
          fontColor: 'white'
        }
      }
    }
  })

  let thisHourPieObj = new Chart(thisHourPieChart, {
    type: 'pie',
    data: {
      labels: ["Jan", "Feb", "March"],
      datasets: [
        {
          label: "kWh",
          backgroundColor: ["yellow", "#00f3ff","#ff6d86"],
          data: [150,220,250]
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'kWh',
        fontColor: 'white'
      },
      responsive: true,
      legend:{
        labels: {
          fontColor: 'white'
        }
      }
    }
  })
  let lastHourPieObj = new Chart(lastHourPieChartCtx, {
    type: 'pie',
    data: {
      labels: ["Jan", "Feb", "March"],
      datasets: [
        {
          label: "kWh",
          backgroundColor: ["yellow", "#00f3ff","#ff6d86"],
          data: [150,220,250]
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'kWh',
        fontColor: 'white'
      },
      responsive: true,
      legend:{
        labels: {
          fontColor: 'white'
        }
      }
    }
  })
  let lastDayPieChartObj = new Chart(lastDayPieChartCtx, {
    type: 'pie',
    data: {
      labels: ["Jan", "Feb", "March"],
      datasets: [
        {
          label: "kWh",
          backgroundColor: ["yellow", "#00f3ff","#ff6d86"],
          data: [150,220,250]
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'kWh',
        fontColor: 'white'
      },
      responsive: true,
      legend:{
        labels: {
          fontColor: 'white'
        }
      }
    }
  })
  let thisDayChartObj = new Chart(thisDayChartCtx, {
    type: 'pie',
    data: {
      labels: ["Jan", "Feb", "March"],
      datasets: [
        {
          label: "kWh",
          backgroundColor: ["yellow", "#00f3ff","#ff6d86"],
          data: [150,220,250]
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'kWh',
        fontColor: 'white'
      },
      responsive: true,
      legend:{
        labels: {
          fontColor: 'white'
        }
      }
    }
  })
  let lastMonthPieChartObj = new Chart(lastMonthPieChartCtx, {
    type: 'pie',
    data: {
      labels: ["Jan", "Feb", "March"],
      datasets: [
        {
          label: "kWh",
          backgroundColor: ["yellow", "#00f3ff","#ff6d86"],
          data: [150,220,250]
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'kWh',
        fontColor: 'white'
      },
      responsive: true,
      legend:{
        labels: {
          fontColor: 'white'
        }
      }
    }
  })
  let thisMonthPieChartObj = new Chart(thisMonthPieChartCtx, {
    type: 'pie',
    data: {
      labels: ["Jan", "Feb", "March"],
      datasets: [
        {
          label: "kWh",
          backgroundColor: ["yellow", "#00f3ff","#ff6d86"],
          data: [150,220,250]
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'kWh',
        fontColor: 'white'
      },
      responsive: true,
      legend:{
        labels: {
          fontColor: 'white'
        }
      }
    }
  })



// initializeTooltips();

$(document).ready(function () {
    
    hideShowRoomNameCheck = document.querySelector('#showRoomNameCheck');
    showAllBtn = document.querySelector('#showAllBtn');
    showIndividualBtn = document.querySelector('#showIndividualBtn');
    allControlBoxes = document.querySelectorAll('.all-controls-box');

    groundFloorMainSelect = document.querySelector('#groundFloorMainSelect');
    groundFloorMainSelect = document.querySelector('#groundFloorMainSelect');
    mainPageContainer = document.querySelector('#mainPageContainer');
    floorContainer = document.querySelector('#floorContainer');
    vavDescriptionContainerForTooltip = document.querySelector('#vavDescriptionContainerForTooltip');
    minimizeBtn = document.querySelector('#minimizeBtn');
    selectedVavDescTitle = document.querySelector('#selectedVavDescTitle');

    let currentlyActiveControl = 'vav';

    showIndividualBtn.addEventListener('click', function () {
        this.classList.add('active');
        showAllBtn.classList.remove('active');
    });
    showAllBtn.addEventListener('click', function () {
        // hideAll();
        this.classList.add('active');
        showIndividualBtn.classList.remove('active');
    });
    //Show respective controls(vav, sensors...) with a border on click
    allControlBoxes.forEach(function (box) {
        box.addEventListener('click', function () {
            highlightSpecificArea(this.id.split('-')[1]);
            const currentlyActive = document.querySelector('.all-controls-box.active');
            currentlyActive.classList.remove('active');
            this.classList.toggle('active');
        })
    })
    //On clicking a vav show VAV description in tooltip
    groundFloorVavIds.forEach(function(vavId){
        document.querySelector('#'+vavId).addEventListener('click', function(){
            showVavData(vavId);
        })
    })
    //hide or show room names
    hideShowRoomNameCheck.addEventListener('change', toggleRoomNameDisplay);

    //From main page, show floor wise  display with view controls when a floor's image is clicked
    groundFloorMainSelect.addEventListener('click', function(){
        mainPageContainer.classList.add('hide');
        floorContainer.classList.remove('hide');
        initFloorwiseDisplay();
    })

    //Minimize a floor's description and show the VAV's name
    minimizeBtn.addEventListener('click', function(){
      $('#'+currentlyActiveVavId).tooltipster('content', groundFloorVavNames[groundFloorVavIds.indexOf(currentlyActiveVavId)]);
      this.classList.add('hide-visibility');
    })


});
// show VAV description in Tooltip
function showVavData(vavId){
    $('#minimizeBtn').trigger('click');
    $('#' + vavId).tooltipster('content', vavDescriptionContainerForTooltip);
    currentlyActiveVavId = vavId;
    minimizeBtn.classList.remove('hide-visibility');
    selectedVavDescTitle.innerText = groundFloorVavNames[groundFloorVavIds.indexOf(vavId)];
}

function toggleRoomNameDisplay() {
    
    if (hideShowRoomNameCheck.checked) {
        roomNameIds.forEach(function(roomNameId){
            $('#'+roomNameId).tooltipster('show');
        })
    }else{
        roomNameIds.forEach(function(roomNameId){
            $('#'+roomNameId).tooltipster('hide');
        })
    }
}
//show tooltips when a floor is selected
function initializeTooltips(){
    tooltipIdsArray.forEach(function(toolTipId){
        $('#'+ toolTipId).tooltipster({
            theme: 'tooltipster-punk',
            trigger: 'custom',
            triggerClose: {
                mouseleave: false
            }
        })
    })
}

function highlightAll(){
    
}
//highlight a control type(vavs, sensors... when a view control is clicked)
function highlightSpecificArea(controlType) {
    
    removeAllHighlight();
    removeAllTooltip(roomNameIds);
    //Highlight vav
    if(controlType == 1){
        $('.vav-cl').each(function (el) {
            

            $('#' + this.id).mapster('set', true);
            $('#' + this.id).tooltipster('show');
        });
    }
    //
    else if(controlType == 2){
          
    }
    else if(controlType == 3){
          
    }
    else if(controlType == 4){
        $('.fan-cl').each(function (el) {
            
            $('#' + this.id).mapster('set', true);
            $('#' + this.id).tooltipster('show');
        });  
    }
    else if(controlType == 5){
        // $('#duct1SensorId').mapster('select');
        // $('#duct2SensorId').mapster('select');
        // $('#liftLobbyId').mapster('set', true);
        // $('#pantrySensorId').mapster('set', true);
        $('.sensors').each(function (el) {
            
            $('#' + this.id).mapster('set', true);
            $('#' + this.id).tooltipster('show');
        });  
    }

    


    // image.mapster('set', true);
    // $('#duct1SensorId').mapster('set', true);
    // $('#duct2SensorId').mapster('set', true);
    // $('#valueSensorId').mapster('set', true);
    // $('#receptionSensorId').mapster('set', true);
    // image.mapster('set_options', {
    //     fillColor: 'ffffff',
    //     fillOpacity: 0.6,
    //     stroke: true,
    //     strokeWidth: 2,
    //     strokeColor: 'ffffff',
    //     areas: [{key: 'reception', strokeColor: "ffffff"}, {key: 'excelRoom', strokeColor: "ffffff"}]
    // });

}
//remove previously selected control type before highlighting new control type
function removeAllHighlight(){
    $('.to-highlight').each(function(){
        $('#' + this.id).mapster('set', false);
    })
}
//hide tooltips except the ones passed as argument
function removeAllTooltip(exceptArray){
    if(!exceptArray){
        exceptArray = [];
    }
    tooltipIdsArray.forEach(function(toolTipId){
        if(exceptArray.indexOf(toolTipId) < 0){
            $('#' + toolTipId).tooltipster('hide');
        }
    })
}


function initFloorwiseDisplay(){

    initializeTooltips();
    setTimeout(() => {
        highlightSpecificArea(1);
        
    }, 1000);
    image.mapster({
        mapKey: 'data-name',
        strokeWidth: 2,
        stroke: true,
        fill: false,
        areas: [{ key: 'reception', fillColor: "f70505" }, { key: 'excelRoom', strokeColor: "f70505" }, { key: 'respRoom', strokeColor: "f70505" },
        { key: 'excellenceVav', strokeColor: "f70505" }, { key: 'innovationRoom', strokeColor: "f70505" }, { key: 'innovationVav', strokeColor: "f70505" },
        { key: 'liftLobbyVav', strokeColor: "f70505" }, { key: 'resproom', strokeColor: "f70505" }, { key: 'respVav', strokeColor: "f70505" },
        { key: 'duct', strokeColor: "f70505" }, { key: 'liftLobby', strokeColor: "f70505" }, { key: 'vrfFan', strokeColor: "f70505" },
        { key: 'pantryFan', strokeColor: "f70505" }, { key: 'valueVav', strokeColor: "f70505" }, { key: 'valueFan', strokeColor: "f70505" },
        { key: 'pantryRoom', strokeColor: "f70505" }, { key: 'ductOneSensor', strokeColor: "f70505" }, { key: 'ductTwoSensor', strokeColor: "f70505" },
        { key: 'liftLobbySensor', strokeColor: "f70505" }, { key: 'pantrySensor', strokeColor: "f70505" }
        ]
    })
}


setTimeout(() => {
    // $('#receptionAreaId').tooltipster('show');

    // $('#excelRoomId').tooltipster('show');
    // $('#respRoomId').tooltipster('show');
    // $('#innovationRoomId').tooltipster('show');
    // $('#pantryRoomId').tooltipster('show');
    // $('#valueRoomId').tooltipster('show');
    // $('#liftLobbyRoomId').tooltipster('show');
    // $('#duct1Id').tooltipster('show');
    // $('#duct2Id').tooltipster('show');
    // $('#vrfFanId').tooltipster('show');
    
}, 1000);
// $('map').imageMapResize();
// image.mapster('unbind');

// $('map').imageMapResize();

// $('#floorImgId').mapster({
//     fillColor: "d42e16",
//     stroke: true,
//     strokeColor: "3320FF",
//     strokeOpacity: 0.8,
//     strokeWidth: 4,
//     singleSelect: true,
//     mapKey: 'data-name',
//     areas: [{
//         key: "roomOneTemp",
//         strokeColor: "ffffff",
//         fill: false
//     }]
// })

// setTimeout(() => {
// }, 2000);