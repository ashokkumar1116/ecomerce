import { USER_ACTION_TYPES } from "./user.types";
import { UserAction } from './user.action'
import { UserData } from '../../utils/firebase/firebase.utils';


export const userReducer = (state = INITIAL_STATE, action = {} as UserAction) => {
  // const { type, payload } = action;

  switch(action.type) {
    case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
      return { ...state, currentUser: action.payload };
      case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
        return { ...state, currentUser: null };
    case USER_ACTION_TYPES.SIGN_UP_FAILED:
    case USER_ACTION_TYPES.SIGN_IN_FAILED:
    case USER_ACTION_TYPES.SIGN_OUT_FAILED:
      return { ...state, error: action.payload };
    default:
      return state
  }
}

export type UserState = {
  readonly currentUser: UserData | null,
  readonly isLoading: boolean,
  readonly error: Error | null
}

const INITIAL_STATE : UserState= {
  currentUser: null,
  isLoading: false,
  error: null
}