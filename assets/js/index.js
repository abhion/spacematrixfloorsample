var image = $('#floorImgId');
let hideShowRoomNameCheck = null;
let showAllBtn = null;
let showIndividualBtn = null;
let floorNameTxtId = null;
let allControlBoxes = null;
const roomNameIds = ['receptionAreaId', 'excelRoomId', 'respRoomId', 'innovationRoomId', 'pantryRoomId', 'valueRoomId', 'liftLobbyRoomId'];
const roomNames = ['Reception', 'Excellence', 'Responsibility', 'Innovation', 'Pantry', 'Value', 'Lift lobby'];

let groundFloorVavIds = ['excelVavId', 'innovationVavId', 'liftLobbyVavId', 'respVavId', 'valueVavId'];
let groundFloorVavNames = ['VAV 04', 'VAV 03', 'VAV 05', 'VAV 02', 'VAV 01'];

let groundFloorSensorIds = ['duct1SensorId','duct2SensorId','liftLobbyId','pantrySensorId'];
let groundFloorSensorNames = ['Duct 1 sensor', 'Duct 2 sensor', 'CO2 sensor', 'Pantry sensor'];

let groundFloorFanIds = ['vrfFanId','pantryFanId','valueFanId'];
let groundFloorFanNames = ['VRF Fan', 'Pantry Fan', 'Value Fan'];

let firstFloorFanIdsArray = ['floor1Vrf1Id','floor1Vrf2Id', 'floor1ExhFanId', 'floor1FreshAirId'];
let firstFloorFanNamesArray = ['VRF 1','VRF 2', 'Exhaust fan', 'Fresh Air fan'];

let firstFloorSensorIdsArray = ['floor1d1SensorId','floor1d2SensorId','floor1Co2SensorId'];
let firstFloorSensorNamesArray = ['Duct 1 sensor', 'Duct 2 sensor', 'CO2 sensor'];

let secondFloorVavIdsArray = ['floor2VavId'];
let secondFloorVavNamesArray = ['VAV 07'];

let secondFloorSensorIdsArray = ['floor2d1sensorId', 'floor2d2sensorId','floor2Co2SensorId'];
let secondFloorSensorNamesArray = ['Duct 1 sensor', 'Duct 2 sensor', 'CO2 sensor'];

let secondFloorFanIdsArray = ['floor2ExhFanId','floor2VrfId','floor2FreshAirId'];
let secondFloorFanNamesArray = ['Exhaust fan', 'VRF Unit', 'Fresh Air Fan'];

let thirdFloorSensorIdsArray = ['floor3d1sensorId','floor3d2sensorId','floor3Co2Id'];
let thirdFloorSensorNamesArray = ['Duct 1 sensor', 'Duct 2 sensor', 'CO2 sensor'];

let thirdFloorVavIdsArray = ['floor3VavId'];
let thirdFloorVavNamesArray = ['VAV 08'];

let thirdFloorFanIdsArray = ['floor3ExhFanId','floor3FreshAirFanId','floor3VrfFanId'];
let thirdFloorFanNamesArray = ['Exhaust fan','Fresh Air','VRF unit'];

let firstFloorVavNamesArray = ['VAV 06'];
let firstFloorVavIdsArray = ['floor1VavId'];
let selectedFloor = -1;;

let firstFloorVavId = null;

let fanDescContainerForTooltip = null;
let selectedFanNameId = null;
let selectedFanDesc = null;
let homeIconContainer = null;
let selectedSensorDesc = null;
let groundFloorMainSelect = null, firstFloorMainSelect = null, secondFloorMainSelect = null;
thirdFloorMainSelect = null, mainPageContainer = null, floorContainer = null, floorWiseDisplayContainer = null, vavDescriptionContainerForTooltip = null;

let minimizeBtn = null, currentlyActiveId = null, selectedVavDescTitle = null;

let sensorDescContainerForTooltip = null, selectedSensorNameId = null;

