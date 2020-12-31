import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import * as util from "../common/utils";
import { today, goals } from 'user-activity';
import { me as appbit } from 'appbit';


clock.granularity = "seconds";


const myLabel = document.getElementById("clock-label");
const background = document.getElementById("background");
let root = document.getElementById('root');
const wi = root.height;

clock.addEventListener("tick", (evt) => {
  let today2 = evt.date;
  let hours = today2.getHours();
  
  hours = hours % 12;
  if(hours == 0){
    hours = 12;
  }
  let mins = util.zeroPad(today2.getMinutes());
  
  let seconds = util.zeroPad(today2.getSeconds());
  if (appbit.permissions.granted("access_activity")) {
    let steps = today.adjusted.steps;
    const value = steps/(goals.steps);
    
    const val = parseInt(255 * value);
    if(val > 255){
      val = 255;
    }
    const hex = rgbToHex(val, 0, 0);
    const hex2 = rgbToHex(0,0,val);
    
    background.gradient.colors.c1 = hex;
    background.gradient.colors.c2 = hex2;
    
  }
  myLabel.text = `${hours}:${mins}:${seconds}`;
});


function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

