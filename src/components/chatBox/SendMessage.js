import React, { useState, useEffect } from 'react'

import SendMessageModal from '../modals/SendMessageModal'

import { gql } from "apollo-boost";
import { useSnackbar } from "notistack";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import { connect } from "react-redux";
import InfoIcon from '@mui/icons-material/Info';
import {

  setSmsChatListData
} from "../../store/actions/ChatBoxActions";
import moment from 'moment';
import { IconButton, Tooltip } from '@material-ui/core';


function SendMessage(props) {
  const { enqueueSnackbar } = useSnackbar();

  const [modalShow, setModalShow] = React.useState(false)
  const [showMore, setShowMore] = React.useState(false);
  const [twilioConfiguration, setTwilioConfiguration] = useState(null);
  const getTwilioConfigurationQuery = gql`
    query getTwilioConfiguration($accessToken: String) {
      getTwilioConfiguration(accessToken: $accessToken) {
        id
        authToken
        accountSID
        phoneNumber{
          phoneNumber
          active
        }
        active
      }
    }
  `;
  let [
    getTwilioConfiguration,
    {
      loading: getTwilioConfigurationQueryLoading,
      error: getTwilioConfigurationQueryError,
      data: getTwilioConfigurationQueryResult,
    },
  ] = useLazyQuery(getTwilioConfigurationQuery, {
    fetchPolicy: "network-only",
  });
  useEffect(() => {
    if (getTwilioConfigurationQueryError) {
      getTwilioConfigurationQueryError.graphQLErrors.map(({ message }, i) => {
        enqueueSnackbar(message, { variant: "error" });
      });
    }
  }, [getTwilioConfigurationQueryError]);

  useEffect(() => {
    getTwilioConfiguration();
  }, []);

  useEffect(() => {
    if (getTwilioConfigurationQueryResult && getTwilioConfigurationQueryResult.getTwilioConfiguration) {
      const { getTwilioConfiguration } = getTwilioConfigurationQueryResult
      if (getTwilioConfiguration && getTwilioConfiguration.phoneNumber && getTwilioConfiguration.phoneNumber.length) {
        const { phoneNumber } = getTwilioConfiguration;
        let activePhnRecord = phoneNumber.find(curr => curr.active == true);
        if (activePhnRecord) {
          setTwilioConfiguration({
            accountSID: getTwilioConfiguration.accountSID,
            authToken: getTwilioConfiguration.authToken,
            phoneNumber: activePhnRecord.phoneNumber
          })
        }
        console.log(twilioConfiguration)
      }
    }
  }, [getTwilioConfigurationQueryResult])


  return (
    <div>
      <div
        style={{
          width: "100%",
          padding: "10px 10px",
          border: "1px solid lightgrey",
          borderRadius: "5px",
          margin: "8px 0px",
        }}

      >
        <div
          style={{ display: "flex", justifyContent: "space-between", alignItems: 'center' }}
        >
          <div>

            <span
              style={{
                color: "#777777",
                fontSize: "16px",
                fontFamily: '"Poppins", sans-serif',
                fontWeight: "500",
              }}
            >
              Send Message
            </span>
            <Tooltip title={twilioConfiguration != null ? 'Twilio Service Enabled' : 'Twilio Service not Enabled'}>
              <IconButton>
                <InfoIcon />
              </IconButton>
            </Tooltip>
          </div>

          <button
            disabled={twilioConfiguration != null ? false : true}
            style={{
              color: 'white',
              background: 'rgba(85, 165, 48, 1)',
              padding: '5px 15px',
              border: 'rgba(85, 165, 48, 1)',
              borderRadius: '3px',
              fontSize: '14px'
            }}
            onClick={() => setModalShow(true)}
          >Send</button>
        </div>


      </div>
      <SendMessageModal
        customerId={props.customerId}
        agentId={props.agentId}
        twilioConfig={twilioConfiguration}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />

      <div>

      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    ...state.ChatBoxReducer,
  };
};
export default connect(mapStateToProps, {
  setSmsChatListData,
})(SendMessage);

