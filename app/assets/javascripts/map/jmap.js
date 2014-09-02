$(window).load(function() {
    loadScript();

    document.getElementById('add_dot').onclick = function() {
        var row = document.getElementById('add_cord').insertRow(-1);
        row.insertCell(0).innerHTML =
            "<input name=\"lat_second\" type=\"text\" onkeypress = \"return isNumberKey(event)\">";
        row.insertCell(1).innerHTML =
            "<input name=\"lat_second\" type=\"text\" onkeypress = \"return isNumberKey(event)\">";
        row.insertCell(2).innerHTML =
            "<button class=\"btn btn-danger\" name=\"button\" type=\"submit\" onclick=\"document.getElementById('add_cord').deleteRow(this)\">Delete dot</button>";
    };

    document.getElementById('create_ps').onclick = function() {
        var filled_input = true;
        var array = document.getElementsByTagName('input');
        for(var i = 0; i < array.length; i++) {
            if (array[i].value == ''){
                filled_input = false;
                break;
            }
        }
        if(filled_input) {
            var polygonCoords = [];
            for(var i = 0; i < array.length; i+=2) {
                polygonCoords.push(new google.maps.LatLng(array[i].value, array[i+1].value));
            }
            drawingPolygon(polygonCoords);
        }
        else {
            alert('Fill all inputs!');
        }
    }
});

var map;

function initialize() {
    var mapOptions = {
        center: new google.maps.LatLng(50.49, 30.58),
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.NORMAL,
        panControl: true,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.SMALL,
            position: google.maps.ControlPosition.LEFT_CENTER
        },
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, "map_style"]
        },
        scaleControl: false,
        streetViewControl: false,
        overviewMapControl: true
    };

    // initializing map
    map = new google.maps.Map(document.getElementById("map-canvas"),mapOptions);

    // drawing points
    /*google.maps.event.addListener(map, 'click', function(e){
     createMarker(getCurrentPosition(e), map, "Hello World!");
     });*/
    // markers
    var marker1 = createMarker(new google.maps.LatLng(50.4942996, 30.557034), map);
    var marker2 = createMarker(new google.maps.LatLng(50.490071, 30.5426754), map);
    var marker3 = createMarker(new google.maps.LatLng(50.4951319, 30.5995027), map);

    // drawing polygon
    var polygonCoords1 = [
        new google.maps.LatLng(50.4942996, 30.557034),
        new google.maps.LatLng(50.4936416, 30.5571585),
        new google.maps.LatLng(50.4936389, 30.5598885),
        new google.maps.LatLng(50.4929618, 30.5612532),
        new google.maps.LatLng(50.4941959, 30.5628239),
        new google.maps.LatLng(50.494735, 30.5617389),
        new google.maps.LatLng(50.4947329, 30.5613655),
        new google.maps.LatLng(50.4943141, 30.5608514),
        new google.maps.LatLng(50.4947253, 30.5608643)
    ];

    var polygonCoords2 = [
        new google.maps.LatLng(50.490071, 30.5426754),
        new google.maps.LatLng(50.4898868, 30.542307),
        new google.maps.LatLng(50.4896807, 30.542578),
        new google.maps.LatLng(50.4898755, 30.5429297)
    ];

    var polygonCoords3 = [
        new google.maps.LatLng(50.4951319, 30.5995027),
        new google.maps.LatLng(50.4951483, 30.5954172)
    ];

    // Construct the polygon.
    drawingPolygon(polygonCoords1);
    drawingPolygon(polygonCoords2);
    drawingPolygon(polygonCoords3);

    var info1 = createInfoWindow("Parking #1");
    google.maps.event.addListener(marker1, 'click', function() {
        info1.open(map, marker1);
    });
    var info2 = createInfoWindow("Parking #2");
    google.maps.event.addListener(marker2, 'click', function() {
        info2.open(map, marker2);
    });
    var info3 = createInfoWindow("Parking #3");
    google.maps.event.addListener(marker3, 'click', function() {
        info3.open(map, marker3);
    });
}

function drawingPolygon(polygonCoords){
    var polygone = new google.maps.Polygon({
        paths: polygonCoords,
        strokeColor: '#FF4500',
        strokeOpacity: 0.6,
        strokeWeight: 3,
        fillColor: '#FFA500',
        fillOpacity: 0.35
    });
    polygone.setMap(map);
}

function createInfoWindow(text){
    var infowindow = new google.maps.InfoWindow({
        content: text
    });
    return infowindow;
}

function createMarker(coords, map, title){
    var marker = new google.maps.Marker({
        position: coords,
        map: map,
        title: title
    });
    return marker;
}

function isNumberKey(evt){
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode != 46 &&(charCode < 48 || charCode > 57)))
        return false;
    return true;
}

function loadScript() {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp' + '&libraries=drawing' + '&callback=initialize';
    document.body.appendChild(script);
}