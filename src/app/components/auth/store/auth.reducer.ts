import { User } from 'src/app/models/auth.model';
import { AuthActionType, AUTH_ACTIONS } from './auth.actions';

export interface State {
  user: User
}
const initialState: State = {
  user: null
}
export function authReducer(
    state:State = initialState,
    action: AuthActionType
  ) {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN: {
      return {
        ...state,
        user: action.payload
      }
    }
    case AUTH_ACTIONS.LOGOUT: {
      return {
        ...state,
        user: null
      }
    }
    default: {
      return state;
    }
  }
}
