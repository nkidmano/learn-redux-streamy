import { SIGN_IN, SIGN_OUT } from './types';

export const initGoogleAuth = () => async dispatch => {
  window.gapi.load('client:auth2', () => {
    window.gapi.client
      .init({
        clientId: process.env.REACT_APP_CLIENT_ID,
        scope: 'email'
      })
      .then(() => {
        const auth = window.gapi.auth2.getAuthInstance();
        const isSignedIn = auth.isSignedIn.get();

        if (isSignedIn) {
          dispatch({ type: SIGN_IN, payload: auth.currentUser.get().getId() });
        } else {
          dispatch({ type: SIGN_OUT });
        }
      });
  });
};

export const signIn = () => async dispatch => {
  const auth = window.gapi.auth2.getAuthInstance();
  await auth.signIn();
  const uid = auth.currentUser.get().getId();

  dispatch({ type: SIGN_IN, payload: uid });
};

export const signOut = () => async dispatch => {
  const auth = window.gapi.auth2.getAuthInstance();
  await auth.signOut();

  dispatch({ type: SIGN_OUT });
};
