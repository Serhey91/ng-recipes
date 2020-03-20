import { Actions, ofType, Effect } from '@ngrx/effects';
import { AUTH_ACTIONS, LoginStartAction, AuthenticateSuccessAction, AuthenticateFailAction, SignupStartAction } from './auth.actions';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { IFirebaseAuthModel, User, UserFormData } from 'src/app/models/auth.model';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable()
export class AuthEffects {
  @Effect()
  authSignup = this.actions$.pipe(
    ofType(AUTH_ACTIONS.SIGN_UP_START),
    switchMap(({payload}: SignupStartAction) => {
      return this.http.post<IFirebaseAuthModel>(...this.requestParams(payload, 'signup'))
      .pipe(
        map(resData => this.createSuccessAction(resData)),
        catchError(errorData => this.handleError(errorData))
      )
    })
  )

  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AUTH_ACTIONS.LOGIN_START),
    switchMap(({payload}: LoginStartAction) => {
      return this.http.post<IFirebaseAuthModel>(...this.requestParams(payload, 'login'))
      .pipe(
        map(resData => this.createSuccessAction(resData)),
        catchError(errorData => this.handleError(errorData))
      )
    })
  );

  @Effect()
  autoLogin = this.actions$.pipe(
    ofType(AUTH_ACTIONS.AUTO_LOGIN),
    map(() => {
      const userDataJSON = localStorage.getItem('userData');
      if(!userDataJSON) return {type: 'TOKEN_NOT_FOUND'};

      const {email, id, _token, _tokenExpirationDate} = JSON.parse(userDataJSON);
      const loadedUser = new User(email, id, _token, new Date(_tokenExpirationDate));
      if (loadedUser.token) {
        this.authService.setAutoLogout(new Date(_tokenExpirationDate).getTime() - new Date().getTime());
        return new AuthenticateSuccessAction(loadedUser);
      }

      return {type: 'TOKEN_NOT_FOUND'}
    })
  )

  @Effect({dispatch: false})
  authLogout = this.actions$.pipe(
    ofType(AUTH_ACTIONS.LOGOUT),
    tap(() => {
      localStorage.removeItem('userData');
      this.authService.clearLogoutTimer();
      this.router.navigate(['/auth'])
    })
  )

  @Effect({dispatch: false})
  authRedirect = this.actions$.pipe(
    ofType(AUTH_ACTIONS.AUTHENTICATE_SUCCESS),
    tap(() => this.router.navigate(['/'])))

  private AUTH_STRING_SIGNUP = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
  private AUTH_STRING_SIGNIN = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";

  private handleError(errorData: HttpErrorResponse): Observable<AuthenticateFailAction> {
    let errorMessage = 'Unknown error occured';
      if (!errorData || !errorData.error || !errorData.error.error) {
        return of(new AuthenticateFailAction(errorMessage));
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
      return of(new AuthenticateFailAction(errorMessage));
  }

  private createSuccessAction(model: IFirebaseAuthModel): AuthenticateSuccessAction {
    const user = this.createdUser(model);
    this.storeLocally(user);
    this.authService.setAutoLogout(+model.expiresIn*1000);
    return new AuthenticateSuccessAction(user);
  }

  private storeLocally(user: User) {
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private createdUser({email, localId, idToken, expiresIn}: IFirebaseAuthModel): User {
    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
    return new User(email, localId, idToken, expirationDate);
  }

  private requestParams({email, password}: UserFormData, type: 'login' | 'signup'): [string, any] {
    const params = {email, password, returnSecureToken: true};
    const url = `${type === 'login' ? this.AUTH_STRING_SIGNIN : this.AUTH_STRING_SIGNUP}${environment.FIREBASE_API_KEY}`;
    return [url, params];
  }

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService) {

  }
}
