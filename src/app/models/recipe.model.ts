import { IIngredient } from './ingredients.model';

export class Recipe {
  constructor(public name: string, public description: string, public imagePath: string) {

  }
}

export interface IRecipe {
  id: number,
  name: string;
  description: string;
  imagePath: string;
  ingredients: IIngredient[]
}
