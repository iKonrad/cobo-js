import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const isRoleAtLeast = WrappedComponent => {
  @connect(state => ({user: state.user}))
  class AuthCheck extends React.Component {
    render() {
      const { user } = this.props;

      const filteredProps = Object.keys(this.props)
        .filter(propName => propName !== 'user')
        .reduce((obj, key) => {
          obj[key] = this.props[key];
          return obj;
        }, {});

      if (!user || !user.authenticated) {
        return <WrappedComponent {...filteredProps} />
      }

      return <Redirect to="/" />
    }
  }

  return AuthCheck;
}

export default isRoleAtLeast;
