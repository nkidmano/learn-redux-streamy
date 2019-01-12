import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchStream } from '../../actions/streamActions';

class StreamShow extends React.Component {
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

  render() {
    if (!this.props.stream) return <div>Loading...</div>;

    const { title, description } = this.props.stream;
    return (
      <div>
        <h5>{title}</h5>
        <p>{description}</p>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(
  mapStateToProps,
  { fetchStream }
)(StreamShow);
