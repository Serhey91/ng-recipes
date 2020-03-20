import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { IRecipe } from 'src/app/models/recipe.model';
import { ShoppingListService } from 'src/app/services/shopping-list/shopping-list.service';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';
import { map, switchMap } from 'rxjs/operators';
import { State } from '../store/recipes.reducer';
import { DeleteRecipeAction } from '../store/recipes.action';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  @ViewChild('dropdown', {static: true}) dropdownEl: ElementRef;
  recipe: IRecipe;
  private recipeId: number;
  constructor(
    private shoppingListService: ShoppingListService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
    ) { }

  ngOnInit() {
    this.activateRoute.params.pipe(
      map(({id}: Params) => +id),
      switchMap((id: number) => {
        this.recipeId = id;
        return this.store.select('recipes');
      }),
      map(({recipes}: State) => recipes[this.recipeId])
    )
    .subscribe((recipe: IRecipe) => this.recipe = recipe);
  }

  addIngredientsToShoppingList() {
    this.shoppingListService.addingIngredients(this.recipe.ingredients);
    this.dropdownEl.nativeElement.classList.remove('show');
  }

  onDeleteRecipe() {
    this.store.dispatch(new DeleteRecipeAction(this.recipeId));
    this.router.navigate(['../'], {relativeTo: this.activateRoute});
  }
}
