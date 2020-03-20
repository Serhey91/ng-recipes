import {State as ShoppingListState, shoppingListReducer} from '../shopping-list/store/shopping-list.reducer';
import {State as AuthState, authReducer} from '../auth/store/auth.reducer';
import { State as RecipesState, recipesReducer } from '../recipes/store/recipes.reducer';

import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  shoppingList: ShoppingListState;
  auth: AuthState,
  recipes: RecipesState
}


export const appReducer: ActionReducerMap<AppState> = {
  shoppingList: shoppingListReducer,
  auth: authReducer,
  recipes: recipesReducer
}
