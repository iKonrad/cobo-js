import * as React from 'react';
import User from 'utils/helpers/User';
import { FormattedMessage } from 'react-intl';
import BasicField from 'components/forms/fields/Basic';
import * as Formik from 'formik';
import * as Router from 'react-router-dom';
import { Button } from 'reactstrap';

interface OwnProps {
  history,
}

interface FormValues {
  email: string,
  username: string,
  password: string,
}

const SignupForm:React.FunctionComponent<OwnProps> = props => (
  <Formik.Formik
    initialValues={{}}
    onSubmit={async (
      data: FormValues,
      actions: Formik.FormikActions<FormValues>,
    ) => {
      const { history } = props;
      const response = await User.Fetchers.signup(data);

      if (response.errors) {
        actions.setErrors(response.errors);
      } else {
        alert('Signed up');
        history.push('/');
      }
    }}
    render={() => (
      <Formik.Form>
        <Formik.Field
          id="email"
          type="text"
          label={<FormattedMessage id="form.placeholder.email" />}
          name="email"
          component={BasicField} />
        <Formik.Field
          id="username"
          type="text"
          label={<FormattedMessage id="form.placeholder.username" />}
          name="username"
          component={BasicField} />
        <Formik.Field
          id="password"
          type="password"
          label={<FormattedMessage id="form.placeholder.password" />}
          name="password"
          component={BasicField} />
        <Button type="submit" color="primary" block>Submit</Button>
      </Formik.Form>
    )} />
);

export default Router.withRouter(SignupForm);
