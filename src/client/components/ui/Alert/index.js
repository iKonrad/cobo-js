import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import css from './styles.scss';

const Alert = ({type, children, title}) => {

  const classes = classnames({
    [css.alert]: true,
    [css.danger]: type === 'danger',
    [css.success]: type === 'success',
  })

  return (
    <div className={classes}>
      <div className={css.alertTitle}>{title}</div>
      <div className={css.alertBody}>{children}</div>
    </div>
  )
}

Alert.propTypes = {
  title: PropTypes.node,
  children: PropTypes.node,
  type: PropTypes.string,
}

Alert.defaultProps = {
  type: 'danger',
}

export default Alert;
