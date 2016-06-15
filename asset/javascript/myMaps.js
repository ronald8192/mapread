/**
 * Created by ronald8192 on 6/14/16.
 */

define(['jquery', 'googleMap', 'weatherData'], function ($, googleMap, weather) {
    var myMaps = {
        hk: function () {
            new google.maps.Map($('#map')[0], {
                center: {
                    lat: 22.352734,
                    lng: 114.132163
                },
                zoomControl: false,
                streetViewControl: false,
                zoom: 11
            });
        },
        NearBy : {
            map: undefined,
            infowindow: undefined,
            service:undefined,
            types:'cafe',
            initMap: function () {
                var pyrmont = {lat: 22.3006592, lng: 114.1792019};

                myMaps.NearBy.map = new google.maps.Map(document.getElementById('map'), {
                    center: pyrmont,
                    zoom: 16,
                    zoomControl: false,
                    streetViewControl: false
                });

                myMaps.NearBy.infowindow = new google.maps.InfoWindow();

                myMaps.NearBy.service = new google.maps.places.PlacesService(myMaps.NearBy.map);
                myMaps.NearBy.service.nearbySearch({
                    location: pyrmont,
                    radius: 600,
                    types: [myMaps.NearBy.types]
                }, function (results, status) {
                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                        for (var i = 0; i < results.length; i++) {
                            console.dir(results[i]);
                            myMaps.NearBy.createMarker(results[i]);
                        }
                    }
                });
            },
            createMarker: function (place) {
                myMaps.NearBy.service.getDetails({
                    placeId: place.place_id
                }, function(place, status) {
                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                        var options = {
                            map: myMaps.NearBy.map,
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
                            myMaps.NearBy.infowindow.open(myMaps.NearBy.map, this);
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
                //    NearBy.infowindow.open(NearBy.map, this);
                //});
            }
        }
    };

    return myMaps;
});

