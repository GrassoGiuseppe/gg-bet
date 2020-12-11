import { alertConstants } from '../_constants';

export function alert(state = { alerts: [] }, action) {
  switch (action.type) {
    case alertConstants.SUCCESS:
      state.alerts.push({
        type: 'success',
        message: action.message
      });
      return {
        alerts: state.alerts
      };

    case alertConstants.ERROR:
      state.alerts.push({
        type: 'error',
        message: action.message.toString()
      });
      return {
        alerts: state.alerts
      };

    case alertConstants.CLEAR:
      return { alerts: [] };

    case alertConstants.INFO:
      state.alerts.push({
        type: 'info',
        message: action.message
      });
      return {
        alerts: state.alerts
      };

    case alertConstants.CLOSE:
      removeAlert(state.alerts, action.alert)
      return {
        alerts: state.alerts
      };

    default:
      return state
  }
}

const removeAlert = (alerts, alert) => {
  for (var i = 0; i < alerts.length; i++) {
    if (alerts[i] === alert) {
      alerts.splice(i, 1);
    }
  }
}