let tooltipIdsArray = ['receptionAreaId',
  'excelRoomId', 'excelVavId', 'innovationRoomId', 'innovationVavId', 'liftLobbyVavId',
  'respRoomId', 'respVavId', 'duct1Id', 'duct2Id', 'liftLobbyRoomId', 'vrfFanId', 'pantryFanId',
  'valueVavId', 'valueFanId', 'pantryRoomId', 'duct1SensorId', 'duct2SensorId', 'liftLobbyId', 'pantrySensorId',
  'floor1Vrf1Id','floor1Vrf2Id','floor1d1SensorId','floor1d2SensorId','floor1VavId','floor1ExhFanId','floor1FreshAirId','floor1Co2SensorId',
  'floor2d1sensorId','floor2d2sensorId','floor2VavId','floor2ExhFanId','floor2Co2SensorId','floor2VrfId','floor2FreshAirId',
  'floor3d1sensorId','floor3d2sensorId','floor3Co2Id','floor3VavId','floor3ExhFanId','floor3FreshAirFanId','floor3VrfFanId'
];

let lastHourUpsArray = [], thisHourUpsArray = [], lastDayUpsArray = [], todayUpsArray = [],
  lastHourLightingArray = [], thisHourLightingArray = [], lastDayLightingArray = [], todayLightingArray = [],
  lastHourRawArray = [], thisHourRawArray = [], lastDayRawArray = [], todayRawArray = [],
  lastHourDgArray = [], thisHourDgArray = [], lastDayDgArray = [], todayDgArray = [];
  

let doughnutChartCtx = document.querySelector('#doughnutChart').getContext('2d');

let lastHourPieChartCtx = document.querySelector('#lastHourPieChart').getContext('2d');
let thisHourPieChartCtx = document.querySelector('#thisHourPieChart').getContext('2d');
let lastDayPieChartCtx = document.querySelector('#lastDayPiePieChart').getContext('2d');
let thisDayChartCtx = document.querySelector('#thisDayChart').getContext('2d');
let lastMonthPieChartCtx = document.querySelector('#lastMonthPieChart').getContext('2d');
let thisMonthPieChartCtx = document.querySelector('#thisMonthPieChart').getContext('2d');

window.addEventListener('orientationchange', function () {


  // initializeTooltips();


})



