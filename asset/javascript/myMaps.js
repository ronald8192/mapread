/**
 * Created by ronald8192 on 6/14/16.
 */
var myMaps;
define(['jquery', 'googleMap', 'weatherData'], function ($, googleMap, weather) {
    myMaps = {
        currentMap: undefined,
        drawMarkerQueue: [],
        emptyMarkerQueue: function(){
            for(var i in myMaps.drawMarkerQueue){
                clearTimeout(myMaps.drawMarkerQueue[i]);
            }
        },
        hk: {
            clickedLatLng: [],
            areaPolyline: undefined,
            areaPolygon: undefined,
            init: function () {
                myMaps.emptyMarkerQueue();
                var styles = [
                    {
                        "elementType": "labels.icon",
                        "stylers": [
                            { "weight": 0.1 },
                            { "visibility": "off" }
                        ]
                    }
                ];
                var styledMap = new google.maps.StyledMapType(styles, {name: "Disable Symbols"});

                myMaps.currentMap = new google.maps.Map($('#map')[0], {
                    center: {
                        lat: 22.352734,
                        lng: 114.132163
                    },
                    scaleControl: true,
                    zoomControl: false,
                    streetViewControl: false,
                    zoom: 11,
                    mapTypeControlOptions: {
                        mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
                    }
                });

                myMaps.currentMap.mapTypes.set('map_style', styledMap);
                myMaps.currentMap.setMapTypeId('map_style');

                myMaps.currentMap.addListener('click', function(event){

                    var latlng = {
                        lat: event.latLng.lat(),
                        lng: event.latLng.lng()
                    };
                    myMaps.hk.clickedLatLng.push(latlng);
                    console.log(latlng);
                    console.log(JSON.stringify(myMaps.hk.clickedLatLng));

                    //new google.maps.Marker({
                    //    position: event.latLng,
                    //    map: myMaps.currentMap,
                    //    icon: {
                    //        url: 'http://dehayf5mhw1h7.cloudfront.net/wp-content/uploads/sites/404/2016/04/06125833/2000px-Location_dot_red.svg_.png',
                    //        scaledSize: new google.maps.Size(10, 10)
                    //    }
                    //});

                    if(myMaps.hk.areaPolyline != undefined){
                        myMaps.hk.areaPolyline.setMap(null);
                    }
                    myMaps.hk.areaPolyline = new google.maps.Polyline({
                        path: myMaps.hk.clickedLatLng,
                        strokeColor: '#FF0000',
                        strokeOpacity: 0.8,
                        strokeWeight: 2,
                        //fillColor: '#FF0000',
                        //fillOpacity: 0.35
                    });
                    myMaps.hk.areaPolyline.setMap(myMaps.currentMap);

                    $("#latlngList").val(JSON.stringify(myMaps.hk.clickedLatLng));

                });
            },
            drawPolygon: function(){
                if(myMaps.hk.areaPolygon != undefined){
                    myMaps.hk.areaPolygon.setMap(null);
                }
                myMaps.hk.areaPolygon = new google.maps.Polygon({
                    path: myMaps.hk.clickedLatLng,
                    strokeColor: '#FF0000',
                    strokeOpacity: 0.6,
                    strokeWeight: 2,
                    fillColor: '#FF8800',
                    fillOpacity: 0.35
                });
                myMaps.hk.areaPolygon.setMap(myMaps.currentMap);
            },
            removePolygon: function(){
                myMaps.hk.areaPolygon.setMap(null);
            }
        },
        NearBy : {
            infowindow: undefined,
            service:undefined,
            types:'cafe',
            initMap: function () {
                myMaps.emptyMarkerQueue();
                var styles = [
                    {
                        "elementType": "labels.icon",
                        "stylers": [
                            { "weight": 0.1 },
                            { "visibility": "off" }
                        ]
                    }
                ];
                var styledMap = new google.maps.StyledMapType(styles, {name: "Disable Symbols"});

                var centerLatLng = {lat: 22.3006592, lng: 114.1792019};

                myMaps.currentMap = new google.maps.Map(document.getElementById('map'), {
                    center: centerLatLng,
                    zoom: 16,
                    scaleControl: true,
                    zoomControl: false,
                    streetViewControl: false,
                    mapTypeControlOptions: {
                        mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
                    }
                });

                myMaps.currentMap.mapTypes.set('map_style', styledMap);
                myMaps.currentMap.setMapTypeId('map_style');

                myMaps.NearBy.infowindow = new google.maps.InfoWindow();

                myMaps.NearBy.service = new google.maps.places.PlacesService(myMaps.currentMap);
                myMaps.NearBy.service.radarSearch({
                    location: centerLatLng,
                    radius: 600,
                    types: [myMaps.NearBy.types]
                }, function (results, status) {
                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                        console.log("Generate " + results.length + " markers...");
                        for (var i = 0; i < results.length; i++) {
                            myMaps.drawMarkerQueue.push(setTimeout("myMaps.NearBy.createMarker('" + results[i].place_id + "')",i*300));
                            //myMaps.NearBy.createMarker(results[i]);
                        }
                    }
                });
            },
            createMarker: function (place) {
                //console.log('create marker ' + (place.place_id));
                myMaps.NearBy.service.getDetails({
                    placeId: (typeof place == "object" ? place.place_id : place)
                }, function(place, status) {
                    console.log((place==null ? '?':place.place_id) + " => " + status);
                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                        var options = {
                            map: myMaps.currentMap,
                            position: place.geometry.location
                        };
                        if (place.icon == undefined || place.icon == null || place.icon == ""){

                        }else{
                            options.icon = {
                                url: place.icon,
                                scaledSize: new google.maps.Size(32,32)
                            };
                        }
                        var marker = new google.maps.Marker(options);
                        google.maps.event.addListener(marker, 'click', function() {
                            myMaps.NearBy.infowindow.setContent(
                                '<div><strong>' + place.name + '</strong><br>' +
                                '<strong>Address:</strong>' + place.formatted_address + '<br />' +
                                '<strong>Rating:</strong>' + (place.rating==undefined ? "--" : place.rating) + '</div>'
                            );
                            myMaps.NearBy.infowindow.open(myMaps.currentMap, this);
                        });
                    }
                });




                //var placeLoc = place.geometry.location;
                //var marker = new google.maps.Marker({
                //    map: NearBy.map,
                //    position: place.geometry.location
                //});
                //
                //google.maps.event.addListener(marker, 'click', function () {
                //    NearBy.infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
                //        'Place ID: ' + place.place_id + '<br>' +
                //        place.formatted_address + '</div>');
                //    NearBy.infowindow.open(currentMap, this);
                //});
            }
        }
    };

    return myMaps;
});

