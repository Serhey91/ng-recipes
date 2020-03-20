import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
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

  isInEditingMode: boolean = false;
  private shopListSubscription: Subscription;
  private editedIngredient: IIngredient;

  constructor(
    private shoppingListService: ShoppingListService,
  ) { }

  onResetIngredientDetails():void {
    this.isInEditingMode = false;
    this.shoppingForm.reset();
  }

  ngOnInit() {
    this.shopListSubscription = this.shoppingListService.getIngredients()
    .subscribe((data) => {
      if (data.editedIngredientIndex > -1) {
        this.editedIngredient = data.editedIngredient;
        this.isInEditingMode = true;
        this.shoppingForm.setValue({
          itemName: this.editedIngredient.name,
          itemAmount: this.editedIngredient.amount,
          itemUnits: this.editedIngredient.units,
        })
      } else {
        this.isInEditingMode = false;
      }
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
      this.shoppingListService.updateIngredient(ingredient)
    } else {
      this.shoppingListService.addingIngredient(ingredient)
    }

    this.onResetIngredientDetails();
  }

  onDeleteIngredient() {
    this.shoppingListService.deleteIngredient();
    this.onResetIngredientDetails();
  }

  ngOnDestroy() {
    this.shoppingListService.stopEditing();
    this.shopListSubscription.unsubscribe();
  }
}
