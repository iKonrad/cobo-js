import React from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import css from '../../styles.scss';

const MenuOption = (props) => {
  return (
    <Link to={props.to} className={css.option}>
      <div className={css.label}>
        { props.children }
      </div>
    </Link>
  )
}

MenuOption.propTypes = {
  to: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
}

export default MenuOption;
