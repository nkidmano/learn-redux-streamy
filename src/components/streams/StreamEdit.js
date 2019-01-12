import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import StreamForm from './StreamForm';
import requireAuth from '../requireAuth';
import { fetchStream, editStream } from '../../actions/streamActions';

class StreamEdit extends Component {
  static propTypes = {
    stream: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired
    }),
    fetchStream: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  onSubmit = formValues => {
    this.props.editStream(this.props.match.params.id, formValues);
  };

  render() {
    if (!this.props.stream) {
      return <div>loading...</div>;
    }

    const { title, description } = this.props.stream;
    const initialValues = { title, description };
    return (
      <div>
        <h3>Edit Stream</h3>
        <StreamForm initialValues={initialValues} onSubmit={this.onSubmit} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(
  mapStateToProps,
  { fetchStream, editStream }
)(requireAuth(StreamEdit));
