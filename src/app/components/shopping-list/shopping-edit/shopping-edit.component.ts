import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { IIngredient } from 'src/app/models/ingredients.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput', {static: false}) nameInput: ElementRef;
  @ViewChild('amountInput', {static: false}) amountInput: ElementRef;
  @ViewChild('unitsInput', {static: false}) unitsInput: ElementRef;
  @Output() addingIngredient = new EventEmitter<IIngredient>();

  private wasAdded: boolean = false;
  constructor() { }

  ngOnInit() {
  }

  onAddingIngrediend():void {
    this.addingIngredient.emit({
      name: this.nameInput.nativeElement.value,
      amount: this.amountInput.nativeElement.value,
      units: this.unitsInput.nativeElement.value,
    });

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
