import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import * as Loadable from 'react-loadable';
import uniqBy from 'lodash/uniqBy';
import { Provider } from 'react-redux';
import { getBundles } from 'react-loadable/webpack';
import stats from 'exported/modules.json';
import { renderRoutes } from 'react-router-config';
import Routes from 'routes';
import App from 'src/client/App';
import html from './html';

const renderComponentToString = (ctx, store, context, initialScripts:string[] = [], initialStyles: string[] = [], Capture: React.ComponentType<Loadable.LoadableCaptureProps>) => {
  const modules: string[] = [];
  const Page = () => (
    <Capture report={moduleName => { modules.push(moduleName); }}>
      <Provider store={store}>
        <StaticRouter location={ctx.path} context={context}>
          <App>{renderRoutes(Routes)}</App>
        </StaticRouter>
      </Provider>
    </Capture>
  );

  const content = renderToString(<Page />);
  // @ts-ignore
  let bundles = getBundles(stats, modules);

  bundles = uniqBy(bundles, 'publicPath');

  const scripts: string[] = [...initialScripts];
  const styles: string[] = [...initialStyles];

  // @ts-ignore
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