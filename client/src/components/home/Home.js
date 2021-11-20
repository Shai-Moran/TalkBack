import React from 'react';

export default function Home() {
  function goToLogin() {
    window.location = '/login';
  }

  function goToSignUp() {
    window.location = '/sign-up';
  }

  return (
    <div className="container d-flex flex-column text-center">
      <h1 className="logo text-primary font-weight-bold">TalkBack</h1>
      <button className="btn btn-primary btn-lg btn-custom" onClick={goToLogin}>
        Login
      </button>
      <button
        className="btn btn-outline-primary btn-lg btn-custom"
        onClick={goToSignUp}
      >
        Sign-up
      </button>
      <div className="d-flex flex-row align-self-center mt-3">
        <a
          className="mr-3"
          href="https://www.linkedin.com/in/shai-moran-908bb9211/"
        >
          <i class="fa fa-linkedin fa-2x"></i>
        </a>
        <a href="https://github.com/Shai-Moran">
          <i class="fa fa-github fa-2x"></i>
        </a>
      </div>
    </div>
  );
}
