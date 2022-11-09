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
            this.size = size;
            this.color = color;
            this.tag = "ghost";
        }
        draw(){
            ctx.fillStyle = this.color
            ctx.fillRect(this.pos.x,this.pos.y,this.size,this.size);
        }
    }
    let ghost = new Ghost(25,10,10,2,1,"blue");
    function CollisionDetection(obj1,obj2){
       if(obj1.tag == "ghost"){
        if(obj2.tag == "ghost"){

        }
        else{

        }
       }
       else{
        if(obj2.tag == "ghost"){

        }
        else{
            
        }
       } 
    }
    function init(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ghost.draw();
        if(ghost.pos.x + ghost.size>=canvas.width||ghost.pos.x <= 0){
            ghost.vel.x = (-ghost.vel.x);
        }
        if(ghost.pos.y+ghost.size>=canvas.height||ghost.pos.y<=0){
            ghost.vel.y = (-ghost.vel.y);
        }
        ghost.pos.x += ghost.vel.x;
        ghost.pos.y += ghost.vel.y;
        window.requestAnimationFrame(init);
    }
    init();
}