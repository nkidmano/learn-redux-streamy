import _ from 'lodash';
import {
  CREATE_STREAM,
  FETCH_STREAMS,
  FETCH_STREAM,
  FETCH_STREAMS_SUCCESS,
  DELETE_STREAM,
  EDIT_STREAM,
  FETCH_STREAMS_REQUEST
} from '../actions/types';

const initialState = {
  items: {},
  isFetching: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STREAMS_REQUEST:
      return { ...state, isFetching: true };
    case FETCH_STREAMS_SUCCESS:
      return {
        ...state,
        items: _.mapKeys(action.streams, 'id'),
        isFetching: false
      };
    case FETCH_STREAM:
      return { ...state, items: { [action.payload.id]: action.payload } };
    case CREATE_STREAM:
      return { ...state, items: { [action.payload.id]: action.payload } };
    case EDIT_STREAM:
      return { ...state, items: { [action.payload.id]: action.payload } };
    case DELETE_STREAM:
      delete state.items[action.payload];
      return { ...state };
    default:
      return state;
  }
};
