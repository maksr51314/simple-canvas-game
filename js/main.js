
'use strict'

var SLOW_CONNECTION_LEVEL = 1;
var IMAGE_PATH = 'img/';

var imagePaths = [
    "BG.png",
    "Bet_Line.png",
    "BTN_Spin.png",
    "SYM1.png",
    "SYM3.png",
    "SYM4.png",
    "SYM5.png",
    "SYM6.png",
    "SYM7.png"
];

var can  = document.querySelector('canvas'),
    ctx  = can.getContext('2d');

//show loading
var loading = new Image();
loading.src = IMAGE_PATH + 'BTN_Spin_d.png';
loading.onload = function() {
    ctx.drawImage(this, 0, 0);
};

// Dynamically resize the canvas to be its CSS displayed size
(window.onresize = function(){
    can.width  = 800;
    can.height = 800;
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
        }, SLOW_CONNECTION_LEVEL * 1000);
    });
}

function showImages(ctx, imgs) {
    imgs.forEach(function(img) {
        ctx.drawImage(img, 0, 0);
    })
}

loadImages(imagePaths,function(imgs){
    console.log('Loaded');
    ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
    showImages(ctx, imgs)
});

