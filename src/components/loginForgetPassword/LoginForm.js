import React, { useState, useEffect, useRef } from "react";
import {
  FormControl,
  Container,
  Button,
  CircularProgress,
  Link,
  Typography,
} from "@material-ui/core";
import ValidationTextField from "../../otherComponents/ValidationTextField";
import * as Scroll from "react-scroll";
import { useSnackbar } from "notistack";
import { connect } from "react-redux";
import {

  setLoginPasswordText,
  setAddEditUserModalEmail,
  setLoginForgetPasswordToggleFormName,
} from "../../store/actions/LoginForgetPasswordActions";
import { setRedirectToPath } from "../../store/actions/RedirectToPathActions";
import { makeStyles } from "@material-ui/core/styles";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import passwordlogo from '../../assets/img/lock.svg'
import userlogo from '../../assets/img/user.svg'
import buttonlogo from '../../assets/img/login.svg'

import fbicon from '../../assets/LoginIcons/facebook.svg'
import lnicon from '../../assets/LoginIcons/linkedin.svg'
import gplusicon from '../../assets/LoginIcons/googleplus.svg'
const useStyles = makeStyles((theme) => ({

  formContainer: {
    background: "",
    width: "100%",
    padding: "40px",
    margin: "10px 0",
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center'

  },

  form: {
    width:'550px',
    display: "block",
    margin: '0 auto',
    marginBottom: "15px",
    marginTop: "15px",
    
  },
  textField: {
    width: "100%",
    fontFamily:'poppins',
  
  },
  textFieldRoot: {
  
    borderRadius: 0,
    
    fontFamily:'poppins',

    
  },
  submitButton: {
    fontSize: 15,
    margin:'0 auto',
    width: "100px",
    height:'40px',
    background: "#55a630",
    color: "white",
     borderRadius:5,
    fontFamily:'poppins',

    "&:hover": {
   
    background:'#174b27'
    },
  },
  textFieldNotchedOutline: {
     borderWidth: "1px!important",
     top: "0px",
     color:'white',
     "&:hover": {
      border:'1px solid white',
     },
  },
  textFieldInput: {
    padding: "15px 14px",
    width:'300px',
   

  
  },
  formControl: {
    marginBottom: "15px",
    marginTop: "20px",
    display:'flex',
    alignItems:'center',
   
   
  },
  inputLogoContainer:{
    border:'1px solid white',
    width:'50px',
    height:'50px',
    borderRadius:"50%",
    overflow:'hidden',
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
   

  },
  inputSVG:{
    width:'50%',
    height:'50%',
  }
  ,formMainHeading:{
    fontFamily:'poppins !important',
   
    fontSize:38,
    color:'#55a630',
    margin:'0 0 10px 0'

  },
  sec_para:{
    color:'#939594'
  },


  onErrorInputRootClass:{
    color:'white'
  },
  iconContainer:{
    display:'flex',
    justifyContent:'space-evenly',
    alignItems:'center'
    
  },
  icon_div:{
    width:'40px',
    height:'40px',
    borderRadius:'50%',
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    border:'1px solid lightgrey',
    cursor:'pointer'
  }

}));

