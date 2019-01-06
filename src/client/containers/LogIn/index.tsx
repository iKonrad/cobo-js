import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import Loadable from 'react-loadable';
import Empty from 'templates/Empty';
import LoadingComponent from 'components/loading/LoadingComponent';
import { Card, CardBody } from 'components/ui/Card';
import { Container, Row, Col } from 'reactstrap';

const LoginForm = Loadable({
  loader: () => import('components/forms/LoginForm'),
  loading: LoadingComponent,
});

const LogIn = (
  <Empty>
    <Container>
      <Row>
        <Col xs={12} md={6} lg={5} className="mx-auto mt-3">
          <h1><FormattedMessage id="title.login" /></h1>
          <Card>
            <CardBody>
              <LoginForm />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  </Empty>
);


export default LogIn;
