import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { IRecipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipes/recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  private recipe: IRecipe;
  private editMode: boolean = false;
  constructor(
    private activateRoute: ActivatedRoute,
    private recipesService: RecipeService
  ) { }

  ngOnInit() {
    this.activateRoute.params.subscribe((params: Params) => {
      this.editMode = params['id'] !== null;
      if (this.editMode) {
        this.recipe = this.recipesService.getOneRecipe(+params['id']);
      } else {
        this.recipe = {
          id: Math.random()*100,
          name: '',
          description: '',
          imagePath: '',
          ingredients: []
        }
      }
    })
  }
}
