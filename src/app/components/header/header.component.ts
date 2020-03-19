import { Component, OnInit, OnDestroy, ViewChild, ElementRef, ChangeDetectorRef } from "@angular/core";
import { DataStorageService } from 'src/app/services/data-storage/data-storage.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Subscription } from 'rxjs';
import { AppState } from '../store/app.reducer';
import { Store } from '@ngrx/store';

@Component({
  templateUrl: './header.component.html',
  selector: 'app-header',
  styleUrls: ['./header.component.css']
})

export class AppHeaderComponent implements OnInit, OnDestroy {
  @ViewChild('dropdown2', {static: false}) dropdownEl: ElementRef;

  private userSubscription: Subscription;

  isAuthenticated: boolean;
  constructor(
    private dataStorage: DataStorageService,
    private authService: AuthService,
    private ref: ChangeDetectorRef,
    private store: Store<AppState>
    ) {
    this.isAuthenticated = false;
  }

  ngOnInit() {
    this.userSubscription = this.store.select('auth').subscribe(({user}) => {
      this.isAuthenticated = !!user;
      this.ref.detectChanges();
    })
  }

  onSaveData() {
    this.dataStorage.storeRecipes();
    this.dropdownEl.nativeElement.classList.remove('show');
  }

  onFetchData() {
    this.dataStorage.fetchRecipes().subscribe();
    this.dropdownEl.nativeElement.classList.remove('show');
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
