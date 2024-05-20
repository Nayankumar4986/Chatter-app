import "./App.css";
import AppWrapper from "./components/AppWrapper";
import Loginpage from "./components/Loginpage";
import Chat from "./components/Chat";
import { useState } from "react";
import Cookies from "universal-cookie";

const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [isInChat, setIsInChat] = useState(false);
  const [room, setRoom] = useState("");

  if (!isAuth) {
    return <Loginpage setIsAuth={setIsAuth}></Loginpage>;
  }

  return (
    <div className="App">
      <AppWrapper
        isAuth={isAuth}
        setIsAuth={setIsAuth}
        setIsInChat={setIsInChat}
      >
        {!isInChat ? (
          <div className="room">
            <label>Enter Room Name</label>
            <input
              type="text"
              onChange={(e) => setRoom(e.target.value)}
            ></input>
            <button
              type="submit"
              onClick={() => {
                setIsInChat(true);
              }}
            >
              Enter chat
            </button>
          </div>
        ) : (
          <Chat room={room}></Chat>
        )}
      </AppWrapper>
    </div>
  );
}

export default App;
