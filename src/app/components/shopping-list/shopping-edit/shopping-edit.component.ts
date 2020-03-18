import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { ShoppingListService } from 'src/app/services/shopping-list/shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IIngredient } from 'src/app/models/ingredients.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('shoppingForm', {static: true}) shoppingForm: NgForm;

  private editingSubscription: Subscription;
  isInEditingMode: boolean = false;
  private editedItemIndex: number;
  private editedIngredient: IIngredient;

  constructor(private shoppingListService: ShoppingListService) { }

  onResetIngredientDetails():void {
    this.isInEditingMode = false;
    this.shoppingForm.reset();
  }

  ngOnInit() {
    this.editingSubscription = this.shoppingListService.shoppingItemEditing
    .subscribe((data: number) => {
      this.isInEditingMode = true;
      this.editedItemIndex = data;
      this.editedIngredient = this.shoppingListService.getIngredient(data);
      this.shoppingForm.setValue({
        itemName: this.editedIngredient.name,
        itemAmount: this.editedIngredient.amount,
        itemUnits: this.editedIngredient.units,
      })
    })
  }

  onAddingIngrediend(form: NgForm):void {
    const {value} = form;
    const ingredient: IIngredient = {
      name: value.itemName,
      amount: value.itemAmount,
      units: value.itemUnits
    }
    if (this.isInEditingMode) {
      this.shoppingListService
        .updateIngredient(this.editedItemIndex, ingredient)
    } else {
      this.shoppingListService.addingIngredient(ingredient)
    }

    this.onResetIngredientDetails();
  }

  onDeleteIngredient() {
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onResetIngredientDetails();
  }

  ngOnDestroy() {
    this.editingSubscription.unsubscribe();
  }
}
