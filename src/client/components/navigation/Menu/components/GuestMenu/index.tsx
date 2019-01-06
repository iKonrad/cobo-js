import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import MenuOption from '../MenuOption';

const GuestMenu: React.FunctionComponent<{}> = () => (
  <React.Fragment>
    <MenuOption key="login-item" to="/login" icon="sign-in">
      <FormattedMessage id="title.login" />
    </MenuOption>
    <MenuOption key="signup-item" to="/signup" icon="star">
      <FormattedMessage id="title.signup" />
    </MenuOption>
  </React.Fragment>
);

export default GuestMenu;
