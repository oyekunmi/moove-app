import {
  SOURCE_ADDRESS_CHANGED, DESTINATION_ADDRESS_CHANGED,
  RECIPIENT_PHONE_ADDED, RECIPIENT_NAME_ADDED, TRIP_CREATED,
  TRIP_CANCEL_REQUEST, PACKAGE_INFO_CHANGED, SIGN_OUT,
  SOURCE_COORDINATES_FETCHED, RIDER_DETAILS, TRIP_COST_CHANGED,
  SET_PAYMENT_METHOD, HISTORY_DETAILS, GET_RIDER_COORDS,
} from "../actionTypes";

const defaultState = {
  source: '',
  destination: '',
  sourceCoord: null,
  destinationCoord: null,
  package: '',
  recipientPhone: '',
  recipientName: '',
  cost: 0,
  paymentMethod: '',
  historyDetails: [],
  riderDetails: '',
  tripDetails: {},
  riderCoords: null,
  tripStatus: ''
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
    case RECIPIENT_PHONE_ADDED:
      return {
        ...state,
        recipientPhone: action.value
      };
    case RECIPIENT_NAME_ADDED:
      return {
        ...state,
        recipientName: action.value
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
    case HISTORY_DETAILS:
      return {
        ...state,
        historyDetails: action.value
      };
    case SET_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.value
      };
    case TRIP_CREATED:
      return {
        ...state,
        tripDetails: action.value
      }
    case RIDER_DETAILS:
      return {
        ...state,
        riderDetails: action.value,
      };
    case GET_RIDER_COORDS:
      return {
        ...state,
        riderCoords: action.value.riderLocation,
        tripStatus: action.value.trip.trip_status
      };
    case TRIP_CANCEL_REQUEST:
    case SIGN_OUT:
      return defaultState;
    default:
      return state;
  }
}