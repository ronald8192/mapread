/**
 * Created by ronald8192 on 6/14/16.
 */

define(['jquery', 'googleMap', 'weatherData'], function ($, googleMap, weather) {
    return {
        hk: function () {
            new google.maps.Map($('#map')[0], {
                center: {
                    lat: 22.352734,
                    lng: 114.132163
                },
                zoom: 11
            });
        }
    };
});