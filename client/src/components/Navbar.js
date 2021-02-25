import { useState } from "react";
import { useHistory } from "react-router-dom";

function Navbar(props) {
  const history = useHistory();
  const [toggle, setToggle] = useState(false);

  const logout = () => {
    localStorage.clear();
    history.push("/");
  };
  return (
    <div>
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="https://bulma.io">
            CSEB HELPER
          </a>

          <button
            className={`button navbar-burger ${toggle ? "is-active" : ""}`}
            onClick={() => setToggle(!toggle)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        <div className={`navbar-menu ${toggle ? "is-active" : ""}`}>
          <div className="navbar-start">
            <div className="navbar-item">
              <button
                className="button is-link is-inverted"
                value="0"
                onClick={(e) => props.setNewSection(e.target.value)}
              >
                Take meter reading
              </button>
            </div>
            <div className="navbar-item">
              <button
                className="button is-link is-inverted"
                value="1"
                onClick={(e) => props.setNewSection(e.target.value)}
              >
                Add a meter connection
              </button>
            </div>
            <div className="navbar-item">
              <button
                className="button is-link is-inverted"
                value="2"
                onClick={(e) => props.setNewSection(e.target.value)}
              >
                View All connections
              </button>
            </div>
          </div>
          <div className="navbar-end">
            <div className="navbar-item">Hi, {props.name}</div>
            <div className="navbar-item">
              <div className="buttons">
                <button className="button is-danger" onClick={() => logout()}>
                  <span className="icon">
                    <i className="fas fa-sign-out-alt"></i>
                  </span>
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
