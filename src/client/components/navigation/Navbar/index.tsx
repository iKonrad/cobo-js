import * as React from 'react';
import * as Redux from 'redux';
import { FormattedMessage } from 'react-intl';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Container,
  Collapse,
  Navbar as BSNavbar,
  Nav,
  NavItem,
} from 'reactstrap';
import { UserState, State, ActionType } from 'types';
import { Actions } from 'state/actions/App';

interface OwnProps {
  user: UserState,
  showMenuButton?: boolean,
}

interface OwnState {
  mobileMenuOpen: boolean,
}

interface StateProps {
  showMenu: boolean,
}

interface DispatchProps {
  onMobileMenuShow: () => void,
  onMobileMenuHide: () => void,
}

type Props = OwnProps & StateProps & DispatchProps;

@withRouter
class Navbar extends React.Component<Props, OwnState> {
  constructor(props) {
    super(props);
    this.state = {
      mobileMenuOpen: false,
    };
  }

  toggleMobileMenu = () => {
    const state = {
      ...this.state,
    };
    state.mobileMenuOpen = !state.mobileMenuOpen;
    this.setState(state);
  };

  toggleMainMenu = () => {
    const { showMenu, onMobileMenuHide, onMobileMenuShow } = this.props;
    if (!showMenu) {
      onMobileMenuShow();
    } else {
      onMobileMenuHide();
    }
  };

  renderUserMenu = () => [
    <NavItem key={3}>
      <Link to="/c/new" className="nav-link">
        <FormattedMessage id="title.createCommunity" />
      </Link>
    </NavItem>,
    <NavItem key={1}>
      <Link to="/profile" className="nav-link">
        <FormattedMessage id="title.account" />
      </Link>
    </NavItem>,
    <NavItem key={2}>
      <Link to="/logout" className="nav-link">
        <FormattedMessage id="title.logout" />
      </Link>
    </NavItem>,
  ];

  renderGuestMenu = () => [
    <NavItem key={2}>
      <Link to="/login" className="nav-link">
        <FormattedMessage id="title.login" />
      </Link>
    </NavItem>,
    <NavItem key={3}>
      <Link to="/signup" className="nav-link">
        <FormattedMessage id="title.signup" />
      </Link>
    </NavItem>,
  ];

  render() {
    const { user, showMenuButton } = this.props;
    const { mobileMenuOpen } = this.state;
    return (
      <BSNavbar dark expand="md">
        <Container fluid>
          {
              showMenuButton
                ? (
                  <div className="navbar-menu-toggler" onClick={this.toggleMainMenu}>
                Menu
                  </div>
                )
                : <div className="navbar-menu-toggler-mock" />
            }
          <div className="navbar-brand">Szery</div>
          <div className="navbar-toggler" onClick={this.toggleMobileMenu}>
              User
          </div>
          <Collapse navbar isOpen={mobileMenuOpen}>
            <Nav className="ml-auto" navbar>
              {
                  user && user.authenticated
                    ? this.renderUserMenu()
                    : this.renderGuestMenu()
                }
            </Nav>
          </Collapse>
        </Container>
      </BSNavbar>
    );
  }
}

const mapStateToProps = (state: State): StateProps => ({
  showMenu: state.app.showMenu,
});

const mapDispatchToProps = (dispatch: Redux.Dispatch<ActionType>): DispatchProps => Redux.bindActionCreators({
  onMobileMenuShow: Actions.showMobileMenu,
  onMobileMenuHide: Actions.hideMobileMenu,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
