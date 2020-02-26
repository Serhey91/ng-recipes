import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ShoppingListService } from 'src/app/services/shopping-list/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput', {static: false}) nameInput: ElementRef;
  @ViewChild('amountInput', {static: false}) amountInput: ElementRef;
  @ViewChild('unitsInput', {static: false}) unitsInput: ElementRef;

  private wasAdded: boolean = false;
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
  }

  onAddingIngrediend():void {
    this.shoppingListService.addingIngredient({
      name: this.nameInput.nativeElement.value,
      amount: this.amountInput.nativeElement.value,
      units: this.unitsInput.nativeElement.value,
    })

    this.resetFormFields();
    this.wasAdded = true;
    setTimeout(() => this.wasAdded = false, 3000);
  }

  onResetIngredientDetails():void {
    this.resetFormFields();
  }

  private resetFormFields():void {
    this.nameInput.nativeElement.value = '';
    this.amountInput.nativeElement.value = '';
    this.unitsInput.nativeElement.value = '';
  }
}
