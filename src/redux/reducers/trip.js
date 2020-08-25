import {
  SOURCE_ADDRESS_CHANGED, DESTINATION_ADDRESS_CHANGED, TRIP_CANCEL_REQUEST, PACKAGE_INFO_CHANGED, SIGN_OUT, SOURCE_COORDINATES_FETCHED, TRIP_COST_CHANGED
} from "../actionTypes";

const defaultState = {
  source: '',
  destination: '',
  sourceCoord: null,
  destinationCoord: null,
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
        destination: action.value,
        destinationCoord: action.coord,
      };
    case TRIP_COST_CHANGED:
      return {
        ...state,
        cost: action.value
      };
    case SOURCE_COORDINATES_FETCHED:
      return {
        ...state,
        sourceCoord: action.location
      };
    case PACKAGE_INFO_CHANGED:
      return {
        ...state,
        package: action.value
      };
    case TRIP_CANCEL_REQUEST:
      return {
        ...defaultState
      }
    case SIGN_OUT:
      return defaultState;
    default:

      return state;
  }
}