/**
 * Created by ronald8192 on 6/14/16.
 */
define(['jquery', 'googleMap', 'myMaps','bootstrapMaterial','jqueryui'], function ($, googleMap, myMaps) {
    $(function(){
        myMaps.hk.init();
        $.material.init();


        var nearbyType = [
            {name:'cafe',text:'Cafe'},
            {name:'night_club',text:'Night Club'},
            {name:'restaurant',text:'Restaurant'},
            {name:'bar',text:'Bar'}
        ];
        for(var n in nearbyType){
            $("#optionButton").append(
                $("<button />").addClass("btn btn-default btn-raised nearby-type").data("types",nearbyType[n].name).text(nearbyType[n].text)
            );
            //nearbyType[n]
        }

        $(".nearby-type").click(function(e){
            e.preventDefault();
            var type = $(this).data("types");
            $("#nearby-showing-type").text($(this).text());
            myMaps.NearBy.types = type;
            myMaps.NearBy.initMap();

            myMaps.currentMap.addListener('zoom_changed', function(){
                console.log(myMaps.currentMap.getZoom());
            });
        });


        $("#hk-map-polygon-draw").click(function () {
            myMaps.hk.drawPolygon();
        });

        $("#hk-map-polygon-remove").click(function () {
            myMaps.hk.removePolygon();
        });

        $("#option-show").click(function() {
            $("#option-show").addClass('hidden');
            $("#optionPane").animate({
                right: '16px'
            },500, 'easeOutQuart',function(){

            });
        });
        $("#option-hide").click(function(){
            $("#optionPane").animate({
                right: '-210px'
            },500, 'easeOutQuart',function(){
                $("#option-show").removeClass('hidden');
            });
        });


    });

});

