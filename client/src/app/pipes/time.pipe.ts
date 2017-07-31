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
    if(unit === "d"){
      let days = value;
    }
    if(unit === "h"){
      let hours = value;
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
