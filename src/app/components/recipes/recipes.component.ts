import { Component, OnInit } from '@angular/core';
import { IRecipe } from 'src/app/models/recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  selectedRecipe: IRecipe = null;
  constructor() { }

  ngOnInit() {
  }

  onRecipeSelectedAtList(recipe: IRecipe):void {
    this.selectedRecipe = recipe;
  }
}
