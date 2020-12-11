import React from 'react';
import logo from './logo.png';
import { Switch, BrowserRouter, Route, Link, withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import config from 'config';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import styles from './styles'
import sidebarRoutes from '../_helpers/sidebarRoutes'
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';

// TOREM
import { makeStyles } from '@material-ui/core/styles';

const drawerWidth= '240px';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    marginTop: 60,
    padding: theme.spacing(3),
  },
  closeMenuButton: {
    marginRight: 'auto',
    marginLeft: 0,
  },
  icon: {
    color: config.primaryColor,
  }
}));

export const HomePage = withRouter((props) => {
  const classes = styles;
  const classes2 = useStyles();
  const { user } = useSelector(state => state.authentication);

  const drawer = (
    <div>
      <List>
        {sidebarRoutes.map((prop, key) => {
          return (
            <ListItem button key={key} component={Link} to={prop.path}>
              <ListItemIcon className={classes2.icon}>{prop.icon}</ListItemIcon>
              <ListItemText primary={prop.sidebarName} />
            </ListItem>
          )
        })}
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes2.appBar}>
        <Toolbar>
          <img src={logo} alt="Logo" width="80px" height="54px"/>
          <h3>GG B3t</h3>
        </Toolbar>
      </AppBar>
      <BrowserRouter>
        <Drawer
          className={classes2.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <Toolbar />
          <div className={classes.drawerContainer}>
            {drawer}
          </div>
        </Drawer>
        <main className={classes2.content}>
          <div className={classes.toolbar} />
          <Switch>
            {sidebarRoutes.map((route) => (
              <Route exact path={route.path} key={route.path}>
                <route.component />
              </Route>
            ))}
          </Switch>
        </main>
      </BrowserRouter>
    </div>
  );
})