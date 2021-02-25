import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
//Compnents Import
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";

function App() {
  const options = {
    position: positions.BOTTOM_RIGHT,
    timeout: 5000,
    offset: "30px",
  };
  return (
    <>
      <AlertProvider template={AlertTemplate} {...options}>
        <Router>
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/dashboard" exact component={Dashboard} />
          </Switch>
        </Router>
      </AlertProvider>
    </>
  );
}

export default App;
