// import { AUTH_SET_TOKEN } from '../actions/actionTypes';

const initialState = {
  token: null,
  expiryDate: null,
  authError: null,
  authStatus: null, //  IN/OUT
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
export default reducer;
