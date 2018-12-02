import { times } from 'lodash'
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Card } from 'components/ui/Card';
import Default from 'templates/Default';
import css from './styles.scss';


export const loadData = async (store) => {
}

@withRouter
@connect(state => ({home: state.home, user: state.user}))
class Home extends React.Component {

  render() {
    const { user } = this.props;
    return (
      <Default user={user}>
        <div className={css.home}>
            Home
        </div>
      </Default>
    )
  }
}


export default Home;
