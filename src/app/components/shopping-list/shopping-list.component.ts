import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { IIngredient } from 'src/app/models/ingredients.model';
import { ShoppingListService } from 'src/app/services/shopping-list/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  private ingredients: IIngredient[];
  private subscription: Subscription;
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.subscription = this.shoppingListService.ingredientsChange.subscribe((ingredients: IIngredient[]) => {
      this.ingredients = ingredients;
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
