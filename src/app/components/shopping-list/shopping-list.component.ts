import { Component, OnInit } from '@angular/core';
import { IIngredient } from 'src/app/models/ingredients.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  private ingredients: IIngredient[] = [
    {name: 'Salt', amount: 3, units: 'g'},
    {name: 'Oil', amount: 100, units: 'ml'},
    {name: 'Potato', amount: 400, units: 'g'},
  ]
  constructor() { }

  ngOnInit() {
  }

  onAddingIngredient(newIngredient: IIngredient):void {
    this.ingredients.push(newIngredient);
  }

}
