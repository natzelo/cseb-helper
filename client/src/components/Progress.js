import { useState, useEffect } from "react";
import { useAlert } from "react-alert";
import axios from "axios";
import ProgressHelper from "./ProgressHelper";

function Progress() {
  const alert = useAlert();
  const [progress, setProgress] = useState("0");
  const [restOfHouses, setRestOfHouses] = useState([]);

  useEffect(() => {
    async function fetchProgress() {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      try {
        const res = await axios.get("/api/progress", config);
        if (res.status === 200) {
          if (res.data.progressObj.progress === null) {
            throw new Error(
              "Progress tracking failed, Did you take the readings of a connection twice?"
            );
          }

          setProgress(res.data.progressObj.progress);
          setRestOfHouses(res.data.progressObj.leftHouses);
        } else if (res.status === 400) {
          throw new Error("No households to track");
        } else {
          throw new Error("Didn't get progress");
        }
      } catch (e) {
        console.log(e);
        alert.error(
          "Oops something went wrong. Make sure you have atleast one connection"
        );
      }
    }

    fetchProgress();
  }, [alert, progress, restOfHouses]);

  return (
    <div className="progress-wrapper">
      <div className="box">
        <progress
          class="progress is-large is-info"
          value={progress}
          max="100"
        ></progress>
        <h2 className="subtitle" style={{ textAlign: "center" }}>
          {`Progress: ${progress}%`}
        </h2>
      </div>

      <h2 className="subtitle">Places left to visit</h2>
      <table
        className="table is-bordered is-striped is-fullwidth"
        style={{ background: "transparent" }}
      >
        <thead>
          <tr className="is-selected">
            <th>BP No.</th>
            <th>Name</th>
            <th>Address</th>
          </tr>
        </thead>

        <tbody>
          {restOfHouses.length !== 0 ? (
            <ProgressHelper households={restOfHouses} />
          ) : (
            <></>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Progress;
