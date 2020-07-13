import {
  SOURCE_ADDRESS_CHANGED, DESTINATION_ADDRESS_CHANGED, SOURCE_COORDINATES_FETCHED, PACKAGE_INFO_CHANGED, SIGN_OUT
} from "../actionTypes";

const defaultState = {
  source: '',
  destination: '',
  sourceCoord: null,
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case SOURCE_ADDRESS_CHANGED:
      return {
        ...state,
        source: action.value,
        sourceCoord: action.coord ?? state.sourceCoord
      };
    case DESTINATION_ADDRESS_CHANGED:
      return {
        ...state,
        destination: action.value
      };
    case PACKAGE_INFO_CHANGED:
      return {
        ...state,
        package: action.value
      };
    case SIGN_OUT:
      return defaultState;
    default:
      return state;
  }
}