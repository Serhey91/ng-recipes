export interface IIngredient {
  name: string;
  amount: number;
  units: string;
}

export class Ingredient {
  constructor(public name: string, public amount: number, public units: string) {

  }
}
