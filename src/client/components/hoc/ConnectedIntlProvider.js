/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { IntlProvider, addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import pl from 'react-intl/locale-data/pl';

@withRouter
@connect(state => ({ app: state.app }))
export default class ConnectedIntlProvider extends React.PureComponent {
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
      const areIntlLocalesSupported = require('intl-locales-supported');
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
      <IntlProvider {...this.props} locale='pl-PL' defaultLocale="en" messages={app.translations} >
        <div className={`locale-body locale-pl-PL`}>
          {children}
        </div>
      </IntlProvider>
    );
  }
}
