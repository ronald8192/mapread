/**
 * Created by ronald8192 on 6/14/16.
 */
define(['jquery', 'googleMap', 'myMaps','bootstrapMaterial'], function ($, googleMap, myMaps) {
    $(function(){
        //myMaps.hk();
        $.material.init();
        myMaps.NearBy.initMap();
        $(".nearby-type").click(function(e){
            e.preventDefault();
            var type = $(this).data("types");
            $("#nearby-showing-type").text($(this).text());
            myMaps.NearBy.types = type;
            myMaps.NearBy.initMap();
        });

    });

});