import { Injectable } from '@angular/core';
import { IRecipe } from 'src/app/models/recipe.model';

@Injectable()
export class RecipeService {
  private recipes: IRecipe[] = [
    {
      id: 1,
      name: 'Test recipe 1',
      description: 'Descriptions test 1',
      imagePath: 'https://www.reviewgeek.com/thumbcache/0/0/6a0181389c30113203bd612988ee9f0a/p/uploads/2018/08/539d6938.jpg',
      ingredients: [
        {name: 'Chicken', amount: 200, units: 'g'},
        {name: 'Milk', amount: 200, units: 'ml'},
        {name: 'Cheese', amount: 50, units: 'g'}
      ]},
    {
      id: 2,
      name: 'Test recipe 2',
      description: 'Descriptions test 2',
      imagePath: 'https://www.reviewgeek.com/thumbcache/0/0/6a0181389c30113203bd612988ee9f0a/p/uploads/2018/08/539d6938.jpg',
      ingredients: [
        {name: 'Salmon', amount: 200, units: 'g'},
        {name: 'Lemon juice', amount: 20, units: 'ml'},
        {name: 'Tomato', amount: 70, units: 'g'}
      ]},
    {
      id: 3,
      name: 'Test recipe 3',
      description: 'Descriptions test 3',
      imagePath: 'https://www.reviewgeek.com/thumbcache/0/0/6a0181389c30113203bd612988ee9f0a/p/uploads/2018/08/539d6938.jpg',
      ingredients: [
        {name: 'Beef', amount: 300, units: 'g'},
        {name: 'Beer', amount: 100, units: 'ml'},
        {name: 'Onion', amount: 100, units: 'g'}
      ]}
  ];

  getRecipes():IRecipe[] {
    return [...this.recipes];
  }

  getOneRecipe(id:number):IRecipe {
    return this.getRecipes().find(r => r.id === id);
  }

  addNewRecipe(recipe: IRecipe) {
    this.recipes.push(recipe);
  }
}
