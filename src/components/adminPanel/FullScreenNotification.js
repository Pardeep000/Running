import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useHistory } from "react-router-dom";
const FullScreenNotification = () => {
  const history = useHistory();
  const handleback = () => {
    history.goBack();
  };
  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          padding: "5px 10px 0px 10px",
          borderBottom: "1px solid lightgrey",
        }}
      >
        <div
          style={{ display: "flex", cursor: "pointer" }}
          onClick={handleback}
        >
          <ArrowBackIcon style={{ color: "gray" }} />
          <span style={{ color: "gray" }}>Back</span>
        </div>
        <h4 style={{ color: "gray" }}>Notifications</h4>
        <h6></h6>
      </div>
    </>
  );
};
export default FullScreenNotification;
