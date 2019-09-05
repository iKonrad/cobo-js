import Settings from 'settings';
import isRoleAtLeast from 'components/hoc/isRoleAtLeast';
import onlyNotAuthenticated from 'components/hoc/onlyNotAuthenticated';

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
    component: isRoleAtLeast(Profile, Settings.CONST.USER_TYPES.USER),
  },
  {
    path: '/signup',
    component: onlyNotAuthenticated(Signup),
  },
  {
    component: NotFound,
  }
];
