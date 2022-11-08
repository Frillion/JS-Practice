"use strict";
document.addEventListener("DOMContentLoaded",domloaded,false);
function domloaded() {
    let canvas = document.getElementById("playspace");
    let ctx = canvas.getContext("2d");
    class Pacman{
        constructor(radius,deg,x,y,vx,vy){
            this.pos = {"x":x,"y":y};
            this.vel={"x":vx,"y":vy};
            this.radius = radius;
            this.deg = deg;
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
        }
        draw(){
            ctx.fillStyle = this.color
            ctx.fillRect(this.pos.x,this.pos.y,this.size,this.size);
        }
    }
}