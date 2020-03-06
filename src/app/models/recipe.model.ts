import { IIngredient } from './ingredients.model';

export class Recipe {
  constructor(public name: string, public description: string, public imagePath: string) {

  }
}

export interface IRecipe {
  name: string;
  description: string;
  imagePath: string;
  ingredients: IIngredient[]
}
