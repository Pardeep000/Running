import React, { useEffect } from "react";
import "./style.css";
import { IconButton } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import AddBoxIcon from "@material-ui/icons/AddBox";
import CloseIcon from "@material-ui/icons/Close";
import GeneralInfo from "./generalInfoCard";
import VisitedPages from "./visitedPages";
import AdditionalInfo from "./Additionalinfo";
import TechnologyCard from "./technologycard";
import MainNavbar from "./navbar";
import Tooltip from "@material-ui/core/Tooltip";
import ChatBoxCustomerFormModal from "../../chatBox/ChatBoxCustomerFormModal";
import { useSelector } from "react-redux";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  arrow: {
    "&:before": {
      border: "1px solid black",
    },
    color: "black",
  },
  tooltip: {
    backgroundColor: "black !important",
    border: "1px solid black",
    color: "white !important",
  },
}));
const Traffic = () => {
  let classes = useStyles();
  const [show, setShow] = useState(false);
  const [modal, setCustomerModal] = useState(false);
  const signal = useSelector((state) => state.StateControlReducer);
  useEffect(() => {
    localStorage.removeItem(
      "signal1",
      "signal2",
      "signal3",
      "signal4",
      "signal5"
    );
  }, []);
  useEffect(() => {
    setShow(signal.signal);
  }, [signal]);
  return (
    <>
      {show ? (
        <>
          <div
            class="split left"
            style={{
              width: "70%",
              transition: "all 0.25s",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                paddingBottom: "0px",
              }}
            >
              <h4 style={{ marginLeft: "2%", fontFamily: "poppins" }}>
                Traffic
              </h4>
            </div>
            <hr style={{ marginTop: "-0.3%" }} />
            <MainNavbar />
          </div>
          <div class="split right" style={{ display: show ? "block" : "none" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                borderBottom: "1px solid lightgray",
                marginTop: "-15px",
              }}
            >
              <div>
                <Tooltip
                  title="Details"
                  arrow
                  placement="top"
                  classes={{ arrow: classes.arrow, tooltip: classes.tooltip }}
                >
                  <IconButton aria-label="close">
                    <PersonIcon style={{ borderBottom: "3px solid #55A530" }} />
                  </IconButton>
                </Tooltip>
                <Tooltip
                  title="Add Form"
                  placement="top"
                  arrow
                  classes={{ arrow: classes.arrow, tooltip: classes.tooltip }}
                >
                  <IconButton aria-label="close">
                    <AddBoxIcon />
                  </IconButton>
                </Tooltip>
              </div>
              <div>
                <Tooltip
                  title="Close"
                  placement="bottom"
                  arrow
                  classes={{ arrow: classes.arrow, tooltip: classes.tooltip }}
                >
                  <IconButton aria-label="close" onClick={() => setShow(false)}>
                    <CloseIcon />
                  </IconButton>
                </Tooltip>
              </div>
            </div>

            {/* <hr style={{ marginTop: "-4%" }} /> */}
            <h6
              style={{
                marginLeft: "8%",
                marginTop: "15px",
                fontFamily: "poppins",
              }}
            >
              Details
            </h6>
            <div
            // style={{
            //   width: "95%",
            //   display: "flex",
            //   justifyContent: "center",
            // }}
            >
              <GeneralInfo />
              <VisitedPages />
              <AdditionalInfo />
              <TechnologyCard />
            </div>
          </div>
        </>
      ) : (
        <>
          <div
            class="split left"
            style={{ width: "89%", transition: "all 0.25s", height: "90%" }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                paddingBottom: "0px",
              }}
            >
              <h4 style={{ marginLeft: "2%", fontFamily: "poppins" }}>
                Traffic
              </h4>
            </div>
            <hr style={{ marginTop: "-0.4%" }} />
            <MainNavbar />
          </div>

          <div class="split right2">
            <div
              className="icons"
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Tooltip
                title="Details"
                arrow
                placement="right"
                classes={{ arrow: classes.arrow, tooltip: classes.tooltip }}
              >
                <IconButton onClick={() => setShow(true)}>
                  <PersonIcon style={{ fontSize: "30px" }} />
                </IconButton>
              </Tooltip>
              <Tooltip
                title="Add Form"
                arrow
                placement="right"
                classes={{ arrow: classes.arrow, tooltip: classes.tooltip }}
              >
                <IconButton>
                  <AddBoxIcon style={{ fontSize: "30px" }} />
                </IconButton>
              </Tooltip>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default Traffic;
