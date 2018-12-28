import React from 'react';
import { connect } from 'react-redux';

class GoogleAuth extends React.Component {
  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: process.env.REACT_APP_CLIENT_ID,
        scope: 'email'
      });
    });
  }

  render() {
    return <div>GoogleAuth</div>;
  }
}
console.log(process.env.REACT_APP_CLIENT_ID);
export default GoogleAuth;
