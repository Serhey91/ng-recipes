import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, Subject, BehaviorSubject } from 'rxjs';
import { IFirebaseAuthModel, UserFormData, User } from 'src/app/models/auth.model';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/components/store/app.reducer';
import { LoginAction, LogoutAction } from 'src/app/components/auth/store/auth.actions';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private AUTH_STRING_SIGNUP = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
  private AUTH_STRING_SIGNIN = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="

  private tokenExpirationTimer: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store<AppState>
  ) {
  }

  signup(formData: UserFormData): Observable<IFirebaseAuthModel> {
    return this.http.post<IFirebaseAuthModel>(`${this.AUTH_STRING_SIGNUP}${environment.FIREBASE_API_KEY}`, {
      email: formData.email,
      password: formData.password,
      returnSecureToken: true
    }).pipe(catchError(this.mapError), tap((response: IFirebaseAuthModel) => {
      this.mapAuth(response);
    }));
  }

  login(formData: UserFormData): Observable<IFirebaseAuthModel> {
    return this.http.post<IFirebaseAuthModel>(`${this.AUTH_STRING_SIGNIN}${environment.FIREBASE_API_KEY}`, {
      email: formData.email,
      password: formData.password,
      returnSecureToken: true
    }).pipe(catchError(this.mapError), tap((response: IFirebaseAuthModel) => {
      this.mapAuth(response);
    }));
  }

  autoLogin() {
    const userDataJSON = localStorage.getItem('userData');
    if(!userDataJSON) return;

    const userData = JSON.parse(userDataJSON);
    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
    if (loadedUser.token) {
      this.autoLogout(new Date(userData._tokenExpirationDate).getTime() - new Date().getTime());
      this.store.dispatch(new LoginAction(loadedUser));
    }
  }

  logout() {
    this.store.dispatch(new LogoutAction());
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => this.logout(), expirationDuration)
  }

  private mapError(errorData: HttpErrorResponse) {
    let errorMessage = 'Unknown error occured';
      if (!errorData || !errorData.error || !errorData.error.error) {
        return throwError(errorMessage);
      }
      switch (errorData.error.error.message) {
        case 'EMAIL_EXISTS': {
          errorMessage = 'This email exists already';
          break;
        }
        case 'EMAIL_NOT_FOUND': {
          errorMessage = 'This email does not exists';
          break;
        }
        case 'INVALID_PASSWORD': {
          errorMessage = 'This password is not correct';
          break;
        }
      }
    return throwError(errorMessage);
  }

  private mapAuth({email, localId, idToken, expiresIn}: IFirebaseAuthModel) {
    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
    const user = new User(email, localId, idToken, expirationDate);
    this.store.dispatch(new LoginAction(user));
    this.autoLogout(+expiresIn*1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }
}
