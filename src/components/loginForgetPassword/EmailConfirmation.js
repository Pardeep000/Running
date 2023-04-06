import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import {useLocation } from 'react-router-dom'
import { makeStyles } from "@material-ui/core/styles";
import { gql } from "apollo-boost";
import { useSnackbar } from "notistack";
import { useMutation } from "@apollo/react-hooks";
import { useHistory  } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
    formMainHeading:{
        fontFamily:'poppins !important',
       color:'#434343',
       fontWeight:'500',
        fontSize:38,
        margin:'0 0 10px 0'
    
      },
      para_style:{
        fontFamily:'poppins !important',
        paddingRight:'30px',
        margin:'15px 0',
       color:'#929292',
       '& span':{
           color:'#5d5d5d'
       }
      },
      btn_style_confirm:{
        fontFamily:'poppins !important',
       width:'100%',
       background:'#55a530',
       border:"1px solid #55a530",
       "&:hover":{
        background:'#55a530',
        border:"1px solid #55a530",
       }
      },
      btn_style_resend:{
        fontFamily:'poppins !important',
        color:'#55a530',
       background:'none',
       border:"none",
       padding:'0',
       "&:hover":{
        background:'none',
        border:"none",
        color:'#55a530',
       
       },
       marginTop:'-30px'
      }
}));
function EmailConfirmation(props) {
    const { enqueueSnackbar } = useSnackbar();
    const classes = useStyles();
    const location = useLocation();
    const {initialMinute = 0,initialSeconds = 0} = {initialMinute :0,initialSeconds :20};
    const [ minutes, setMinutes ] = useState(initialMinute);
    const [seconds, setSeconds ] =  useState(initialSeconds);
    const [isResendBtnDisable,setIsResendBtnDisable] = useState(true);
    const [isDisableConfirm,setIsDisableConfirm] = useState(true);
    const [code, setCode] = useState(null);
    const history = useHistory();

    const verifyCodeMutation = gql`
    mutation verifyCode(
      $email: String!
      $randomCode:String!
    ) {
      verifyCode(
       
        email: $email
        randomCode:$randomCode
      ) {
            success
            error
      }
    }
  `;
  const [
    verifyCode,
    {
      loading: verifyCodeMutationLoading,
      error: verifyCodeMutationError,
      data: verifyCodeMutationResult,
    },
  ] = useMutation(verifyCodeMutation);
  
  useEffect(() => {
    if (verifyCodeMutationError) {
        verifyCodeMutationError.graphQLErrors.map(({ message }, i) => {
        enqueueSnackbar(message, { variant: "error" });
      });
    }
   
  }, [verifyCodeMutationError]);
  
  useEffect(() => {
    if (verifyCodeMutationResult && verifyCodeMutationResult.verifyCode) {
        if(verifyCodeMutationResult.verifyCode && verifyCodeMutationResult.verifyCode.error){
          enqueueSnackbar(verifyCodeMutationResult.verifyCode.error, { variant: "error" });
        }
      if (verifyCodeMutationResult.verifyCode.success) {
        enqueueSnackbar("Email confirmed successfully.", { variant: "success" });
       
        history.push({
          pathname: '/',
        })
     
      }
    }
  }, [verifyCodeMutationResult]);
  

  const resendCodeMutation = gql`
  mutation resendCode(
    $email: String!
  ) {
    resendCode(
      email: $email
    ) {
      success
      error
    }
  }
`;
const [
  resendCode,
  {
    loading: resendCodeMutationLoading,
    error: resendCodeMutationError,
    data: resendCodeMutationResult,
  },
] = useMutation(resendCodeMutation);


    useEffect(() => {
        if (resendCodeMutationResult && resendCodeMutationResult.resendCode) {
           
            if (resendCodeMutationResult.resendCode.success) {
              enqueueSnackbar("code sent successfully", { variant: "success" });
     
            }
          }
        }, [resendCodeMutationResult]);
        
  




  useEffect(()=>{
    let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(myInterval)
                    setIsResendBtnDisable(false);
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            } 
        }, 1000)
        return ()=> {
            clearInterval(myInterval);
          };
    });
    useEffect(()=>{
        if(code){
            if(code.length < 6){
                
                setIsDisableConfirm(true);
            }
            else{
                
                setIsDisableConfirm(false);
            }
        }
    },[code])
 
    const handleConfirmEmail = async()=>{
        
         await verifyCode({
      variables: {
        email:location.state.email,
        randomCode: code
      },
    });

    }
    const resendCodeHandler = async(e)=>{
        setMinutes(0);
        setSeconds(59);
        setIsResendBtnDisable(true);
        await resendCode({
            variables: {
              email:location.state.email,
            },
          });
    }

  return (
    <div style={{width:'45%',margin:'0 auto'}}>
        <h2 className={classes.formMainHeading}>Confirm your email</h2>
        <p className={classes.para_style}>
            An email with a verification code has been sent to <span><b>{location.state.email}</b></span>
            <br/>
            Enter your code in the field below:
        </p>
        <input style={{width:'130px',border:'1px solid green',padding:'5px 5px'}} type='number' placeholder='Enter code' value={code} onChange={(e)=>setCode(e.target.value)}/>
        <p className={classes.para_style}>You can resend the code in <span><b>  { minutes === 0 && seconds === 0
            ? null
            : <span> {minutes}:{seconds < 10 ?  `0${seconds}` : seconds}</span> 
        }</b></span></p>
        <Button disabled={isDisableConfirm} className={classes.btn_style_confirm} onClick={handleConfirmEmail}>Confirm Email</Button>
        <p  className={classes.para_style}>Didn't receive the email?</p>
        <Button disabled={isResendBtnDisable} className={classes.btn_style_resend} onClick={(e)=>resendCodeHandler(e)}>Resend Email</Button>
    </div>
  )
}

export default EmailConfirmation