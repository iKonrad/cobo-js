import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import uniqBy from 'lodash/uniqBy';
import { Provider } from 'react-redux';
import { Provider as ServerDataProvider } from 'components/hoc/ServerData';
import { getBundles } from 'react-loadable/webpack';
// @ts-ignore
import stats from 'exported/modules.json';
import { renderRoutes } from 'react-router-config';
import Routes from 'routes';
import GlobalWrapper from 'src/client/GlobalWrapper';
import App from 'src/client/App';
import html from './html';

export const renderComponentToString = (ctx, store, context, initialScripts: string[] = [], initialStyles: string[] = [], serverData, Capture) => {
  const modules: string[] = [];
  const Page = () => (
    <Capture report={moduleName => {
      modules.push(moduleName);
    }}>
      <ServerDataProvider data={serverData}>
        <StaticRouter location={ctx.path} context={context}>
          <Provider store={store}>
            <GlobalWrapper>

              <App>{renderRoutes(Routes)}</App>
            </GlobalWrapper>
          </Provider>
        </StaticRouter>
      </ServerDataProvider>
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

  return html(content, store, scripts, styles, serverData);
};
