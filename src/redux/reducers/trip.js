import {
  SOURCE_ADDRESS_CHANGED, DESTINATION_ADDRESS_CHANGED, TRIP_CANCEL_REQUEST, PACKAGE_INFO_CHANGED, SIGN_OUT
} from "../actionTypes";

const defaultState = {
  source: '',
  destination: '',
  sourceCoord: null,
  destinationCord: null,
  package: '',
  cost: 0,
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case SOURCE_ADDRESS_CHANGED:
      return {
        ...state,
        source: action.value,
        sourceCoord: action.coord
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
    case TRIP_CANCEL_REQUEST:
    case SIGN_OUT:
      return defaultState;
    default:

      return state;
  }
}