import * as React from 'react';
import { ToastContainer } from 'react-toastify';
import ConnectedIntlProvider from 'components/hoc/ConnectedIntlProvider';

const GlobalWrapper: React.FunctionComponent = ({ children }) => (
  <ConnectedIntlProvider>
    <ToastContainer
      closeButton={false}
      autoClose={4000} />
    { children }
  </ConnectedIntlProvider>
);

export default GlobalWrapper;
