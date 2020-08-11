import { RESTORE_TOKEN, SIGN_IN, SIGN_UP, SIGN_OUT, HIDE_INTRO, SHOW_INTRO } from "../actionTypes";

const defaultState =     {
  isLoading: true,
  isSignout: false,
  userToken: null,
  showIntro: false,
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case RESTORE_TOKEN:
      return {
        ...state,
        userToken: action.token,
        isLoading: false,
        showIntro: action.showIntro,
      };
    case SIGN_IN:
      return {
        ...state,
        isSignout: false,
        userToken: action.token,
      };
    case SIGN_UP:
        return {...state, userToken: action.token}
    case SIGN_OUT:
      return {
        ...state,
        isSignout: true,
        userToken: null,
      };
    case SHOW_INTRO:
      return {
        ...state,
        showIntro: true,
      };
    case HIDE_INTRO:
      return {
        ...state,
        showIntro: false,
      };
    default:
        return state;
  }
}