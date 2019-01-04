import React from 'react';
import classnames from 'classnames';
import Navbar from 'components/navigation/Navbar';
import Menu from 'components/navigation/Menu';
import { Container } from 'reactstrap';
import { UserState } from 'types';
import * as css from './styles.scss';

interface OwnProps {
  user: UserState,
  noPadding?: boolean,
  fluid?:boolean,
}

interface OwnState {
  expanded: boolean,
}

class Default extends React.Component<OwnProps, OwnState> {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  setExpanded = (expanded:boolean = false):void => {
    this.setState({
      expanded,
    });
  };


  handleResize = ():void => {
    const { expanded } = this.state;
    const w = window;
    const d = document;
    const { documentElement } = d;
    const body = d.getElementsByTagName('body')[0];
    const width = w.innerWidth || documentElement.clientWidth || body.clientWidth;

    if (width > 922 && !expanded) {
      this.setExpanded(true);
    } else if (width <= 922 && expanded) {
      this.setExpanded(false);
    }
  };

  render() {
    const { user, fluid, noPadding, children } = this.props;
    const { expanded } = this.state;
    const classes = classnames({
      [css.templateDefault]: true,
      [css.noPadding]: noPadding,
    });


    const contentClasses = classnames({
      [css.content]: true,
    });

    return [
      <Navbar key="navbar" user={user} showMenuButton />,
      <Menu key="menu" expanded={expanded} user={user} />,
      <div key="content" className={contentClasses}>
        <div className={classes}>
          <Container fluid={fluid} className={css.container}>
            <div className={css.templateBody}>
              { children }
            </div>
          </Container>
        </div>
      </div>,
    ];
  }
}

export default Default;
