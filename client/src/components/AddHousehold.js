import React, { useState } from "react";
import { useAlert } from "react-alert";
import axios from "axios";

function AddHousehold() {
  const alert = useAlert();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [manufacturer, setManu] = useState("");
  const [meterNo, setMeterNo] = useState("");
  const [MHRNo, setMHRNo] = useState("");
  const [bookNo, setBookNo] = useState("");
  const [BPNo, setBPNo] = useState("");
  const [serviceNo, setServiceNo] = useState("");

  const save = async () => {
    const data = {
      name,
      address,
      manufacturer,
      meterNo,
      MHRNo,
      bookNo,
      BPNo,
      serviceNo,
    };

    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    try {
      const res = await axios.post("/api/add-household", data, config);
      if (res.status === 200) {
        alert.success("New meter connection added!");
      } else {
        throw new Error("Something went wrong");
      }
    } catch (e) {
      alert.error("Oops! Something went wrong");
    }
    console.log(data);
  };

  const clear = () => {
    setName("");
    setAddress("");
    setManu("");
    setMeterNo("");
    setMHRNo("");
    setBookNo("");
    setBPNo("");
    setServiceNo("");
  };
  return (
    <div className="new-hh-wrapper">
      <h2 className="subtitle" style={{ textAlign: "center" }}>
        Add a new connection
      </h2>
      <div className="new-hh-form-wrapper">
        <div className="field">
          <label className="label">Name</label>
          <div className="control">
            <input
              className="input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Address</label>
          <div className="control">
            <textarea
              className="textarea"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>

        <div className="field">
          <label className="label">BP No.</label>
          <div className="control">
            <input
              className="input"
              type="text"
              value={BPNo}
              onChange={(e) => setBPNo(e.target.value)}
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Service No.</label>
          <div className="control">
            <input
              className="input"
              type="text"
              value={serviceNo}
              onChange={(e) => setServiceNo(e.target.value)}
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Meter No.</label>
          <div className="control">
            <input
              className="input"
              type="text"
              value={meterNo}
              onChange={(e) => setMeterNo(e.target.value)}
            />
          </div>
        </div>

        <div className="field">
          <label className="label">MHR No.</label>
          <div className="control">
            <input
              className="input"
              type="text"
              value={MHRNo}
              onChange={(e) => setMHRNo(e.target.value)}
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Book No.</label>
          <div className="control">
            <input
              className="input"
              type="text"
              value={bookNo}
              onChange={(e) => setBookNo(e.target.value)}
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Manufaturer</label>
          <div className="control">
            <input
              className="input"
              type="text"
              value={manufacturer}
              onChange={(e) => setManu(e.target.value)}
            />
          </div>
        </div>

        <div className="field is-grouped">
          <div className="control">
            <button className="button is-success" onClick={() => save()}>
              <span className="icon is-small">
                <i className="fas fa-check"></i>
              </span>
              <span>Save</span>
            </button>
          </div>
          <div className="control">
            <button
              className="button is-danger is-outlined"
              onClick={() => clear()}
            >
              <span>Clear</span>
              <span className="icon is-small">
                <i className="fas fa-times"></i>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddHousehold;
