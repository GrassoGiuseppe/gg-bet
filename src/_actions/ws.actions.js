import { wsConstants } from '../_constants';
import config from 'config';

export const wsActions = {
    wsConnect,
    wsConnected,
    wsDisconnect,
    wsDisconnected
};

function wsConnect(user) {
    // if user is loggedIn send username and token
    const host = user && user.token ?  `${config.wsUrl}/${user.username}?token=${user.token}` : `${config.wsUrl}`;
    return { type: wsConstants.WS_CONNECT, host };
}

function wsConnected(host) {
    return { type: wsConstants.WS_CONNECTED, host };
}

function wsDisconnect() {
    return { type: wsConstants.WS_DISCONNECT };
}

function wsDisconnected(host) {
    return { type: wsConstants.WS_DISCONNECTED, host };
}