"use strict";
let personal_info = {name:"Friðrik Fannar Söebech",
                     dob:new Date('2001-08-09'),
                     email:["fridriksoebech@gmail.com",undefined,undefined],
                     getInfo:function(){return `Name: ${this.name}\nAge: ${new Date().getFullYear()-this.dob.getFullYear()}`}};


console.log(personal_info.getInfo());

class User {
    constructor(name,email){
        this._name = name;
        this.email = email;
    }
    get name(){return this._name;}
    set name(value){this._name = value;}
};
let user = new User("Tod","Tod@gmail.com");
console.log(user.name);
console.log(user.email);

class Animal{
    constructor(name){
        this.name = name;
        this.speed = 0;
    }
    run(){
        this.speed += 1;
    }
};
class Rabbit extends Animal{
    constructor(name){
        super(name);
        this.jumpforce = 0;
    }
    jump(){
        this.jumpforce += 3;
    }
};

let new_rabbit = new Rabbit("White Rabbit");
/*Tests to see if inharitance works*/
/*
    console.log(new_rabbit.name);
    console.log(new_rabbit.speed);
    console.log(new_rabbit.jumpforce);
    new_rabbit.run();
    new_rabbit.jump();
    console.log(new_rabbit.speed);
    console.log(new_rabbit.jumpforce);
*/