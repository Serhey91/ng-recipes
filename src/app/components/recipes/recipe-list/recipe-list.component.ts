import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IRecipe } from 'src/app/models/recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  private recipes: IRecipe[] = [
    {name: 'Test recipe 1', description: 'Descriptions test 1', imagePath: 'https://www.reviewgeek.com/thumbcache/0/0/6a0181389c30113203bd612988ee9f0a/p/uploads/2018/08/539d6938.jpg'},
    {name: 'Test recipe 2', description: 'Descriptions test 2', imagePath: 'https://www.reviewgeek.com/thumbcache/0/0/6a0181389c30113203bd612988ee9f0a/p/uploads/2018/08/539d6938.jpg'},
    {name: 'Test recipe 3', description: 'Descriptions test 3', imagePath: 'https://www.reviewgeek.com/thumbcache/0/0/6a0181389c30113203bd612988ee9f0a/p/uploads/2018/08/539d6938.jpg'}
  ];
  @Output() recipeSelected = new EventEmitter<IRecipe>();
  constructor() { }

  ngOnInit() {
  }

  onRecipeItemSelected(recipeName: string):void {
    const recipe: IRecipe = this.recipes.find(r => r.name === recipeName);
    this.recipeSelected.emit(recipe);
  }
}
