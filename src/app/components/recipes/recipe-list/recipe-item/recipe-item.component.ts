import { Component, OnInit, Input } from '@angular/core';
import { IRecipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipes/recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: IRecipe;
  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
  }

  onRecipeItemSelected():void {
    this.recipeService.recipeSelected.emit(this.recipe);
  }
}
