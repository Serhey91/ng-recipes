import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { IRecipe } from 'src/app/models/recipe.model';
import { ShoppingListService } from 'src/app/services/shopping-list/shopping-list.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipe: IRecipe;
  @ViewChild('dropdown', {static: true}) dropdownEl: ElementRef;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {}

  addIngredientsToShoppingList() {
    this.recipe.ingredients.forEach(ingredient => {
      this.shoppingListService.addingIngredient(ingredient);
    });
    this.dropdownEl.nativeElement.classList.remove('show');
  }

}
