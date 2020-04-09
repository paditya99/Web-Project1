var req=require('./main2');
console.log(req.a);
console.log(__filename);
var func=function(){
    this.name="Aditya Pathak";
}
var a=new func();
console.log(a.name);

//custom events

const events=require("events");
const event=new events.EventEmitter();

event.on('click',()=>console.log("First event created"));
event.emit('click');

//creating events one in another

const first_event=function(a,b){
    console.log(a*b);
    event.emit('click2');
}

const second_event=function(a,b){
    console.log("Second event triggered")
}
event.on('click2',second_event);

event.on('click',first_event);
event.emit('click',4,5);