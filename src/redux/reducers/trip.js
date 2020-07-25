import {
  SOURCE_ADDRESS_CHANGED, DESTINATION_ADDRESS_CHANGED, TRIP_CANCEL_REQUEST, PACKAGE_INFO_CHANGED, SIGN_OUT
} from "../actionTypes";

const defaultState = {
  source: 'Villa 26, 44B Street, Al Wasl, Dubai, UAE',
  destination: 'Villa 26, 44B Street, Al Wasl, Dubai, UAE',
  sourceCoord: null,
  destinationCord: null,  
  package: '5 Boxes of Akara',
  cost: 1530,
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
    case TRIP_CANCEL_REQUEST:
    case SIGN_OUT:
      return defaultState;
    default:
    
      return state;
  }
}