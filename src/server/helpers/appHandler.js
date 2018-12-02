import { fetchUserData, authenticateSuccess } from 'state/actions/User';
import { fetchTranslations } from 'state/actions/App';
import Routes from 'routes';
import { matchRoutes } from 'react-router-config';
import { renderComponentToString } from './renderer';
import Cookies from 'utils/Cookies';
import settings from 'settings';
import createStore from './redux';

export default (scripts = [], styles = []) =>
  async (ctx) => {
    const {store} = createStore();

    // Get array of components to render for this path
    const routeComponents = matchRoutes(Routes, ctx.path);

    // Get cookie from the server and fetch user data
    const sessionToken = Cookies.getCookieForString(
      ctx.request.header.cookie,
      settings.AUTH_COOKIE_NAME,
    )

    const data = await store.dispatch(fetchUserData(sessionToken));
    if (data) {
      await store.dispatch(authenticateSuccess(sessionToken, null));
    }

    await store.dispatch(fetchTranslations('pl-PL'));

    const componentPromises = routeComponents.map(({route, match}) => {
      if (route.loadData) {
        return route.loadData(store, route, match);
      }
    });

    if (componentPromises.length > 0) {
      await Promise.all(componentPromises);
    }

    const context = {};
    ctx.body = renderComponentToString(ctx, store, context, scripts, styles);

    if (context.notFound) {
      ctx.status = 404;
    }
}
