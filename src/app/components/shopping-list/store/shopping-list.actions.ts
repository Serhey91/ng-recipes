import { Action } from '@ngrx/store';
import { IIngredient } from 'src/app/models/ingredients.model';

export const SHOPPING_LIST_ACTIONS = {
  ADD_INGRIDIENT: 'ADD_INGRIDIENT',
  ADD_MULTIPLY_INGRIDIENTS: 'ADD_MULTIPLY_INGRIDIENTS',
  UPDATE_INGRIDIENT: 'UPDATE_INGRIDIENT',
  DELETE_INGRIDIENT: 'DELETE_INGRIDIENT',
  START_EDIT: 'START_EDIT',
  STOP_EDIT: 'STOP_EDIT'
}

export class AddIngridient implements Action {
  readonly type = SHOPPING_LIST_ACTIONS.ADD_INGRIDIENT;
  constructor(public payload: IIngredient) {
  }
}

export class AddMultiplyIngredients implements Action {
  readonly type = SHOPPING_LIST_ACTIONS.ADD_MULTIPLY_INGRIDIENTS;
  constructor(public payload: IIngredient[]) {
  }
}

export class UpdateIngredient implements Action {
  readonly type = SHOPPING_LIST_ACTIONS.UPDATE_INGRIDIENT;
  constructor(public payload: {ingredient: IIngredient}) {
  }
}

export class DeleteIngredient implements Action {
  readonly type = SHOPPING_LIST_ACTIONS.DELETE_INGRIDIENT;
}

export class StartEdit implements Action {
  readonly type = SHOPPING_LIST_ACTIONS.START_EDIT;

  constructor(public payload: number) {}
}

export class StopEdit implements Action {
  readonly type = SHOPPING_LIST_ACTIONS.STOP_EDIT;
}

export type ShoppingListActionType = AddIngridient &
                                    AddMultiplyIngredients &
                                    UpdateIngredient &
                                    DeleteIngredient &
                                    StartEdit &
                                    StopEdit;
