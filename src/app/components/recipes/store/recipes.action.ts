import { Action } from '@ngrx/store';
import { IRecipe } from 'src/app/models/recipe.model';

export const RECIPES_ACTIONS = {
  FETCH_RECIPES: 'FETCH_RECIPES',
  SET_RECIPES: 'SET_RECIPES',
  ADD_RECIPE: 'ADD_RECIPE',
  UPDATE_RECIPE: 'UPDATE_RECIPE',
  DELETE_RECIPE: 'DELETE_RECIPE',
  STORE_RECIPES: 'STORE_RECIPES'
}

export class FetchRecipesAction implements Action {
  readonly type = RECIPES_ACTIONS.FETCH_RECIPES;
}

export class SetRecipesAction implements Action {
  readonly type = RECIPES_ACTIONS.SET_RECIPES;
  constructor(public payload: IRecipe[]) {
  }
}

export class AddRecipeAction implements Action {
  readonly type = RECIPES_ACTIONS.ADD_RECIPE;
  constructor(public payload: IRecipe) {
  }
}

export class UpdateRecipeAction implements Action {
  readonly type = RECIPES_ACTIONS.UPDATE_RECIPE;
  constructor(public payload: {index: number, recipe: IRecipe}) {
  }
}

export class DeleteRecipeAction implements Action {
  readonly type = RECIPES_ACTIONS.DELETE_RECIPE;
  constructor(public payload: number) {
  }
}

export class StoreRecipesAction implements Action {
  readonly type = RECIPES_ACTIONS.STORE_RECIPES;
}

export type RecipesActionType =
FetchRecipesAction &
SetRecipesAction &
AddRecipeAction &
UpdateRecipeAction &
DeleteRecipeAction &
StoreRecipesAction
