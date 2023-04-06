import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  settingHeader: {
    width: "100%",
    padding: "8px",
    fontSize: "21px",
    fontFamily: "poppins",
    borderBottom: "1px solid lightgrey",
    fontWeight: "500",
  },
}));
function SettingHeader({ text, fontColor }) {
  const classes = useStyles();
  return (
    <div style={{ color: fontColor }} className={classes.settingHeader}>
      {text}
    </div>
  );
}

export default SettingHeader;
