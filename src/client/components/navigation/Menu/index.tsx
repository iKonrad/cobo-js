import * as React from 'react';
import * as Redux from 'redux';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Actions } from 'state/actions/App';
import { ActionType, State, UserState } from 'types';
import MenuOption from './components/MenuOption';
import GuestMenu from './components/GuestMenu';
import UserMenu from './components/UserMenu';
import css from './styles.scss';

interface OwnProps {
  expanded?: boolean,
  hidden?: boolean,
  user: UserState,
}

interface OwnState {
  expanded: boolean,
}

interface StateProps {
  showMenu: boolean,
}

interface DispatchProps {
  onHideMobileMenu: () => void,
}

type Props = OwnProps & StateProps & DispatchProps;

// @connect(state => ({ showMenu: state.app.showMenu }))
class Menu extends React.Component<Props, OwnState> {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  toggleExpanded = (value = false) => () => {
    const state = { ...this.state };
    state.expanded = value;
    this.setState(state);
  }

  handleResize = () => {
    const { showMenu, onHideMobileMenu } = this.props;
    const w = window;
    const d = document;
    const { documentElement } = d;
    const body = d.getElementsByTagName('body')[0];
    const width = w.innerWidth || documentElement.clientWidth || body.clientWidth;
    if (width >= 768 && showMenu) {
      onHideMobileMenu();
    }
  }

  render() {
    const { user, showMenu } = this.props;
    const { expanded } = this.state;

    const classes = classnames({
      [css.wrapper]: true,
      [css.expanded]: expanded,
      [css.showMenuMobile]: showMenu,
    });

    return (
      <div
        className={classes}
        onFocus={this.toggleExpanded(true)}
        onMouseOver={this.toggleExpanded(true)}
        onMouseLeave={this.toggleExpanded(false)}>
        <div className={css.menu}>
          <MenuOption to="/" icon="plus">
            <FormattedMessage id="menu.addNew" />
          </MenuOption>
          <MenuOption to="/" icon="home" transform="left-2">
            <FormattedMessage id="menu.home" />
          </MenuOption>
          <div className={css.separator} />
          {
            user.authenticated
              ? <UserMenu />
              : <GuestMenu />
          }
          <div className={css.separator} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: State):StateProps => ({
  showMenu: state.app.showMenu,
});

const mapDispatchToProps = (dispatch: Redux.Dispatch<ActionType>): DispatchProps => Redux.bindActionCreators({
  onHideMobileMenu: Actions.hideMobileMenu,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
