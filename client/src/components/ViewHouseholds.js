import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import axios from "axios";
import ViewHouseholdsHelper from "./ViewHouseholdsHelper";

function ViewHouseholds() {
  const alert = useAlert();
  const [households, setHouseholds] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      try {
        const res = await axios.get("/api/all-households", config);
        if (res.status === 200) {
          setHouseholds(res.data);
        } else throw new Error("Could not fetch data");
      } catch (e) {
        alert.error("Couldn't get your records :(");
      }
    }

    fetchData();
  }, [alert]);

  return (
    <div className="all-hh-wrapper">
      <h2 className="subtitle" style={{ textAlign: "center" }}>
        All Connections
      </h2>

      <div className="all-table-wrapper">
        <table className="table is-bordered is-striped is-fullwidth custom-css">
          <thead>
            <tr className="is-selected is-primary">
              <th>BP No.</th>
              <th>Service No.</th>
              <th>Name</th>
              <th>Address</th>
              <th>Meter No.</th>
              <th>Last Reading</th>
              <th>PF</th>
              <th>MD</th>
              <th>Book No.</th>
            </tr>
          </thead>
          <tbody>
            {households.length !== 0 ? (
              <ViewHouseholdsHelper households={households} />
            ) : (
              <tr> </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewHouseholds;
