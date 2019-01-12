import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchStreams } from '../../actions/streamActions';
import Loading from '../Loading';

class StreamList extends Component {
  static propTypes = {
    streams: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired
      })
    ),
    currentUserId: PropTypes.string,
    isSignedIn: PropTypes.bool,
    isFetching: PropTypes.bool,
    fetchStreams: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.fetchStreams();
  }

  renderAdmin(stream) {
    if (this.props.currentUserId === stream.userId) {
      return (
        <div className="right floated content">
          <Link to={`/streams/edit/${stream.id}`} className="ui button primary">
            Edit
          </Link>
          <Link
            to={`/streams/delete/${stream.id}`}
            className="ui button negative"
          >
            Delete
          </Link>
        </div>
      );
    }
  }

  renderCreate() {
    if (this.props.isSignedIn) {
      return (
        <div style={{ textAlign: 'right' }}>
          <Link to="/streams/new" className="ui button primary">
            Create Stream
          </Link>
        </div>
      );
    }
  }

  renderList() {
    return this.props.streams.map(stream => {
      return (
        <div className="item" key={stream.id}>
          {this.renderAdmin(stream)}
          <i className="large middle aligned icon camera" />
          <div className="content">
            <Link to={`/streams/${stream.id}`} className="header">
              {stream.title}
            </Link>
            <div className="description">{stream.description}</div>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <h2>Stream</h2>
        <div className="ui celled list">{this.renderList()}</div>
        {this.renderCreate()}
        {this.props.isFetching && <Loading />}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    streams: Object.values(state.streams.items),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn,
    isFetching: state.streams.isFetching
  };
};

export default connect(
  mapStateToProps,
  { fetchStreams }
)(StreamList);
