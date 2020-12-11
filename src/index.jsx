import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './_helpers';
import { App } from './App';
import { configureMockBackend } from './_helpers';
import config from 'config';

// setup fake backend
configureMockBackend();

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    typography: {
        "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
        "fontSize": 14,
        "fontWeightLight": 300,
        "fontWeightRegular": 400,
        "fontWeightMedium": 500
       },
    palette: {
        primary: { main: config.primaryColor },
        secondary: { main: config.secondaryColor },
    },
    overrides: {
        MuiInput: {
            input: {
                "&::placeholder": {
                    color: config.primaryColor
                },
                //color: config.primaryColor
            },
            underline: {
                '&:before': { //underline color when textfield is inactive
                    borderBottom: `1px solid ${config.primaryColor}`,
                },
                '&:hover:not($disabled):before': { //underline color when hovered 
                    borderBottom: `1px solid ${config.primaryColor}`,
                },
            }
        }
    }
});

render(
    <Provider store={store}>
        <MuiThemeProvider theme={theme}>
            <App />
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('app')
);