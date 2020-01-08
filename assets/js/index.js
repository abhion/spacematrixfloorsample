$(document).ready(function () {
   
});

$('#room1Id').tooltipster({
    theme: 'tooltipster-shadow',
    trigger: 'custom',
    triggerClose: {
        mouseleave: false
    }
});
$('#room2Id').tooltipster({
    theme: ['tooltipster-shadow', 'tooltipster-shadow-customized'],
    trigger: 'custom',
    triggerClose: {
        mouseleave: false
    }
});
$('#room1Id').tooltipster('show');
$('#room2Id').tooltipster('show');
// $('#room1Id').tooltipster('content', new Date().getTime());

$('#room1Temp').tooltipster({
    theme: 'tooltipster-punk',
    trigger: 'custom',
    triggerClose: {
        mouseleave: false
    }
});
$('#room1Temp').tooltipster('show');

$('map').imageMapResize();
$('#room1Id').tooltipster('content', 'Room 1');
$('#room2Id').tooltipster('content', 'Room 2');

// setTimeout(() => {
// }, 2000);