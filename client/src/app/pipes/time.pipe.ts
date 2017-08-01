import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(value: any, unit:string): any {
    let res = "";
    let days = 0;
    let hours = 0;
    let minutes = 0;
    let seconds = 0;
    switch (unit) {
      case "d":
      case "day":
      case "days":
        days = value;
        break;
      case "h":
      case "hours":
        hours = value;
        break;
      case "m":
      case "min":
      case "minutes":
        minutes = value;
        break;
      case "s":
      case "sec":
      case "seconds":
        seconds = value;
        break;
      default:
        console.log("invalid time unit", unit);
        return value;
    }
    if (seconds > 60) {
      minutes = Math.floor(seconds / 60);
      seconds = seconds % 60;
    }
    if (minutes > 60) {
      hours = Math.floor(minutes / 60);
      minutes = minutes % 60;
    }
    if(hours > 24){
      days = Math.floor(hours / 24);
      hours = hours % 24;
    }
    if(days != 0){
      res += days + "d ";
    }
    if (hours != 0) {
      res += hours + "h ";
    }
    if (minutes != 0) {
      res += minutes + "m ";
    }
    if (seconds != 0) {
      res += seconds + "s";
    }
    return res;
  }

}
