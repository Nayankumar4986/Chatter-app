import React from "react";
import "./AppWrapper.css";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const AppWrapper = ({ children, isAuth, setIsAuth, setIsInChat }) => {
  const signUserOut = async () => {
    await signOut(auth);
    setIsAuth(false);
    setIsInChat(false);
  };
  return (
    <div className="App app-wrapper">
      <div className="app-header ">
        <div className="gradient-text">
          <h1>Chatter-app</h1>
        </div>

        <div>
          {isAuth && (
            <div className="sign-out">
              <button onClick={signUserOut}>Signout</button>
            </div>
          )}
        </div>
      </div>

      <div className="app-container">{children}</div>
    </div>
  );
};

export default AppWrapper;
