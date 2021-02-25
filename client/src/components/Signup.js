import React, { useState } from "react";
import { useAlert } from "react-alert";
import axios from "axios";
function Signup() {
  const alert = useAlert();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSignUp = async () => {
    try {
      const res = await axios.post("/api/signup", { name, email, password });

      if (res.status === 200) {
        alert.success("Successfully Signed In!");
        localStorage.setItem("token", res.data.token);
      }
    } catch (e) {
      alert.error("Oops! Something went wrong");
    }
  };

  return (
    <>
      <div className="login-wrapper">
        <h1 className="title" style={{ textAlign: "center" }}>
          {" "}
          Sign Up
        </h1>
        <div className="field">
          <label className="label is-large">Name</label>
          <div className="control has-icons-left">
            <input
              className="input"
              type="text"
              placeholder="Type Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <span className="icon is-small is-left">
              <i className="fas fa-user"></i>
            </span>
          </div>
        </div>
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
        <div className="control">
          <button className="button is-link" onClick={() => onSignUp()}>
            Sign Up
          </button>
        </div>
      </div>
    </>
  );
}

export default Signup;
