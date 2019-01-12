import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { createStream } from '../../actions/streamActions';
import StreamForm from './StreamForm';

class StreamCreate extends Component {
  static propTypes = {
    createStream: PropTypes.func.isRequired
  };

  onSubmit = formValues => {
    this.props.createStream(formValues);
  };

  render() {
    return (
      <div>
        <h3>Create a stream</h3>
        <StreamForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default connect(
  null,
  { createStream }
)(StreamCreate);
