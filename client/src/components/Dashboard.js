import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";
import axios from "axios";

import Navbar from "./Navbar";
import AddRecord from "./AddRecord";
import AddHousehold from "./AddHousehold";
import ViewHouseholds from "./ViewHouseholds";
import Progress from "./Progress";

function Dashboard() {
  const [user, setUser] = useState({ name: "User" });
  const [section, setSection] = useState("0");
  const history = useHistory();
  const alert = useAlert();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token === null) {
      alert.show("Please Login First");
      history.push("/");
    }

    async function fetchUser() {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const res = await axios.get("/api/me", config);
        if (res.status === 200) {
          setUser(res.data);
        }
      } catch (e) {
        alert.error("OOPS!");
      }
    }

    fetchUser();
  }, [alert, history]);

  let sectionalComponent;

  switch (section) {
    case "0":
      sectionalComponent = <AddRecord />;
      break;
    case "1":
      sectionalComponent = <AddHousehold />;
      break;
    case "2":
      sectionalComponent = <ViewHouseholds />;
      break;
    case "3":
      sectionalComponent = <Progress />;
      break;
    default:
      break;
  }

  return (
    <div>
      <Navbar name={user.name} setNewSection={setSection} />
      {sectionalComponent}
    </div>
  );
}

export default Dashboard;
