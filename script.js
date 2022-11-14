var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var rez = document.getElementById("rez");
var opcije = document.getElementById("opcije");
var mainMenu = document.getElementById("main-menu");
var skor = document.getElementById("skor");
var eksplozija = document.getElementById("eksplodiraj");
var upute = document.getElementById("upute");

canvas.width  = 400;
canvas.height = 800;

score = 0;

let player = {
    x: 200,
    y: 400,
    direction: "none",
    boja: randomColor()
};
let newDirection = "none";

let object1 = {
    x: 170,
    y: 50,
    d1: 60,
    d2: 20,
    boja1: randomColor(),
    boja2: randomColor()
};

let object2 = {
    x: 20,
    y: 370,
    d1: 20,
    d2: 60,
    boja1: randomColor(),
    boja2: randomColor()
};


function randomColor(){
    var boja = getRandomInt(0, 8)
    switch(boja){
        case 0: return "#6600ff";
        case 1: return "#ffff66";
        case 2: return "#ff0000";
        case 3: return "#33cc33";
        case 4: return "#0f3d0f";
        case 5: return "#cc3399";
        case 6: return "#000099";
        case 7: return "#008080";
    }
}

function movePlayer(player, newDirection){
    if(player.direction == "desno" && newDirection == "lijevo") return -1;
    else if(player.direction == "lijevo" && newDirection == "desno") return -1;
    else if(player.direction == "gore" && newDirection == "dole") return -1;
    else if(player.direction == "dole" && newDirection == "gore") return -1;
    else if(newDirection == "dole"){
        player.direction = "dole";
        return 2;
    } 
    else if(newDirection == "gore"){
        player.direction = "gore";
        return 3;
    } 
    else if(newDirection == "lijevo") {
        player.direction = "lijevo";
        return 4;
    } 
    else if(newDirection =="desno") {
        player.direction = "desno";
        return 5;
    } 
}

function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.arc(player.x, player.y, 20, 0, 2 * Math.PI);
    ctx.fillStyle = player.boja;
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.rect(object1.x, object1.y, object1.d1, object1.d2);
    ctx.fillStyle = object1.boja1;
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.rect(object1.x, 800-object1.y, object1.d1, object1.d2);
    ctx.fillStyle = object1.boja2;
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.rect(object2.x, object2.y, object1.d2, object2.d2);
    ctx.fillStyle = object2.boja1;
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.rect(380-object2.x, object2.y, object2.d1, object2.d2);
    ctx.fillStyle = object2.boja2;
    ctx.fill();
    ctx.stroke();

    if(-1 == movePlayer(player, newDirection)){
        newDirection = "none";
        player.direction = "none"
    } else if(2 == movePlayer(player, newDirection)){
        player.y += 5;
        newDirection = "dole";
    } else if(3 == movePlayer(player, newDirection)){
        player.y -= 5;
        newDirection = "gore";
    } else if(4 == movePlayer(player, newDirection)){
        player.x -= 5;
        newDirection = "lijevo";
    } else if(5 == movePlayer(player, newDirection)){
        player.x += 5;
        newDirection = "desno";
    }

    if((object1.y == player.y-60 || 800-object1.y==player.y+40)&&(object1.x+60 >=player.x && object1.x<=player.x)){
        if(player.boja==object1.boja1 || player.boja==object1.boja2){
            score++;
        }
        else{
            explode();
        }
        player.boja = randomColor();
        object1.boja1 = randomColor();
        object1.boja2 = randomColor();
        object2.boja1 = randomColor();
        object2.boja2 = randomColor();

        rez.innerHTML = "Score: " + score;
        player.y = 400;
        player.x = 200;
        player.direction = "none";
        newDirection = "none";
    }

    if((object2.x == player.x-60 || 380-object2.x==player.x+40) && (object2.y+30 >= player.y && player.y>=object2.y)){
        if(player.boja==object2.boja1 || player.boja==object2.boja2){
            score++;
        }
        else{
            explode();
        }
        player.boja = randomColor();
        object1.boja1 = randomColor();
        object1.boja2 = randomColor();
        object2.boja1 = randomColor();
        object2.boja2 = randomColor();
        rez.innerHTML = "Score: " + score;
        player.y = 400;
        player.x = 200;
        player.direction = "none";
        newDirection = "none";
    }

    if(player.x == 0 || player.y ==0 || player.x==400|| player.y==800){
        explode();
    }

}

function plColor(){
    player.boja = randomColor();
}

function options(){
    mainMenu.style.display = "none";
    opcije.style.display = "flex";
}

function main(){
    mainMenu.style.display = "flex";
    opcije.style.display = "none";
    upute.style.display = "none";
}

function play(){
    mainMenu.style.display = "none";
    igra.style.display = "flex";
    
    animate();
}

function fullscreen() {
    if ((document.fullScreenElement && document.fullScreenElement !== null) ||
        (!document.mozFullScreen && !document.webkitIsFullScreen)) {
        if (document.documentElement.requestFullScreen) {
            document.documentElement.requestFullScreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullScreen) {
            document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        }
    } else {
        if (document.cancelFullScreen) {
            document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        }
    }
}

function explode(){
    igra.style.display = "none";
    skor.innerHTML = score;
    eksplozija.style.display = "flex";
}

function startNewGame(){
    location.reload();
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

function instructions(){
    mainMenu.style.display = "none";
    upute.style.display = "flex";
}