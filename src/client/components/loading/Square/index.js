import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import css from './styles.scss';

const LoadingSquare = ({height, width, loading, children, inline}) => {
  const styles = {};

  if (height) {
    styles.height = height;
  }

  if (width) {
    styles.width = width;
  }

  const classes = classnames({
    [css.square]: true,
    [css.inlineBlock]: inline,
  })

  if (loading || !children) {
    return (
      <div className={classes} style={styles} />
    )
  }

  return children;
}

LoadingSquare.propTypes = {
  loading: PropTypes.bool.isRequired,
  height: PropTypes.number,
  width: PropTypes.number,
  inline: PropTypes.bool,
}

LoadingSquare.defaultProps = {
  height: 50,
  width: null,
  inline: false,
}

export default LoadingSquare;
