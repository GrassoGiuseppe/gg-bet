import { chartConstants } from '../_constants';

const initialState = { data: undefined};

export function data(state = initialState, action) {
  switch (action.type) {
    case chartConstants.CHART_SUCCESS:
      return {
        data: action.data
      };
    case chartConstants.CHART_FAILURE:
      return {
        error: action.error
      };
    default:
      return state
  }
}