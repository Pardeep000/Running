import React, { useContext, useEffect, useRef, useState } from "react";
import { Container, Grid, useMediaQuery } from "@material-ui/core";

import { Redirect, Route } from "react-router-dom";
import { auth } from "../../auth/auth";
import { connect } from "react-redux";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import clsx from "clsx";
import { AnimateGroup } from "react-animation";
import LoginForm from "./LoginForm";
import ForgetPasswordForm from "./ForgetPasswordForm";
import ResetPasswordForm from "./ResetPasswordForm";
import { setRedirectToPath } from "../../store/actions/RedirectToPathActions";
import { setForceLogoutUser } from "../../store/actions/LoginForgetPasswordActions";
import robot from "../../assets/LoginIcons/robot.gif";
import greenBackground from "../../assets/LoginIcons/image.png";
import SignupForm from "./SignupForm";
import EmailConfirmation from "./EmailConfirmation";
import {
  setDialogOpen,
  setDialogOkText,
  setDialogCancelText,
  setDialogOkClick,
  setDialogTitle,
  setDialogContent,
} from "../../store/actions/DialogActions";
import CustomDialogRedux from "../CustomDialogRedux";
import { Link } from "react-router-dom";
import { UserContext } from "../../router/userContext";
import InviteAgentSignup from "./InviteAgentSignup";
const useStyles = makeStyles((theme) => ({
  mainContainer: {
    background: "",
  },

  logoImg: {
    width: "70%",
    display: "block",
    margin: "auto",
  },
  logoImgSmallScreen: {
    display: "block",
    margin: "auto",
    marginBottom: "15px",
    marginTop: "5px",
    width: "50%",
  },
  fullHeight: {
    minHeight: "100vh",
  },
  privacy_main: {
    display: "flex",
    margin: 0,
    marginTop: "-40px",
    justifyContent: "right",
    position: "absolute",
    bottom: "10px",
    right: "80px",
  },
  main_parent: {
    width: "100%",
    height: "100vh",
    display: "flex",
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    background: "#4e9b2b",
  },
  main_center_div: {
    width: "100%",
    height: "100vh",
    margin: "auto auto",
    display: "grid",
    gridTemplateColumns: "35% 65%",

    overflow: "hidden",
  },
  form_div: {
    background: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflowY: "auto",
  },
  img_logo: {
    margin: "0 auto",
  },
  img_div: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // justifyContent:'center',
    // background:'#0d2e13',
    backgroundImage: `url(${greenBackground})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    width: "100%",
    maxheight: "100%",
    overflow: "hidden",
  },
  afterRobot_main: {
    textAlign: "center",
    fontFamily: "Poppins",
    width: "80%",
    margin: "0 auto",
    color: "white",
  },
  afterRobot_head: {
    fontSize: "38px",
    marginTop: "0",
    marginBottom: "0",
  },
  afterRobot_para: {
    fontSize: "15px",
    width: "77%",
    margin: "15px auto 35px auto",
  },
  afterRobot_button: {
    textDecoration: "none",
    border: "1px solid white",
    color: "white",
    padding: "5px 25px",
    borderRadius: "5px",
    fontSize: "17px",
  },
}));



const LoginForgetPassword = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const isScreenSmall = useMediaQuery(theme.breakpoints.only("sm"));
  const isScreenExtraSmall = useMediaQuery(theme.breakpoints.only("xs"));

  useEffect(() => {
    if (props.loginForgetPasswordToggleFormName == "login")
      document.title = props.titleLogin;
    else document.title = props.titleForgetPassword;
  }, [props.loginForgetPasswordToggleFormName]);

  useEffect(() => {
    if (props.forceLogoutUser) {
      props.setDialogOpen(true);
      props.setDialogOkText("ok");
      props.setDialogCancelText(null);
      props.setDialogOkClick(() => {
        window.location = "/user";
      });
      props.setDialogTitle("Warning");
      props.setDialogContent("You are logout by " + props.forceLogoutUser);
    }
  }, [props.forceLogoutUser]);

  if (props.redirectToPath) {
    const path = props.redirectToPath;
    props.setRedirectToPath(null);
    return <Redirect to={{ pathname: path }} />;
  }

  const loginForgetPasswordToggleFormName =
    props.match.path == "/resetpassword/:token"
      ? "resetpassword"
      : props.match.path == "/signup"
      ? "signup"
      : props.match.path == "/confirm"
      ? "confirm"
      : props.match.path === "/join/:email/:designation/:superAdminId/:token"
      ? "inviteAgent"
      : props.match.path === "/join/:designation/:superAdminId/:token"
      ? "inviteAgent"
      : props.loginForgetPasswordToggleFormName;

  return (
    <div className={classes.main_parent}>
      <div className={classes.main_center_div}>
        <div className={classes.img_div}>
          <div className={classes.img_logo}>
            <img src={robot} width="330px" />
          </div>
          <div className={classes.afterRobot_main}>
            <h3 className={classes.afterRobot_head}>
              {loginForgetPasswordToggleFormName == "signup"
                ? "Welcome Back!"
                : "Hello, Friends!"}
            </h3>
            <p className={classes.afterRobot_para}>
              {loginForgetPasswordToggleFormName == "signup" ||
              loginForgetPasswordToggleFormName == "inviteAgent"
                ? "To keep connected with us please login with your personal info"
                : "Enter your Personal details and start journey with us"}
            </p>
            <Link
              className={classes.afterRobot_button}
              to={
                loginForgetPasswordToggleFormName == "signup" ||
                loginForgetPasswordToggleFormName == "inviteAgent"
                  ? "/login"
                  : "/signup"
              }
            >
              {loginForgetPasswordToggleFormName == "signup" ||
              loginForgetPasswordToggleFormName == "inviteAgent"
                ? "SIGN IN"
                : "SIGN UP"}
            </Link>
          </div>
        </div>
        <div className={classes.form_div}>
          {loginForgetPasswordToggleFormName == "login" ? (
            <LoginForm key="login" />
          ) : loginForgetPasswordToggleFormName == "forgetpassword" ? (
            <ForgetPasswordForm key="forgetpassword" />
          ) : loginForgetPasswordToggleFormName == "signup" ? (
            <SignupForm />
          ) : loginForgetPasswordToggleFormName == "confirm" ? (
            <EmailConfirmation />
          ) : loginForgetPasswordToggleFormName == "inviteAgent" ? (
            <InviteAgentSignup
              email={props.match.params.email}
              designation={props.match.params.designation}
              token={props.match.params.token}
            />
          ) : (
            <ResetPasswordForm
              token={props.match.params.token}
              key="resetpassword"
            />
          )}
        </div>
      </div>
      <ul className={classes.privacy_main}>
        <li style={{ listStyle: "none" }} className={classes.privacy_inner}>
          <Link
            style={{ color: "green", textDecoration: "none" }}
            to="/termsprivacy"
            target="_blank"
          >
            {" "}
            Terms And Privacy Policy
          </Link>
        </li>
      </ul>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    ...state.LoginForgetPasswordReducer,
    ...state.RedirectToPathReducer,
  };
};
export default connect(mapStateToProps, {
  setRedirectToPath,
  setForceLogoutUser,
  setDialogOpen,
  setDialogOkText,
  setDialogCancelText,
  setDialogOkClick,
  setDialogTitle,
  setDialogContent,
})(LoginForgetPassword);
