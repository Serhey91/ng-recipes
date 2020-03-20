import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppHeaderComponent } from './components/header/header.component';
import { AppRouningModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthComponent } from './components/auth/auth.component';
import { AuthInterseptorService } from './services/auth/auth.interseptor.service';
import { SharedModule } from './shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { appReducer } from './components/store/app.reducer';
import { AuthEffects } from './components/auth/store/auth.effects';
import { RecipeEffects } from './components/recipes/store/recipes.effects';

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    AuthComponent,
  ],
  imports: [
    SharedModule,
    BrowserModule,
    AppRouningModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot([AuthEffects, RecipeEffects]),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterseptorService,
      multi: true
    }],
  bootstrap: [AppComponent],
})
export class AppModule { }
