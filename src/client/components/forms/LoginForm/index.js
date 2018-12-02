import React from 'react'
import { Field, reduxForm } from 'redux-form';
import { authenticate, fetchUserData } from 'state/actions/User';
import { SubmissionError } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import BasicField from 'components/forms/fields/Basic';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Form } from 'reactstrap';
import Alert from 'components/ui/Alert';

@connect(state => ({user: state.user}))
@withRouter
@reduxForm({
  form: 'login',
})
class LoginForm extends React.Component {
  submit = async ({username, password}) => {
    const { dispatch, history } = this.props;
    const response = await dispatch(authenticate(username, password));

    if (response.errors) {
      throw new SubmissionError(response.errors);
    }

    if (response && response.sessionToken) {
      const userData = await dispatch(fetchUserData(response.sessionToken));
      if (userData.errors) {
        throw new SubmissionError(userData.errors);
      }

      history.push('/');
    }
  }

  render () {
    const { handleSubmit, error, loading } = this.props;
    return (
      <div>
        {error && !loading && <div className="mb-3"><Alert>{error}</Alert></div>}
        <Form onSubmit={handleSubmit(this.submit)}>
          <Field id="username" label={<FormattedMessage id="form.placeholder.username" />} placeholder="eg.john@doe.com" name="username" component={BasicField} type="text" />
          <Field id="password" label={<FormattedMessage id="form.placeholder.password" />} placeholder="" name="password" component={BasicField} type="password" />
            <Button type="submit" color="primary" block>Submit</Button>
        </Form>
      </div>
    )

  }
}

LoginForm.propTypes = {}
LoginForm.defaultProps = {}

export default LoginForm;
