
'use strict'

var SLOW_CONNECTION_LEVEL = 1;
var IMAGE_PATH = 'img/';
var Y_POSITION = '217';

var imagePaths = {
    "BG.png" : {x: 0, y: 0},
    "Bet_Line.png": {x: 0, y: 0},
    "BTN_Spin.png": {x: 825, y: Y_POSITION},
    "SYM1.png": {x: 200, y: 0},
    "SYM3.png": {x: 300, y: Y_POSITION},
    "SYM4.png": {x: 550, y: Y_POSITION},
    "SYM5.png": {x: 305, y: Y_POSITION},
    "SYM6.png": {x: 72, y: Y_POSITION},
    "SYM7.png": {x: 0, y: Y_POSITION}
};


var can  = document.querySelector('canvas'),
    ctx  = can.getContext('2d');

//show loading
var loading = new Image();
loading.src = IMAGE_PATH + 'BTN_Spin_d.png';
loading.onload = function() {
    ctx.drawImage(this, can.width/2 - this.width/2, can.height/2 - this.height/2);
};


// Dynamically resize the canvas to be its CSS displayed size
(window.onresize = function(){
    can.width  = 960;
    can.height = 536;
})();

//// Display a temporary loading message; will be erased by animation
//ctx.textAlign    = 'center';
//ctx.textBaseline = 'middle';


// Load images and run the whenLoaded callback when all have loaded;
// The callback is passed an array of loaded Image objects.
function loadImages(paths, whenLoaded){
    var imgs = [];

    paths.forEach(function(path){
        var img = new Image();

        img.onload = function(){
            imgs.push(img);

            if (imgs.length == paths.length) {
                whenLoaded(imgs);
            }
        };

        setTimeout(function(){
            img.src = IMAGE_PATH + path;
            img.name = path;
        }, SLOW_CONNECTION_LEVEL * 1000);
    });
}

function showImages(ctx, imgs) {
    imgs.forEach(function(img) {
        ctx.drawImage(img, imagePaths[img.name].x, imagePaths[img.name].y);
    })
}

loadImages(Object.keys(imagePaths), function(imgs){
    console.log('Loaded');
    ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
    showImages(ctx, imgs)
});

