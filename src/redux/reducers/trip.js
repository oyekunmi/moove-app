import {
  SOURCE_ADDRESS_CHANGED, DESTINATION_ADDRESS_CHANGED,RECIPIENT_PHONE_ADDED, TRIP_CREATED, TRIP_CANCEL_REQUEST, PACKAGE_INFO_CHANGED, SIGN_OUT, SOURCE_COORDINATES_FETCHED,RIDER_DETAILS,TRIP_COST_CHANGED,SET_PAYMENT_METHOD,HISTORY_DETAILS
} from "../actionTypes";

const defaultState = {
  source: '',
  destination: '',
  sourceCoord: null,
  destinationCoord: null,
  package: '',
  recipientPhone:'',
  cost: 0,
  paymentMethod: '',
  historyDetails:[],
  riderDetails:'',
  tripDetails: {},
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
        ...defaultState,
        sourceCoord: state.sourceCoord,
        source: state.source,
        destination: '',
        package: ''
      };
    case HISTORY_DETAILS:
      return {
        ...state,
        historyDetails : action.value
      };
    case SET_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod : action.value
      };
    case TRIP_CREATED:
      return {
        ...state,
        tripDetails : action.value
      }
    case RIDER_DETAILS:
      return{
        ...state,
        riderDetails: action.value,
      }
    case SIGN_OUT:
      return defaultState;
    default:

      return state;
  }
}