import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loading from './Loading';

export default ChildComponent => {
  class ComposedComponent extends Component {
    render() {
      const { dispatch, isFetching, ...rest } = this.props;

      if (isFetching) {
      }

      return <ChildComponent {...rest} />;
    }
  }

  const mapStateToProps = state => {
    return { isFetching: state.streams.isFetching };
  };

  return connect(mapStateToProps)(ComposedComponent);
};
