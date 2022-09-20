/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Button } from 'react-bootstrap';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div className="signOutPage">
      <div
        className="text-center d-flex flex-column"
      />
      <div className="welcomeMsg">
        <h1>Welcome to Nomadicity!</h1>
        <h3>Please log in to show your hikes</h3>

        <div className="signInBtn">
          <Button type="button" size="lg" className="btn signBtn btn-secondary btn-large" onClick={signIn}>
            Sign In
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Signin;
