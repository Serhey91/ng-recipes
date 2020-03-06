import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { IRecipe } from 'src/app/models/recipe.model';
import { Observable } from 'rxjs';
import { DataStorageService } from '../data-storage/data-storage.service';
import { RecipeService } from '../recipes/recipe.service';

@Injectable({providedIn: 'root'})
export class RecipesResolverService implements Resolve<IRecipe[]>{
  constructor(
    private dataStorage: DataStorageService,
    private recipesService: RecipeService
  ) {

  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
   Observable<IRecipe[]> | Promise<IRecipe[]> | IRecipe[]
   {
     const recipes = this.recipesService.getRecipes();
     if (recipes.length === 0) {
       return this.dataStorage.fetchRecipes();
     }

     return recipes;
   }
}
