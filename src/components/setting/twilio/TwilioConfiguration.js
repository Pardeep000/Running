import { makeStyles } from '@material-ui/core';
import React,{useState, useEffect} from 'react'

import { gql } from "apollo-boost";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import { useSnackbar } from "notistack";

import TwilioInputUI from './TwilioInputUI'

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    width:'70%',
    padding:'20px',
    fontFamily:'poppins !important'
  },
  primaryPara:{
    fontFamily:'poppins',
    color:'#777777',
    fontSize:'15px'
  },
  authorizeBtn:{
    fontFamily:'poppins',
    padding:'10px 15px',
    color:'white',
    background:'#55A530',
    border:'none',
    width:'60%',
    margin:'20px 0px 10px 0px'
  }
 
}));

function TwilioConfiguration(props) {

  const Style = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const addTwilioConfigurationQuery = gql`
  mutation addTwilioConfiguration(
    $accountSID:String!
    $authToken:String!
 
  ){
    addTwilioConfiguration(
    accountSID:$accountSID
    authToken:$authToken
 
  ) {
      result{
        id
        accountSID
        authToken
        phoneNumber{
          phoneNumber
          active
        }
        active
      }
      success
      error
    }
  }
`;
let [
  addTwilioConfiguration,
  {
    loading: addTwilioConfigurationQueryLoading,
    error: addTwilioConfigurationQueryError,
    data: addTwilioConfigurationQueryResult,
  },
] = useMutation(addTwilioConfigurationQuery);

useEffect(() => {
  if (addTwilioConfigurationQueryError) {
    addTwilioConfigurationQueryError.graphQLErrors.map(({ message }, i) => {
      enqueueSnackbar(message, { variant: "error" });
    });
  }
}, [addTwilioConfigurationQueryError]);

useEffect(() => {
  if (addTwilioConfigurationQueryResult && addTwilioConfigurationQueryResult.addTwilioConfiguration) {
    const {success,error,result} = addTwilioConfigurationQueryResult.addTwilioConfiguration;

    if(result) {
        props.setTwilioConfig(result)
    }
    if (success) {
         props.setIsAuth(true);
    } else {
      enqueueSnackbar(error, {
        variant: "error",
      });
    }
  }
}, [addTwilioConfigurationQueryResult]);
  const [accSID,setAccSID] = useState("");
  const [authToken,setAuthToken] = useState("");


  const saveConfiguration = ()=>{
    if(accSID != '' && authToken != ''){

      addTwilioConfiguration({
        variables: {
          accountSID:accSID,
          authToken:authToken
        },
      });
    }
  }
  return (
    <div className={Style.mainContainer}>
      <h4>Add Twilio to Kuikwit</h4>
      <p className={Style.primaryPara}>
        Provide Account SID and Auth token to connect your Twilio account
      </p>
      <TwilioInputUI 
      label="Account SID"
      onChange={setAccSID}
      value={accSID}
      />
      <TwilioInputUI 
      label="Auth token"
      onChange={setAuthToken}
      value={authToken}
      />
      <button 
      className={Style.authorizeBtn}
      onClick={saveConfiguration}
      >
        Authorize App
      </button>
      <p className={Style.primaryPara}>
       Don't have Twilio account? Click <a target='_blank' rel="noreferrer" href="https://www.twilio.com/try-twilio">here</a> to create one.
      </p>
    </div>
  )
}

export default TwilioConfiguration