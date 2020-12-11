import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import config from 'config';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import CardHeader from '@material-ui/core/CardHeader';
import { userActions, alertActions, wsActions } from '../_actions';
import { regex, emailRegex } from '../_helpers/regexs';

const useStyles = makeStyles((theme) =>
    createStyles({
        container: {
            display: 'flex',
            flexWrap: 'wrap',
            width: '330px',
            margin: `${theme.spacing(0)} auto`
        },
        loginBtn: {
            marginTop: theme.spacing(2),
            flexGrow: 1,
            background: config.primaryColor,
            color: '#fff'
        },
        header: {
            textAlign: 'center',
            background: config.primaryColor,
            color: '#fff'
        },
        card: {
            marginTop: theme.spacing(10)
        }

    }),
);

export const LoginPage = () => {

    const classes = useStyles();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [errorText, setErrorText] = useState('');
    const dispatch = useDispatch();
   
    const authError  = useSelector(state => state.authentication.error);

    useEffect(() => {
        dispatch(alertActions.clear());
        dispatch(userActions.logout());
    }, [dispatch])

    const handleChangeUsername = (e) => {
        setUsername(e.target.value);
    }

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username && password) {
            if (username.match(regex) || username.match(emailRegex)) {
                setError(false)
                setErrorText('')
                dispatch(userActions.login(username, password));
            } else {
                setError(true)
                // It's assumed that the user is already register and he knows valid format
                setErrorText('Please enter a valid username or email format')
            }
        }
    }

        return (
            <div>
                <form className={classes.container} name="form" onSubmit={handleSubmit}>
                    <Card className={classes.card}>
                        <CardHeader className={classes.header} title="GG B3t" />
                        <CardContent>
                            <div>
                                <TextField
                                    required
                                    fullWidth
                                    id="username"
                                    value={username}
                                    //type="email"
                                    label="Username"
                                    placeholder="Username"
                                    margin="normal"
                                    onChange={(e) => handleChangeUsername(e)}
                                    error= { error || authError }
                                    helperText={errorText}
                                />
                                <TextField
                                    required
                                    fullWidth
                                    id="password"
                                    value={password}
                                    type="password"
                                    label="Password"
                                    placeholder="Password"
                                    margin="normal"
                                    onChange={(e) => handleChangePassword(e)}
                                    error= {authError}
                                />
                            </div>
                        </CardContent>
                        <CardActions>
                            <Button
                                type="submit"
                                variant="contained"
                                size="medium"
                                className={classes.loginBtn}
                            >
                                Login
                            </Button>
                        </CardActions>
                    </Card>
                </form>
            </div>
        )
}