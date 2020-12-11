import { alertConstants } from '../_constants';

export const alertActions = {
    success,
    error,
    clear,
    info,
    close
};

function success(message) {
    return { type: alertConstants.SUCCESS, message };
}

function error(message) {
    return { type: alertConstants.ERROR, message };
}

function clear() {
    return { type: alertConstants.CLEAR };
}

function info(message) {
    return { type: alertConstants.INFO, message };
}

function close(alert) {
    return { type: alertConstants.CLOSE, alert };
}