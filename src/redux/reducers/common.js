import { IS_LOADING, IS_BTN_DISABLED  } from "../actionTypes";

const defaultState = {
  isLoading: false,
  isBtnDisabled: true
}

export default (state = defaultState, action) => {
  switch(action.type) {
    case IS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
     case IS_BTN_DISABLED:
      return {
        ...state,
        isBtnDisabled: action.isBtnDisabled,
      };
    default:
        return state;
  }
}