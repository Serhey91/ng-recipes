import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { IIngredient } from 'src/app/models/ingredients.model';
import { ShoppingListService } from 'src/app/services/shopping-list/shopping-list.service';
import { LoggerService } from 'src/app/services/logger/logger.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: IIngredient[];
  private subscription: Subscription;
  constructor(
    private shoppingListService: ShoppingListService,
    private logger: LoggerService) { }

  ngOnInit() {
    this.logger.printLog('shopping-list.component.ts works');
    this.ingredients = this.shoppingListService.getIngredients();
    this.subscription = this.shoppingListService.ingredientsChange.subscribe((ingredients: IIngredient[]) => {
      this.ingredients = ingredients;
    })
  }

  onEditItem(index: number) {
    this.shoppingListService.shoppingItemEditing.next(index);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
