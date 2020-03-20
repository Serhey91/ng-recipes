import { User } from 'src/app/models/auth.model';
import { AuthActionType, AUTH_ACTIONS } from './auth.actions';

export interface State {
  user: User,
  authError: string,
  isLoading: boolean,
}
const initialState: State = {
  user: null,
  authError: null,
  isLoading: false
}
export function authReducer(
    state = initialState,
    action: AuthActionType
  ) {
  switch (action.type) {
    case AUTH_ACTIONS.AUTHENTICATE_SUCCESS: {
      return {
        ...state,
        user: action.payload,
        authError: null,
        isLoading: false
      }
    }
    case AUTH_ACTIONS.LOGOUT: {
      return {
        ...state,
        user: null,
        authError: null,
        isLoading: false
      }
    }
    case AUTH_ACTIONS.LOGIN_START:
    case AUTH_ACTIONS.SIGN_UP_START: {
      return {
        ...state,
        authError: null,
        isLoading: true
      }
    }
    case AUTH_ACTIONS.AUTHENTICATE_FAIL: {
      return {
        ...state,
        user: null,
        authError: action.payload,
        isLoading: false
      }
    }
    default: {
      return state;
    }
  }
}
