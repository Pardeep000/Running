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


import { useHistory  } from "react-router-dom";
import { useParams } from "react-router-dom";
import expressConfig from "../../config/express.json";



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

const InviteAgentSignup = (props) => {
  const [emailValue,setEmailValue] = useState("");
  const {email,designation,superAdminId} = useParams();
  useEffect(()=>{
    if(email !=null){
      setEmailValue(email)
    }
  },[email])


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


  const joinUserMutation = gql`
  mutation joinUser(
    $username: String!
    $password: String!
    $email: String!
    $number: String
    $designationId: ID!
    $inviteSuperAdminId:ID!
) {
    joinUser(
     username:$username
     password:$password
     email:$email
     number:$number
     designationId:$designationId
    inviteSuperAdminId:$inviteSuperAdminId

    ) {
     success
     error
    }
  }
`;
const [
  joinUser,
  {
    loading: joinUserMutationLoading,
    error: joinUserMutationError,
    data: joinUserMutationResult,
  },
] = useMutation(joinUserMutation);

useEffect(() => {
  if (joinUserMutationError) {
    joinUserMutationError.graphQLErrors.map(({ message }, i) => {
      enqueueSnackbar(message, { variant: "error" });
    });
  }
 
}, [joinUserMutationError]);

useEffect(() => {
  if (joinUserMutationResult && joinUserMutationResult.joinUser) {
    if (joinUserMutationResult.joinUser.success) {
      enqueueSnackbar("User added successfully.", { variant: "success" });
      setIsSubmittedSuccess("false");
      
      history.push({
        pathname: '/confirm',
        state: {  // location state
          email: email, 
        },
      })
  
   
    } else {
      enqueueSnackbar(joinUserMutationResult.joinUser.error, {
        variant: "error",
      });
    }
  }
}, [joinUserMutationResult]);



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
    await joinUser({
      variables: {
        username: props.addEditUserModalUsername,
        password: props.addEditUserModalPassword,
        email: emailValue,
        designationId:designation,
        inviteSuperAdminId:superAdminId,
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


  return (
    <Container name="loginContainer" className={classes.formContainer}>
      {
      
          <>
          <h2 className={classes.formMainHeading}>Create Account</h2>
       
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
                 disabled={joinUserMutationLoading}
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
                  value={props.email}
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
                onInput={(e) =>setEmailValue(e)}

                  notEmpty={true}
                  disabled={email?true:false}
                  
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
                  disabled={joinUserMutationLoading}
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
                disabled={joinUserMutationLoading}
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
                disabled={joinUserMutationLoading}
                className={classes.submitButton}
                ref={submitButtonRef}
              >
                {joinUserMutationLoading && <CircularProgress size={25} />}
                {!joinUserMutationLoading && "JOIN"}
              </Button>
            </FormControl>
          </form>
          </>
        
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
})(InviteAgentSignup);
