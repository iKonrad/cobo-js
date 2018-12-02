import React from 'react'
import Base from 'templates/Empty';

class NotFound extends React.Component {
  render () {
    const staticContext  = this.props.staticContext || {};
    staticContext.notFound = true;

    return (
      <Base>
        NotFound 404
      </Base>
    )
  }
}

NotFound.propTypes = {}
NotFound.defaultProps = {}

export default NotFound
