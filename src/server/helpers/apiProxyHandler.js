import proxy from 'koa-better-http-proxy'
import route from 'koa-route'
import settings from 'settings'
import Cookies from 'utils/Cookies'

export default route.all('/api/*', proxy(settings.API_URL, {
  headers: {
    'x-forwarded-host': settings.BASE_URL,
  },
  proxyReqPathResolver: function(ctx) {
    let path = require('url').parse(ctx.url).path;

    if (path.indexOf('/api') === 0) {
      path = path.slice(4);
    }

    return path;
  },
  proxyReqOptDecorator: function(proxyReqOpts) {
    const authCookie = Cookies.getCookieForString(proxyReqOpts.headers.cookie, settings.AUTH_COOKIE_NAME);

    if (authCookie) {
      proxyReqOpts.headers['authorization'] = `Bearer ${authCookie}`;
    } else {
      proxyReqOpts.headers['authorization'] = '';
    }

    proxyReqOpts.headers.cookie = '';
    return proxyReqOpts;
  }
}))
