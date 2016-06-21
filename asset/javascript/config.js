/**
 * Created by ronald8192 on 6/14/16.
 */

requirejs.config({
    baseUrl:'asset/javascript',
    paths: {
        jquery:[
            'https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min'
        ],
        jqueryui:[
            'vendor/jquery-ui/jquery-ui.min',
            'https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min'
        ],
        googleMap: [
            'https://maps.googleapis.com/maps/api/js?v=3&key=AIzaSyDy2zbjVhDMNQaqhXd8-MMI2VfcKXo5978&libraries=places'
        ],
        bootstrap: [
            'vendor/bootstrap/dist/js/bootstrap.min'
        ],
        bootstrapMaterialRipples: [
            'vendor/bootstrap-material-design/dist/js/ripples.min'
        ],
        bootstrapMaterial: [
            'vendor/bootstrap-material-design/dist/js/material.min'
        ],
        lightbox2: [
            'vendor/lightbox2/dist/js/lightbox.min'
        ]

    },
    shim: {
        'jqueryui':{
            deps: ['jquery']
        },
        'bootstrap': {
            deps: ['jquery']
        },
        'bootstrapMaterialRipples': {
            deps: ['jquery']
        },
        'bootstrapMaterial': {
            deps: ['jquery','bootstrap','bootstrapMaterialRipples']
        },
        'lightbox2':{
            deps: ['jquery']
        }
    }
});