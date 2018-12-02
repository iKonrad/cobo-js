import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import css from './styles.scss';

const ButtonLoading = ({inline}) => {
  const classes= classnames({
    [css.loadingBtn]: true,
    [css.inline]: inline,
  })
  return <div className={classes} />
}

ButtonLoading.propTypes = {
  inline: PropTypes.bool,
}

ButtonLoading.defaultProps = {
  inline: false,
}

export default ButtonLoading;
