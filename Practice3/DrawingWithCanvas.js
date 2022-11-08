document.addEventlistener("DOMContentLoaded",domloaded(),false);
function domloaded(){
    let canvas = document.getElementById("playspace");
    let ctx = canvas.getContext("2d");
    class Pacman{
        constructor(radius,deg,x,y,vx,vy){
            this.pos = {"x":undefined,"y":undefined};
            this.vel={"x":undefined,"y":undefined};
            this.radius = radius;
            this.deg = deg;
            this.pos.x=x;
            this.pos.y=y;
            this.vel.x=vx;
            this.vel.y=vy;
        }
        draw(){
            ctx.beginPath();
            ctx.arc(pacman.pos.x, pacman.pos.y,pacman.radius,Math.PI/6,((pacman.deg/180)*Math.PI));
            ctx.lineTo(pacman.pos.x,pacman.pos.y);
            ctx.closePath();
            ctx.fillStyle = "rgb(200,200,0)";
            ctx.fill();
        }
    };
    
    let pacman = new Pacman(10,350,15,15,1,1);
    
    function init(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        pacman.draw();
        if(pacman.pos.x+pacman.radius<canvas.width){
            pacman.vel.x= -pacman.vel.x;
        }
        pacman.pos.x += pacman.vel.x;
        pacman.pos.y += pacman.vel.y;
        window.requestAnimationFrame(init);
    }
    init();
}