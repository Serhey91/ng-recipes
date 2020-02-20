import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
  @Output() recipeItemSelected = new EventEmitter<string>()
  constructor() { }

  ngOnInit() {
  }

  onRecipeItemSelected():void {
    this.recipeItemSelected.emit(this.recipe.name);
  }
}
