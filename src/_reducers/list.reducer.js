import { listConstants } from '../_constants';

const initialState = {
      loading: false,
      data: undefined,
      filter: '',
      page: 0,
      rowsPerPage: 10,
      resultCount: 0,
      rowsPerPageOptions: [10, 25, 50]
};

export function list(state = initialState, action) {
  switch (action.type) {
    case listConstants.LIST_REQUEST:
      return {
        loading: true,
        data: action.data
      };
      case listConstants.LIST_SUCCESS:
        return {
          loading: false,
          data: action.data.data,
          filter: state.filter,
          page: 0,
          page: action.data.page,
          rowsPerPage: action.data.rowsPerPage,
          resultCount: action.data.resultCount,
          rowsPerPageOptions: state.rowsPerPageOptions
        };
    case listConstants.LIST_FAILURE:
      return {
        loading: false,
        error: action.error
      };
    default:
      return state
  }
}