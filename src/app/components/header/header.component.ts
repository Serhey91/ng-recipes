import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  templateUrl: './header.component.html',
  selector: 'app-header'
})
export class AppHeaderComponent {
  @Output()
  featureSelected: EventEmitter<string> = new EventEmitter<string>();
  onSelect(feature: 'recipe'|'shoppingList'):void {
    this.featureSelected.emit(feature);
  }
}
