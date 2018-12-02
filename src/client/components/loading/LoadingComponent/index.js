import React from 'react';
import css from './styles.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default () => (
  <div className={css.loading}>
    <FontAwesomeIcon icon={['fas', 'cog']} spin className={css.icon} />
  </div>
)
