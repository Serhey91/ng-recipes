import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { ShortenPipe } from '../pipes/shorten.pipe';
import { IngridientHighlightDirective } from '../directives/ingredient-highlight.directive';
import { UnlessDirective } from '../directives/unless.directive';
import { PlaceholderDirective } from '../directives/placeholder.directive';
import { DropdownDirective } from '../directives/dropdown.directive';
import { AlertComponent } from './alert/alert.component';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ShortenPipe,
    IngridientHighlightDirective,
    UnlessDirective,
    PlaceholderDirective,
    DropdownDirective,
    AlertComponent,
    LoaderComponent,
  ],
  exports: [
    ShortenPipe,
    IngridientHighlightDirective,
    UnlessDirective,
    PlaceholderDirective,
    DropdownDirective,
    AlertComponent,
    LoaderComponent,
    CommonModule
  ],
  entryComponents: [AlertComponent]
})
export class SharedModule {

}
