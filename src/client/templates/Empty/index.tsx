import * as React from 'react';
import { connect } from 'react-redux';
import Navbar from 'components/navigation/Navbar';
import { UserState, State } from 'types/redux';
import * as css from './styles.scss';

interface StateProps {
  user: UserState
}

class Empty extends React.Component<StateProps, {}> {
  render() {
    const { user, children } = this.props;
    return [
      <Navbar user={user} key={1} />,
      <div className={css.template} key={2}>
        <div className={css.templateBody}>
          { children }
        </div>
      </div>,
    ];
  }
}

const mapStateToProps = (state: State): StateProps => ({
  user: state.user,
});

export default connect(mapStateToProps)(Empty);
