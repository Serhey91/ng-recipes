import { Injectable } from '@angular/core';
import { IIngredient } from 'src/app/models/ingredients.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AddMultiplyIngredients, AddIngridient, UpdateIngredient, DeleteIngredient, StartEdit, StopEdit } from 'src/app/components/shopping-list/store/shopping-list.actions';
import { State } from 'src/app/components/shopping-list/store/shopping-list.reducer';
import { AppState } from 'src/app/components/store/app.reducer';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  constructor(
    private store: Store<AppState>
  ) {}

  addingIngredient(newIngredient: IIngredient):void {
    this.store.dispatch(new AddIngridient(newIngredient));
  }

  addingIngredients(ingredients: IIngredient[]):void {
    this.store.dispatch(new AddMultiplyIngredients(ingredients));
  }

  getIngredients(): Observable<State> {
    return this.store.select('shoppingList');
  }

  updateIngredient(ingredient: IIngredient): void {
    this.store.dispatch(new UpdateIngredient({ingredient}))
  }

  deleteIngredient(): void {
    this.store.dispatch(new DeleteIngredient());
  }

  startEditing(index: number): void {
    this.store.dispatch(new StartEdit(index));
  }

  stopEditing():void {
    this.store.dispatch(new StopEdit());
  }
}
