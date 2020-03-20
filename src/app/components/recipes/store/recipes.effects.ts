import { Actions, Effect, ofType } from '@ngrx/effects';
import { RECIPES_ACTIONS, SetRecipesAction } from './recipes.action';
import { switchMap, map, tap, withLatestFrom } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { IRecipe } from 'src/app/models/recipe.model';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';

@Injectable()
export class RecipeEffects {
  private DB_URL: string = 'https://ng-recipe-book-7f78a.firebaseio.com/recipes.json'
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<AppState>
    ) {

  }

  @Effect()
  fetchRecipes = this.actions$.pipe(
    ofType(RECIPES_ACTIONS.FETCH_RECIPES),
    switchMap(() => this.http.get(this.DB_URL)),
    map((recipes: IRecipe[]) => {
      return recipes.map((recipe: IRecipe) => ({
        ...recipe,
        ingredients: recipe.ingredients ? recipe.ingredients : []
      }))
    }),
    map(recipes => new SetRecipesAction(recipes)))

  @Effect({dispatch: false})
  storeRecipes = this.actions$.pipe(
    ofType(RECIPES_ACTIONS.STORE_RECIPES),
    withLatestFrom(this.store.select('recipes')),
    switchMap(([actionData, recipesState]) => {
      debugger
      return this.http.put(this.DB_URL, recipesState.recipes)
    })
  )
}
