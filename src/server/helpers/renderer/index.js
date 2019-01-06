import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import uniqBy from 'lodash/uniqBy';
import { Provider } from 'react-redux';
import Loadable from 'react-loadable';
import { getBundles } from 'react-loadable/webpack';
import stats from 'exported/modules.json';
import { renderRoutes } from 'react-router-config';
import Routes from 'routes';
import App from 'src/client/App.tsx';
import html from './html';

const renderComponentToString = (ctx, store, context, initialScripts = [], initialStyles = []) => {
  const modules = [];

  const Page = () => (
    <Loadable.Capture report={moduleName => { modules.push(moduleName); }}>
      <Provider store={store}>
        <StaticRouter location={ctx.path} context={context}>
          <App>{renderRoutes(Routes)}</App>
        </StaticRouter>
      </Provider>
    </Loadable.Capture>
  );

  const content = renderToString(<Page />);
  let bundles = getBundles(stats, modules);

  bundles = uniqBy(bundles, 'publicPath');

  const scripts = [...initialScripts];
  const styles = [...initialStyles];

  bundles.forEach(
    bundle => (bundle.file.endsWith('js')
      ? scripts.unshift(bundle.file)
      : styles.unshift(bundle.file)),
  );

  return html(content, store, scripts, styles);
};

export {
  renderComponentToString,
};
