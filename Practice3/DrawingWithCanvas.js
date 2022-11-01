document.addEventlistener("DOMContentLoaded",domloaded(),false);
function domloaded(){
    let canvas = document.getElementById("playspace");
    let ctx = canvas.getContext("2d");
    ctx.fillStyle = "rgb(200,0,0)";
    ctx.fillRect(0,0,canvas.width,canvas.height);
}