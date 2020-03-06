import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { IRecipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipes/recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  private recipesSubscription: Subscription;
  private recipes: IRecipe[] = [];

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
    this.recipesSubscription = this.recipeService.recipesSubject.subscribe((recipes: IRecipe[]) => {
      this.recipes = recipes;
    })
  }
  ngOnDestroy() {
    this.recipesSubscription.unsubscribe();
  }
}
