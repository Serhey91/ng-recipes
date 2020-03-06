import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IRecipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipes/recipe.service';
import { FormGroup, FormControl, FormArray, FormControlName, Validators } from '@angular/forms';
import { IIngredient } from 'src/app/models/ingredients.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  private recipe: IRecipe;
  private editMode: boolean = false;
  private recipeForm: FormGroup;
  private recipeId: number;
  constructor(
    private activateRoute: ActivatedRoute,
    private recipesService: RecipeService,
    private router: Router
  ) { }

  ngOnInit() {
    this.activateRoute.params.subscribe((params: Params) => {
      this.recipeId = params['id'];
      this.editMode = (params['id'] != null);
      this.initRecipe(params);
      this.initForm();
    })
  }

  private initForm() {
    const {name, imagePath, description, ingredients} = this.recipe;
    const formIngredients = new FormArray([]);
    if (ingredients.length > 0) {
      ingredients.forEach((i:IIngredient) => {
        formIngredients.push(new FormGroup({
          'name': new FormControl(i.name, Validators.required),
          'amount': new FormControl(i.amount, [
            Validators.required,
            Validators.pattern(/^[1-9]+[0-9]*$/)
          ]),
          'units': new FormControl(i.units, Validators.required)
        }));
      })
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(name, Validators.required),
      'imagePath': new FormControl(imagePath, Validators.required),
      'description': new FormControl(description, Validators.required),
      'ingredients': formIngredients
    })
  }

  private initRecipe(params = {}) {
    if (this.editMode) {
      this.recipe = this.recipesService.getOneRecipe(+params['id']);
    } else {
      this.recipe = {
        name: '',
        description: '',
        imagePath: '',
        ingredients: []
      }
    }
  }

  onAddNewIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl('', Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ]),
        'units': new FormControl('', Validators.required)
      })
    )
  }

  onSubmit() {
    const recipe: IRecipe = {
      name: this.recipeForm.value['name'],
      description: this.recipeForm.value['description'],
      imagePath: this.recipeForm.value['imagePath'],
      ingredients: this.recipeForm.value['ingredients']
    }
    if (this.editMode) {
      this.recipesService.updateRecipe(this.recipeId, recipe);
    } else {
      this.recipesService.addNewRecipe(recipe);
    }
    this.onNavagateBack();
  }

  onCancel() {
    this.onNavagateBack();
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  private onNavagateBack() {
    this.router.navigate(['../'], {relativeTo: this.activateRoute});
  }
}
