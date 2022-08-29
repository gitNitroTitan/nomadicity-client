/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Button } from 'react-bootstrap';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div className="signOutPage">
      <div
        className="text-center d-flex flex-column justify-content-center align-content-center"
        style={{
          height: '90vh',
          padding: '30px',
          maxWidth: '90vw',
          margin: '0 auto',
        }}
      />
      <div className="welcomeMsg">
        <h1>Welcome to Nomadicity!</h1>
        <h3>Please log in to show your hikes</h3>
      </div>
      <div className="signInBtn">
        <Button type="button" size="lg" className="btn signBtn btn-secondary btn-large" onClick={signIn}>
          Sign In
        </Button>
      </div>
    </div>
  );
}

export default Signin;
