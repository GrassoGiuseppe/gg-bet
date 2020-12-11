import { listConstants } from '../_constants';
import { apiService } from '../_services';
import { alertActions } from '.';
import { history } from '../_helpers';

export const listActions = {
    getListData
};

function getListData(filter, page, newRowsPerPage) {
    return (dispatch, getState) => {
        // if rowsPerPage changed we use it, otherwise we use its state value
        const rowsPerPage = newRowsPerPage ? newRowsPerPage : getState().list.rowsPerPage;
        //dispatch(request());
        apiService.getListData(filter, rowsPerPage, page)
            .then(
                data => dispatch(success(data)),
                error => dispatch(failure(error))
            );

    };

    function request() { return { type: listConstants.LIST_REQUEST} }
    function success(data) { return { type: listConstants.LIST_SUCCESS, data } }
    function failure(error) { return { type: listConstants.LIST_FAILURE, error } }
}