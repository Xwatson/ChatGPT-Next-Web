import React, { use, useEffect, useLayoutEffect, useState } from "react";
import { useAccessStore } from "../store";

import styles from "./index.scss";

function LoginPage(props: { children: React.ReactNode }) {
  const accessStore = useAccessStore();
  const [isLogin, setLoginStatus] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  useLayoutEffect(() => {
    setLoginStatus(!!accessStore.accessCode);
  }, []);

  const handleUsernameChange = (event: any) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    fetch("/api/login", {
      method: "post",
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (!res.error && res.data) {
          accessStore.update((access) => {
            access.accessCode = res.data;
            setLoginStatus(true);
          });
        } else {
          setMessage(res.message);
        }
        console.log(res);
      })
      .catch((err: any) => {
        console.error(err);
      });
  };
  if (!isLogin) {
    return (
      <div>
        <h2>Login - AI</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div style={{ color: "red" }}>{message}</div>
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
  return props.children;
}

export default LoginPage;
