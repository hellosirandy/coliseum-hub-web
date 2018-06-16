import { ADD_STADIUMS } from '../actions/actionTypes';

const initialState = {
  stadiums: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_STADIUMS:
      return state;
    default:
      return state;
  }
};
export default reducer;
