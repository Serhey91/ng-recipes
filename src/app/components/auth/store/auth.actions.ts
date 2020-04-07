import { Action } from '@ngrx/store';
import { User, UserFormData } from 'src/app/models/auth.model';

export const AUTH_ACTIONS = {
  LOGOUT: 'LOGOUT',
  LOGIN_START: 'LOGIN_START',
  AUTHENTICATE_FAIL: 'AUTHENTICATE_FAIL',
  AUTHENTICATE_SUCCESS: 'AUTHENTICATE_SUCCESS',
  SIGN_UP_START: 'SIGN_UP_START',
  AUTO_LOGIN: 'AUTO_LOGIN'
};

export class AuthenticateSuccessAction implements Action {
  readonly type = AUTH_ACTIONS.AUTHENTICATE_SUCCESS;
  constructor(public payload: User) {
  }
}

export class AuthenticateFailAction implements Action {
  readonly type = AUTH_ACTIONS.AUTHENTICATE_FAIL;
  constructor(public payload: string) {
  }
}

export class LogoutAction implements Action {
  readonly type = AUTH_ACTIONS.LOGOUT;
}

export class LoginStartAction implements Action {
  readonly type = AUTH_ACTIONS.LOGIN_START;
  constructor(public payload: UserFormData) {
  }
}

export class SignupStartAction implements Action {
  readonly type = AUTH_ACTIONS.SIGN_UP_START;
  constructor(public payload: UserFormData) {
  }
}

export class AuthLoginAction implements Action {
  readonly type = AUTH_ACTIONS.AUTO_LOGIN;
}

export type AuthActionType = LogoutAction & LoginStartAction & SignupStartAction & AuthenticateFailAction & AuthenticateSuccessAction & AuthLoginAction;
