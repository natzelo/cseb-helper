import { useState } from "react";
import { useAlert } from "react-alert";
import axios from "axios";

function AddRecordHelper(props) {
  const alert = useAlert();
  const [energy, setEnergy] = useState(0);
  const [PF, setPf] = useState("");
  const [MD, setMd] = useState("");
  const [date, setDate] = useState();

  const renderedReadings = props.household.readings.map((reading) => {
    return (
      <tr>
        <td>{reading.date}</td>
        <td>{reading.energy}</td>
        <td>{reading.PF}</td>
        <td>{reading.MD}</td>
      </tr>
    );
  });
  const handleAdd = async () => {
    const data = {
      energy,
      date,
      PF,
      MD,
    };

    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    try {
      const res = await axios.patch(
        `/api/add-record/${props.household._id}`,
        data,
        config
      );
      if (res.status === 200) {
        alert.success("Record Added!");
        setEnergy(0);
        setDate("");
        setPf("");
        setMd("");
      }
    } catch (e) {
      alert.error("OOPS! Are you taking the reading twice?");
    }
  };

  return (
    <div className="big-outer-wrapper">
      <div className="add-record">
        <h2 className="subtitle">Basic Details</h2>
        <table className="table" style={{ background: "transparent" }}>
          <tbody>
            <tr>
              <td>
                <strong>Name</strong>
              </td>
              <td>{props.household.name}</td>
            </tr>
            <tr>
              <td>
                <strong>Address </strong>
              </td>
              <td>{props.household.address}</td>
            </tr>
          </tbody>
        </table>
        <h2 className="subtitle">Add Record</h2>
        <div className="form-wrapper">
          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label">Energy Unit</label>
            </div>
            <div className="field-body">
              <div className="field">
                <div className="control">
                  <input
                    className="input"
                    type="number"
                    value={energy}
                    onChange={(e) => setEnergy(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label">PF</label>
            </div>
            <div className="field-body">
              <div className="field">
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    value={PF}
                    onChange={(e) => setPf(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label">MD</label>
            </div>
            <div className="field-body">
              <div className="field">
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    value={MD}
                    onChange={(e) => setMd(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label">Date</label>
            </div>
            <div className="field-body">
              <div className="field">
                <div className="control">
                  <input
                    className="input"
                    type="date"
                    placeholder="Normal sized input"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="field is-horizontal">
            <div className="field-label"></div>
            <div className="field-body">
              <div className="field">
                <div className="control">
                  <button
                    className="button is-primary"
                    onClick={() => handleAdd()}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>

          <h2 className="subtitle">More Details</h2>
          <div className="table-wrapper">
            <table className="table" style={{ background: "transparent" }}>
              <tbody>
                <tr>
                  <td>
                    <strong>BP Number</strong>
                  </td>
                  <td>{props.household.BPNo}</td>
                </tr>
                <tr>
                  <td>
                    <strong>MHR Number </strong>
                  </td>
                  <td>{props.household.MHRNo}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Meter Number </strong>
                  </td>
                  <td>{props.household.meterNo}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Capacity</strong>
                  </td>
                  <td>{props.household.capacity}</td>
                </tr>
              </tbody>
            </table>
            <table className="table" style={{ background: "transparent" }}>
              <tbody>
                <tr>
                  <td>
                    <strong>Service Number</strong>
                  </td>
                  <td>{props.household.serviceNo}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Book Number </strong>
                  </td>
                  <td>{props.household.bookNo}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Manufacturer</strong>
                  </td>
                  <td>{props.household.manufacturer}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <h2 className="subtitle">Previous Readings</h2>
          <div className="reading-wrapper">
            <table className="table" style={{ background: "transparent" }}>
              <thead>
                <tr className="is-selected">
                  <th>Date</th>
                  <th>Energy</th>
                  <th>PF</th>
                  <th>MD</th>
                </tr>
              </thead>
              <tbody>{renderedReadings}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddRecordHelper;
