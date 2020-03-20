import { Component, OnInit, OnDestroy, ViewChild, ElementRef, ChangeDetectorRef } from "@angular/core";
import { Subscription } from 'rxjs';
import { AppState } from '../store/app.reducer';
import { Store } from '@ngrx/store';
import { LogoutAction } from '../auth/store/auth.actions';
import { FetchRecipesAction, StoreRecipesAction } from '../recipes/store/recipes.action';

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
    this.store.dispatch(new StoreRecipesAction());
    this.dropdownEl.nativeElement.classList.remove('show');
  }

  onFetchData() {
    this.store.dispatch(new FetchRecipesAction());
    this.dropdownEl.nativeElement.classList.remove('show');
  }

  onLogout() {
    this.store.dispatch(new LogoutAction());
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
