import React from 'react';
import { Router, Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { alertActions, wsActions, userActions } from '../_actions';
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { history } from '../_helpers';

export const App = () => {

    const dispatch = useDispatch();
    const { alerts } = useSelector(state => state.alert);
    const { user } = useSelector(state => state.authentication);

    useEffect(() => {
        dispatch(wsActions.wsConnect(user));
        return () => {
            dispatch(wsActions.wsDisconnect());
        }
        /*history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });*/
    }, [dispatch])

    const handleClose = (event, reason, alert) => {
        if (reason === 'clickaway' || reason === 'timeout') {
            return;
        }
        dispatch(alertActions.close(alert));
    }

    const authenticateWebSocket = () => {
        return (
            <HomePage />
        )
    };

    return (
        <div>
            {alerts.length !== 0 &&
                alerts.map((alert, key) => {
                    return (
                        <Snackbar key={key}
                            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                            open={alert.message !== ''}
                            autoHideDuration={6000}
                            onClose={handleClose}>
                            <Alert key={key} onClose={(e, reason) => handleClose(e, reason, alert)} severity={alert.type}>
                                {alert.message}
                            </Alert>
                        </Snackbar>
                    )
                })
            }
            <Router history={history}>
                {user
                    ? authenticateWebSocket(user)
                    : <Redirect to={{ pathname: '/login' }} />
                }
                <Route path="/login" component={LoginPage} />
            </Router>
        </div>
    );
}