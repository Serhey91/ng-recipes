import { Component, OnInit, OnDestroy } from "@angular/core";
import { DataStorageService } from 'src/app/services/data-storage/data-storage.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './header.component.html',
  selector: 'app-header',
  styleUrls: ['./header.component.css']
})

export class AppHeaderComponent implements OnInit, OnDestroy {
  private userSubscription: Subscription;

  isAuthenticated: boolean;
  constructor(
    private dataStorage: DataStorageService,
    private authService: AuthService
    ) {
    this.isAuthenticated = false;
  }

  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe((user) => {
      this.isAuthenticated = !!user;
    })
  }

  onSaveData() {
    this.dataStorage.storeRecipes();
  }

  onFetchData() {
    this.dataStorage.fetchRecipes().subscribe();
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
