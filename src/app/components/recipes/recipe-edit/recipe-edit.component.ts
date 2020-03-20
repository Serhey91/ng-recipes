import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IRecipe } from 'src/app/models/recipe.model';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { IIngredient } from 'src/app/models/ingredients.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';
import { map } from 'rxjs/operators';
import { State } from '../store/recipes.reducer';
import { AddRecipeAction, UpdateRecipeAction } from '../store/recipes.action';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  private recipe: IRecipe;
  private editMode: boolean = false;
  private recipeId: number;
  private subscription: Subscription;

  recipeForm: FormGroup;
  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.activateRoute.params.subscribe((params: Params) => {
      this.recipeId = params['id'];
      this.editMode = (params['id'] != null);
      this.initRecipe(params);
    })
  }

  get ingredientsControls() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
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
      this.subscription = this.store.select('recipes')
      .pipe(map(({recipes}: State) => recipes[this.recipeId]))
      .subscribe(recipe => {
        this.recipe = recipe;
        this.initForm();
      });
    } else {
      this.recipe = {
        name: '',
        description: '',
        imagePath: '',
        ingredients: []
      }
      this.initForm();
    }
  }

  private createRecipe():IRecipe {
    return {
      name: this.recipeForm.value['name'],
      description: this.recipeForm.value['description'],
      imagePath: this.recipeForm.value['imagePath'],
      ingredients: this.recipeForm.value['ingredients']
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
    const recipe: IRecipe = this.createRecipe();
    if (this.editMode) {
      this.store.dispatch(new UpdateRecipeAction({index: this.recipeId, recipe}))
    } else {
      this.store.dispatch(new AddRecipeAction(recipe));
    }
    this.onNavagateBack();
  }

  onCancel() {
    this.onNavagateBack();
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
    const recipe: IRecipe = this.createRecipe();

    this.store.dispatch(new UpdateRecipeAction({index: this.recipeId, recipe}));
  }

  private onNavagateBack() {
    this.router.navigate(['../'], {relativeTo: this.activateRoute});
  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
