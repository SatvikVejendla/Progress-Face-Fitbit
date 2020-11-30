import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import * as util from "../common/utils";
import { today, goals } from 'user-activity';
import { me as appbit } from 'appbit';

// Update the clock every minute
clock.granularity = "seconds";

// Get a handle on the <text> element
const myLabel = document.getElementById("clock-label");
const stepsgoal = document.getElementById("stepsgoal");
const caloriegoal = document.getElementById("caloriegoal");
let root = document.getElementById('root');
const wi = root.height;
// Update the <text> element every tick with the current time
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
    let calories = today.adjusted.calories;
    const w = wi * value;
      console.log(w);
      stepsgoal.height = w;
  }
  myLabel.text = `${hours}:${mins}:${seconds}`;
});

