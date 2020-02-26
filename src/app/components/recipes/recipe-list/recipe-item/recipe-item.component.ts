import { Component, OnInit, Input } from '@angular/core';
import { IRecipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipes/recipe.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: IRecipe;
  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    private recipeService: RecipeService
    ) { }

  ngOnInit() {
  }
}
