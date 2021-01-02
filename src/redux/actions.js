import {
  APP_LOADED, SIGN_IN, SIGN_OUT, SIGN_UP, IS_SIGNUP_BUTTON_ACTIVE, SHOW_INTRO, 
  HIDE_INTRO, RESTORE_TOKEN,SOURCE_ADDRESS_CHANGED, DESTINATION_ADDRESS_CHANGED, 
  PACKAGE_INFO_CHANGED,TRIP_CANCEL_REQUEST, IS_LOADING, IS_BTN_DISABLED, SOURCE_COORDINATES_FETCHED, TRIP_CREATED, 
  TRIP_COST_CHANGED, HISTORY_DETAILS, SET_PAYMENT_METHOD, RIDER_DETAILS,RECIPIENT_PHONE_ADDED,RECIPIENT_NAME_ADDED,GET_RIDER_COORDS
} from "./actionTypes";

export const restoreToken = (token, introduced) => ({
  type: RESTORE_TOKEN,
  token: token,
  showIntro: !introduced
})

export const signIn = (token, name, phone) => ({
  type: SIGN_IN,
  token,
  name,
  phone
})

export const checkSubmitButton = (isValid) => {
  return {
    type: IS_SIGNUP_BUTTON_ACTIVE,
    payload: { value: isValid }
  }
}

export const signUp = (token, name, phone) => {
  return {
    type: SIGN_UP,
    token,
    name,
    phone
  }
}

export const isAppLoading = (value) => ({
  type: IS_LOADING,
  isLoading: value
})

export const isBtnDisabled = (value) => ({
  type: IS_BTN_DISABLED,
  isBtnDisabled: value
})

export const signOut = () => ({
  type: SIGN_OUT,
})

export const appLoaded = (userToken) => ({
  type: APP_LOADED,
  token: userToken
})

export const showIntro = () => ({
  type: SHOW_INTRO,
})

export const hideIntro = () => ({
  type: HIDE_INTRO,
})

export const changeSourceAddress = (value, coord) => ({
  type: SOURCE_ADDRESS_CHANGED,
  value,
  coord,
})

export const changeDestinationAddress = (value, coord) => ({
  type: DESTINATION_ADDRESS_CHANGED,
  value,
  coord,
})

export const changePackageInfo = (value) => ({
  type: PACKAGE_INFO_CHANGED,
  value
})

export const cancelTripRequest = () => ({
  type: TRIP_CANCEL_REQUEST,
})

export const setSourceCoordinates = (location) => {
  return {
    type: SOURCE_COORDINATES_FETCHED,
    location
  }
}

export const setTripCost = (value) => {
  return {
    type: TRIP_COST_CHANGED,
    value
  }
}

export const addRecipientPhone = (value) => {
  return {
    type: RECIPIENT_PHONE_ADDED,
    value
  }
}

export const addRecipientName = (value) => {
  return {
    type: RECIPIENT_NAME_ADDED,
    value
  }
}

export const tripCreated = (value) =>{
  return {
    type: TRIP_CREATED,
    value
  }
}

export const historyDetails = (value) => {
  return {
    type: HISTORY_DETAILS,
    value
  }
}

export const setPaymentMethod = (value) => {
  return {
    type: SET_PAYMENT_METHOD,
    value
  }
}

export const riderFound = (value) => {
  return {
    type: RIDER_DETAILS,
    value
  }
}

export const getRiderCoords = (value) => {
  return {
    type: GET_RIDER_COORDS,
    value
  }
}
