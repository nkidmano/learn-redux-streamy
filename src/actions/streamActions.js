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

const fetchStreamRequest = () => ({
  type: FETCH_STREAMS_REQUEST
});

const fetchStreamSuccess = streams => ({
  type: FETCH_STREAMS_SUCCESS,
  streams
});

export const fetchStreams = () => async dispatch => {
  dispatch(fetchStreamRequest());
  const { data } = await streams.get('/streams');
  dispatch(fetchStreamSuccess(data));
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
