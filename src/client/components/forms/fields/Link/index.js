import React from 'react';
import classnames from 'classnames';
import { FormGroup, Input, Label, Button, FormFeedback } from 'reactstrap';
import LinkHelpers from 'utils/helpers/Link';
import LinkPreview from 'components/posts/LinkPreview';
import LinkPreviewLoading from 'components/loading/LinkPreview';

const STATUSES = {
  ERROR: 0,
  READY: 1,
  LOADING: 2,
};

class Media extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: STATUSES.READY,
      metadata: null,
      error: null,
    }
  }

  setStatus = (id, metadata = null, error = null) => {
    const { state } = this;
    state.status = id;
    state.metadata = metadata;
    state.error = error;
    this.setState(state);
  }

  handleChange = event => {
    const { input } = this.props;
    this.setStatus(STATUSES.READY, null, null);
    input.onChange(event);
  }

  handleBlur = async event => {
    const url = event.target.value;
    if (url === '') {
      this.setStatus(STATUSES.READY, null, null);
    } else if (!this.state.metadata || (url !== this.state.metadata.url)) {
      await this.fetchLink(url);
    }
  }

  handlePaste = async event => {
    const url = event.clipboardData.getData('text');
    await this.fetchLink(url);
  }


  fetchLink = async (url) => {
    this.setStatus(STATUSES.LOADING);
    const data = await LinkHelpers.fetchLinkMetadata(url);
    if (data.errors) {
      this.setStatus(STATUSES.ERROR, null, data.errors && data.errors.url ? data.errors.url[0] : 'error.unexpected');
    } else {
      this.setStatus(STATUSES.READY, data, null);
    }
  }

  render() {
    const {
      input,
      label,
      id,
      meta,
      placeholder,
    } = this.props;

    const { status, metadata } = this.state;

    const hasError = (meta.touched && meta.error) || status === STATUSES.ERROR;
    const error = this.state.error ? this.state.error : meta.error;
    const rowClasses = classnames({
      'form-group-invalid': hasError,
    });

    return (
      <FormGroup className={rowClasses}>
        <Label for={id || ''}>{ label }</Label>
        <Input
          id={id}
          name={input.name}
          value={input.value}
          placeholder={placeholder}
          type="text"
          invalid={hasError}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          onPaste={this.handlePaste}
        />
        {
            hasError ?
            <FormFeedback invalid>{error}</FormFeedback> :
            null
        }
        <div>
          {
            status === STATUSES.LOADING ?
              <LinkPreviewLoading/> :
              null
          }
          {
            metadata && <LinkPreview {...metadata} />
          }
        </div>
      </FormGroup>
    )
  }
}

export default Media;
