var directionsService;
var directionsDisplay;

function initMap() {
    directionsService = new google.maps.DirectionsService();
    directionsDisplay = new google.maps.DirectionsRenderer();
    var uco = new google.maps.LatLng(35.658010, -97.471544);
    var mapOptions = {
        zoom: 16,
        center: uco
    }
    var map = new google.maps.Map(document.getElementById('map'), mapOptions);
    directionsDisplay.setMap(map);
};

function calcRoute() {
    var start = new google.maps.LatLng();
    var end = new google.maps.LatLng();
    var request = {
        origin: start,
        destination: end,
        travelMode: google.maps.TravelMode.WALKING;
    };
    directionsService.route(request, function(response, status) {
        if (status == 'OK') {
            directionsDisplay.setDirections(response);
        }
    });
};

function getDistance(startbldg, destinationbldg) {
    let distance = 10000000;
    startdoor = "";
    enddoor = "";
    for (let i = 0; i < startbldg.doors.length; i++) {
        for (let j = 0; j < destinationbldg.doors.length; j++) {
            let newDistance = getDistance(startbldg.doors[i], destinationbldg.doors[j]);
            if (newDistance < distance) {
                startdoor = startbldg.doors[i]
                enddoor = destinationbldg.doors[j]
                distance = newDistance;
            }
        }
    }
};