import { useState, useEffect } from "react";
import axios from "axios";
import { useAlert } from "react-alert";
function StartRoundButton() {
  const alert = useAlert();
  const [isDisabled, setIsDisabled] = useState(true);
  const [disabledMsg, setDisabledMsg] = useState("On a Round");

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    async function decideButtonState() {
      try {
        const res = await axios.get("/api/progress", config);

        if (res.status === 200) {
          if (res.data.progressObj.progress === 100) {
            setIsDisabled(false);
          }
        }
      } catch (e) {
        alert.error("Cannot start a round without connections");
        setDisabledMsg("No connections");
      }
    }

    decideButtonState();
  }, [alert]);

  const beginRound = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    try {
      const response = await axios.get("/api/start-a-round", config);
      if (response.status === 200) {
        setIsDisabled(true);
        alert.success("Round has begun!");
      }
    } catch (e) {
      alert.error("Couldn't start Round");
    }
  };

  return (
    <div>
      <button
        class="button is-warning"
        disabled={isDisabled}
        onClick={() => beginRound()}
      >
        {isDisabled ? disabledMsg : "Start a round"}
      </button>
    </div>
  );
}

export default StartRoundButton;
