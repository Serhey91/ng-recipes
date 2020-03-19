import { Subscription, Observable } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { IIngredient } from 'src/app/models/ingredients.model';
import { ShoppingListService } from 'src/app/services/shopping-list/shopping-list.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
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

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }
}