let doughnutObj = new Chart(doughnutChartCtx, {
  type: 'doughnut',
  data: {
    labels: ["UPS Power", "LDA Power", "Raw Power", "DG Power"],
    datasets: [
      {
        label: "kWh",
        backgroundColor: ["#e8e800", "#00f3ff", "#f5fff1", '#21f179'],
        data: [150, 220, 250, 110]
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
    legend: {
      labels: {
        fontColor: 'white'
      }
    }
  }
})

let thisHourPieObj = new Chart(thisHourPieChart, {
  type: 'pie',
  data: {
    labels: ["UPS Power", "LDA Power", "Raw Power", "DG Power"],
    datasets: [
      {
        label: "kWh",
        backgroundColor: ["#e8e800", "#00f3ff", "#f5fff1", '#21f179'],
        data: [150, 220, 250, 110]
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
    legend: {
      labels: {
        fontColor: 'white'
      }
    }
  }
})
let lastHourPieObj = new Chart(lastHourPieChartCtx, {
  type: 'pie',
  data: {
    labels: ["UPS Power", "LDA Power", "Raw Power", "DG Power"],
    datasets: [
      {
        label: "kWh",
        backgroundColor: ["#e8e800", "#00f3ff", "#f5fff1", '#21f179'],
        data: [150, 220, 250, 110]
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
    legend: {
      labels: {
        fontColor: 'white'
      }
    }
  }
})
let lastDayPieChartObj = new Chart(lastDayPieChartCtx, {
  type: 'pie',
  data: {
    labels: ["UPS Power", "LDA Power", "Raw Power", "DG Power"],
    datasets: [
      {
        label: "kWh",
        backgroundColor: ["#e8e800", "#00f3ff", "#f5fff1", '#21f179'],
        data: [150, 220, 250, 110]
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
    legend: {
      labels: {
        fontColor: 'white'
      }
    }
  }
})
let thisDayChartObj = new Chart(thisDayChartCtx, {
  type: 'pie',
  data: {
    labels: ["UPS Power", "LDA Power", "Raw Power", "DG Power"],
    datasets: [
      {
        label: "kWh",
        backgroundColor: ["#e8e800", "#00f3ff", "#f5fff1", '#21f179'],
        data: [150, 220, 250, 110]
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
    legend: {
      labels: {
        fontColor: 'white'
      }
    }
  }
})
let lastMonthPieChartObj = new Chart(lastMonthPieChartCtx, {
  type: 'pie',
  data: {
    labels: ["UPS Power", "LDA Power", "Raw Power", "DG Power"],
    datasets: [
      {
        label: "kWh",
        backgroundColor: ["#e4e421", "#00f3ff", "#f5fff1", '#21f179'],
        data: [150, 220, 250, 110]
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
    legend: {
      labels: {
        fontColor: 'white'
      }
    }
  }
})
let thisMonthPieChartObj = new Chart(thisMonthPieChartCtx, {
  type: 'pie',
  data: {
    labels: ["UPS Power", "LDA Power", "Raw Power", "DG Power"],
    datasets: [
      {
        label: "kWh",
        backgroundColor: ["#e8e800", "#00f3ff", "#f5fff1", '#21f179'],
        data: [150, 220, 250, 110]
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
    legend: {
      labels: {
        fontColor: 'white'
      }
    }
  }
})

let currentlyActiveControl = 'VAV';

// initializeTooltips();

$(document).ready(function () {
 
  hideShowRoomNameCheck = document.querySelector('#showRoomNameCheck');
  showAllBtn = document.querySelector('#showAllBtn');
  showIndividualBtn = document.querySelector('#showIndividualBtn');
  allControlBoxes = document.querySelectorAll('.all-controls-box');

  groundFloorMainSelect = document.querySelector('#groundFloorMainSelect');
  firstFloorMainSelect = document.querySelector('#firstFloorMainSelect');
  secondFloorMainSelect = document.querySelector('#secondFloorMainSelect');
  thirdFloorMainSelect = document.querySelector('#thirdFloorMainSelect');

  mainPageContainer = document.querySelector('#mainPageContainer');
  floorContainer = document.querySelector('#floorContainer');
  floorWiseDisplayContainer = document.querySelector('#floorWiseDisplayContainer');
  vavDescriptionContainerForTooltip = document.querySelector('#vavDescriptionContainerForTooltip');
  minimizeBtn = document.querySelector('#minimizeBtn');
  selectedVavDescTitle = document.querySelector('#selectedVavDescTitle');
  sensorDescContainerForTooltip = document.querySelector('#sensorDescContainerForTooltip');
  selectedSensorNameId = document.querySelector('#selectedSensorNameId');

  fanDescContainerForTooltip = document.querySelector('#fanDescContainerForTooltip');
  selectedFanNameId = document.querySelector('#selectedFanNameId');
  selectedFanDesc = document.querySelector('#selectedFanDesc');
  homeIconContainer = document.querySelector('#homeIconContainer');

  firstFloorVavId = document.querySelector('#floor1VavId');
  floorNameTxtId = document.querySelector('#floorNameTxtId');
  selectedSensorDesc = document.querySelector('#selectedSensorDesc');

  
  scrollToTopOfPage();
  setTimeout(function(){
    scrollDownBy(90);
  }, 1000)

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
      currentlyActiveControl = $(this).data('name');
      
      highlightSpecificArea(this.id.split('-')[1], selectedFloor);
      const currentlyActive = document.querySelector('.all-controls-box.active');
      currentlyActive.classList.remove('active');
      this.classList.toggle('active');
      //hide tooltip after some time so that collision can be avoided and viewed on hover
      setTimeout(() => {
        removeAllTooltip();
        
      }, 2000);

    })
  })
  //On clicking a vav show VAV description in tooltip
  groundFloorVavIds.forEach(function (vavId) {
    document.querySelector('#' + vavId).addEventListener('click', function () {
      showVavData(vavId, groundFloorVavIds, groundFloorVavNames);
    })
  })

  //On clicking a sensor, show sensor description in tooltip

  groundFloorSensorIds.forEach(function(sensorId){
    document.querySelector('#'+sensorId).addEventListener('click', function(){
      showSensorData(sensorId, groundFloorSensorIds, groundFloorSensorNames);
    })
  })

  //On clicking a fan, show description in tooltip
  groundFloorFanIds.forEach(function(fanId){
    document.querySelector('#'+ fanId).addEventListener('click', function(){
      showFanDesc(fanId, groundFloorFanIds, groundFloorFanNames);
    })
  })

  firstFloorFanIdsArray.forEach(function(fanId){
    document.querySelector('#'+ fanId).addEventListener('click', function(){
      showFanDesc(fanId, firstFloorFanIdsArray, firstFloorFanNamesArray);
    })
  })

  firstFloorVavId.addEventListener('click', function(){
    showVavData(this.id, firstFloorVavIdsArray, firstFloorVavNamesArray);
  })

  firstFloorSensorIdsArray.forEach(function(sensorId){
    document.querySelector('#'+sensorId).addEventListener('click', function(){
      showSensorData(sensorId, firstFloorSensorIdsArray, firstFloorSensorNamesArray);
    })
  })
  secondFloorFanIdsArray.forEach(function(fanId){
    document.querySelector('#'+ fanId).addEventListener('click', function(){
      showFanDesc(fanId, secondFloorFanIdsArray, secondFloorFanNamesArray);
    })
  })

  secondFloorVavIdsArray.forEach(function(vavId){
    document.querySelector('#'+vavId).addEventListener('click', function(){
      showVavData(this.id, secondFloorVavIdsArray, secondFloorVavNamesArray);
    })
  })
    

  secondFloorSensorIdsArray.forEach(function(sensorId){
    document.querySelector('#'+sensorId).addEventListener('click', function(){
      showSensorData(sensorId, secondFloorSensorIdsArray, secondFloorSensorNamesArray);
    })
  })
  thirdFloorFanIdsArray.forEach(function(fanId){
    document.querySelector('#'+ fanId).addEventListener('click', function(){
      showFanDesc(fanId, thirdFloorFanIdsArray, thirdFloorFanNamesArray);
    })
  })

  thirdFloorVavIdsArray.forEach(function(vavId){
    document.querySelector('#'+vavId).addEventListener('click', function(){
      showVavData(this.id, thirdFloorVavIdsArray, thirdFloorVavNamesArray);
    })
  })
    

  thirdFloorSensorIdsArray.forEach(function(sensorId){
    document.querySelector('#'+sensorId).addEventListener('click', function(){
      showSensorData(sensorId, thirdFloorSensorIdsArray, thirdFloorSensorNamesArray);
    })
  })





  //hide or show room names
  hideShowRoomNameCheck.addEventListener('change', toggleRoomNameDisplay);

  //From main page, show floor wise  display with view controls when a floor's image is clicked
  groundFloorMainSelect.addEventListener('click', function () {
    selectedFloor = '0';
    floorNameTxtId.innerText = 'Ground Floor';
    mainPageContainer.classList.add('hide');
    floorWiseDisplayContainer.classList.remove('hide');
    initFloorwiseDisplay(0);
  })
  //From main page, show floor wise  display with view controls when a floor's image is clicked
  firstFloorMainSelect.addEventListener('click', function () {
    selectedFloor = '1';
    floorNameTxtId.innerText = '1st Floor';
    mainPageContainer.classList.add('hide');
    floorWiseDisplayContainer.classList.remove('hide');
    initFloorwiseDisplay(1);
  })
  //From main page, show floor wise  display with view controls when a floor's image is clicked
  secondFloorMainSelect.addEventListener('click', function () {
    selectedFloor = '2';
    floorNameTxtId.innerText = 'Second Floor';
    mainPageContainer.classList.add('hide');
    floorWiseDisplayContainer.classList.remove('hide');
    initFloorwiseDisplay(2);
  })
  //From main page, show floor wise  display with view controls when a floor's image is clicked
  thirdFloorMainSelect.addEventListener('click', function () {
    selectedFloor = '3';
    floorNameTxtId.innerText = 'Third Floor';
    mainPageContainer.classList.add('hide');
    floorWiseDisplayContainer.classList.remove('hide');
    initFloorwiseDisplay(3);
  })

  //Go to home page on clicking icon

  homeIconContainer.addEventListener('click', function(){
    
    selectedFloor = '-1';
    floorWiseDisplayContainer.classList.add('hide');
    mainPageContainer.classList.remove('hide');
    if(currentlyActiveControl)
    $('div[data-name="'+ currentlyActiveControl +'"]').removeClass('active');
    scrollToTopOfPage();
    setTimeout(function(){
      scrollDownBy(90);
    }, 2000)
  })

  //Minimize a floor's description and show the Control type's name
  minimizeBtn.addEventListener('click', function () {
    
    
    let controlsNameArray = [], controlIdsArray = [];
    
    if(currentlyActiveControl === 'VAV'){
      if(selectedFloor == 0){
        controlsNameArray = groundFloorVavNames;
        controlIdsArray = groundFloorVavIds;
      }
      if(selectedFloor == 1){
        controlsNameArray = firstFloorVavNamesArray;
        controlIdsArray = firstFloorVavIdsArray;
      }
      if(selectedFloor == 2){
        controlsNameArray = secondFloorVavNamesArray;
        controlIdsArray = secondFloorVavIdsArray;
      }
      if(selectedFloor == 3){
        controlsNameArray = thirdFloorVavNamesArray;
        controlIdsArray = thirdFloorVavIdsArray;
      }
    }

    if(currentlyActiveControl === 'Fan'){
      if(selectedFloor == 0){
        controlsNameArray = groundFloorFanNames;
      controlIdsArray = groundFloorFanIds;
      }
      if(selectedFloor == 1){
        controlsNameArray = firstFloorFanNamesArray;
        controlIdsArray = firstFloorFanIdsArray;
      }
      if(selectedFloor == 2){
        controlsNameArray = secondFloorFanNamesArray;
        controlIdsArray = secondFloorFanIdsArray;
      }
      if(selectedFloor == 3){
        controlsNameArray = thirdFloorFanNamesArray;
        controlIdsArray = thirdFloorFanIdsArray;
      }
      
    }
    if(currentlyActiveControl === 'Sensor'){
      if(selectedFloor == 0){
        controlsNameArray = groundFloorSensorNames;
      controlIdsArray = groundFloorSensorIds;
      }
      if(selectedFloor == 1){
        controlsNameArray = firstFloorSensorNamesArray;
        controlIdsArray = firstFloorSensorIdsArray;
      }
      if(selectedFloor == 2){
        controlsNameArray = secondFloorSensorNamesArray;
        controlIdsArray = secondFloorSensorIdsArray;
      }
      if(selectedFloor == 3){
        controlsNameArray = thirdFloorSensorNamesArray;
        controlIdsArray = thirdFloorSensorIdsArray;
      }
      
    }
    


    $('#' + currentlyActiveId).tooltipster('content', controlsNameArray[controlIdsArray.indexOf(currentlyActiveId)]);
    this.classList.add('hide-visibility');
  })


});

function showFanDesc(fanId, idArray, nameArray){
  
  $('#minimizeBtn').trigger('click');
  fanDescContainerForTooltip.classList.remove('hide');
  $('#' + fanId).tooltipster('content', fanDescContainerForTooltip);
  currentlyActiveId = fanId;
  // minimizeBtn.classList.remove('hide-visibility');
  selectedFanNameId.innerText = nameArray[idArray.indexOf(fanId)];
}



// show VAV description in Tooltip
function showVavData(vavId, idArray, nameArray) {
  $('#minimizeBtn').trigger('click');
  vavDescriptionContainerForTooltip.classList.remove('hide');
  $('#' + vavId).tooltipster('content', vavDescriptionContainerForTooltip);
  currentlyActiveId = vavId;
  // minimizeBtn.classList.remove('hide-visibility');
  selectedVavDescTitle.innerText = nameArray[idArray.indexOf(vavId)];
}

//show Sensor description in tooltip

function showSensorData(sensorId, idArray, nameArray){
  $('#minimizeBtn').trigger('click');
  debugger
  sensorDescContainerForTooltip.classList.remove('hide');
  currentlyActiveId = sensorId;
  $('#' + sensorId).tooltipster('content', sensorDescContainerForTooltip);
  console.log(document.querySelector('#' + sensorId).classList.contains('co2sensor'));
  
  if(document.querySelector('#' + sensorId).classList.contains('co2sensor')){
    selectedSensorDesc.innerHTML = '<div>'+'200ppm'+'</div>'
  }
  else{
    selectedSensorDesc.innerHTML = '<div>Temp: '+'23°C'+'</div>'

  }
  selectedSensorNameId.innerText = nameArray[idArray.indexOf(sensorId)];
  // minimizeBtn.classList.remove('hide-visibility');
  
}

function toggleRoomNameDisplay() {

  if (hideShowRoomNameCheck.checked) {
    roomNameIds.forEach(function (roomNameId) {
      $('#' + roomNameId).tooltipster('show');
    })
  } else {
    roomNameIds.forEach(function (roomNameId) {
      $('#' + roomNameId).tooltipster('hide');
    })
  }
}
//show tooltips when a floor is selected
function initializeTooltips() {
  tooltipIdsArray.forEach(function (toolTipId) {
    $('#' + toolTipId).tooltipster({
      theme: 'tooltipster-punk',
      trigger: 'custom',
      triggerOpen: {
        mouseenter: true
    },
    triggerClose: {
      mouseleave: true
    },
    functionAfter: function(instance){
      $('#minimizeBtn').trigger('click');
    }
    })
  })
}

function highlightAll() {

}
//highlight a control type(vavs, sensors... when a view control is clicked)
function highlightSpecificArea(controlType, floorNo) {

  removeAllHighlight();


  removeAllTooltip(roomNameIds);
  

  //Highlight vav
  if (controlType == 1) {
    
    $('.vav-cl.floor'+floorNo).each(function (el) {
      console.log(this.id+ "SF");

      $(this).tooltipster('show');
      
      $(this).mapster('set', true);
    });
  }
  //
  else if (controlType == 2) {

  }
  else if (controlType == 3) {

  }
  else if (controlType == 4) {
    $('.fan-cl.floor'+floorNo).each(function (el) {

      $(this).tooltipster('show');
      
      $(this).mapster('set', true);
    });
  }
  else if (controlType == 5) {
    // $('#duct1SensorId').mapster('select');
    // $('#duct2SensorId').mapster('select');
    // $('#liftLobbyId').mapster('set', true);
    // $('#pantrySensorId').mapster('set', true);
    $('.sensors.floor'+floorNo).each(function (el) {

      $(this).tooltipster('show');
      
      $(this).mapster('set', true);
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
function removeAllHighlight() {
  $('.to-highlight').each(function () {
    $('#' + this.id).mapster('set', false);
  })
}
//hide tooltips except the ones passed as argument
function removeAllTooltip(exceptArray) {
  if (!exceptArray) {
    exceptArray = [];
  }
  tooltipIdsArray.forEach(function (toolTipId) {
    if (exceptArray.indexOf(toolTipId) < 0) {
      $('#' + toolTipId).tooltipster('hide');
    }
  })
}

function scrollToTopOfPage(){
  if(!floorWiseDisplayContainer.classList.contains('hide'))
  $('html, body').animate({scrollTop: 0}, "slow");
}

function scrollDownBy(position){
  $('html, body').animate({scrollTop: position}, "slow");
}

initializeTooltips();
function initFloorwiseDisplay(floorNo) {
  
  $('#floorImgId').attr('src', 'assets/images/floor'+floorNo+'.jpg');
  $('#floorImgId').attr('usemap', '#floor'+floorNo);
  $('div[data-name="VAV"]').addClass('active');
  scrollToTopOfPage();

  setTimeout(() => {
    highlightSpecificArea(1, floorNo);

    setTimeout(() => {
      removeAllTooltip();
    }, 1000);

  }, 1000);

  setImageMapsterForFloor(floorNo);

  
}

function setImageMapsterForFloor(floorNo){
  if(floorNo == 0){
    hideShowRoomName.classList.remove('hide');
    image.mapster('unbind');
    image.mapster({
      mapKey: 'data-name',
      strokeWidth: 2,
      stroke: true,
      fill: false,
      onClick: function(data){
        console.log(data, currentlyActiveId);
        setTimeout(() => {
          $('#'+currentlyActiveId).mapster('select')
          console.log($(data));
          
        }, 100);
      },
      areas: [{ key: 'reception', strokeColor: "f70505" }, { key: 'excelRoom', strokeColor: "f70505" }, { key: 'respRoom', strokeColor: "f70505" },
      { key: 'excellenceVav', strokeColor: "f70505" }, { key: 'innovationRoom', strokeColor: "f70505" }, { key: 'innovationVav', strokeColor: "f70505" },
      { key: 'liftLobbyVav', strokeColor: "f70505" }, { key: 'resproom', strokeColor: "f70505" }, { key: 'respVav', strokeColor: "f70505" },
      { key: 'duct', strokeColor: "f70505" }, { key: 'liftLobby', strokeColor: "f70505" }, { key: 'vrfFan', strokeColor: "f70505" },
      { key: 'pantryFan', strokeColor: "f70505" }, { key: 'valueVav', strokeColor: "f70505" }, { key: 'valueFan', strokeColor: "f70505" },
      { key: 'pantryRoom', strokeColor: "f70505" }, { key: 'ductOneSensor', strokeColor: "f70505" }, { key: 'ductTwoSensor', strokeColor: "f70505" },
      { key: 'liftLobbySensor', strokeColor: "f70505" }, { key: 'pantrySensor', strokeColor: "f70505" }
      ]
    })
  }
  if(floorNo == 1){
    hideShowRoomName.classList.add('hide');
    image.mapster('unbind');
    image.mapster({
      mapKey: 'data-name',
      strokeWidth: 2,
      stroke: true,
      strokeColor: "f70505",
      fill: false,
      onClick: function(data){
        console.log(data, currentlyActiveId);
        setTimeout(() => {
          $('#'+currentlyActiveId).mapster('select')
          console.log($(data));
          
        }, 100);
      },
      areas: [{key: 'vrffan1'}, {key: 'vrffan2'}, {key: 'd1sensor'}, {key: 'd2sensor'}, {key: 'vav1'}, {key: 'exhaustfan'}, {key: 'freshairfan'}, {key: 'co2sensor'}]
    })
  }
  if(floorNo == 2){
    hideShowRoomName.classList.add('hide');
    image.mapster('unbind');
    image.mapster({
      mapKey: 'data-name',
      strokeWidth: 2,
      stroke: true,
      strokeColor: "f70505",
      fill: false,
      onClick: function(data){
        console.log(data, currentlyActiveId);
        setTimeout(() => {
          $('#'+currentlyActiveId).mapster('select')
          console.log($(data));
          
        }, 100);
      },
      areas: [{key: 'floor2d1sensor'}, {key: 'floor2d2sensor'}, {key: 'floor2VavId'}, {key: 'floor2ExhFan'}, {key: 'floor2Co2Sensor'}, {key: 'floor2Vrf'}, {key: 'floor2FreshAirId'}]
    })
  }
  if(floorNo == 3){
    hideShowRoomName.classList.add('hide');
    image.mapster('unbind');
    image.mapster({
      mapKey: 'data-name',
      strokeWidth: 2,
      stroke: true,
      fill: false,
      onClick: function(data){
        console.log(data, currentlyActiveId);
        setTimeout(() => {
          $('#'+currentlyActiveId).mapster('select')
          console.log($(data));
          
        }, 100);
      },
     areas: [
       {key: 'floor3d1sensor'},
       {key: 'floor3d2sensor'},
       {key: 'floor3Co2'},
       {key: 'floor3Vav'},
       {key: 'floor3ExhFan'},
       {key: 'floor3FreshAirFan'},
       {key: 'floor3VrfFan'}
      ]
    })
  }
}
function calculateChartValues() {
  
  
  let localStorageObj = JSON.parse(localStorage.getItem('energy_meter'));
  if (localStorageObj) {
      for (const key in localStorageObj) {
          if (localStorageObj.hasOwnProperty(key)) {
              localStorageObj[key].forEach(function (obj) {
                  obj["time"] = moment(moment(obj["time"]).utcOffset('+0530').format('YYYY-MM-DD HH:mm'));
                  
              })
              
          }
      }
  }
  debugger
  if(!localStorageObj.ups){
      localStorageObj.ups = [];
  }
  if (localStorageObj.ups) {
      localStorageObj.ups.forEach(function (obj) {
          let theTime = obj["time"];
          debugger

          if (theTime.startOf) {
              let startOfHour = theTime.startOf('hour').format('H');
              let yesterdayStart = moment().subtract(1, 'days').startOf('day');
              let todayStart = moment().startOf('day');
              let lastHourStart = moment().startOf('hour').subtract(1, 'hour');
              let lastHourEnd = moment().startOf('hour').subtract(1, 'seconds');

              let thisHourStart = moment().startOf('hour');

              if (theTime.isBetween(yesterdayStart, todayStart)) {
                  lastDayUpsArray.push(obj);
              }
              else if (theTime.isBetween(lastHourStart, lastHourEnd)) {
                  lastHourUpsArray.push(obj);
              }
              else if (theTime.isSameOrAfter(thisHourStart, 'hour')) {
                  thisHourUpsArray.push(obj);
              }
              if (theTime.isSameOrAfter(moment().startOf('day'), 'day')) {
                  todayUpsArray.push(obj)
              }
          }
      })
      console.log(lastDayUpsArray)
      console.log(lastHourUpsArray)
      console.log(thisHourUpsArray)
      console.log(todayUpsArray)
  }
  if(!localStorageObj.raw){
      localStorageObj.raw = [];
  }
  if (localStorageObj.raw) {
      localStorageObj.raw.forEach(function (obj) {
          let theTime = obj["time"];

          if (theTime.startOf) {
              let startOfHour = theTime.startOf('hour').format('H');
              let yesterdayStart = moment().subtract(1, 'days').startOf('day');
              let todayStart = moment().startOf('day');
              let lastHourStart = moment().startOf('hour').subtract(1, 'hour');
              let lastHourEnd = moment().startOf('hour').subtract(1, 'seconds');

              let thisHourStart = moment().startOf('hour');

              if (theTime.isBetween(yesterdayStart, todayStart)) {
                  lastDayRawArray.push(obj);
              }
              else if (theTime.isBetween(lastHourStart, lastHourEnd)) {
                  lastHourRawArray.push(obj);
              }
              else if (theTime.isSameOrAfter(thisHourStart, 'hour')) {
                  thisHourRawArray.push(obj);
              }
              if (theTime.isSameOrAfter(moment().startOf('day'), 'day')) {
                  todayRawArray.push(obj)
              }
          }
      })
  }
  if(!localStorageObj.dg){
      localStorageObj.dg = [];
  }
  if (localStorageObj.dg) {
      localStorageObj.ups.forEach(function (obj) {
          let theTime = obj["time"];

          if (theTime.startOf) {
              let startOfHour = theTime.startOf('hour').format('H');
              let yesterdayStart = moment().subtract(1, 'days').startOf('day');
              let todayStart = moment().startOf('day');
              let lastHourStart = moment().startOf('hour').subtract(1, 'hour');
              let lastHourEnd = moment().startOf('hour').subtract(1, 'seconds');

              let thisHourStart = moment().startOf('hour');

              if (theTime.isBetween(yesterdayStart, todayStart)) {
                  lastDayDgArray.push(obj);
              }
              else if (theTime.isBetween(lastHourStart, lastHourEnd)) {
                  lastHourDgArray.push(obj);
              }
              else if (theTime.isSameOrAfter(thisHourStart, 'hour')) {
                  thisHourDgArray.push(obj);
              }
              if (theTime.isSameOrAfter(moment().startOf('day'), 'day')) {
                  todayDgArray.push(obj)
              }
          }
      })
  }
  if(!localStorageObj.ltg){
      localStorageObj.ltg = [];
  }
  if (localStorageObj.ltg) {
      localStorageObj.ltg.forEach(function (obj) {
          let theTime = obj["time"];

          if (theTime.startOf) {
              let startOfHour = theTime.startOf('hour').format('H');
              let yesterdayStart = moment().subtract(1, 'days').startOf('day');
              let todayStart = moment().startOf('day');
              let lastHourStart = moment().startOf('hour').subtract(1, 'hour');
              let lastHourEnd = moment().startOf('hour').subtract(1, 'seconds');

              let thisHourStart = moment().startOf('hour');

              if (theTime.isBetween(yesterdayStart, todayStart)) {
                  lastDayLightingArray.push(obj);
              }
              else if (theTime.isBetween(lastHourStart, lastHourEnd)) {
                  lastHourLightingArray.push(obj);
              }
              else if (theTime.isSameOrAfter(thisHourStart, 'hour')) {
                  thisHourLightingArray.push(obj);
              }
              if (theTime.isSameOrAfter(moment().startOf('day'), 'day')) {
                  todayDgArray.push(obj)
              }
          }
      })
  }
  updateChart();

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