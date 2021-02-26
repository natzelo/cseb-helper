import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAlert } from "react-alert";
import axios from "axios";

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const alert = useAlert();
  const onLogin = async () => {
    try {
      const res = await axios.post("/api/login", { email, password });
      if (res.status === 200) {
        alert.success("Logged In!");
        localStorage.setItem("token", res.data);
        history.push("/dashboard");
      }
    } catch (e) {
      alert.error("Oops! something went wrong");
    }
  };

  return (
    <div>
      <div className="login-outer-wrapper">
        <div className="login-wrapper">
          <h1 className="title" style={{ textAlign: "center" }}>
            Login
          </h1>
          <div className="field">
            <label className="label is-large">Email</label>
            <div className="control has-icons-left ">
              <input
                className="input"
                type="email"
                placeholder="Email input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-envelope"></i>
              </span>
            </div>
          </div>

          <div className="field">
            <label className="label is-large">Password</label>
            <div className="control has-icons-left">
              <input
                className="input"
                type="password"
                placeholder="Type Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-key"></i>
              </span>
            </div>
          </div>

          <div className="field is-grouped">
            <div className="control">
              <button className="button is-link" onClick={() => onLogin()}>
                Login
              </button>
            </div>
            <div className="control">
              <Link to="/signup">
                <button className="button is-link is-light">
                  Create a new Account
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
