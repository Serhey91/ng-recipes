import { Injectable } from '@angular/core';
import { IIngredient } from 'src/app/models/ingredients.model';

@Injectable()
export class ShoppingListService {
  private ingredients: IIngredient[] = [
    {name: 'Salt', amount: 3, units: 'g'},
    {name: 'Oil', amount: 100, units: 'ml'},
    {name: 'Potato', amount: 400, units: 'g'},
  ]
  constructor() {}

  addingIngredient(newIngredient: IIngredient):void {
    this.ingredients.push(newIngredient);
  }

  getIngredients():IIngredient[] {
    return this.ingredients;
  }
}
