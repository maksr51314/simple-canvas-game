'use strict'

var SLOW_CONNECTION_LEVEL = 1;
var IMAGE_PATH = 'img/';
var Y_POSITION = '217';
var imgs = [];

var Rows = [72, 305, 550 ];
var imagePaths = {
    "BG.png" : {x: 0, y: 0, index: 0},
    "BTN_Spin.png": {x: 825, y: Y_POSITION, index: 1},
    "SYM1.png": {x: 0, y: 0, index: 1},
    "SYM3.png": {x: 0, y: Y_POSITION, index: 1},
    "SYM4.png": {x: 0, y: Y_POSITION, index: 1},
    "SYM5.png": {x: 0, y: Y_POSITION, index: 1},
    "SYM6.png": {x: 0, y: Y_POSITION, index: 1},
    "SYM7.png": {x: 0, y: Y_POSITION, index: 1}
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
//(window.onresize = function(){
    can.width  = 960;
    can.height = 536;
//})();

//Function to play the exact file format
function playAudio(){
    var audio = new Audio("audio/example.wav");
    audio.play();
}

function loadImages(paths, whenLoaded){

    paths.forEach(function(path){
        var img = new Image();

        img.onload = function(){
            imgs.push(img);

            if (imgs.length == paths.length) {
                whenLoaded(_.indexBy(imgs, 'name'));
            }
        };

        setTimeout(function(){
            img.src = IMAGE_PATH + path;
            img.name = path;
            img.zIndex = imagePaths[path].index;
        }, SLOW_CONNECTION_LEVEL * 1000);
    });
}

function showImages(ctx, imgs) {
    var images = _.values(imgs).sort(function(a, b) {return imagePaths[a.name].index - imagePaths[b.name].index});
    images.forEach(function(img) {
        ctx.drawImage(img, imagePaths[img.name].x, imagePaths[img.name].y);
    })
}

function addEvents() {
    imgs[0].onkeydown = function() {
      console.log('sss')
    };

    var playBtn = document.getElementById('playButton');
    playBtn.addEventListener('click', function() {
        console.log('clicked');
    })
}

loadImages(Object.keys(imagePaths), function(imgs){
    console.log('Loaded');
    ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
    addEvents(imgs);
    showImages(ctx, imgs);

});



//
//window.requestAnimFrame = (function(callback) {
//    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
//        function(callback) {
//            window.setTimeout(callback, 1000 / 60);
//        };
//})();
//
//function drawRectangle(myRectangle, context) {
//    context.beginPath();
//    context.rect(myRectangle.x, myRectangle.y, myRectangle.width, myRectangle.height);
//    context.fillStyle = '#8ED6FF';
//    context.fill();
//    context.lineWidth = myRectangle.borderWidth;
//    context.strokeStyle = 'black';
//    context.stroke();
//}
//function animate(myRectangle, canvas, context, startTime) {
//    // update
//    var time = (new Date()).getTime() - startTime;
//
//    var linearSpeed = 100;
//    // pixels / second
//    var newX = linearSpeed * time / 1000;
//
//    if(newX < canvas.width - myRectangle.width - myRectangle.borderWidth / 2) {
//        myRectangle.x = newX;
//    }
//
//    // clear
//    context.clearRect(0, 0, canvas.width, canvas.height);
//
//    drawRectangle(myRectangle, context);
//
//    // request new frame
//    requestAnimFrame(function() {
//        animate(myRectangle, canvas, context, startTime);
//    });
//}
//var canvas = document.getElementById('myCanvas');
//var context = canvas.getContext('2d');
//
//var myRectangle = {
//    x: 0,
//    y: 75,
//    width: 100,
//    height: 50,
//    borderWidth: 5
//};
//
//
//setTimeout(function() {
//    var startTime = (new Date()).getTime();
//    animate(myRectangle, canvas, context, startTime);
//}, 1000);


//playAudio();

