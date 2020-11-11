import {
  SOURCE_ADDRESS_CHANGED, DESTINATION_ADDRESS_CHANGED, TRIP_CREATED, TRIP_CANCEL_REQUEST, PACKAGE_INFO_CHANGED, SIGN_OUT, SOURCE_COORDINATES_FETCHED,RIDER_DETAILS,MOOVE_ID_ADDED,DATE_ADDED,TRIP_COST_CHANGED,SET_PAYMENT_METHOD,HISTORY_DETAILS
} from "../actionTypes";

const defaultState = {
  source: '',
  destination: '',
  sourceCoord: null,
  destinationCoord: null,
  package: '',
  cost: 0,
  mooveId:'',
  paymentMethod: '',
  historyDetails:[],
  riderDetails:'',
  date:'',
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
    case MOOVE_ID_ADDED:
      return{
        ...state,
        mooveId:action.value
      }
    case DATE_ADDED:
      return{
        ...state,
        date: action.value
      }
    case SIGN_OUT:
      return defaultState;
    default:

      return state;
  }
}