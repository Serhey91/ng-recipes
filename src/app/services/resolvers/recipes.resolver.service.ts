import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { IRecipe } from 'src/app/models/recipe.model';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/components/store/app.reducer';
import { FetchRecipesAction, RECIPES_ACTIONS, SetRecipesAction } from 'src/app/components/recipes/store/recipes.action';
import { Actions, ofType } from '@ngrx/effects';
import { take, map, switchMap } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class RecipesResolverService implements Resolve<IRecipe[]>{
  constructor(
    private store: Store<AppState>,
    private actions$: Actions
  ) {

  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select('recipes').pipe(
      take(1),
      map(({recipes}) => recipes),
      switchMap(recipes => {
        if (recipes.length === 0) {
          this.store.dispatch(new FetchRecipesAction());
          return this.actions$.pipe(
            ofType(RECIPES_ACTIONS.SET_RECIPES),
            take(1),
            map(data => (data as SetRecipesAction).payload)
          )
        } else return of(recipes);
      })
    )
   }
}
