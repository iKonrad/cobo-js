import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { IntlProvider, addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import pl from 'react-intl/locale-data/pl';
import { AppState } from 'types';

interface ProviderProps {
  app: AppState,
}

class ConnectedIntlProvider extends React.PureComponent<ProviderProps, {}> {
  constructor(props) {
    super(props);
    addLocaleData([
      ...en,
      ...pl,
    ]);
  }

  render() {
    const { children, app } = this.props;

    if (!SERVER) {
      const areIntlLocalesSupported = require('intl-locales-supported').default;
      const localesMyAppSupports = [
        'en',
        'pl',
      ];
      if (global.Intl) {
        // Determine if the built-in `Intl` has the locale data we need.
        if (!areIntlLocalesSupported(localesMyAppSupports)) {
          // `Intl` exists, but it doesn't have the data we need, so load the
          // polyfill and patch the constructors we need with the polyfill's.
          const IntlPolyfill = require('intl');
          Intl.NumberFormat = IntlPolyfill.NumberFormat;
          Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;
        }
      } else {
        // No `Intl`, so use and load the polyfill.
        global.Intl = require('intl');
      }
    }

    // Render a regular IntlProvider component
    return (
      <IntlProvider {...this.props} locale="pl-PL" defaultLocale="en" messages={app.translations}>
        <div className="locale-body locale-pl-PL">
          {children}
        </div>
      </IntlProvider>
    );
  }
}

const WrappedConnectedIntlProvider = connect(state => ({ app: state.app }))(ConnectedIntlProvider);
export default withRouter(WrappedConnectedIntlProvider);
