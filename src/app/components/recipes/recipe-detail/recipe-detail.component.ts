import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { IRecipe } from 'src/app/models/recipe.model';
import { ShoppingListService } from 'src/app/services/shopping-list/shopping-list.service';
import { RecipeService } from 'src/app/services/recipes/recipe.service';
import { Params, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  @ViewChild('dropdown', {static: true}) dropdownEl: ElementRef;
  private recipe: IRecipe;
  constructor(
    private shoppingListService: ShoppingListService,
    private recipeService: RecipeService,
    private activateRoute: ActivatedRoute,
    ) { }

  ngOnInit() {
    this.activateRoute.params.subscribe((params: Params) => {
      this.recipe = this.recipeService.getOneRecipe(+params.id)
    })
  }

  addIngredientsToShoppingList() {
    this.recipe.ingredients.forEach(ingredient => {
      this.shoppingListService.addingIngredient(ingredient);
    });
    this.dropdownEl.nativeElement.classList.remove('show');
  }

}
