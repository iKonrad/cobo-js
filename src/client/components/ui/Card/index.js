import React from 'react';
import PropTypes from 'prop-types';
import css from './styles.scss';

export const Card = (props) => {
  return (
    <div className={css.card}>
      { props.children }
    </div>
  )
}

export const CardBody = (props) => {
  return (
    <div className={css.cardBody}>
      { props.children }
    </div>
  )
}

export const CardHeader = (props) => {
  return (
    <div className={css.cardHeader}>
      { props.children }
    </div>
  )
}

export const CardBreadcrumbs = (props) => {
  return (
    <div className={css.cardBreadcrumbs}>
      {props.children}
    </div>
  )
}

export const CardBreadcrumbItem = ({icon, label}) => {
  return (
    <div className={css.cardBreadcrumbsItem}>
      <div className={css.label}>
        {label}
      </div>
    </div>
  )
}

CardBreadcrumbs.propTypes = {

}

CardBreadcrumbItem.propTypes = {
  icon: PropTypes.arrayOf(PropTypes.string).isRequired,
  label: PropTypes.node,
}
