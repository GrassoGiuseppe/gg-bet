import React from 'react';
import { AppChart } from '../_components/AppChart';
import { AppList } from '../_components/AppList';
import Home from '@material-ui/icons/Home';
import InsertChart from '@material-ui/icons/InsertChart';
import ViewList from '@material-ui/icons/ViewList';

const HomeBody = () => {
  return (
    <div></div>
  );
};

const sidebarRoutes = [
  {
    path: '/',
    sidebarName: 'Home',
    icon: <Home/>,
    component: HomeBody
  },
  {
    path: '/chart',
    sidebarName: 'Chart',
    icon: <InsertChart/>,
    component: AppChart
  },
  {
    path: '/list',
    sidebarName: 'List',
    icon: <ViewList/>,
    component: AppList
  }
];

export default sidebarRoutes;