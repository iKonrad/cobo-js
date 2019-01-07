import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { State, UserState } from 'types';

const onlyNotAuthenticated = WrappedComponent => {
  interface StateProps {
    user: UserState,
  }

  const AuthCheck: React.FunctionComponent<StateProps> = props => {
    const { user } = props;
    const filteredProps = Object.keys(props)
      .filter(propName => propName !== 'user')
      .reduce((obj, key) => {
        obj[key] = props[key];
        return obj;
      }, {});

    if (!user || !user.authenticated) {
      return <WrappedComponent {...filteredProps} />;
    }

    return <Redirect to="/" />;
  };

  const mapStateToProps = (state: State): StateProps => ({
    user: state.user,
  });

  return connect(mapStateToProps)(AuthCheck);
};

export default onlyNotAuthenticated;
