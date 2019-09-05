import * as React from 'react';
import * as Redux from 'redux';
import { Actions } from 'state/actions/User';
import { FormattedMessage } from 'react-intl';
import BasicField from 'components/forms/fields/Basic';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button } from 'reactstrap';
import Alert from 'components/ui/Alert';
import * as Formik from 'formik';
import { ActionType, State, UserState } from 'types';

interface OwnProps {
  history,
}

interface StateProps {
  user: UserState,
}

interface DispatchProps {
  onAuthenticate: (username, password) => Redux.AnyAction,
  onFetchUserData: (sessionToken) => Redux.AnyAction,
}

type Props = OwnProps & StateProps & DispatchProps;

interface FormValues {
  username: string,
  password: string,
}

const LoginForm:React.FunctionComponent<Props> = props => (
  <Formik.Formik
    initialValues={{}}
    onSubmit={async (
      { username, password }: FormValues,
      actions: Formik.FormikActions<FormValues>) => {
      const { history, onAuthenticate, onFetchUserData } = props;
      const response = await onAuthenticate(username, password);

      if (response.errors) {
        actions.setErrors(response.errors);
      }

      if (response && response.payload.sessionToken) {
        const userData = await onFetchUserData(response.payload.sessionToken);
        if (userData.errors) {
          actions.setErrors(response.errors);
        }

        history.push('/');
      }

      actions.setSubmitting(false);
    }}
    render={() => (
      <Formik.Form>
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

const mapStateToProps = (state: State): StateProps => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch: Redux.Dispatch<ActionType>):DispatchProps => Redux.bindActionCreators({
  onAuthenticate: Actions.authenticate,
  onFetchUserData: Actions.fetchUserData,
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm));
