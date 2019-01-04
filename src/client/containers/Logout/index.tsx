import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'state/actions/User';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { ActionType, State, UserState } from 'types';

interface StateProps {
  user: UserState,
}

interface DispatchProps {
  onLogout: () => void,
}

type Props = RouteComponentProps & DispatchProps & StateProps;

class Logout extends React.Component<Props> {
  async componentDidMount() {
    const { history, onLogout } = this.props;
    await onLogout();
    history.push('/');
  }

  render() {
    return <div>Logging you out...</div>;
  }
}

const mapStateToProps = (state: State): StateProps => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch: Redux.Dispatch<ActionType>): DispatchProps => Redux.bindActionCreators({
  onLogout: Actions.logout,
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Logout));
