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
  setLoginUsernameText,
  setLoginPasswordText,
  setLoginForgetPasswordToggleFormName,
} from "../../store/actions/LoginForgetPasswordActions";
import {

  setAddEditUserModalUsername,
  setAddEditUserModalPassword,
  setAddEditUserModalEmail,
  setAddEditUserModalNumber
} from "../../store/actions/AddEditUserModalActions";
import { setRedirectToPath } from "../../store/actions/RedirectToPathActions";
import { makeStyles } from "@material-ui/core/styles";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import fbicon from '../../assets/LoginIcons/facebook.svg'
import lnicon from '../../assets/LoginIcons/linkedin.svg'
import gplusicon from '../../assets/LoginIcons/googleplus.svg'
import { useHistory  } from "react-router-dom";
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import expressConfig from "../../config/express.json";
import { useLinkedIn } from 'react-linkedin-login-oauth2';


import linkedin from 'react-linkedin-login-oauth2';
const useStyles = makeStyles((theme) => ({
//   root: {
//     "& .Mui-error": {
//       color: "white",
     
//     },
//     "& .MuiFormHelperText-root": {
//       color: "white",
      
//     },
//     "& .MuiOutlinedInput-notchedOutline": {
//       border: "1px solid white !important"
//     },
//     "&::-webkit-autofill":{
//     webkitBoxShadow: "0 0 0 30px #56a530 inset !important"
// },"&::input:-webkit-autofill:hover":{
//   webkitBoxShadow: "0 0 0 30px #56a530 inset !important"
// },"&::-webkit-autofill:focus":{
//   webkitBoxShadow: "0 0 0 30px #56a530 inset !important"
// },"& input:-webkit-autofill:active":{
//   webkitBoxShadow: "0 0 0 30px #56a530 inset !important"
// }
//   },
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
    // height:'50px',
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
    //  opacity:'0.9',
    background:'#174b27'
    },
  },
  textFieldNotchedOutline: {
     borderWidth: "1px!important",
    // border:'1px solid white',
    top: "0px",
    //  borderRadius:20,
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
    // textShadow:'1px 1px 2px #000000',
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

const SignupForm = (props) => {
  const classes = useStyles();
  const history = useHistory()
  const { enqueueSnackbar } = useSnackbar();
  const env = process.env.NODE_ENV || "development";
  const config = expressConfig[env]

  const scrollToRef = (ref) => {
    var refBoundingClientRect = ref.current.getBoundingClientRect();

    Scroll.animateScroll.scrollTo(
      refBoundingClientRect.top +
        window.scrollY -
        refBoundingClientRect.height -
        30
    );
  };
  const [isSubmittedSuccess, setIsSubmittedSuccess] = useState("false");
  let passwordTextFieldRef = React.useRef();
  let submitButtonRef = React.useRef();

  let usernameValidate = null;
  let passwordValidate = null;
  let emailValidate = null;
  let mobileValidate = null;


  const registerMutation = gql`
  mutation register(
    $username: String!
    $password: String!
    $email: String!
    $number:String
  ) {
    register(
      username: $username
      password: $password
      email: $email
      number:$number
    ) {
      success
      error
    }
  }
`;
const [
  register,
  {
    loading: registerMutationLoading,
    error: registerMutationError,
    data: registerMutationResult,
  },
] = useMutation(registerMutation);

useEffect(() => {
  if (registerMutationError) {
    registerMutationError.graphQLErrors.map(({ message }, i) => {
      enqueueSnackbar(message, { variant: "error" });
    });
  }
 
}, [registerMutationError]);

useEffect(() => {
  if (registerMutationResult && registerMutationResult.register) {
    if (registerMutationResult.register.success) {
      enqueueSnackbar("User added successfully.", { variant: "success" });
      setIsSubmittedSuccess("false");
      history.push({
        pathname: '/confirm',
        state: {  // location state
          email: props.addEditUserModalEmail, 
        },
      })
   
    } else {
      enqueueSnackbar(registerMutationResult.register.error, {
        variant: "error",
      });
    }
  }
}, [registerMutationResult]);



  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmittedSuccess("false");
    let isValid = true;
    if (!usernameValidate()) {
      isValid = false;
    }
    if (!emailValidate()) {
      isValid = false;
    }
    if (!mobileValidate()) {
      isValid = false;
    }
    if (!passwordValidate()) {
      isValid = false;
    }
    if (!isValid) return;
    await register({
      variables: {
        username: props.addEditUserModalUsername,
        password: props.addEditUserModalPassword,
        email: props.addEditUserModalEmail,
        number:props.addEditUserModalNumber
      },
    });
  };
  const checkandsetusername = (e)=>{
   let str = e.target.value;
  
   let withoutspace =  str.replace(/\s/g, '');
  
    props.setAddEditUserModalUsername(withoutspace)
  }
  const checkandsetpassword = (e)=>{  
    let str = e.target.value;
    let withoutspace =  str.replace(/\s/g, '');
    props.setAddEditUserModalPassword(withoutspace);
  }

  const Opengoogle = ()=> window.open("https://app.kuikwit.com:8081/auth/google","_self");
  const OpenFacebook = ()=> window.open("https://app.kuikwit.com:8081/auth/facebook","_self");
  const OpenLinkedin = ()=> window.open("https://app.kuikwit.com:8081/auth/linkedin","_self");

  return (
    <Container name="loginContainer" className={classes.formContainer}>
      {
        isSubmittedSuccess === "true" ? (
          <Typography className={classes.successText}>
          Check your email for a link to verify your account. If it doesn’t
          appear within a few minutes, check your spam folder.
        </Typography>
        ):(
          <>
          <h2 className={classes.formMainHeading}>Create Account</h2>
          <div >
              <div className={classes.iconContainer}>
              <div className={classes.icon_div}  onClick={OpenFacebook}
                  ><img src={fbicon} width="35px"/>
              </div>
             
              <div className={classes.icon_div} onClick={Opengoogle}>
                <img src={gplusicon} width="35px"/>
              </div>
              
              <div className={classes.icon_div} onClick={OpenLinkedin}>
                <img src={lnicon} width="35px"/>
              </div>
             
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
                className={classes.textField}
                focus={(focus) => focus()}
                onFocus={() => {
                  scrollToRef(passwordTextFieldRef);
                }}
                root={classes.root}
                InputProps={{
                  classes: {
                    root: classes.textFieldRoot,
                    input: classes.textFieldInput,
                    notchedOutline: classes.textFieldNotchedOutline,
                  },
                }}
                value={props.loginUsername}
                validate={(validate) => {
                  usernameValidate = validate;
                }}
                 disabled={registerMutationLoading}
                onInput={(e) =>checkandsetusername(e)}
                id="usernameTextField"
                label="Name"
                variant="outlined"
                notEmpty={true}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
                <ValidationTextField
                  type="text"
                  Email={true}
                  className={classes.textField}
                  value={props.addEditUserModalEmail}
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
                  disabled={registerMutationLoading}
                  onInput={(e) => props.setAddEditUserModalEmail(e.target.value)}
                  label="Email"
                  variant="outlined"
                />
              </FormControl>
              <FormControl className={classes.formControl}>
                <ValidationTextField
                  className={classes.textField}
                  value={props.addEditUserModalNumber}
                  InputProps={{
                    classes: {
                      root: classes.textFieldRoot,
                      input: classes.textFieldInput,
                      notchedOutline: classes.textFieldNotchedOutline,
                    },
                  }}
                  validate={(validate) => {
                    mobileValidate = validate;
                  }}
                  mask={[
                    "(",
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                    ")",
                    " ",
                    "-",
                    " ",
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                  ]}
                  disabled={registerMutationLoading}
                  onInput={(e) => props.setAddEditUserModalNumber(e.target.value)}
                  id="mobileTextField"
                  label="Mobile"
                  minValueErrorText="Not a valid mobile number."
                  minValue={11}
                  variant="outlined"
                  notEmpty={false}
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
                disabled={registerMutationLoading}
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
         
            <FormControl className={classes.formControl}>

              <Button
                variant="contained"
                type="submit"
                disabled={registerMutationLoading}
                className={classes.submitButton}
                ref={submitButtonRef}
              >
                {registerMutationLoading && <CircularProgress size={25} />}
                {!registerMutationLoading && "SIGN UP"}
              </Button>
            </FormControl>
          </form>
          </>
        )
      }
     
     
    </Container>
  );
};
const mapStateToProps = (state) => {
  return { ...state.AddEditUserModalReducer };
};
export default connect(mapStateToProps, {

  setAddEditUserModalUsername,
  setAddEditUserModalPassword,
  setAddEditUserModalEmail,
  setAddEditUserModalNumber,
  setRedirectToPath,
})(SignupForm);
