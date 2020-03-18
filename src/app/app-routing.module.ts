import { NgModule } from "@angular/core";
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
const routes: Routes= [
  {
    path: '', redirectTo: '/shopping-list', pathMatch: 'full'
  },
  {
    path: 'recipes', loadChildren: () => import('./components/recipes/recipes.module').then(m => m.RecipesModule)
  },
  {
    path: 'shopping-list', loadChildren: () => import('./components/shopping-list/shopping-list.module').then(m => m.ShoppingListModule)
  },
  {
    path: 'auth', component: AuthComponent
  }
]
@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRouningModule {

}
