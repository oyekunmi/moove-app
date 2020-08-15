import { IS_LOADING } from "../actionTypes";

const defaultState = {
  isLoading: false,
}

export default (state = defaultState, action) => {
  switch(action.type) {
    case IS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    default:
        return state;
  }
}