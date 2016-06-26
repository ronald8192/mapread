/**
 * Created by ronald8192 on 6/14/16.
 */
define(['jquery', 'googleMap', 'myMaps','bootstrapMaterial','jqueryui','lightbox2'], function ($, googleMap, myMaps) {
    $(function(){
        myMaps.NearBy.initMap();
        myMaps.smallMap.init();

        var nearbyType = [
            {name:'cafe',text:'Cafe'},
            {name:'night_club',text:'Night Club'},
            {name:'restaurant',text:'Restaurant'},
            {name:'bar',text:'Bar'}
        ];

        for(var n in nearbyType){
            $("#types-option").append(
                $("<div />").addClass('row').append(
                    $("<div />").addClass('col-xs-2').append(
                        $("<img />").attr({
                            'src':'asset/image/' + nearbyType[n].name + '0.png'
                        }).css({
                            'height':'36px',
                            'width':'36px',
                            'margin-top':'0px',
                            'margin-bottom':'4px',
                        })
                    )
                ).append(
                    $("<div />").addClass('col-xs-10').append(
                        $("<span />")
                            .css({
                                'margin-top':'4px',
                                'margin-bottom':'4px',
                            })
                            .addClass("btn btn-default btn-raised btn-sm nearby-type")
                            .data("types",nearbyType[n].name)
                            .text(nearbyType[n].text)
                    )
                )
            );
        }

        $(".nearby-type").click(function(e){
            e.preventDefault();
            var type = $(this).data("types");
            $("#nearby-showing-type").text($(this).text());
            myMaps.NearBy.types = type;
            myMaps.NearBy.initMap();

            $.each($(".rating-icon"), function (k, v) {
                setTimeout(function(){
                    $(v).animate({opacity: 0}, 'fast', function() {
                        $(v).attr({
                            src:'asset/image/' + myMaps.NearBy.types + $(v).data('rate') + ".png"
                        }).animate({opacity: 1});
                    });
                },k*50);
            });

            myMaps.currentMap.addListener('zoom_changed', function(){
                console.log("Zoom Level: " + myMaps.currentMap.getZoom() + ", Meters per pixel: " + (156543.03392 * Math.cos(myMaps.currentMap.getCenter().lat() * Math.PI / 180) / Math.pow(2, myMaps.currentMap.getZoom())));

            });
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

        $("#title-text").click(function(){
            myMaps.currentMap.setCenter({lat:22.304265, lng:114.179726});
            myMaps.currentMap.setZoom(16)
        });

        $("#text-route-hide").click(function(){
            $("#text-route").addClass("hidden");
            myMaps.NearBy.directionsDisplay.setMap(null);
        });

        $.material.init();
    });

});