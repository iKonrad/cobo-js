import * as React from 'react';
import ConnectedIntlProvider from 'components/hoc/ConnectedIntlProvider';

const App = ({ children }) => (
  <ConnectedIntlProvider>
    <div className="app">
      {children}
    </div>
  </ConnectedIntlProvider>
);

export default App;
