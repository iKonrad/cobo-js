import React from 'react'
import classnames from 'classnames'

import {
  CustomInput,
  FormFeedback,
  FormGroup,
  Label,
} from 'reactstrap'

const renderField = ({input, label, type, meta: {touched, error}, value, options}) => {
  const rowClasses = classnames({
    'form-group-invalid': touched && error,
  })
  return (
    <FormGroup>
      <Label>{ label }</Label>
      {
        options.map(option =>
          <CustomInput
            id={`${input.name}${option.value}`}
            type="radio"
            label={option.label}
            {...input}
            value={option.value}
            checked={option.value === parseInt(input.value, 10)}
            invalid={!!error}
          />)
      }
      {touched && error && <FormFeedback invalid>{error}</FormFeedback>}
    </FormGroup>
  )
}
export default renderField;
