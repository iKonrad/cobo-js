import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Navbar from 'components/navigation/Navbar';
import css from './styles.scss';

@connect(state => ({user: state.user}))
class Empty extends React.Component {
  render() {
    const { user } = this.props;
    return [
      <Navbar user={user} key={1} />,
            <div className={css.template} key={2}>
              <div className={css.templateBody}>
                { this.props.children }
              </div>
            </div>
    ]
  }
}

export default Empty;
