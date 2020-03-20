import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { IIngredient } from 'src/app/models/ingredients.model';
import { ShoppingListService } from 'src/app/services/shopping-list/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Observable<{ ingredients: IIngredient[] }>;
  constructor(
    private shoppingListService: ShoppingListService,
  ) { }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
  }

  onEditItem(index: number) {
    this.shoppingListService.startEditing(index);
  }
}
