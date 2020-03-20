import { IRecipe } from 'src/app/models/recipe.model';
import { RecipesActionType, RECIPES_ACTIONS } from './recipes.action';

export interface State {
  recipes: IRecipe[];
}

const initialState: State = {
  recipes: []
}

export function recipesReducer(
    state = initialState,
    action: RecipesActionType
  ): State {
  switch (action.type) {
    case RECIPES_ACTIONS.SET_RECIPES: {
      return {
        ...state,
        recipes: [...action.payload]
      }
    }
    case RECIPES_ACTIONS.ADD_RECIPE: {
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      }
    }
    case RECIPES_ACTIONS.UPDATE_RECIPE: {
      const recipes = [...state.recipes];
      const recipe = recipes[action.payload.index];
      const updatedRecipe = {
        ...recipe,
        ...action.payload.recipe
      }
      recipes[action.payload.index] = updatedRecipe;
      return {
        ...state,
        recipes: [...recipes]
      }
    }
    case RECIPES_ACTIONS.DELETE_RECIPE: {
      const updatedRecipes = [...state.recipes];
      updatedRecipes.splice(action.payload, 1);
      return {
        ...state,
        recipes: [...updatedRecipes]
      }
    }
    default: {
      return state;
    }
  }
}
