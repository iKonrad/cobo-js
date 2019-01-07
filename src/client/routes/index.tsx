import * as React from 'react';
import isRoleAtLeast from 'components/hoc/isRoleAtLeast';
import onlyNotAuthenticated from 'components/hoc/onlyNotAuthenticated';
import Loadable from 'react-loadable';

// Containers
import LogIn from 'containers/LogIn';
import Logout from 'containers/Logout';
import Signup from 'containers/Signup';

import NotFound from 'containers/NotFound';

const Dashboard = Loadable({
  loader: () => import('containers/Dashboard'),
  loading: () => <div>Loading</div>,
});

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
    component: onlyNotAuthenticated(Signup),
  },
  {
    component: NotFound,
  },
];
