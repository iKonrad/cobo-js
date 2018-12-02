import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Container,
  Collapse,
  Navbar as BSNavbar,
  Nav,
  NavItem,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { showMobileMenu, hideMobileMenu } from 'state/actions/App'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


@withRouter
@connect(state => ({showMenu: state.app.showMenu, community: state.community}))
class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileMenuOpen: false,
    };
  }

  toggleMobileMenu = () => {
    const { state } = this;
    state.mobileMenuOpen = !state.mobileMenuOpen;
    this.setState(state);
  }

  toggleMainMenu = () => {
    const { dispatch, showMenu } = this.props;
    if (!showMenu) {
      dispatch(showMobileMenu());
    } else {
      dispatch(hideMobileMenu());
    }
  }

  renderUserMenu = () => {
    return [
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
    ]
  }

  renderGuestMenu = () => {
    return [
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
    ]
  }

  render() {
    const { user, showMenuButton, community, match } = this.props;
    return (
      <BSNavbar dark={true} expand="md">
          <Container fluid>
            {
              showMenuButton ?
              <div className="navbar-menu-toggler" onClick={this.toggleMainMenu}>
                <FontAwesomeIcon icon={['fas', 'bars']} className="navbar-menu-toggler-icon" />
              </div> :
                <div className="navbar-menu-toggler-mock" />
            }
            <div className="navbar-brand">Cobo.js</div>
            <div className="navbar-toggler" onClick={this.toggleMobileMenu}>
              <FontAwesomeIcon icon={['fas', 'user-circle']} className="navbar-toggler-icon" />
            </div>
            <Collapse navbar isOpen={this.state.mobileMenuOpen}>
              <Nav className="ml-auto" navbar>
                {
                  user && user.authenticated ?
                    this.renderUserMenu() :
                    this.renderGuestMenu()
                }
              </Nav>
            </Collapse>
          </Container>
      </BSNavbar>
    )
  }
}

Navbar.propTypes = {
  user: PropTypes.object,
  showMenuButton: PropTypes.bool,
}

Navbar.defaultProps = {
  user: null,
  showMenuButton: false,
}

export default Navbar;
