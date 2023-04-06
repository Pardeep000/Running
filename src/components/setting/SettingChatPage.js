import { makeStyles } from "@material-ui/core/styles";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
// import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import QRCode from "qrcode";
import forqr from "../../../src/assets/img/forqr.png";
import html2canvas from "html2canvas";
import { Link } from "react-router-dom";
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
  settingChatHeadingContainer: {
    display: "flex",
    alignItems: "center",
    borderBottom: "1px solid lightgrey",
    paddingBottom: "5px",
    marginBottom: "10px",
  },
  settingChatHeading: {
    fontFamily: "poppins",
    fontSize: "15px",
    fontWeight: "600",
    margin: 0,
  },
  settingChatMain: {
    width: "95%",
    margin: "15px auto",
  },
  settingChatInner: {
    width: "65%",
  },
  settingChatNextContainer: {
    fontFamily: "poppins",
    display: "flex",
    alignItems: "center",
    color: "gray",
    fontSize: "11px",
    marginTop: "-7px",
  },
  inputboxandbutton: {
    fontFamily: "poppins",
    width: "37%",
    marginLeft: "25px",
    margin: "23px 18px 47px auto",
  },
  btnf: {
    fontFamily: "poppins",
    backgroundColor: "black",
    color: "white",
    fontSize: "12px",
    fontWeight: "600",

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
  btncopied: {
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
  input: {
    fontFamily: "poppins",
    color: "gray",
    fontSize: "14px",
    "&:focus": {
      boxShadow: "none",
      border: "1px solid lightgray",
    },
  },
  input2: {
    fontFamily: "poppins",
    color: "gray",
    fontSize: "14px",
    width: "30%",
  },
  linktag: {
    fontFamily: "poppins",
    color: "#55A530",
    textDecoration: "none",
    "&:hover": {
      color: "#55A530",
    },
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
  downloadbutton2: {
    fontFamily: "poppins",
    backgroundColor: "#55A530",
    color: "white",
    fontSize: "12px",
    fontWeight: "600",
    marginLeft: "10px",
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
  buttonsContainer: {
    fontFamily: "poppins",
    width: "100%",
    marginLeft: "25px",
    margin: "23px 18px 47px auto",
    display: "flex",
    height: "35px",
    // justifyContent: "space-between",
  },
  modaltitle: {
    fontFamily: "poppins",
    fontSize: "12px",
    fontWeight: "600",
  },
  title: {
    fontFamily: "poppins",
    fontSize: "13px !important",
    fontWeight: "800 !important",
  },
  dialogCustomizedWidth: {
    width: "20%",
  },
  pictureBottomSpan: {
    fontFamily: "poppins",
    color: "white",
    marginLeft: "25px",
    backgroundColor: "black",
    fontSize: "16px",
    fontWeight: "600",
    margin: "0px 18px 0px auto",
    width: "80%",
    display: "flex",
    justifyContent: "center",
  },
  picturediv: {
    width: "80%",
    height: "auto",
    marginLeft: "25px",
    margin: "23px 18px 0px auto",
    display: "flex",
  },
  downloaddiv: {
    width: "30%",
    height: "auto",
  },
  imageStyle: {
    width: "75%",
    height: "100%",
  },
  imageStyle2: {
    width: "25%",
    height: "100%",
    margin: "auto",
  },
}));
const ChatPage = () => {
  useEffect(() => {
    GenerateQRCode();
  }, []);
  const textAreaRef = useRef(null);
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

  //QR code
  const [url, setUrl] = useState("Ternion Solution");
  const [qr, setQr] = useState("");
  const convasRef = useRef(null);
  const GenerateQRCode = () => {
    QRCode.toDataURL(
      url,
      {
        width: 400,
        margin: 0,
        color: {
          // dark: '#335383FF',
          // light: '#EEEEEEFF'
        },
      },
      (err, url) => {
        if (err) return console.error(err);
        console.log(url);
        setQr(url);
      }
    );
  };

  const [open, setOpen] = React.useState(false);
  const [button, setButton] = React.useState(false);
  const [titlepic, settitlepic] = React.useState("Yes you can");
  const [titlepic2, settitlepic2] = React.useState("Yes you can");
  const handledownloadImage = (e) => {
    html2canvas(convasRef?.current)
      .then((canvas) => {
        canvas.style.display = "none";
        // canvas.width = "50%";
        document.body.appendChild(canvas);
        return canvas;
      })
      .then((canvas) => {
        const image = canvas
          .toDataURL("image/png")
          .replace("image/png", "image/octet-stream");
        const a = document.createElement("a");
        a.setAttribute("download", "chattyhub-QRcode.png");
        a.setAttribute("href", image);
        a.click();
        canvas.remove();
      });
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSave = () => {
    settitlepic(titlepic2);
    setOpen(false);
  };
  const handleLinkCopied = async (e) => {
    setButton(true);
    textAreaRef.current.select();
    document.execCommand("copy");

    e.target.focus();
    setTimeout(() => {
      setButton(false);
    }, 3000);
  };
  const handleinputdata = (e) => {
    settitlepic2(e.target.value);
  };
  const classes = useStyles();
  return (
    <>
      <div className={classes.settingChatMain}>
        <div className={classes.settingChatInner}>
          <div className={classes.settingChatHeadingContainer}>
            <h4 className={classes.settingChatHeading}>Your chat page link</h4>
          </div>
          <span className={classes.settingChatNextContainer}>
            Share your chat page link so customers can easily contact your
            business wherever they are.
            {/* <span className={classes.linktag}> */}
            Test it out
            {/* </span> */}
          </span>
        </div>
      </div>
      <div className={classes.inputboxandbutton}>
        <InputGroup className="mb-3">
          <Form.Control
            ref={textAreaRef}
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            value="https://wwpppoo/xxvvvccno978"
            className={classes.input}
            readOnly
          />
          {button == true ? (
            <Button
              variant="outline-secondary"
              id="button-addon2"
              className={classes.btncopied}
            >
              Link copied !
            </Button>
          ) : (
            <Button
              variant="light"
              id="button-addon2"
              className={classes.btnf}
              onClick={handleLinkCopied}
            >
              Copy link
            </Button>
          )}
        </InputGroup>
      </div>
      <div className={classes.settingChatMain}>
        <div className={classes.settingChatInner}>
          <div className={classes.settingChatHeadingContainer}>
            <h4 className={classes.settingChatHeading}>
              Your chat page QR code
            </h4>
          </div>
          <span className={classes.settingChatNextContainer}>
            Allow customers to contact you by scanning QR code with their
            phones.
          </span>
        </div>
      </div>
      <div ref={convasRef} className={classes.downloaddiv}>
        <div className={classes.picturediv}>
          <img className={classes.imageStyle} src={forqr} />
          <img className={classes.imageStyle2} src={qr} />
        </div>
        <div className={classes.pictureBottomSpan}>{titlepic}</div>
      </div>
      <div className={classes.buttonsContainer}>
        <Button
          variant="light"
          className={classes.titlebutton}
          onClick={handleClickOpen}
        >
          Change title
        </Button>
        <Button
          onClick={(e) => handledownloadImage(e)}
          href="javascript:void(0)"
          variant="light"
          className={classes.downloadbutton2}
          disableRipple
        >
          Download
        </Button>
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
          className={classes.title}
        >
          Change QR Label
        </BootstrapDialogTitle>

        <DialogContent dividers>
          <Typography
            variant="p"
            component="div"
            sx={{ fontSize: 11 }}
            style={{ color: "gray", fontWeight: "700", fontFamily: "poppins" }}
            gutterBottom
          >
            Edit label under QR code
          </Typography>
          <InputGroup className="mb-3">
            <Form.Control
              maxLength={24}
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              value={titlepic2}
              className={classes.input2}
              onChange={(e) => handleinputdata(e)}
              name="message"
            />
          </InputGroup>
          <Typography
            variant="p"
            component="div"
            sx={{ fontSize: 11 }}
            style={{
              color: "lightgray",
              fontWeight: "700",
              fontFamily: "poppins",
            }}
            gutterBottom
          >
            24 characters allowed
          </Typography>
        </DialogContent>
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
            onClick={handleSave}
          >
            Save
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
};
export default ChatPage;
