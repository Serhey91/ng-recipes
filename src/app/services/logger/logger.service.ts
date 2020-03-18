import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class LoggerService {
  lastLog: string;

  printLog(msg: string):void {
    console.log('CURRENT', msg);
    console.log('LAST', this.lastLog);
    this.lastLog = msg;
  }
}
