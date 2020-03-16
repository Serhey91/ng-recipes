import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppHeaderComponent } from './components/header/header.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { RecipeListComponent } from './components/recipes/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './components/recipes/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './components/recipes/recipe-list/recipe-item/recipe-item.component';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './components/shopping-list/shopping-edit/shopping-edit.component';
import { IngridientHighlightDirective } from './directives/ingredient-highlight.directive';
import { UnlessDirective } from './directives/unless.directive';
import { DropdownDirective } from './directives/dropdown.directive';
import { RecipeService } from './services/recipes/recipe.service';
import { ShoppingListService } from './services/shopping-list/shopping-list.service';
import { AppRouningModule } from './app-routing.module';
import { RecipeStartComponent } from './components/recipes/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './components/recipes/recipe-edit/recipe-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ShortenPipe } from './pipes/shorten.pipe';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthComponent } from './components/auth/auth.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { AuthInterseptorService } from './services/auth/auth.interseptor.service';

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    RecipeStartComponent,
    LoaderComponent,
    AuthComponent,
    // Directives
    IngridientHighlightDirective,
    UnlessDirective,
    DropdownDirective,
    RecipeEditComponent,
    // Pipes
    ShortenPipe
  ],
  imports: [
    BrowserModule,
    AppRouningModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [RecipeService, ShoppingListService, {provide: HTTP_INTERCEPTORS, useClass: AuthInterseptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
