import { chartConstants } from '../_constants';
import { apiService } from '../_services';
import { alertActions } from '.';
import { history } from '../_helpers';

export const chartActions = {
    getChartData
};

function getChartData() {
    return dispatch => {
        dispatch(request());
        apiService.getChartData()
            .then(
                data => dispatch(success(data)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: chartConstants.CHART_REQUEST} }
    function success(data) { return { type: chartConstants.CHART_SUCCESS, data } }
    function failure(error) { return { type: chartConstants.CHART_FAILURE, error } }
}