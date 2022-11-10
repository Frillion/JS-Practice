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
        borderCheck(){
            if(this.pos.x+this.radius>canvas.width){
                this.pos.x = canvas.width-this.radius;
            }
            else if(this.pos.x-this.radius < 0){
                this.pos.x = this.radius;
            }
            if(this.pos.y+this.radius>canvas.height){
                this.pos.y = canvas.height-this.radius;
            }
            else if(this.pos.y-this.radius< 0){
                this.pos.y = this.radius;
            }
        }
        move(){
            pacman.pos.x += pacman.vel.x;
            pacman.pos.y += pacman.vel.y;
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
        borderCheck(){
            if(this.pos.x + this.size>=canvas.width||this.pos.x <= 0){
                this.vel.x = (-this.vel.x);
            }
            if(this.pos.y+this.size>=canvas.height||this.pos.y<=0){
                this.vel.y = (-this.vel.y);
            }
        }
        move(){
            this.pos.x += this.vel.x;
            this.pos.y += this.vel.y;
        }
    }
    class Point{
        constructor(radius,x,y,color){
            this.pos = {"x":x,"y":y};
            this.radius = radius;
            this.color = color;
        }
        draw(){
            ctx.beginPath();
            ctx.arc(this.pos.x,this.pos.y,this.radius,0,12*Math.PI/6);
            ctx.closePath();
            ctx.fillStyle = this.color;
            ctx.fill();
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
    let points = [];
    let pacman_speed = 5;
    let pacman = new Pacman(20,350,Math.random()*(canvas.width-10),Math.random()*(canvas.height-10),0,0);
    document.addEventListener('click',(MouseEvent)=>{
        let canvas_click_x = MouseEvent.offsetX;
        let canvas_click_y = MouseEvent.offsetY;
        points.forEach(((point) =>{
            let p_distX = point.pos.x - canvas_click_x;
            let p_distY = point.pos.y - canvas_click_y;
            let p_distance = Math.sqrt((p_distX*p_distX) + (p_distY*p_distY));
            if(p_distance<=point.radius){
                points.pop(point);
            }
        }));
    });
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
    function makePoint(){
        let add_point = new Point(5,Math.floor((Math.random()*canvas.width)-5),Math.floor((Math.random()*canvas.height)-5),"Yellow");
        points.push(add_point);
    }
    window.setInterval(makePoint,5000);
    function init(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        if(points.length > 0){
            points.forEach((point)=>{point.draw()});
        }
        pacman.draw();
        pacman.borderCheck();
        for(let i = 0; i < ghosts.length;i++){
            ghosts[i].draw();
        }
        ghosts.forEach((ghost)=>{gameOverCollision(ghost,pacman);}); 
        for(let i = 0;i<ghosts.length;i++){
            ghosts[i].borderCheck();
            ghosts.forEach((ghost)=>{
                ghostCollision(ghosts[i],ghost); 
            });
            ghosts[i].move(); 
        }
        pacman.move(); 
        window.requestAnimationFrame(init);
    }
    init();
}