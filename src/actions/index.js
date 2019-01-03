import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_STREAM,
  FETCH_STREAMS,
  FETCH_STREAM,
  DELETE_STREAM,
  EDIT_STREAM
} from './types';
import streams from '../apis/streams';
import history from '../history';

export const authChange = isSignedIn => {
  if (isSignedIn) {
    return { type: SIGN_IN };
  } else {
    return { type: SIGN_OUT };
  }
};

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

export const fetchStreams = () => async dispatch => {
  const response = await streams.get('/streams');

  dispatch({ type: FETCH_STREAMS, payload: response.data });
};

export const fetchStream = id => async dispatch => {
  const response = await streams.get(`/streams/${id}`);

  dispatch({ type: FETCH_STREAM, payload: response.data });
};

export const createStream = formValues => async (dispatch, getState) => {
  const { userId } = getState().auth;
  const response = await streams.post('/streams', { ...formValues, userId });

  dispatch({ type: CREATE_STREAM, payload: response.data });
  history.push('/');
};

export const editStream = (id, formValues) => async dispatch => {
  const response = await streams.patch(`/streams/${id}`, formValues);

  dispatch({ type: EDIT_STREAM, payload: response.data });
  history.push('/');
};

export const deleteStream = id => async dispatch => {
  await streams.delete(`/streams/${id}`);

  dispatch({ type: DELETE_STREAM, payload: id });
  history.push('/');
};
