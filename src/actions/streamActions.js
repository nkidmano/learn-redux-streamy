import streams from '../apis/streams';
import history from '../history';
import {
  CREATE_STREAM,
  FETCH_STREAMS_REQUEST,
  FETCH_STREAMS_SUCCESS,
  FETCH_STREAM,
  DELETE_STREAM,
  EDIT_STREAM
} from './types';

import * as types from './types';

const fetchStreamsRequest = () => ({
  type: types.FETCH_STREAMS_REQUEST
});

const fetchStreamsSuccess = streams => ({
  type: types.FETCH_STREAMS_SUCCESS,
  streams
});

const createStreamRequest = () => ({
  type: types.CREATE_STREAM_REQUEST
});

const createStreamSuccess = stream => ({
  type: types.CREATE_STREAM_REQUEST,
  stream
});

export const fetchStreams = () => async dispatch => {
  dispatch(fetchStreamsRequest());
  const { data } = await streams.get('/streams');
  dispatch(fetchStreamsSuccess(data));
};

export const fetchStream = id => async dispatch => {
  const response = await streams.get(`/streams/${id}`);

  dispatch({ type: FETCH_STREAM, payload: response.data });
};

export const createStream = formValues => async (dispatch, getState) => {
  dispatch(createStreamRequest());

  const { userId } = getState().auth;
  const { data } = await streams.post('/streams', { ...formValues, userId });

  dispatch(createStreamSuccess(data));

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
