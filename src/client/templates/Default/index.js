import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Navbar from 'components/navigation/Navbar';
import Menu from 'components/navigation/Menu';
import { Container } from 'reactstrap';
import { Actions } from 'state/actions/App';
import css from './styles.scss';

class Default extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    const { expanded } = this.state;
    const w = window;
    const d = document;
    const documentElement = d.documentElement;
    const body = d.getElementsByTagName('body')[0];
    const width = w.innerWidth || documentElement.clientWidth || body.clientWidth;
    const height = w.innerHeight || documentElement.clientHeight || body.clientHeight;

    if (width > 922 && !expanded) {
      this.setExpanded(true);
    } else if (width <= 922 && expanded) {
      this.setExpanded(false);
    }
  }

  setExpanded(expanded = false) {
    this.setState({
      expanded,
    });
  }

  componentWillUnmount() {
    const { dispatch, showMenu } = this.props;
    if (showMenu) {
      dispatch(Actions.hideMobileMenu());
    }
  }

  render() {
    const { user, fluid, noPadding, match } = this.props;
    const { expanded } = this.state;
    const classes = classnames({
      [css.templateDefault]: true,
      [css.noPadding]: noPadding,
    });


    const contentClasses = classnames({
      [css.content]: true,
    });

    return [
      <Navbar key="navbar" user={user} key={1} showMenuButton />,
      <Menu key="menu" expanded={expanded} user={user} />,
      <div key="content" className={contentClasses}>
        <div className={classes}>
          <Container fluid={fluid} className={css.container}>
            <div className={css.templateBody}>
              { this.props.children }
            </div>
          </Container>
        </div>
      </div>,
    ];
  }
}

Default.propTypes = {
  fluid: PropTypes.bool,
  noPadding: PropTypes.bool,
  user: PropTypes.object.isRequired,
};

Default.defaultProps = {
  fluid: true,
  noPadding: false,
};

export default Default;
