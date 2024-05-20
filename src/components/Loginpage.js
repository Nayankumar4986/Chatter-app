import React from 'react';
import './Loginpage.css';
import { auth, provider } from '../firebase.js';
import { signInWithPopup } from 'firebase/auth';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const Loginpage = ({ setIsAuth }) => {
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      cookies.set('auth-token', result.user.refreshToken);
      setIsAuth(true);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="loginpage-container">
      <div className="gradient-heading">
        <h1 className="gradient-text">Chatter App.</h1>
      </div>
      <p>Login-Create Room-Invite friends-Chat</p>

      <button className="google-login" onClick={signInWithGoogle}>
        Login in with google
      </button>

      <p className="footer-text">
        Created by Nayan Kumar (nayanK092@gmail.com)
      </p>
      <p className="footer-text ">Made using React.js</p>
    </div>
  );
};

export default Loginpage;
