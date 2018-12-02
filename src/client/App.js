import React from 'react';
import ConnectedIntlProvider from 'components/hoc/ConnectedIntlProvider';

class App extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <ConnectedIntlProvider>
        <div className="app">
          {children}
        </div>
      </ConnectedIntlProvider>
    )
  }
}

export default App;
