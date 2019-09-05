import { Actions as UserActions } from 'state/actions/User';
import { Actions as AppActions } from 'state/actions/App';
import Routes from 'routes';
import { matchRoutes } from 'react-router-config';
import Cookies from 'utils/Cookies';
import settings from 'settings';
import * as Loadable from 'react-loadable';
import { renderComponentToString } from './renderer';
import createStore from './redux';

interface ReactContext {
  notFound: boolean,
}

export default (scripts:string[] = [], styles:string[] = [], loadable: Loadable.Loadable) => async ctx => {
  const { store } = createStore();

  // Get array of components to render for this path
  const routeComponents = matchRoutes(Routes, ctx.path);

  // Get cookie from the server and fetch user data
  const sessionToken = Cookies.getCookieForString(
    ctx.request.header.cookie,
    settings.AUTH_COOKIE_NAME,
  );

  if (sessionToken) {
    const data = await store.dispatch(UserActions.fetchUserData(sessionToken));
    if (data) {
      await store.dispatch(UserActions.authenticateSuccess(sessionToken, { thunk: false }));
    }
  }

  await store.dispatch(AppActions.fetchTranslations('pl-PL'));

  const componentPromises = routeComponents.map(({ route, match }) => {
    if (route.loadData) {
      return route.loadData(store, route, match);
    }
    return null;
  });

  if (componentPromises.length > 0) {
    await Promise.all(componentPromises);
  }

  const context:ReactContext = { notFound: false };
  ctx.body = renderComponentToString(ctx, store, context, scripts, styles, loadable.Capture);
  if (context.notFound) {
    ctx.status = 404;
  }
};
