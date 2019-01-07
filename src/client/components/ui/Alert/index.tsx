import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import css from './styles.scss';

interface OwnProps {
  title?: React.ReactNode,
  type?: 'success' | 'danger',
}

const Alert:React.FunctionComponent<OwnProps> = ({ type, children, title }) => {
  const classes = classnames({
    [css.alert]: true,
    [css.danger]: type === 'danger',
    [css.success]: type === 'success',
  });

  return (
    <div className={classes}>
      <div className={css.alertTitle}>{title}</div>
      <div className={css.alertBody}>{children}</div>
    </div>
  );
};

export default Alert;
