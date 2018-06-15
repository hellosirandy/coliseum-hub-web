import { AUTH_SET_TOKEN, AUTH_REMOVE_TOKEN, AUTH_FAILED, AUTH_CHANGE_STATUS } from '../actions/actionTypes';

const initialState = {
  token: null,
  expiryDate: null,
  authError: null,
  authStatus: null, //  IN/OUT
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_REMOVE_TOKEN:
      return {
        ...state,
        token: null,
        expiryDate: null,
      };
    case AUTH_FAILED:
      return {
        ...state,
        authError: action.errorMessage,
      };
    case AUTH_SET_TOKEN:
      return {
        ...state,
        token: action.token,
        expiryDate: action.expiryDate,
        authError: null,
      };
    case AUTH_CHANGE_STATUS:
      return {
        ...state,
        authStatus: action.authStatus,
      };
    default:
      return state;
  }
};

export default reducer;
