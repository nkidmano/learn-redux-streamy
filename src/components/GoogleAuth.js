import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { signIn, signOut, initGoogleAuth } from '../actions';

class GoogleAuth extends Component {
  componentDidMount() {
    this.props.initGoogleAuth();
  }

  onSignInClick = () => {
    this.props.signIn();
  };

  onSignOutClick = () => {
    this.props.signOut();
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (!this.props.isSignedIn) {
      return (
        <button className="ui red google button" onClick={this.onSignInClick}>
          <i className="google icon" />
          Sign In
        </button>
      );
    } else {
      return (
        <button className="ui red google button" onClick={this.onSignOutClick}>
          <i className="google icon" />
          Sign Out
        </button>
      );
    }
  }

  render() {
    return (
      <Fragment>
        <div>{this.renderAuthButton()}</div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(
  mapStateToProps,
  { signIn, signOut, initGoogleAuth }
)(GoogleAuth);
