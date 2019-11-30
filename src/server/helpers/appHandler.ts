import {Context, ExtendableContext} from 'koa';
import { Actions as UserActions } from 'state/actions/User';
import { Actions as AppActions } from 'state/actions/App';
import Routes from 'routes';
import { matchRoutes } from 'react-router-config';
import Cookies from 'utils/Cookies';
import settings from 'settings';
import { State, ServerData } from 'types';
import * as Redux from 'redux';
import { renderComponentToString } from './renderer';
import createStore from './redux';

interface ReactContext {
  notFound: boolean,
}

export default (extractor) => async (ctx: ExtendableContext, next) => {
  const result = createStore();
  const store = result.store as Redux.Store<State>;
  // SSL
  // if (ctx.path === '/.well-known/acme-challenge/Mpan87VwhUEpwDN3_hvn5UMLgRtnwkHoTkpptKc9yqo') {
  //   ctx.body = 'Mpan87VwhUEpwDN3_hvn5UMLgRtnwkHoTkpptKc9yqo.tgQ9e0ZwToDk8paqSmezwbVitVxP2ChSeYxcik_O0Q0';
  //   return;
  // }

  // Get array of components to render for this path
  const routeComponents = matchRoutes(Routes, ctx.path);

  // Get cookie from the server and fetch user data
  const sessionToken = Cookies.getCookieForString(
    ctx.request.header.cookie,
    settings.AUTH_COOKIE_NAME,
  );

  if (sessionToken) {
    const data: any = await store.dispatch(UserActions.fetchUserData(sessionToken));
    if (!data.errors) {
      await store.dispatch(UserActions.authenticateSuccess(sessionToken, { thunk: false }));
    }
  }

  const state: State = store.getState();
  await store.dispatch(AppActions.fetchTranslations('pl-PL'));

  // if (ctx.userAgent) {
  //   const data = ctx.userAgent;
  //   const deviceState: DeviceState = {
  //     isMobile: data.isMobile,TheThe children
  //     isDesktop: data.isDesktop,
  //     isIOS: data.isiPad || data.isiPhone || data.isiPod,
  //     browser: data.browser,
  //     os: data.os,
  //   };

    // store.dispatch(AppActions.setDeviceData(deviceState));
  // }


  let serverData: ServerData = {};

  const componentPromises = routeComponents.map(async ({ route, match }) => {
    if (route.loadData) {
      const routeData = await route.loadData(store, route, match, ctx);
      if (routeData) {
        serverData = {
          ...serverData,
          ...routeData,
        };
      }
    }
    return null;
  });

  if (componentPromises.length > 0) {
    await Promise.all(componentPromises);
  }

  const context:ReactContext = { notFound: false };
  ctx.body = renderComponentToString(ctx, store, context, extractor, serverData);
  if (context.notFound) {
    ctx.status = 404;
  }
};
