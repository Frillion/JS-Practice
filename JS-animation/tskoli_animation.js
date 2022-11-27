"use strict";
document.addEventListener("DOMContentLoaded",domloaded,false);
function domloaded(){
    const svg = document.getElementsByTagName("svg")[0];
    const orange_stripe = document.getElementById("orange");
    const stripes = document.getElementsByTagName("path");
    const line_colors = ["orange","blue","cyan","cyan"];
    for(let i=0; i < stripes.length;i++){
        stripes[i].style.strokeDasharray = 100;
        stripes[i].style.strokeDashoffset = 0;
        stripes[i].style.strokeWidth = 0.5;
        stripes[i].style.fill = "white";
        stripes[i].style.stroke = line_colors[i];
    }
    svg.style.width = window.innerWidth;
    svg.style.height = window.innerHeight;
    svg.style.transformOrigin = "center";
    const animateLine = anime({
        targets:stripes,
        strokeDashoffset:[100,0],
        easing:'easeInOutQuad',
        direction:'alternate',
        delay:anime.stagger(500),
        duration:5000,
        loop:true
    });
    const animateOrangeClick = anime({
        targets:orange_stripe,
        keyframes:[
            {stroke:"orange",fill:"white"},
            {stroke:"white",fill:"#F47A20"}
        ],
        duration:3000
    });
    const playAnimOrange = () =>{
        animateLine.play();
    }
    const pauseAnimOrange = ()=>{
        animateLine.pause();
    }
    animateOrangeClick.pause();
    orange_stripe.parentElement.addEventListener("mouseover",playAnimOrange);
    orange_stripe.parentElement.addEventListener("mouseleave",pauseAnimOrange);
    orange_stripe.parentElement.onclick = animateOrangeClick.play;
}