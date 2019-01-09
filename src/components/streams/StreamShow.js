import React from 'react';
import { connect } from 'react-redux';

import { fetchStream } from '../../actions/streamActions';

class StreamShow extends React.Component {
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
