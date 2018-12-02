import React from 'react'
import { Field, reduxForm } from 'redux-form';
import User from 'utils/helpers/User';
import { SubmissionError } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import BasicField from 'components/forms/fields/Basic';
import { withRouter } from 'react-router-dom';
import { Button, Form } from 'reactstrap';
import Alert from 'components/ui/Alert';

@withRouter
@reduxForm({
  form: 'signup',
})
class SignupForm extends React.Component {
  submit = async (data) => {
    const { history } = this.props;
    const response = await User.Fetchers.signup(data);

    if (response.errors) {
      throw new SubmissionError(response.errors);
    } else {
      alert('Signed up');
      history.push('/');
    }
  }

  render () {
    const { handleSubmit, error, loading } = this.props;

    return (
      <div>
        {error && !loading && <Alert>{error}</Alert>}
        <Form onSubmit={handleSubmit(this.submit)}>
          <Field id="email" label={<FormattedMessage id="form.placeholder.email" />} name="email" component={BasicField} type="text" />
          <Field id="username" label={<FormattedMessage id="form.placeholder.username" />} name="username" component={BasicField} type="text" />
          <Field id="password" label={<FormattedMessage id="form.placeholder.password" />} name="password" component={BasicField} type="password" />
          <Button type="submit" color="primary" block>Submit</Button>
        </Form>
      </div>
    )

  }
}

SignupForm.propTypes = {}
SignupForm.defaultProps = {}

export default SignupForm;
