import React, { useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import downIcon from "../../assets/chatWindow/Icons-chevron-down.svg";
import chattyhubcode from "../../assets/chatWindow/chattyhubcode.svg";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    fontSize: "10px !important",
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
const useStyles = makeStyles((theme) => ({
  settingWebHeadingContainer: {
    display: "flex",
    alignItems: "center",

    paddingBottom: "5px",
    marginBottom: "10px",
  },
  settingWebHeading: {
    fontFamily: "poppins",
    fontSize: "15px",
    fontWeight: "600",
    margin: 0,
  },
  settingWebMain: {
    width: "95%",
    margin: "15px auto",
  },
  settingWebInner: {
    width: "70%",
  },
  settingWebNextContainer: {
    fontFamily: "poppins",
    display: "flex",
    alignItems: "center",
    color: "gray",
    fontSize: "14px",
    marginTop: "-7px",
  },
  settingWebNextContainerHead: {
    fontFamily: "poppins",
    display: "flex",
    alignItems: "center",
    color: "lightgray",
    fontSize: "12px",
    margin: "30px 0px 5px auto",
    fontWeight: "700",
  },
  settingWebNextContainerHead2: {
    fontFamily: "poppins",
    display: "flex",
    alignItems: "center",
    color: "gray",
    fontSize: "14px",
    margin: "30px 0px 0px auto",
  },
  inputboxandbutton: {
    fontFamily: "poppins",
    display: "flex",
    width: "60%",
    margin: "23px 18px 47px auto",
    marginLeft: "0px",
  },
  input: {
    fontFamily: "poppins",
    color: "gray",
    fontSize: "12px",
    fontWeight: "500",
    "&:hover": {
      boxShadow: "none",
    },
    "&:focus": {
      boxShadow: "none",
      border: "1px solid lightgray",
    },
  },
  btncopied: {
    fontFamily: "poppins",
    backgroundColor: "#55A530",
    color: "white",
    fontSize: "12px",
    fontWeight: "600",
    width: "20%",
    height: "20%",
    marginLeft: "2%",
    boxShadow: "none",
    "&:hover": {
      backgroundColor: "#55A530",
      color: "white",
      fontSize: "12px",
      fontWeight: "600",
    },
    "&:focus": {
      backgroundColor: "#55A530",
      color: "white",
      fontSize: "12px",
      fontWeight: "600",
      boxShadow: "none",
    },
  },
  mainContent: {
    display: "flex",
    justifyContent: "space-between",
    width: "60%",
    border: "1px solid lightgray",
    padding: "15px 25px 15px 25px",
  },
  content: {
    fontFamily: "poppins",
    fontSize: "15px",
    fontWeight: "600",
  },
  conditional: {
    fontFamily: "poppins",
    width: "60%",
    border: "1px solid lightgray",
    padding: "15px 25px 10px 25px",
  },
  firsttag: {
    fontFamily: "poppins",
    color: "gray",
    fontSize: "12px",
    fontWeight: "500",
  },
  needhelppara: {
    fontFamily: "poppins",
    fontFamily: "poppins",
    fontSize: "12px",
    fontWeight: "600",
    margin: "30px 0px 0px -10px",
  },
  codebox: {
    fontFamily: "poppins",
    fontSize: "12px",
    width: "91%",
    border: "1px solid lightgray",
    margin: "10px 0px 10px 30px",
    color: "gray",
    padding: "5px 15px 20px 15px",
  },
  lisenceid: {
    fontFamily: "poppins",
    fontSize: "12px",
    display: "flex",
    justifyContent: "flex-end",
    color: "gray",
    margin: "0px 30px 10px 0px",
  },
  btnf: {
    backgroundColor: "black",
    color: "white",
    fontSize: "12px",
    fontWeight: "600",
    fontFamily: "poppins",

    "&:hover": {
      backgroundColor: "black",
      color: "white",
      fontSize: "12px",
      fontWeight: "600",
    },
    "&:focus": {
      backgroundColor: "black",
      color: "white",
      boxShadow: "none",
      fontSize: "12px",
      fontWeight: "600",
    },
  },
  buttonsdisplying: {
    display: "flex",
    justifyContent: "flex-end",
  },
  textspace: {
    marginTop: "-4%",
  },
  downloadbutton: {
    fontFamily: "poppins",
    backgroundColor: "#55A530",
    color: "white",
    fontSize: "12px",
    fontWeight: "600",
    "&:hover": {
      backgroundColor: "#55A530",
      color: "white",
      fontSize: "12px",
      fontWeight: "600",
    },
    "&:focus": {
      backgroundColor: "#55A530",
      color: "white",
      fontSize: "12px",
      fontWeight: "600",
      boxShadow: "none",
    },
  },
  copybutton: {
    fontFamily: "poppins",
    backgroundColor: "#55A530",
    color: "white",
    fontSize: "12px",
    fontWeight: "600",
    width: "100%",
    "&:hover": {
      backgroundColor: "#55A530",
      color: "white",
      fontSize: "12px",
      fontWeight: "600",
    },
    "&:focus": {
      backgroundColor: "#55A530",
      color: "white",
      fontSize: "12px",
      fontWeight: "600",
      boxShadow: "none",
    },
  },
  titlebutton: {
    fontFamily: "poppins",
    backgroundColor: "gainsboro",
    color: "gray",
    fontSize: "12px",
    fontWeight: "600",
    "&:hover": {
      backgroundColor: "gainsboro",
      color: "gray",
      fontSize: "12px",
      fontWeight: "600",
    },
    "&:focus": {
      backgroundColor: "gainsboro",
      color: "gray",
      fontSize: "12px",
      fontWeight: "600",
      boxShadow: "none",
    },
  },
  dialogCustomizedWidth: {
    width: "90%",
  },
  titlemodal: {
    fontFamily: "poppins",
    fontSize: "13px !important",
    fontWeight: "600 !important",
    display: "flex",
    justifyContent: "space-between",
  },
  input2: {
    fontFamily: "poppins",
    color: "gray",
    fontSize: "12px",
    width: "30%",
    "&:focus": {
      border: "1px solid lightgray",
      boxShadow: "none",
    },
  },
  input3: {
    fontFamily: "poppins",
    color: "gray",
    fontSize: "12px",
    width: "30%",
    marginTop: "2%",
    "&:focus": {
      border: "1px solid lightgray",
      boxShadow: "none",
    },
  },
}));
const SettingWebsite = () => {
  const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  };

  const codeRef = useRef(null);
  const textRefx = useRef(null);
  const classes = useStyles();
  const [iconpos, seticonpos] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [button, setButton] = React.useState(false);
  const [Lastfield, setLastfield] = React.useState(false);
  const [temp, settemp] = React.useState("");
  const [copyitem, setCopyitem] = React.useState(false);
  // useEffect(() => {
  //   setTimeout(() => {
  //     settemp(codeRef?.current?.innerText);
  //   }, 2000);
  // }, []);
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleSend = () => {
    setOpen(false);
  };
  const handleLinkCopiedtext = async (e) => {
    setCopyitem(true);
    textRefx.current.select();
    document.execCommand("copy");

    e.target.focus();
    setTimeout(() => {
      setCopyitem(false);
    }, 2000);
  };

  async function copyTextToClipboard(text) {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand("copy", true, text);
    }
  }
  const handleLinkCopied = async (e) => {
    if (
      codeRef?.current?.innerText != "" &&
      codeRef?.current?.innerText != undefined
    ) {
      setButton(true);
      copyTextToClipboard(codeRef?.current?.innerText)
        .then(() => {
          setTimeout(() => {
            setButton(false);
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <>
      <div className={classes.settingWebMain}>
        <div className={classes.settingWebInner}>
          <div className={classes.settingWebHeadingContainer}>
            <h4 className={classes.settingWebHeading}>Install ChattyHub</h4>
          </div>
          <span className={classes.settingWebNextContainer}>
            To see ChattyHub on your website, you'll need to add a bit of code
            or configure an integration.Learn more...
          </span>
        </div>
        <div>
          <span className={classes.settingWebNextContainerHead}>
            RECOMMENDED FOR YOU
          </span>
        </div>
        <div className={classes.mainContent}>
          <div className={classes.content}>
            <img
              src={chattyhubcode}
              alt="arrow"
              style={{
                width: "25px",
                marginRight: "5px",
              }}
            />
            Install ChattyHub code manually
          </div>
          <img
            onClick={() => {
              seticonpos(!iconpos);
            }}
            src={downIcon}
            alt="arrow"
            style={{
              cursor: "pointer",
              transform: iconpos == false ? "rotate(-90deg)" : "",
              width: "15px",
            }}
          />
        </div>
        {iconpos == true ? (
          <div className={classes.conditional}>
            <div className={classes.firsttag}>
              1: copy and paste this code before the closing
              <span style={{ color: "#55A530" }}> {"</body>"} </span> tag on
              every page of your website.
            </div>
            <div className={classes.codebox} ref={codeRef}>
              <div className={classes.buttonsdisplying}>
                {button == true ? (
                  <Button
                    variant="outline-secondary"
                    id="button-addon2"
                    className={classes.btncopied}
                  >
                    copied!
                  </Button>
                ) : (
                  <Button
                    variant="light"
                    id="button-addon2"
                    className={classes.btnf}
                    onClick={handleLinkCopied}
                  >
                    Copy code
                  </Button>
                )}
              </div>
              <div className={classes.textspace}>
                --- start of chattyhub.com --- scripts
                document.getElementById("demo").innerHTML = "Hello JavaScript!";
                script scripts document.getElementById("demo").innerHTML =
                "Hello JavaScript!"; script scripts
                document.getElementById("demo").innerHTML = "Hello JavaScript!";
                script scripts document.getElementById("demo").innerHTML =
                "Hello JavaScript!"; script scripts
              </div>
            </div>
            <div className={classes.lisenceid}>Lisence ID: 1122334</div>
            <div className={classes.firsttag}>
              2: copy and paste this code before the closing{" "}
              <span style={{ color: "#55A530" }}>{"</body>"} </span>
              tag on every page of your website.
            </div>
            <div className={classes.needhelppara}>
              Need help?{" "}
              <span
                style={{ color: "#55A530", cursor: "pointer" }}
                onClick={handleClickOpen}
              >
                Send this task to developer.
              </span>
            </div>
          </div>
        ) : (
          ""
        )}
        <div>
          <span className={classes.settingWebNextContainerHead2}>
            Not able to find what you are looking for ? No worries!please share
            your suggestions below:
          </span>
        </div>
        <div className={classes.inputboxandbutton}>
          <InputGroup className="mb-3" style={{ width: "50% !important" }}>
            <Form.Control
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              placeholder="Please share suggestions"
              width={"60%"}
              className={classes.input}
            />
          </InputGroup>
          <Button
            variant="outline-secondary"
            id="button-addon2"
            className={classes.btncopied}
          >
            Submit
          </Button>
        </div>
      </div>
      <BootstrapDialog
        classes={{ paper: classes.dialogCustomizedWidth }}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
          style={{ fontSize: "10px !important" }}
          className={classes.titlemodal}
        >
          Send installation instruction to developer
        </BootstrapDialogTitle>
        <div style={{ display: "flex" }}>
          <DialogContent dividers>
            <Typography
              variant="p"
              component="div"
              sx={{ fontSize: 11 }}
              style={{
                color: "gray",
                fontWeight: "700",
                fontFamily: "poppins",
              }}
              gutterBottom
            >
              Developer's email
            </Typography>
            <InputGroup className="mb-3">
              <Form.Control
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                //   value={titlepic2}
                className={classes.input2}
                placeholder="yourname@example.com"
                //   onChange={(e) => handleinputdata(e)}
                name="message"
                required
              />
            </InputGroup>
            <Typography
              variant="a"
              sx={{ fontSize: 11 }}
              style={{
                fontWeight: "700",
                textDecoration: "underline",
                cursor: "pointer",
                fontFamily: "poppins",
              }}
              gutterBottom
              onClick={() => setLastfield(!Lastfield)}
            >
              Share link with instructions
            </Typography>
            {Lastfield == true ? (
              <>
                <InputGroup className="mb-3">
                  <Form.Control
                    ref={textRefx}
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    value="https://chattyhub/new/crm.com/kjh"
                    className={classes.input3}
                    //   onChange={(e) => handleinputdata(e)}
                    name="message"
                    readOnly
                  />
                </InputGroup>
                {copyitem == true ? (
                  <Button variant="light" className={classes.copybutton}>
                    Copied !
                  </Button>
                ) : (
                  <Button
                    variant="light"
                    className={classes.copybutton}
                    onClick={handleLinkCopiedtext}
                  >
                    Copy link
                  </Button>
                )}
              </>
            ) : (
              ""
            )}
          </DialogContent>
          <DialogContent dividers style={{ width: "50%" }}>
            <Typography
              variant="p"
              component="div"
              sx={{ fontSize: 11 }}
              style={{
                color: "gray",
                fontWeight: "700",
                fontFamily: "poppins",
              }}
              gutterBottom
            >
              Preview
            </Typography>
            <div
              style={{
                fontFamily: "poppins",
                color: "gray",
                border: "1px solid lightgray",

                wordBreak: "break-word",
                whiteSpace: " break-spaces",
                fontSize: "12px",
                padding: "5px",
                height: "150px",

                overflowX: "hidden",
                overflowY: "scroll",
              }}
            >
              Hi there ,
              <br />
              We'd like to start using chattyhub on your website and we need ur
              help with the installation.
              <br />
              Thanks!
              <br />
              We need to add the below code snippet into every page of our
              website , just before the closing body tag.
              <br />
              Other installation options are available here.
              <br />
              <div
                style={{ backgroundColor: "lightgray", fontFamily: "poppins" }}
              >
                <span>
                  --- start of chattyhub.com --- scripts
                  document.getElementById("demo").innerHTML = "Hello
                  JavaScript!"; script scripts
                  document.getElementById("demo").innerHTML = "Hello
                  JavaScript!"; script scripts
                  document.getElementById("demo").innerHTML = "Hello
                  JavaScript!"; script scripts
                  document.getElementById("demo").innerHTML = "Hello
                  JavaScript!"; script scripts
                </span>
              </div>
              <span style={{ color: "#55A530", fontFamily: "poppins" }}>
                https://chattyhub.com/newusersuggest.org
              </span>
              <br />
              Thanks for your help.
            </div>
          </DialogContent>
        </div>
        <DialogActions>
          <Button
            variant="light"
            className={classes.titlebutton}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            variant="light"
            className={classes.downloadbutton}
            onClick={handleSend}
          >
            Send
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
};
export default SettingWebsite;
