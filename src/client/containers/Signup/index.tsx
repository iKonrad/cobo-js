import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import Loadable from '@loadable/component';
import Empty from 'templates/Empty';

import { Card, CardBody } from 'components/ui/Card';
import { Container, Row, Col } from 'reactstrap';
import LoadingComponent from 'components/loading/LoadingComponent';

const SignupForm = Loadable(() => import('components/forms/SignupForm'));

const Signup = () :React.ReactNode => (
  <Empty>
    <Container>
      <Row>
        <Col xs={12} md={6} lg={5} className="mx-auto mt-3">
          <h1><FormattedMessage id="title.signup" /></h1>
          <Card>
            <CardBody>
              <SignupForm />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  </Empty>
);

export default Signup;
