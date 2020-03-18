import { NgModule } from "@angular/core";
import { RecipesComponent } from './recipes.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ShortenPipe } from 'src/app/pipes/shorten.pipe';
import { RecipesRoutingModule } from './recipes-routing.module';
import { DropdownDirective } from 'src/app/directives/dropdown.directive';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    ReactiveFormsModule,
    RecipesRoutingModule,
    SharedModule
  ],
  declarations: [
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipeStartComponent,
    RecipeEditComponent,
  ]
})
export class RecipesModule {
}
