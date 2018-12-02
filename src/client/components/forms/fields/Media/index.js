import React from 'react';
import classnames from 'classnames';
import { FormGroup, Input, Label, Button, FormFeedback } from 'reactstrap';
import { SubmissionError } from 'redux-form'
import css from './styles.scss';
import { FormattedMessage } from 'react-intl';
import MediaHelper from 'utils/helpers/Media';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const STATUSES = {
  ERROR: -1,
  EMPTY: 0,
  LOADING: 1,
  UPLOADED: 2,
  SUBMITTED: 3,
};

class Media extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: STATUSES.EMPTY,
      file: null,
    }
  }

  setStatus = (id) => {
    const { state } = this;
    state.status = id;
    this.setState(state);
  }

  setFile = (file) => {
    const { state } = this;
    state.file = file;
    this.setState(state);
  }

  removeFile = async () => {
    const { state } = this;
    const { onChange } = this.props.input;
    this.setStatus(STATUSES.LOADING);
    const isDeleted = await MediaHelper.remove(state.file.id);

    if (isDeleted) {
      state.file = null;
      onChange(null);
      state.status = STATUSES.EMPTY;
      this.setState(state);
    } else {
      this.setStatus(STATUSES.ERROR);
    }
  }

  handleFileSelect = async (event) => {
    const { onChange } = this.props.input;
    const { type } = this.props;

    if (event.target.files && event.target.files.length > 0) {
      this.setStatus(STATUSES.LOADING);

      const uploadedFile = await MediaHelper.upload(type || 'image', event.target.files[0]);
      if (uploadedFile.id) {
        onChange(uploadedFile.id);
        this.setFile(uploadedFile);
        this.setStatus(STATUSES.UPLOADED);
      } else {
        this.setStatus(STATUSES.ERROR);
      }
    }
  }

  renderContent = () => {
    const { status } = this.state;
    switch (status) {
      case STATUSES.EMPTY: {
        return (
          <FontAwesomeIcon icon={['far', 'image']}/>
        )
      }
      case STATUSES.ERROR: {
        return (
          <FontAwesomeIcon icon={['far', 'image']}/>
        )
      }
      case STATUSES.LOADING: {
        return (
          <FontAwesomeIcon icon={['far', 'cog']} spin />
        )
      }
      case STATUSES.UPLOADED: {
        return (
          <img src={this.state.file.url} className={css.fileImg} />
        )
      }
    }
  }

  render() {
    const {
      input,
      label,
      id,
      meta: { touched, error }
    } = this.props;

    const { status } = this.state;

    const classes = classnames({
      [css.fileUploader]: 1,
      [css.withImage]: status === STATUSES.UPLOADED,
      [css.withError]: status === STATUSES.ERROR,
    })

    const rowClasses = classnames({
      'form-group-invalid': touched && error,
    })

    return (
      <FormGroup className={rowClasses}>
        <Label for={id || ''}>{ label }</Label>
        <div className={css.fileRow}>
          <div className={css.fileWrapper}>
            <Input
              id={id}
              name={input.name}
              value={input.value}
              type={status < STATUSES.LOADING ? 'file' : 'hidden'}
              className={css.fileField}
              invalid={status === STATUSES.ERROR}
              onChange={this.handleFileSelect}
            />
            <div className={classes}>
              { this.renderContent() }
            </div>
            {
              status === STATUSES.UPLOADED ?
                <div className={css.fileRemove}>
                  <Button onClick={this.removeFile} color="outline-danger" size="sm" block>
                    <FontAwesomeIcon icon={['far', 'trash']}/>{' '}
                    <FormattedMessage id="ui.remove" />
                  </Button>
                </div>
                : null
            }
            {
              status === STATUSES.ERROR ?
                <FormFeedback invalid><FormattedMessage id="errors.imageUploadError" /></FormFeedback> :
                null
            }
          </div>
        </div>
      </FormGroup>
    )
  }
}

export default Media;
