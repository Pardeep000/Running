import React, { useEffect, useState } from 'react'
import twilioLogo from '../../../assets/setting/twilio.svg';
import mobileLogo from '../../../assets/setting/mobile.svg';
import addLogo from '../../../assets/setting/plus.svg';
import { makeStyles } from '@material-ui/core';
import { gql } from "apollo-boost";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import { useSnackbar } from "notistack";
import TwilioBtn from './TwilioBtn';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    width: '70%',
    padding: '20px',
    fontFamily: 'poppins !important'

  },
  connectedToTwilio: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: "center",
    marginBottom: '20px'
  },
  flex: {
    display: 'flex',
    alignItems: 'center'
  },
  flexSpaceBetween: {
    display: 'flex',
    margin: '10px 0px',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  heading: {
    padding: '10px 0px',
    borderTop: '1px solid #777777',
    borderBottom: '1px solid #777777',
    marginBottom: '20px'
  },

  inpBox: {
    border: '1px solid #777777',
    fontFamily: 'poppins',
    padding: '5px'
  },
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
  btnAdd: {
    color: 'white',
    background: 'rgba(85, 165, 48, 1)',
    padding: '10px 15px',
    border: 'rgba(85, 165, 48, 1)',
    borderRadius: '3px',
    fontSize: '14px'
  }

}));

function TwilioPhoneConfiguration({ setIsAuth, twiliodata }) {

  const { accountSID, authToken, phoneNumber } = twiliodata;
  const [phnNumber, setPhnNumber] = useState(phoneNumber);
  const [number, setNumber] = useState("");
  const [btnConnect,setBtnConnect] = useState(false);
  const Style = useStyles();
  const { enqueueSnackbar } = useSnackbar();



  const disconnectTwilioConfigurationQuery = gql`
mutation disconnectTwilioConfiguration(
  $accountSID:String!
  $authToken:String!

){
  disconnectTwilioConfiguration(
  accountSID:$accountSID
  authToken:$authToken

) {
    success
    error
  }
}
`;
  let [
    disconnectTwilioConfiguration,
    {
      loading: disconnectTwilioConfigurationQueryLoading,
      error: disconnectTwilioConfigurationQueryError,
      data: disconnectTwilioConfigurationQueryResult,
    },
  ] = useMutation(disconnectTwilioConfigurationQuery);

  useEffect(() => {
    if (disconnectTwilioConfigurationQueryError) {
      disconnectTwilioConfigurationQueryError.graphQLErrors.map(({ message }, i) => {
        enqueueSnackbar(message, { variant: "error" });
      });
    }
  }, [disconnectTwilioConfigurationQueryError]);

  useEffect(() => {
    if (disconnectTwilioConfigurationQueryResult && disconnectTwilioConfigurationQueryResult.disconnectTwilioConfiguration) {
      if (disconnectTwilioConfigurationQueryResult.disconnectTwilioConfiguration.success) {
        setIsAuth(false);

      } else {
        enqueueSnackbar(disconnectTwilioConfigurationQueryResult.disconnectTwilioConfiguration.error, {
          variant: "error",
        });
      }
    }
  }, [disconnectTwilioConfigurationQueryResult]);




  const AddTwilioPhoneNumberQuery = gql`

mutation addTwilioPhoneNumber(
  $accountSID:String!
  $authToken:String!
  $phoneNumber:String!

){
  addTwilioPhoneNumber(
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
    addTwilioPhoneNumber,
    {
      loading: AddTwilioPhoneNumberQueryLoading,
      error: AddTwilioPhoneNumberQueryError,
      data: AddTwilioPhoneNumberQueryResult,
    },
  ] = useMutation(AddTwilioPhoneNumberQuery);

  useEffect(() => {
    if (AddTwilioPhoneNumberQueryError) {
      AddTwilioPhoneNumberQueryError.graphQLErrors.map(({ message }, i) => {
        enqueueSnackbar(message, { variant: "error" });
      });
    }
  }, [AddTwilioPhoneNumberQueryError]);

  useEffect(() => {
    if (AddTwilioPhoneNumberQueryResult && AddTwilioPhoneNumberQueryResult.addTwilioPhoneNumber) {
      if (AddTwilioPhoneNumberQueryResult.addTwilioPhoneNumber.success) {
        let copyOfPhnNumber = phnNumber;
        copyOfPhnNumber.push({
          phoneNumber: number,
          active: false
        })
        setPhnNumber(copyOfPhnNumber);
        setNumber("");
      } else {
        enqueueSnackbar(AddTwilioPhoneNumberQueryResult.addTwilioPhoneNumber.error, {
          variant: "error",
        });
      }
    }
  }, [AddTwilioPhoneNumberQueryResult]);


  const disconnectTwilioConf = () => {
    disconnectTwilioConfiguration({
      variables: {
        accountSID: accountSID,
        authToken: authToken,
      },
    });
  }

  const addTwilioPhoneNumberHandler = (data) => {


    addTwilioPhoneNumber({
      variables: {
        accountSID: accountSID,
        authToken: authToken,
        phoneNumber: number
      },
    });
  }

  return (
    <div className={Style.mainContainer}>
      <div className={Style.connectedToTwilio}>
        <div className={Style.flex}>
          <img src={twilioLogo} alt="twilio" />
          <h5 style={{ margin: '0 0 0 10px' }}>Connected to Twilio</h5>
        </div>
        <button
          onClick={disconnectTwilioConf}
          className={Style.btnRed}
        >
          Disconnect
        </button>
      </div>

      <div id='numberlist'>
        <div className={Style.heading} id='heading'>
          <p style={{ margin: 0 }}>Phone Number:</p>
        </div>

        <div className={Style.flexSpaceBetween} id='addphonenumber'>
          <h6>Add Twilio Phone Number</h6>
          <input
            className={Style.inpBox}
            type='text'
            placeholder='Phone number'
            onChange={(e) => setNumber(e.target.value)}
            value={number}
          />
          <button
            disabled={number.length ? false : true}
            onClick={addTwilioPhoneNumberHandler}
            className={Style.btnAdd}
          >
            <img src={addLogo} style={{ margin: '0px' }} alt="addicon" />Add

          </button>
        </div>

        {
          phnNumber && phnNumber.length ? phnNumber.map((curr, index) => (
            <div key={index} className={Style.flexSpaceBetween} id='phonenumber'>
              {
                console.log(curr)
              }
              <div>
                <img src={mobileLogo} alt="phone" />
                <span>{curr.phoneNumber}</span>
              </div>
              <div>
               <TwilioBtn phnNumber = {phnNumber} setPhnNumber = {setPhnNumber} data={curr} accountSID = {accountSID} authToken = {authToken}/>
              </div>
            </div>
          )) : "No Phone Number "
        }


      </div>
    </div>
  )
}

export default React.memo(TwilioPhoneConfiguration)