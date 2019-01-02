import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Modal from '../Modal';
import history from '../../history';
import { fetchStream, deleteStream } from '../../actions';

class StreamDelete extends Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  renderActions = () => {
    const id = this.props.match.params.id;
    return (
      <Fragment>
        <button
          className="ui negative button"
          onClick={() => this.props.deleteStream(id)}
        >
          Delete
        </button>
        <button className="ui button" onClick={() => history.push('/')}>
          Cancel
        </button>
      </Fragment>
    );
  };

  renderContent = () => {
    if (!this.props.stream) {
      return 'Are you sure you want to delete this stream ?';
    }
    return `Are you sure you want to delete the stream with title: ${
      this.props.stream.title
    }`;
  };

  render() {
    return (
      <Modal
        title="Delete Stream"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push('/')}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(
  mapStateToProps,
  { fetchStream, deleteStream }
)(StreamDelete);
