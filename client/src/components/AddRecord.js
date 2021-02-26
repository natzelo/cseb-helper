import { useState } from "react";
import { useAlert } from "react-alert";
import axios from "axios";
import AddRecordHelper from "./AddRecordHelper";
function AddRecord() {
  const alert = useAlert();
  const [household, setHousehold] = useState(undefined);
  const [bpNo, setBpNo] = useState("");

  //Fetches the house by bp number and sets it in the state
  const fetchHousehold = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const res = await axios.get(`/api/bp/${bpNo}`, config);
      if (res.status === 200) {
        setHousehold(res.data);
      }
      console.log(res.data);
    } catch (e) {
      alert.error("BP Number is invalid or you are not incharge.");
    }
  };

  return (
    <div>
      <div className="search-wrapper">
        <div className="field has-addons">
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="Find via B.P. Number"
              value={bpNo}
              onChange={(e) => setBpNo(e.target.value)}
            />
          </div>
          <div className="control">
            <a className="button is-info" onClick={() => fetchHousehold()}>
              Search
            </a>
          </div>
        </div>
      </div>
      {household ? <AddRecordHelper household={household} /> : <div></div>}
    </div>
  );
}

export default AddRecord;
