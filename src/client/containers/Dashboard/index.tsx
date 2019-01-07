import * as React from 'react';
import Default from 'templates/Default';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { State, UserState } from 'types';


interface StateProps {
    user: UserState,
}


const Dashboard: React.FunctionComponent<StateProps> = ({ user }) => (
  <Default user={user}>
        Dashboard
  </Default>
);


const mapStateToProps = (state: State): StateProps => ({
  user: state.user,
});

export default connect(mapStateToProps)(Dashboard);
