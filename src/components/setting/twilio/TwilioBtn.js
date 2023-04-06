import React, { useEffect, useState } from 'react'
import twilioLogo from '../../../assets/setting/twilio.svg';
import mobileLogo from '../../../assets/setting/mobile.svg';
import addLogo from '../../../assets/setting/plus.svg';
import { makeStyles } from '@material-ui/core';
import { gql } from "apollo-boost";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import { useSnackbar } from "notistack";


const useStyles = makeStyles((theme) => ({

  btnRed: {
    color: 'rgba(216, 59, 71, 1)',
    background: 'rgba(216, 59, 71, .1)',
    padding: '10px 15px',
    border: 'rgba(216, 59, 71, 1)',
    fontSize: '14px',
    borderRadius: '3px',
    "&:hover": {
      background: 'rgba(216, 59, 71, .9)',
      color: 'white'
    }
  },
  btnGreen: {
    color: 'rgba(85, 165, 48, 1)',
    background: 'rgba(85, 165, 48, .1)',
    padding: '10px 15px',
    border: 'rgba(85, 165, 48, 1)',
    fontSize: '14px',
    borderRadius: '3px',
    "&:hover": {
      background: 'rgba(85, 165, 48, .9)',
      color: 'white'
    }
  },


}));

function TwilioBtn(props) {


  const Style = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [currentPhoneNumber, setCurrentPhoneNumber] = useState(null);

  const ConnectTwilioPhoneNumberQuery = gql`
 mutation connectTwilioPhoneNumber(
      $accountSID:String!
      $authToken:String!
      $phoneNumber:String!
   
    ){
      connectTwilioPhoneNumber(
      accountSID:$accountSID
      authToken:$authToken
      phoneNumber:$phoneNumber
   
    ) {
        success
        error
      }
    }

`;
  let [
    connectTwilioPhoneNumber,
    {
      loading: ConnectTwilioPhoneNumberQueryLoading,
      error: ConnectTwilioPhoneNumberQueryError,
      data: ConnectTwilioPhoneNumberQueryResult,
    },
  ] = useMutation(ConnectTwilioPhoneNumberQuery);

  useEffect(() => {
    if (ConnectTwilioPhoneNumberQueryError) {
      ConnectTwilioPhoneNumberQueryError.graphQLErrors.map(({ message }, i) => {
        enqueueSnackbar(message, { variant: "error" });
      });
    }
  }, [ConnectTwilioPhoneNumberQueryError]);

  useEffect(() => {
    if (ConnectTwilioPhoneNumberQueryResult && ConnectTwilioPhoneNumberQueryResult.connectTwilioPhoneNumber) {
      if (ConnectTwilioPhoneNumberQueryResult.connectTwilioPhoneNumber.success) {
        let copyOfPhnNumber = props.phnNumber;
        let anothercopy = copyOfPhnNumber.map(curr => { return { ...curr, active: false } });

        let objIndex = anothercopy.findIndex((obj => obj.phoneNumber == currentPhoneNumber));

        anothercopy[objIndex].active = true


        props.setPhnNumber(anothercopy);

      } else {
        enqueueSnackbar(ConnectTwilioPhoneNumberQueryResult.connectTwilioPhoneNumber.error, {
          variant: "error",
        });
      }
    }
  }, [ConnectTwilioPhoneNumberQueryResult]);


  const DiscountTwilioPhoneNumberQuery = gql`
mutation disconnectTwilioPhoneNumber(
     $accountSID:String!
     $authToken:String!
     $phoneNumber:String!
  
   ){
    disconnectTwilioPhoneNumber(
     accountSID:$accountSID
     authToken:$authToken
     phoneNumber:$phoneNumber
  
   ) {
       success
       error
     }
   }

`;
  let [
    disconnectTwilioPhoneNumber,
    {
      loading: DiscountTwilioPhoneNumberQueryLoading,
      error: DiscountTwilioPhoneNumberQueryError,
      data: DiscountTwilioPhoneNumberQueryResult,
    },
  ] = useMutation(DiscountTwilioPhoneNumberQuery);

  useEffect(() => {
    if (DiscountTwilioPhoneNumberQueryError) {
      DiscountTwilioPhoneNumberQueryError.graphQLErrors.map(({ message }, i) => {
        enqueueSnackbar(message, { variant: "error" });
      });
    }
  }, [DiscountTwilioPhoneNumberQueryError]);

  useEffect(() => {
    if (DiscountTwilioPhoneNumberQueryResult && DiscountTwilioPhoneNumberQueryResult.disconnectTwilioPhoneNumber) {
      if (DiscountTwilioPhoneNumberQueryResult.disconnectTwilioPhoneNumber.success) {

       
        let newArray = props.phnNumber.map(curr => curr.phoneNumber == currentPhoneNumber ? {
          ...curr,
          active:false
        }:{...curr})

        props.setPhnNumber(newArray);

      } else {
        enqueueSnackbar(DiscountTwilioPhoneNumberQueryResult.disconnectTwilioPhoneNumber.error, {
          variant: "error",
        });
      }
    }
  }, [DiscountTwilioPhoneNumberQueryResult]);



  const disconnectPhoneNumber = (data) => {
    setCurrentPhoneNumber(data.phoneNumber)
    disconnectTwilioPhoneNumber({
      variables: {
        accountSID: props.accountSID,
        authToken: props.authToken,
        phoneNumber: data.phoneNumber
      },
    });
  };
  const connectPhoneNumber = (data) => {
    connectTwilioPhoneNumber({
      variables: {
        accountSID: props.accountSID,
        authToken: props.authToken,
        phoneNumber: data.phoneNumber
      },
    });
    setCurrentPhoneNumber(data.phoneNumber)
  };

  return (
    <div>
       <button
                   onClick={() => props.data.active ? disconnectPhoneNumber(props.data) : connectPhoneNumber(props.data)}
                  className={props.data.active ? Style.btnRed : Style.btnGreen}
                >

                  {!props.data.active ? 'Connect' : 'Disconnect'}
                </button>
    </div>
  )
}

export default TwilioBtn