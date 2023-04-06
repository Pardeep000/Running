import React from "react";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";

import { Tooltip } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  userLabel: {
    textAlign: "center",
    borderBottom: "1px solid gray",
    margin: "25px 55px",
    fontSize: 15,
    display: "block",
    fontFamily: "Poppins"
  },
}));
const LabelMessageContainer = ({ item, textCreated, searchCount }) => {
  const classes = useStyles();

  return (
    <div>
      <Tooltip
        arrow={true}
        placement={"top"}
        title={moment.unix(item.timestamp / 1000).format("DD MMM YYYY hh:mm a")}
        className={classes.userLabel}
      >
        <span
          data-search={
            textCreated.containsSearch ? "Search" + searchCount : undefined
          }
          dangerouslySetInnerHTML={{
            __html: textCreated.text.includes("!-!-!-")
              ? textCreated.text.split("!-!-!-")[0]
              : textCreated.text,
          }}
        ></span>
      </Tooltip>
    </div>
  );
};

export default LabelMessageContainer;
