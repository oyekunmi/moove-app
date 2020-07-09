import { APP_LOADED, SIGN_IN, SIGN_OUT, SHOW_INTRO, HIDE_INTRO, RESTORE_TOKEN } from "./actionTypes";

export const restoreToken = (token, introduced) => ({
  type: RESTORE_TOKEN,
  token: token,
  showIntro: !introduced
});

export const signIn = content => ({
  type: SIGN_IN,
  token: 'dummy-auth-token'
});

export const signOut = () => ({
  type: SIGN_OUT,
});


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