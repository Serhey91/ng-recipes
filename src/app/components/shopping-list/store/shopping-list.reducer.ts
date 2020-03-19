import {
  SHOPPING_LIST_ACTIONS,
  AddIngridient,
  AddMultiplyIngredients,
  UpdateIngredient,
  DeleteIngredient,
  ShoppingListActionType
} from './shopping-list.actions';
import { IIngredient } from 'src/app/models/ingredients.model';

export interface State {
  ingredients: IIngredient[];
  editedIngredient: IIngredient;
  editedIngredientIndex: number;
}

const initialState = {
  ingredients: [
    {name: 'Apples', amount: 5, units: 'kg'},
    {name: 'Tomatoes', amount: 2, units: 'kg'},
    {name: 'Beer', amount: 2, units: 'bottles'},
  ],
  editedIngredient: null,
  editedIngredientIndex: -1
}

export function shoppingListReducer(
    state:State = initialState,
    action: ShoppingListActionType
  ) {
  switch(action.type) {
    case SHOPPING_LIST_ACTIONS.ADD_INGRIDIENT: {
      return {
        ...state, // always copy the old state
        ingredients: [...state.ingredients, /*all ingridients*/ action.payload]
      }
    }
    case SHOPPING_LIST_ACTIONS.ADD_MULTIPLY_INGRIDIENTS: {
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      }
    }
    case SHOPPING_LIST_ACTIONS.UPDATE_INGRIDIENT: {
      const ingredient = state.ingredients[state.editedIngredientIndex];
      const updatedIngredient = {
        ...ingredient,
        ...action.payload.ingredient
      };
      const updatedIngredients = [...state.ingredients];
      updatedIngredients[state.editedIngredientIndex] = updatedIngredient;
      return {
        ...state,
        ingredients: updatedIngredients,
        editedIngredientIndex: -1,
        editedIngredient: null
      }
    }
    case SHOPPING_LIST_ACTIONS.DELETE_INGRIDIENT: {
      const oldIngredients = [...state.ingredients];
      oldIngredients.splice(state.editedIngredientIndex, 1);
      return {
        ...state,
        ingredients: oldIngredients,
        editedIngredient: null,
        editedIngredientIndex: -1
      };
    }
    case SHOPPING_LIST_ACTIONS.START_EDIT: {
      const editedIngredient = {...state.ingredients[action.payload]};
      return {
        ...state,
        editedIngredient,
        editedIngredientIndex: action.payload
      }
    }
    case SHOPPING_LIST_ACTIONS.STOP_EDIT:
      return {
        ...state,
        editedIngredient: null,
        editedIngredientIndex: -1
      };
    default: {
      return state;
    }
  }
}
