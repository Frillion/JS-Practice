"use strict";
document.addEventListener("DOMContentLoaded",domloaded,false);
function domloaded() {
    let canvas = document.getElementById("playspace");
    let ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    window.addEventListener("resize",()=>{
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
    class Pacman{
        constructor(radius,deg,x,y,vx,vy){
            this.pos = {"x":x,"y":y};
            this.vel={"x":vx,"y":vy};
            this.radius = radius;
            this.deg = deg;
            this.tag = "pacman";
        }
        draw(){
            ctx.beginPath();
            ctx.arc(this.pos.x, this.pos.y,this.radius,Math.PI/6,((this.deg/180)*Math.PI));
            ctx.lineTo(this.pos.x,this.pos.y);
            ctx.closePath();
            ctx.fillStyle = "rgb(200,200,0)";
            ctx.fill();
        }
    }
    class Ghost{
        constructor(size,x,y,vx,vy,color){
            this.pos = {"x":x,"y":y};
            this.vel = {"x":vx,"y":vy};
            this.origin = {"x":x+(size/2),"y":y+(size/2)};
            this.size = size;
            this.color = color;
            this.tag = "ghost";
        }
        draw(){
            ctx.fillStyle = this.color
            ctx.fillRect(this.pos.x,this.pos.y,this.size,this.size);
        }
    }
    function gameOverCollision(ghost,pacman){
        let distX = pacman.pos.x-ghost.pos.x;
        let distY = pacman.pos.y-ghost.pos.y;
        if(ghost.pos.x > pacman.pos.x){distX = pacman.pos.x-ghost.pos.x;}
        else if(ghost.pos.x+ghost.size<pacman.pos.x){distX = pacman.pos.x-(ghost.pos.x+ghost.size);}
        if(ghost.pos.y>pacman.pos.y){distY = pacman.pos.y-ghost.pos.y;}
        else if(ghost.pos.y+ghost.size<pacman.pos.y){distY = pacman.pos.y-(ghost.pos.y+ghost.size);}
        let distance = Math.sqrt((distX*distX)+(distY*distY));
        console.log(distX);
        if(distance <= pacman.radius){
            alert("Game Over!");
        }
    }
    function ghostCollision(ghost1,ghost2){
        let colors = ["green","yellow","blue","brown","black"]
        if(ghost1 === ghost2){return;}
            if(ghost2.pos.x+ghost2.size<ghost1.pos.x||
                ghost2.pos.x>ghost1.pos.x+ghost1.size||
                ghost2.pos.y+ghost2.size<ghost1.pos.y||
                ghost2.pos.y>ghost1.pos.y+ghost1.size){   
                    return false;
                }
            else{
                ghost1.color = colors[Math.floor(Math.random()*5)];
                ghost2.color = colors[Math.floor(Math.random()*5)];
                return true;
            }
    }
    function createGhosts(number){
        let returnarray = [];
        let colors = ["green","yellow","blue","brown","black"]
        for(let i = 0;i<number;i++){
            let posX = Math.floor(Math.random()*(canvas.width-50)+1);
            let posY = Math.floor(Math.random()*(canvas.height-50)+1);
            let velX = Math.floor((Math.random()*10)-5);
            let velY = Math.floor((Math.random()*10)-5);
            let color = colors[Math.floor(Math.random()*5)];
            returnarray.push(new Ghost(50,posX,posY,velX,velY,color));
        }
        return returnarray;
    }
    let ghosts = createGhosts(5);
    let pacman_speed = 5;
    let pacman = new Pacman(20,350,Math.random()*(canvas.width-10),Math.random()*(canvas.height-10),0,0);
    document.addEventListener('keydown',(key)=>{
        if(key.code == "KeyW"){
            pacman.vel.y = -pacman_speed;
        }
        else if(key.code == "KeyS"){
            pacman.vel.y = pacman_speed;
        }
        if(key.code == "KeyA"){
            pacman.vel.x = -pacman_speed;
        }
        else if(key.code == "KeyD"){
            pacman.vel.x = pacman_speed;
        }
    },false);
    document.addEventListener('keyup',(key)=>{
        if(key.code == "KeyW"){
            pacman.vel.y = 0;
        }
        else if(key.code == "KeyS"){
            pacman.vel.y = 0;
        }
        if(key.code == "KeyA"){
            pacman.vel.x = 0;
        }
        else if(key.code == "KeyD"){
            pacman.vel.x = 0;
        }
    },false);
    function init(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        pacman.draw();
        if(pacman.pos.x+pacman.radius>canvas.width){
            pacman.pos.x = canvas.width-pacman.radius;
        }
        else if(pacman.pos.x-pacman.radius < 0){
            pacman.pos.x = pacman.radius;
        }
        if(pacman.pos.y+pacman.radius>canvas.height){
            pacman.pos.y = canvas.height-pacman.radius;
        }
        else if(pacman.pos.y-pacman.radius< 0){
            pacman.pos.y = pacman.radius;
        }
        for(let i = 0; i < ghosts.length;i++){
            ghosts[i].draw();
        }
        ghosts.forEach((ghost)=>{gameOverCollision(ghost,pacman);}); 
        for(let i = 0;i<ghosts.length;i++){
            if(ghosts[i].pos.x + ghosts[i].size>=canvas.width||ghosts[i].pos.x <= 0){
                ghosts[i].vel.x = (-ghosts[i].vel.x);
            }
            if(ghosts[i].pos.y+ghosts[i].size>=canvas.height||ghosts[i].pos.y<=0){
                ghosts[i].vel.y = (-ghosts[i].vel.y);
            }
            ghosts.forEach((ghost)=>{
                ghostCollision(ghosts[i],ghost);
                
            });
            ghosts[i].pos.x += ghosts[i].vel.x;
            ghosts[i].pos.y += ghosts[i].vel.y;
        }
        pacman.pos.x += pacman.vel.x;
        pacman.pos.y += pacman.vel.y;
        window.requestAnimationFrame(init);
    }
    init();
}