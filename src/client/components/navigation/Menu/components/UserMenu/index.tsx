import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import MenuOption from '../MenuOption';

const UserMenu = () => (
  <React.Fragment>
    <MenuOption to="/profile" icon="user">
      <FormattedMessage id="menu.profile" />
    </MenuOption>
    <MenuOption to="/settings" icon="cog">
      <FormattedMessage id="menu.settings" />
    </MenuOption>
    <MenuOption to="/notifications" icon="bell">
      <FormattedMessage id="menu.notifications" />
    </MenuOption>
    <MenuOption to="/logout" icon="sign-out">
      <FormattedMessage id="menu.logout" />
    </MenuOption>
  </React.Fragment>
);

export default UserMenu;
