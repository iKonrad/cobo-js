import * as React from 'react';
import Base from 'templates/Empty';

interface OwnProps {
  staticContext: any,
}

class NotFound extends React.Component<OwnProps> {
  render() {
    const staticContext = this.props.staticContext || {};
    staticContext.notFound = true;

    return (
      <Base>
        NotFound 404
      </Base>
    );
  }
}

export default NotFound;
