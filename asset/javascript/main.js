/**
 * Created by ronald8192 on 6/14/16.
 */
define(['jquery', 'googleMap', 'myMaps','bootstrapMaterial'], function ($, googleMap, myMaps) {
    $(function(){
        myMaps.hk.init();
        $.material.init();
        //myMaps.NearBy.initMap();
        $(".nearby-type").click(function(e){
            e.preventDefault();
            var type = $(this).data("types");
            $("#nearby-showing-type").text($(this).text());
            myMaps.NearBy.types = type;
            myMaps.NearBy.initMap();
        });


        $("#hk-map-polygon-draw").click(function () {
            myMaps.hk.drawPolygon();
        });

        $("#hk-map-polygon-remove").click(function () {
            myMaps.hk.removePolygon();
        });
    });

});