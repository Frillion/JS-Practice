document.addEventlistener("DOMContentLoaded",domloaded(),false);
function domloaded(){
    class Pacman{
        constructor(radius,deg,x,y){
            this.pos = {"x":undefined,"y":undefined};
            this.radius = radius;
            this.deg = deg;
            this.pos.x=x;
            this.pos.y=y;
        }
    };
    let canvas = document.getElementById("playspace");
    let ctx = canvas.getContext("2d");
    ctx.fillStyle = "rgb(200,200,0)";
    let pacman = new Pacman(10,350,15,15);
    ctx.beginPath();
    ctx.arc(pacman.pos.x, pacman.pos.y,pacman.radius,Math.PI/6,((pacman.deg/180)*Math.PI));
    ctx.lineTo(pacman.pos.x,pacman.pos.y);
    ctx.fill();
}