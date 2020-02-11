import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'recipe-book';
  isRecipesShown: boolean = false;

  constructor() {}

  onRouteChanged(feature: string):void {
    this.isRecipesShown = feature === 'recipe' ? true : false;
  }
}
