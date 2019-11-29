import * as React from 'react';
import * as Formik from 'formik';
import classnames from 'classnames';
import {
  FormGroup,
  Label,
  Input,
  FormFeedback,
} from 'reactstrap';


interface FieldProps {
  id?: string,
  label?: React.ReactNode,
  placeholder?: string,
}

type Props = FieldProps & Formik.FieldProps;

const renderField: React.FunctionComponent<Props> = ({
  field, form, label, id, placeholder,
}) => {
  const hasError:boolean = !!form.errors[field.name];
  const rowClasses = classnames({
    'form-group-invalid': hasError,
  });

  console.log('errors', form.errors);

  return (
    <FormGroup className={rowClasses}>
      <Label for={field.name}>{label}</Label>
      <Input
        {...field} // Name, value and event hjandles
        id={id}
        placeholder={placeholder}
        invalid={hasError} />
      {
        hasError
        && (
        <FormFeedback invalid>
          {form.errors[field.name]}
        </FormFeedback>
        )
      }
    </FormGroup>
  );
};

export default renderField;
