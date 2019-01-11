import React, { Component } from 'react';
import { connect } from 'react-redux';
import history from '../history';

export default ChildComponent => {
  class ComposedComponent extends Component {
    componentDidMount() {
      this.shouldNavigateAway();
    }

    componentDidUpdate() {
      this.shouldNavigateAway();
    }

    shouldNavigateAway() {
      if (!this.props.isSignedIn) {
        history.push('/');
      }
    }

    render() {
      return <ChildComponent {...this.props} />;
    }
  }

  const mapStateToProps = state => {
    return { isSignedIn: state.auth.isSignedIn };
  };

  return connect(mapStateToProps)(ComposedComponent);
};
