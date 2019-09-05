import * as React from 'react';
import { Link } from 'react-router-dom';
import * as css from '../../styles.scss';

type OwnProps = {
    to: string,
    icon: string,
    transform?: string,
};

const MenuOption: React.FunctionComponent<OwnProps> = ({ to, icon, children }) => (
  <Link to={to} className={css.option}>
    <div className={css.label}>
      { children }
    </div>
  </Link>
);

export default MenuOption;
