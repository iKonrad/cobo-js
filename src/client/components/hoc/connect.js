import React from 'react';
import { connect } from 'react-redux';

export default (stateDeclarations) => (Container) => {

  @connect(state => ({app: state.app, ...stateDeclarations(state)}))
  class WrappedContainer extends React.Component {
    render() {
      const { app } = this.props;
      // if (app.loading.on) {
      //   return <h1>Loading</h1>;
      // }
      return (
        <Container {...this.props} />
      )
    }
  }

  return WrappedContainer;
}
