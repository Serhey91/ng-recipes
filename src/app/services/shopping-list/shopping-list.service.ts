import { Injectable } from '@angular/core';
import { IIngredient } from 'src/app/models/ingredients.model';
import { Subject } from 'rxjs';

@Injectable()
export class ShoppingListService {
  ingredientsChange: Subject<IIngredient[]> = new Subject<IIngredient[]>();
  shoppingItemEditing: Subject<number> = new Subject<number>();

  private ingredients: IIngredient[] = []
  constructor() {}

  addingIngredient(newIngredient: IIngredient):void {
    this.ingredients.push(newIngredient);
    this.ingredientsObserve();
  }

  addingIngredients(ingredients: IIngredient[]):void {
    this.ingredients.push(...ingredients);
    this.ingredientsObserve();
  }

  getIngredients():IIngredient[] {
    return [...this.ingredients];
  }

  getIngredient(index: number): IIngredient {
    return this.ingredients[index];
  }

  updateIngredient(index: number, ingredient: IIngredient): void {
    this.ingredients[index] = ingredient;
    this.ingredientsObserve();
  }

  deleteIngredient(index): void {
    this.ingredients.splice(index, 1);
    this.ingredientsObserve();
  }

  private ingredientsObserve() {
    this.ingredientsChange.next([...this.ingredients]);
  }
}
