import * as React from 'react';
import loadable from '@loadable/component';
import isRoleAtLeast from 'components/hoc/isRoleAtLeast';
import onlyNotAuthenticated from 'components/hoc/onlyNotAuthenticated';

// Containers
import LogIn from 'containers/LogIn';
import Logout from 'containers/Logout';
import Signup from 'containers/Signup';

import NotFound from 'containers/NotFound';

const Dashboard = loadable(() => import('containers/Dashboard'));

export default [
  {
    path: '/',
    component: isRoleAtLeast(Dashboard),
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
    path: '/signup',
    component: Signup,
  },
  {
    component: NotFound,
  },
];
