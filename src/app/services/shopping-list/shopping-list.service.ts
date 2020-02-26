import { Injectable } from '@angular/core';
import { IIngredient } from 'src/app/models/ingredients.model';
import { Subject } from 'rxjs';

@Injectable()
export class ShoppingListService {
  ingredientsChange:Subject<IIngredient[]> = new Subject<IIngredient[]>();
  private ingredients: IIngredient[] = [
    {name: 'Salt', amount: 3, units: 'g'},
    {name: 'Oil', amount: 100, units: 'ml'},
    {name: 'Potato', amount: 400, units: 'g'},
  ]
  constructor() {}

  addingIngredient(newIngredient: IIngredient):void {
    this.ingredients.push(newIngredient);
    this.ingredientsChange.next([...this.ingredients]);

  }

  addingIngredients(ingredients: IIngredient[]):void {
    this.ingredients.push(...ingredients);
    this.ingredientsChange.next([...this.ingredients]);
  }

  getIngredients():IIngredient[] {
    return [...this.ingredients];
  }
}
