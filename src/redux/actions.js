import {
  APP_LOADED, SIGN_IN, SIGN_OUT, SIGN_UP, IS_SIGNUP_BUTTON_ACTIVE, SHOW_INTRO, HIDE_INTRO, RESTORE_TOKEN,
  SOURCE_ADDRESS_CHANGED, DESTINATION_ADDRESS_CHANGED, PACKAGE_INFO_CHANGED,
  TRIP_CANCEL_REQUEST,
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
  coord
})

export const changeDestinationAddress = (value) => ({
  type: DESTINATION_ADDRESS_CHANGED,
  value
})

export const changePackageInfo = (value) => ({
  type: PACKAGE_INFO_CHANGED,
  value
})

export const cancelTripRequest = () => ({
  type: TRIP_CANCEL_REQUEST,
})