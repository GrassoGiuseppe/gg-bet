
import { wsActions, alertActions, userActions } from '../_actions';
import { wsConstants, userConstants } from '../_constants';

let socket = null;

export const wsMiddleware = store => next => action => {

  const onOpen = store => (event) => {
    store.dispatch(wsActions.wsConnected(event.target.url));
  };

  const onClose = store => () => {
    store.dispatch(wsActions.wsDisconnected());
  };

  const onMessage = store => (event) => {
    const payload = JSON.parse(event.data);

    switch (payload.type) {
      case userConstants.LOGIN_REQUEST:
        const notification = `Login attempt by user: ${payload.message.username}`
        store.dispatch(alertActions.info(notification));
        break;
      default:
        break;
    }
  };

  // the middleware part of this function

  switch (action.type) {
    case wsConstants.WS_CONNECT:
      if (socket !== null) {
        socket.close();
      }
      // connect to the remote host
      socket = new WebSocket(action.host);

      // websocket handlers
      socket.onmessage = onMessage(store);
      socket.onclose = onClose(store);
      socket.onopen = onOpen(store);
      break;
    case wsConstants.WS_DISCONNECT:
      if (socket !== null) {
        socket.close();
      }
      socket = null;
      break;
    case userConstants.LOGIN_REQUEST:
      if (socket !== null) {
        socket.send(JSON.stringify({ type: userConstants.LOGIN_REQUEST, message: action.user }));
      }
      break;
    case userConstants.WS_REGISTER:
      if (socket !== null) {
        socket.send(JSON.stringify({ type: userConstants.WS_REGISTER, message: action.user }));
      }
      break;
    default:
      return next(action);
  }
}