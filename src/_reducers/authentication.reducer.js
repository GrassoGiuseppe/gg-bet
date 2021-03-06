import { userConstants } from '../_constants';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { user, error: false } : { error: false };

export function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        user: action.user
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        user: action.user,
        error: false
      };
    case userConstants.LOGIN_FAILURE:
      return {
        error: true
      };
    case userConstants.LOGOUT:
      return {};
    default:
      return state
  }
}