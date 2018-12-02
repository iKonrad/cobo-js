import React from 'react';
import classnames from 'classnames';
import {
  FormGroup,
  Label,
  Input,
  FormFeedback,
} from 'reactstrap';

const renderField = ({ input, label, type, meta: { touched, error }, id, placeholder, children }) => {
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
        type="select"
        invalid={!!error}
      >
        { children }
      </Input>
      {touched && error && <FormFeedback invalid>{error}</FormFeedback>}
    </FormGroup>
  )
}

export default renderField;