const LoginForm = (props) => {
  const classes = useStyles();

  const { enqueueSnackbar } = useSnackbar();
  const [emailValue,setEmailValue] = useState('')
  const scrollToRef = (ref) => {
    var refBoundingClientRect = ref.current.getBoundingClientRect();

    Scroll.animateScroll.scrollTo(
      refBoundingClientRect.top +
        window.scrollY -
        refBoundingClientRect.height -
        30
    );
  };

  let passwordTextFieldRef = React.useRef();
  let submitButtonRef = React.useRef();


  let passwordValidate = null;
  let emailValidate = null;

  let LoginQuery = gql`
    mutation Login($email:String!, $password: String!) {
      login(email: $email, password: $password) {
        name
        id
        designation {
          name
          paneltype
        }
        mainSuperAdminId
      }
    }
  `;

  const [
    getLogin,
    {
      loading: loginQueryLoading,
      error: loginQueryError,
      data: loginQueryResult,
    },
  ] = useMutation(LoginQuery);

  useEffect(() => {

    if (loginQueryError) {
     
      loginQueryError.graphQLErrors.map(({ message }, i) => {
     
      
          enqueueSnackbar(message, { variant: "error" });
    
  
      });
    }
  }, [loginQueryError]);

  useEffect(() => {
    if (loginQueryResult && loginQueryResult.login) {
      
       localStorage.setItem("userName",{paneltype:loginQueryResult.login.designation.paneltype, id:loginQueryResult.login.id} )
       const ActiveUserData = {
        id:loginQueryResult.login.id,
        paneltype:loginQueryResult.login.designation.paneltype,
        mainSuperAdminId:loginQueryResult.login.mainSuperAdminId
      }
      localStorage.setItem('ActiveUserdetail',JSON.stringify(ActiveUserData))
      if (
        loginQueryResult.login.designation.paneltype == "SUPERADMIN" ||
        loginQueryResult.login.designation.paneltype == "ADMIN"
      ) {
        props.setRedirectToPath("/chat");
      } else {
        props.setRedirectToPath("/chat");
      }
    }
  }, [loginQueryResult]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (loginQueryLoading) return;

    let isValid = true;

    if (!emailValidate()) {
      isValid = false;
    }
    if (!passwordValidate()) {
      isValid = false;
    }
    if (!isValid) return;
    try {
      await getLogin({
        variables: {
          email: props.addEditUserModalEmail,
          password: props.loginPasswordText,
        },
      });
    } catch (e) {}
  };

  const checkandsetpassword = (e)=>{  
    let str = e.target.value;
    let withoutspace =  str.replace(/\s/g, '');
    props.setLoginPasswordText(withoutspace);
  }
  const googleLogin = ()=>{
    window.open("https://app.kuikwit.com:8081/auth/google","_self");
  }
  const facebookLogin = ()=>{
    window.open("https://app.kuikwit.com:8081/auth/facebook","_self");
  }
  const linkedinLogin = ()=>{
    window.open("https://app.kuikwit.com:8081/auth/linkedin","_self");
  }

  return (
    <Container name="loginContainer" className={classes.formContainer}>
      <h2 className={classes.formMainHeading}>Sign in to ChattyHub</h2>
      <div >
          <div className={classes.iconContainer}>
          <div className={classes.icon_div} onClick={facebookLogin}><img src={fbicon} width="35px"/></div>
          <div className={classes.icon_div} onClick={googleLogin}><img src={gplusicon} width="35px"/></div>
          <div className={classes.icon_div} onClick={linkedinLogin}><img src={lnicon} width="35px"/></div>
          </div>
          <p className={classes.sec_para}>
            or use your email for registration:
          </p>
      </div>
      <form
        noValidate
        autoComplete="off"
        className={classes.form}
        onSubmit={handleSubmit}
      >
      
        <FormControl className={classes.formControl}>
                <ValidationTextField
                  type="text"
                  Email={true}
                  className={classes.textField}
                  value={emailValue}
                  onKeyPress={(e) => { e.key === 'Enter' && handleSubmit(e) }}
                  InputProps={{
                    classes: {
                      root: classes.textFieldRoot,
                      input: classes.textFieldInput,
                      notchedOutline: classes.textFieldNotchedOutline,
                    },
                  }}
                  validate={(validate) => {
                    emailValidate = validate;
                  }}
                  notEmpty={true}
                  disabled={loginQueryLoading}
                  onInput={(e) => {
                    setEmailValue(e.target.value)
                    props.setAddEditUserModalEmail(e.target.value)}}
                  label="Email"
                  variant="outlined"
                />
              </FormControl>
      
        <FormControl className={classes.formControl}>
          <ValidationTextField
            className={classes.textField}
            onFocus={() => {
              scrollToRef(submitButtonRef);
            }}
            ref={passwordTextFieldRef}
            root={classes.root}
            onKeyPress={(e) => { e.key === 'Enter' && handleSubmit(e) }}
            InputProps={{
              classes: {
                root: classes.textFieldRoot,
                input: classes.textFieldInput,
                notchedOutline: classes.textFieldNotchedOutline,
              },
            }}
            value={props.loginPassword}
            validate={(validate) => {
              passwordValidate = validate;
            }}
            disabled={loginQueryLoading.loading}
            type="password"
            onInput={(e) => checkandsetpassword(e)}
            id="passwordTextField"
            label="Password"
            variant="outlined"
            notEmpty={true}
            autocomplete="off"
            onErrorInputRootClass
          />
        </FormControl>
        <div  align="center">
        <Link
        style={{ fontFamily:'poppins',textDecoration:"none"}}
          component="button"
          onClick={() => {
            props.setLoginForgetPasswordToggleFormName("forgetpassword");
          }}
        >
          Forgotten password?
        </Link>
      </div>
        <FormControl className={classes.formControl}>

          <Button
            variant="contained"
            type="submit"
            disabled={loginQueryLoading}
            className={classes.submitButton}
            ref={submitButtonRef}
          >
            {loginQueryLoading && <CircularProgress size={25} />}
            {!loginQueryLoading && "SIGN IN"}
          </Button>
        </FormControl>
      </form>
     
    </Container>
  );
};
const mapStateToProps = (state) => {
  return { ...state.LoginForgetPasswordReducer };
};
export default connect(mapStateToProps, {

  setLoginPasswordText,
  setAddEditUserModalEmail,
  setLoginForgetPasswordToggleFormName,
  setRedirectToPath,
})(LoginForm);
