import { times } from 'lodash';
import React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Card } from 'components/ui/Card';
import Default from 'templates/Default';
import { State, UserState } from 'types';
import * as css from './styles.scss';


export const loadData = async (store:Redux.Store<State>) => {
};

interface StateProps {
    user: UserState,
}

class Home extends React.Component<StateProps> {
  render() {
    const { user } = this.props;
    return (
      <Default user={user}>
        <div className={css.home}>
            Home
        </div>
      </Default>
    );
  }
}

const mapStateToProps = (state: State): StateProps => ({
  user: state.user,
});

export default withRouter(connect(mapStateToProps)(Home));
