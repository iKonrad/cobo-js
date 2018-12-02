import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router-dom'
import css from '../../styles.scss';

const MenuOption = (props) => {
  return (
    <Link to={props.to} className={css.option}>
      <FontAwesomeIcon icon={['fas', props.icon]} className={css.icon} transform={props.transform} />
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
