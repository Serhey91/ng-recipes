import { Component, OnInit } from '@angular/core';
import { IRecipe } from 'src/app/models/recipe.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: IRecipe[] = [];

  constructor(
    private store: Store<AppState>) { }

  ngOnInit() {
    this.store.select('recipes').subscribe(({recipes}) => {
      this.recipes = recipes;
    });
  }
}
