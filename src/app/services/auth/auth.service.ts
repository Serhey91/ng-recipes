import { Injectable } from "@angular/core";
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/components/store/app.reducer';
import { LogoutAction, AuthLoginAction } from 'src/app/components/auth/store/auth.actions';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private tokenExpirationTimer: any;

  constructor(
    private store: Store<AppState>
  ) {
  }

  autoLogin() {
    this.store.dispatch(new AuthLoginAction());
  }

  setAutoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => this.store.dispatch(new LogoutAction()), expirationDuration)
  }

  clearLogoutTimer() {
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
  }
}
