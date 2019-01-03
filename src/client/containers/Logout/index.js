import React from 'react';
import { connect } from 'react-redux';
import { Actions } from 'state/actions/User';
import { withRouter } from 'react-router-dom';

@withRouter
@connect(state => ({ user: state.user }))
class Logout extends React.Component {
  async componentDidMount() {
    await this.props.dispatch(Actions.logout());
    this.props.history.push('/');
  }

  render() {
    return <div>Logging you out...</div>;
  }
}

export default Logout;
