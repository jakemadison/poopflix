var map;
var newMarkersArray = [];
//var oldMarkersArray = [];

function initialize() {

        var count = 0;
        var seconds = 3;

        var mapOptions = {
          center: new google.maps.LatLng(49.286083, -123.117117),
          zoom: 12
        };

        map = new google.maps.Map(document.getElementById("map-canvas"),
            mapOptions);

        //getMarkerLocations();

        reportLatLon();

        setInterval(function() {

            reportLatLon();
            count++;
            $('#counter').text(count);

        }, seconds*1000);

}

function reportLatLon(){

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(addMarker);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }

}




function getMarkerLocations(){

    $.getJSON($SCRIPT_ROOT + '/get_locs',{
        route: route,
        stop: stopNumber
//        allstops: allstops

    }, function(data) {

        console.log(data);
        console.log('-----');


        for(var i=0; i<newMarkersArray.length; i++){
            oldMarkersArray.push(newMarkersArray[i]);
        }

        newMarkersArray = []

        for (var i=0; i<data.locations.length; i++){
            addMarker(data.locations[i]);
        }

        for (var i=0; i<oldMarkersArray.length; i++){
            oldMarkersArray[i].setMap(null);
//            console.log('-');

        }

      });

      return false;

}

function addMarker(location) {

    console.log('lat, lon, ip', location.coords.latitude, location.coords.longitude, my_ip);

    var x = document.getElementById("loc_data");
    x.innerHTML = "Latitude: " + location.coords.latitude +
    "<br>Longitude: " + location.coords.longitude;


    var pos = new google.maps.LatLng(location.coords.latitude, location.coords.longitude);
    var marker = new google.maps.Marker(
        {
            position: pos,
//            icon: {path: google.maps.SymbolPath.FORWARD_OPEN_ARROW, scale: 2},
            map: map

        });

    newMarkersArray.push(marker);
    for (var i = 0; i < newMarkersArray.length; i++) {
        newMarkersArray[i].setMap(null);
    }

    $.get('post_locs', {lat: location.coords.latitude, lon: location.coords.longitude, ip: my_ip},
        function(result) {console.log('posted!');
    });


    marker.setMap(map);
}
