import { Component } from "@angular/core";
import { DataStorageService } from 'src/app/services/data-storage/data-storage.service';

@Component({
  templateUrl: './header.component.html',
  selector: 'app-header',
  styleUrls: ['./header.component.css']
})
export class AppHeaderComponent {
  constructor(private dataStorage: DataStorageService) {

  }

  onSaveData() {
    this.dataStorage.storeRecipes();
  }

  onFetchData() {
    this.dataStorage.fetchRecipes().subscribe();
  }
}
