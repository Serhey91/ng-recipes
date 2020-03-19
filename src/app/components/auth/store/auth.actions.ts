import { Action } from '@ngrx/store';
import { User } from 'src/app/models/auth.model';

export const AUTH_ACTIONS = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT'
}

export class LoginAction implements Action {
  readonly type = AUTH_ACTIONS.LOGIN;
  constructor(public payload: User) {
  }
}

export class LogoutAction implements Action {
  readonly type = AUTH_ACTIONS.LOGOUT;
}

export type AuthActionType = LoginAction & LogoutAction;
