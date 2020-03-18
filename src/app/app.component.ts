import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { LoggerService } from './services/logger/logger.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'recipe-book';

  constructor(
    private authService: AuthService,
    private logger: LoggerService
  ) {}

  ngOnInit() {
    this.logger.printLog('app.component.ts works');
    this.authService.autoLogin();
  }
}
