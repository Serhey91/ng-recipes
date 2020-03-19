import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IRecipe } from 'src/app/models/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { Observable } from 'rxjs';
import { map, tap, take, exhaust, exhaustMap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
@Injectable({providedIn: 'root'})
export class DataStorageService {
  private DB_URL: string = 'https://ng-recipe-book-7f78a.firebaseio.com/recipes.json'
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
    ) {}


  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put(this.DB_URL, recipes)
    .subscribe((response) => console.log(response));
  }

  fetchRecipes(): Observable<IRecipe[]> {
    return this.http.get(this.DB_URL).pipe(
      map((recipes: IRecipe[]) => {
        return recipes.map((recipe: IRecipe) => ({
          ...recipe,
          ingredients: recipe.ingredients ? recipe.ingredients : []
        }))
      }),
      tap((recipes: IRecipe[]) => this.recipeService.setRecipes(recipes))
    )
  }
}
