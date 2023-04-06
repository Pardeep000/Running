import React,{useState,useEffect} from 'react';
import { gql } from "apollo-boost";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import { useSnackbar } from "notistack";

import TwilioConfiguration from './TwilioConfiguration';
import TwilioPhoneConfiguration from './TwilioPhoneConfiguration';

function TwilioSetting() {
  
  const { enqueueSnackbar } = useSnackbar();
  
  const [isAuthorized,setIsAuthorized] = useState(false);
  const [twilioConfiguration,setTwilioConfiguration] = useState(null);
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

  useEffect(()=>{
    if(getTwilioConfigurationQueryResult && getTwilioConfigurationQueryResult.getTwilioConfiguration){
      const {getTwilioConfiguration} = getTwilioConfigurationQueryResult
        if(getTwilioConfiguration) {
          // console.log(getTwilioConfiguration,"getTwilioConfiguration")
          setTwilioConfiguration(getTwilioConfiguration);
          setIsAuthorized(true)
        }
    }
  },[getTwilioConfigurationQueryResult])

  return (
    <div>
      {
        isAuthorized ?<TwilioPhoneConfiguration setIsAuth = {setIsAuthorized} twiliodata = {twilioConfiguration} />: <TwilioConfiguration setTwilioConfig={setTwilioConfiguration} setIsAuth = {setIsAuthorized}/>
      }
    </div>
  )
}

export default TwilioSetting