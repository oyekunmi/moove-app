import { RESTORE_TOKEN, SIGN_IN, SIGN_UP, SIGN_OUT, HIDE_INTRO, SHOW_INTRO } from "../actionTypes";

const defaultState =     {
  isLoading: true,
  isSignout: false,
  userToken: null,
  showIntro: false,
  name     : '',
  phone    : ''
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
    case SIGN_IN: {
      const {token, name, phone} = action;
      return {
        ...state,
        isSignout: false,
        userToken: token,
        phone: phone,
        name: name
      };
    }
    case SIGN_UP: {
      const { name,phone, token } = action;
      return {...state, userToken: token, name, phone }
    }
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