import React from 'react';
import Settings from 'settings';
import { compose } from 'redux';
import isRoleAtLeast from 'components/hoc/isRoleAtLeast';
import onlyNotAuthenticated from 'components/hoc/onlyNotAuthenticated';
import withRouteData from 'components/hoc/connect';

// Containers
import Home, { loadData as loadHomeData } from 'containers/Home';
import LogIn from 'containers/LogIn';
import Logout from 'containers/Logout';
import Profile from 'containers/Profile';
import Signup from 'containers/Signup';

import NotFound from 'containers/NotFound';

export default [
  {
    path: '/',
    component: Home,
    loadData: loadHomeData,
    exact: true,
  },
  {
    path: '/login',
    component: onlyNotAuthenticated(LogIn),
  },
  {
    path: '/logout',
    component: Logout,
  },
  {
    path: '/profile',
    component: isRoleAtLeast(Settings.CONST.USER_TYPES.USER)(Profile),
  },
  {
    path: '/signup',
    component: onlyNotAuthenticated(Signup),
  },
  {
    component: NotFound,
  }
];
