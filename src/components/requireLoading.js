import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loading from './Loading';

export default ChildComponent => {
  class ComposedComponent extends Component {
    render() {
      return <ChildComponent {...this.props} />;
    }
  }

  const mapStateToProps = state => ({
    isFetching: state.streams.isFetching
  });

  return connect(mapStateToProps)(ComposedComponent);
};
