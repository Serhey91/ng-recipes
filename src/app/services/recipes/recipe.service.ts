import { Injectable } from '@angular/core';
import { IRecipe } from 'src/app/models/recipe.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipes: IRecipe[] = [];

  recipesSubject: Subject<IRecipe[]> = new Subject<IRecipe[]>()

  getRecipes():IRecipe[] {
    return [...this.recipes];
  }

  getOneRecipe(id: number):IRecipe {
    return this.getRecipes()[id];
  }

  addNewRecipe(recipe: IRecipe): void {
    this.recipes.push(recipe);
    this.recipesObserve();
  }

  updateRecipe(index: number, recipe: IRecipe): void {
    this.recipes[index] = recipe;
    this.recipesObserve();
  }

  deleteRecipe(index: number): void {
    this.recipes.splice(index, 1);
    this.recipesObserve();
  }

  setRecipes(recipes: IRecipe[]) {
    this.recipes = recipes;
    this.recipesObserve();
  }

  private recipesObserve() {
    this.recipesSubject.next([...this.recipes]);
  }
}
