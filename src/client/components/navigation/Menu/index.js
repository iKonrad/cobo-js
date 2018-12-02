import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import MenuOption from './components/MenuOption';
import GuestMenu from './components/GuestMenu';
import UserMenu from './components/UserMenu';
import { hideMobileMenu } from 'state/actions/App';
import css from './styles.scss';


@connect(state => ({showMenu: state.app.showMenu}))
class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    }
  }
  toggleExpanded = (value = false) => () => {
    const { state } = this;
    state.expanded = value;
    this.setState(state);
  }

  handleResize = () => {
    const { showMenu, dispatch } = this.props;
    const w = window,
          d = document,
          documentElement = d.documentElement,
          body = d.getElementsByTagName('body')[0],
          width = w.innerWidth || documentElement.clientWidth || body.clientWidth;

    if (width >= 768 && showMenu) {
      dispatch(hideMobileMenu());
    }
  }

  componentDidMount () {
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount () {
    window.removeEventListener("resize", this.handleResize);
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
            user.authenticated ?
              <UserMenu/> :
              <GuestMenu/>
          }
          <div className={css.separator} />
        </div>
      </div>
    )
  }
}

Menu.propTypes = {
  expanded: PropTypes.bool,
  hidden: PropTypes.bool,
  user: PropTypes.object.isRequired,
  showMenu: PropTypes.bool,
}

Menu.defaultProps = {
  expanded: false,
  hidden: false,
  showMenu: false,
}

export default Menu;
