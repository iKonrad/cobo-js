import React from 'react';
import classnames from 'classnames';
import {
  FormGroup,
  Label,
  Input,
  FormFeedback,
  FormText,
} from 'reactstrap';

const renderField = ({ input, label, type, meta: { touched, error }, id, placeholder }) => {
  const rowClasses = classnames({
    'form-group-invalid': touched && error,
  })
  return (
    <FormGroup className={rowClasses}>
      <Label for={id || ''}>{label}</Label>
      <Input
        id={id}
        {...input}
        placeholder={placeholder}
        type="textarea"
        invalid={!!error}
      />
      {touched && error && <FormFeedback invalid>{error}</FormFeedback>}
    </FormGroup>
  )
}

export default renderField;
