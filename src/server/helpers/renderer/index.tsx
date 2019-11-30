import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Provider as ServerDataProvider } from 'components/hoc/ServerData';
import { renderRoutes } from 'react-router-config';
import Routes from 'routes';
import GlobalWrapper from 'src/client/GlobalWrapper';
import App from 'src/client/App';
import html from './html';

export const renderComponentToString = (ctx, store, context, extractor, serverData) => {
  const Page = () => (
    <ServerDataProvider data={serverData}>
      <StaticRouter location={ctx.path} context={context}>
        <Provider store={store}>
          <GlobalWrapper>
            <App>{renderRoutes(Routes)}</App>
          </GlobalWrapper>
        </Provider>
      </StaticRouter>
    </ServerDataProvider>
  );

  const extractedApp = extractor.collectChunks(<Page />);

  const content = renderToString(extractedApp);
  return html(content, store, extractor.getScriptTags(), extractor.getStyleTags(), extractor.getLinkTags(), serverData);
};
