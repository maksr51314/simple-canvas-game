'use strict'

var SLOW_CONNECTION_LEVEL = 1;
var IMAGE_PATH = 'img/';
var Y_POSITION = '217';
var imgs = [];

var can  = document.querySelector('canvas'),
    ctx  = can.getContext('2d');

can.width  = 960;
can.height = 536;

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

//loading
var loading = new Image();
loading.src = IMAGE_PATH + 'BTN_Spin_d.png';
loading.onload = function() {
    ctx.drawImage(this, can.width/2 - this.width/2, can.height/2 - this.height/2);
};


//audio
function playAudio(){
    var audio = new Audio("audio/example.wav");
    audio.play();
}


//load all images
function loadImages(paths, whenLoaded){

    paths.forEach(function(path){
        var img = new Image();

        img.onload = function(){
            imgs.push(img);

            if (imgs.length == paths.length) {
                imgs = _.indexBy(imgs, 'name');
                whenLoaded(imgs);
            }
        };

        setTimeout(function(){
            img.src = IMAGE_PATH + path;
            img.name = path;
            img.zIndex = imagePaths[path].index;
        }, SLOW_CONNECTION_LEVEL * 1000);
    });
}


//drow some image
function drawImage (imgs, key, x, y) {
    var xPos = x || imagePaths[imgs[key].name].x;
    var yPos = y || imagePaths[imgs[key].name].y;

    ctx.drawImage(imgs[key], xPos, yPos);
}

//show default images
function showImages(imgs) {
    drawImage(imgs, 'BG.png');
    drawImage(imgs, 'BTN_Spin.png');
}

//reset background
function resetBg(callback, isBgNotExist) {
    setTimeout(function() {
        ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);

        if (!isBgNotExist) {
            showImages(imgs);
        }

        if (_.isFunction(callback)) {
            callback();
        }

    }, 1000)
}

//default win
function win() {
    drawImage(imgs, "SYM4.png", Rows[0], Y_POSITION);
    drawImage(imgs, "SYM4.png", Rows[1], Y_POSITION);
    drawImage(imgs, "SYM4.png", Rows[2], Y_POSITION);

    resetBg(function() {
        drawImage(imgs, "SYM1.png", Rows[1], Y_POSITION);
        playAudio();

        setTimeout(function() {
            resetBg();
        }, 2000);
    }, true);
}

//default fail
function fail() {
    drawImage(imgs, "SYM3.png", Rows[0], Y_POSITION);
    drawImage(imgs, "SYM4.png", Rows[1], Y_POSITION);
    drawImage(imgs, "SYM5.png", Rows[2], Y_POSITION);

    resetBg();
}

//add events on play button
function addEvents() {
    var settings;

    var playBtn = document.getElementById('playButton');
    playBtn.addEventListener('click', function() {
        settings = document.getElementById('settings').selectedIndex;

        if (settings === 0) {
            win();
        } else {
            fail();
        }
    })
}

//load images
loadImages(Object.keys(imagePaths), function(imgs){
    console.log('Loaded');
    ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);

    showImages(imgs);
    addEvents(imgs);
});


