/**
 * Created by ronald8192 on 6/14/16.
 */
var myMaps;
define(['jquery', 'googleMap','lightbox2'], function ($, googleMap) {
    myMaps = {
        currentMap: undefined,
        drawMarkerQueue: [],
        emptyMarkerQueue: function(){
            for(var i in myMaps.drawMarkerQueue){
                clearTimeout(myMaps.drawMarkerQueue[i]);
            }
            myMaps.drawMarkerQueue = [];
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
                            "featureType": "landscape.man_made",
                            "stylers": [
                                { "color": "#e2e2e2" }
                            ]
                        },{
                            "featureType": "road.arterial",
                            "elementType": "geometry",
                            "stylers": [
                                { "color": "#656565" }
                            ]
                        },{
                            "featureType": "road.local",
                            "elementType": "geometry",
                            "stylers": [
                                { "color": "#b9b9b9" }
                            ]
                        },{
                            "elementType": "labels.icon",
                            "stylers": [
                                { "visibility": "off" }
                            ]
                        },{
                            "featureType": "water",
                            "stylers": [
                                { "color": "#b9b9b9" }
                            ]
                        },{
                            "featureType": "transit",
                            "stylers": [
                                { "visibility": "simplified" }
                            ]
                        },{
                            "featureType": "poi",
                            "elementType": "geometry.fill",
                            "stylers": [
                                { "visibility": "on" },
                                { "color": "#c9c9c9" }
                            ]
                        },{
                            "elementType": "geometry.stroke",
                            "stylers": [
                                { "color": "#b9b9b9" }
                            ]
                        },{
                            "featureType": "road.highway",
                            "stylers": [
                                { "color": "#808080" }
                            ]
                        },{
                            "stylers": [
                                { "saturation": -100 }
                            ]
                        }
                    ]
                    ;
                var styledMap = new google.maps.StyledMapType(styles, {name: "Disable Symbols"});

                var centerLatLng =  {lat: 22.304265, lng: 114.179726};

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

                new google.maps.Marker({
                    position: centerLatLng,
                    map: myMaps.currentMap,
                    title: 'The Hong Kong Polytechnic University',
                    icon:{
                        url: 'asset/image/PolyU_logo.png',
                        scaledSize: new google.maps.Size(28,28)
                    }
                });

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
                    console.dir(place);
                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                        if(place.types[0]==myMaps.NearBy.types){
                            var options = {
                                map: myMaps.currentMap,
                                position: place.geometry.location,
                                icon:{
                                    url: 'asset/image/' + myMaps.NearBy.types + '.png',
                                    scaledSize: new google.maps.Size(32,32)
                                }
                            };
                            //if (place.icon == undefined || place.icon == null || place.icon == ""){
                            //
                            //}else{
                            //    options.icon = {
                            //        url: place.icon,
                            //        scaledSize: new google.maps.Size(32,32)
                            //    };
                            //}
                            var theRating="";
                            if(place.rating!=undefined){
                                if(place.rating<2){
                                    theRating="1";
                                }else if(place.rating>2&&place.rating<4){
                                    theRating="2";
                                }else if(place.rating>4){
                                    theRating="3";
                                }else{
                                    theRating="0";
                                }
                            }else{
                                theRating="0";
                            }
                            var iconurl="";
                            if(place.types[0]=="cafe"){
                                iconurl="./asset/image/cafe"+theRating+".png";
                            }else if(place.types[0]=="night_club"){
                                iconurl="./asset/image/lub"+theRating+".png";
                            }else if(place.types[0]=="restaurant"){
                                iconurl="./asset/image/restaurant"+theRating+".png";
                            }else if(place.types[0]=="bar"){
                                iconurl="./asset/image/bar"+theRating+".png";
                            }
                            options.icon = {
                                url: iconurl,
                                scaledSize: new google.maps.Size(32,32)
                            };




                            var marker = new google.maps.Marker(options);
                            google.maps.event.addListener(marker, 'click', function() {
                                myMaps.NearBy.infowindow.setContent(function(){
                                    var content = $("<div />").css({'overflow':'hidden'}).append(
                                        $("<div />").addClass("text-center").css({
                                            'border-width':'0 0 1px 0',
                                            'border-style':'dotted',
                                            'border-color':'#000',
                                            'font-size': '16pt'
                                        }).append($("<a />").attr({
                                            'href':place.url,
                                            'target':'_blank'
                                        }).text(place.name)).append(
                                            $("<span />").css({
                                                'border-color':'#000',
                                                'font-size': '10pt',
                                                'position':'relative',
                                                'top':'-2px'
                                            }).text(function(){
                                                    if(place.hasOwnProperty('opening_hours')){
                                                        return ' - ' + ((place.opening_hours.open_now)? "Now Open" : "Now Close")
                                                    }else{
                                                        return '';
                                                    }
                                                }()
                                            )
                                        )
                                    ).append(
                                        $("<div />").addClass('row info-windows-row').append(
                                            $("<div />").addClass('col-xs-3').append($("<strong />").text("Address: "))
                                        ).append(
                                            $("<div />").addClass('col-xs-9').append(
                                                $("<span />").attr({
                                                    'onclick': "myMaps.NearBy.routeTo({lat:" + place.geometry.location.lat() + ", lng:" + place.geometry.location.lng() + "})"
                                                }).css({
                                                    color: '#009688',
                                                    cursor: 'pointer'
                                                }).text(place.formatted_address)
                                            )
                                        )
                                    ).append(
                                        $("<div />").addClass('row info-windows-row').append(
                                            $("<div />").addClass('col-xs-3').append($("<strong />").text("Rating: "))
                                        ).append(
                                            $("<div />").addClass('col-xs-9').append($("<span />").text((place.rating==undefined ? " -- " : place.rating)))
                                        )
                                    ).append(
                                        $("<div />").addClass('row info-windows-row').append(
                                            $("<div />").addClass('col-xs-3').append($("<strong />").text("Phone Number: "))
                                        ).append(
                                            $("<div />").addClass('col-xs-9').append($("<span />").text((place.formatted_phone_number==undefined ? " -- " : place.formatted_phone_number)))
                                        )
                                    );
                                    if(place.hasOwnProperty('website')){
                                        content.append(
                                            $("<div />").addClass('row info-windows-row').append(
                                                $("<div />").addClass('col-xs-3').append($("<strong />").text("Website: "))
                                            ).append(
                                                $("<div />").addClass('col-xs-9').append(
                                                    $("<a />").attr({
                                                        'href':place.website,
                                                        'target': '_blank'
                                                    }).html(
                                                        $("<span />")
                                                            .addClass("glyphicon glyphicon-new-window")
                                                            .html(
                                                            $("<span />").css({
                                                                'overflow':'hidden',
                                                                'font-family':'Roboto,Arial,sans-serif'
                                                            }).text( ' ' + place.website)
                                                        )
                                                    )
                                                )
                                            )
                                        );
                                    }
                                    if(place.hasOwnProperty('opening_hours')){
                                        content.append(
                                            $("<div />").addClass('info-windows-row').append($("<strong />").text("Open Hours: "))
                                        );
                                        for(var i=0;i<place.opening_hours.weekday_text.length;i++){
                                            var text = place.opening_hours.weekday_text[i];
                                            var text_week = text.substr(0,text.indexOf(':')+1);
                                            var text_hour = text.substr(text.indexOf(':')+1,text.length-1);

                                            content.append(
                                                $("<div />").addClass("row info-windows-row").append(
                                                    $("<div />").addClass("col-xs-3").css({'font-weight':'bold'}).text(' - ' + text_week)
                                                ).append(
                                                    $("<div />").addClass("col-xs-9").css({
                                                        'font-weight': function(){
                                                            var today = (new Date()).getDay();
                                                            console.log(today + " - " + i);
                                                            if((i+1) == today){
                                                                return 'bold';
                                                            }else if(today == 0 && i == 6){
                                                                return 'bold';
                                                            }else{
                                                                return 'auto';
                                                            }
                                                        }()
                                                    }).text(text_hour)
                                                )
                                            )
                                        }
                                    }

                                    if(place.hasOwnProperty('photos')){
                                        //<a href="images/image-2.jpg" data-lightbox="roadtrip">Image #2</a>
                                        var div = $("<div />").append("<br />").append($("<div />").addClass('info-windows-row').append($("<strong />").text("Photos: ")));
                                        for(var i in place.photos){
                                            div.append(
                                                $("<a />").attr({
                                                    'href': place.photos[i].getUrl({'maxWidth': 1000, 'maxHeight': 1000}),
                                                    'data-lightbox': 'photoOf' + place.name,
                                                    'data-title': 'Photo of ' + place.name
                                                }).html(
                                                    $("<img />").addClass("placeImageBorder").attr({
                                                        "src": place.photos[i].getUrl({'maxWidth': 300, 'maxHeight': 300})
                                                    })
                                                )
                                            );
                                        }
                                        content.append(div);
                                    }

                                    if(place.hasOwnProperty('reviews')){
                                        console.log('Has reviews');
                                        console.dir(place.reviews)
                                    }

                                    return content[0].outerHTML
                                }());
                                myMaps.NearBy.infowindow.open(myMaps.currentMap, this);
                            });
                        }
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
            },
            directionsDisplay: undefined,
            routeTo: function(latlng){
                directionsService = new google.maps.DirectionsService();
                if (myMaps.NearBy.directionsDisplay){
                    myMaps.NearBy.directionsDisplay.setMap(null);
                }else{
                    myMaps.NearBy.directionsDisplay = new google.maps.DirectionsRenderer();
                }

                myMaps.NearBy.directionsDisplay.setMap(myMaps.currentMap);

                if(typeof latlng == 'string'){
                    var lat = parseFloat(latlng.split(',')[0]);
                    var lng = parseFloat(latlng.split(',')[1]);
                    latlng = {
                        lat: lat,
                        lng: lng
                    }
                }
                directionsService.route({
                    origin: {lat: 22.304265, lng: 114.179726},
                    destination: latlng,
                    travelMode: google.maps.DirectionsTravelMode.WALKING
                }, function (response, status) {
                    if (status == google.maps.DirectionsStatus.OK) {
                        myMaps.NearBy.directionsDisplay.setDirections(response);
                        var myRoute = response.routes[0];
                        var stepsList = $("<ol/>");
                        for (var i = 0; i < myRoute.legs[0].steps.length; i++) {
                            $("<li/>").html(myRoute.legs[0].steps[i].instructions).appendTo(stepsList);
                        }
                        $("#text-route-content").html("").append(stepsList);
                        $("#text-route").removeClass('hidden');
                    }
                });
                myMaps.NearBy.infowindow.close();
            }
        },
        smallMap:{
            init: function(){
                new google.maps.Map(document.getElementById('sMap'), {
                    center: {
                        lat: 22.352734,
                        lng: 114.132163
                    },
                    scaleControl: false,
                    zoomControl: false,
                    streetViewControl: false,
                    disableDoubleClickZoom: true,
                    scrollwheel: false,
                    draggable: false,
                    zoom: 9,

                });
            }
        }
    };

    return myMaps;
});

