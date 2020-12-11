import { userConstants,} from '../_constants';
import { userService } from '../_services';
import { alertActions, wsActions } from './';
import { history } from '../_helpers';

export const userActions = {
    login,
    logout
};

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => {
                    dispatch(success(user));
                    history.push('/');
                    const message = `Welcome ${user.username} !`;
                    dispatch(alertActions.clear());
                    dispatch(alertActions.success(message));
                    dispatch(wsRegistration(user));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
    function wsRegistration(user) { return { type: userConstants.WS_REGISTER, user } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}
