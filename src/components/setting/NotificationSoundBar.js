import React,{useEffect,useState} from 'react'
import Switch from '@mui/material/Switch';
import { gql } from "apollo-boost";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import { useSnackbar } from "notistack";
import BootstrapSwitchButton from 'bootstrap-switch-button-react'

function NotificationSoundBar({category}) {
    
    const { enqueueSnackbar } = useSnackbar({});
    

    const [data,setData] = useState({
      'My Chats':false,
      'Managers':false,
      'Agents':false
    })

    const getNotificationSettingQuery = gql`
    query getNotificationSetting($accessToken: String) {
      getNotificationSetting(accessToken: $accessToken) {
        id
        notificationsetting
      }
    }
  `;
  let [
    getNotificationSetting,
    {
      loading: getNotificationSettingQueryLoading,
      error: getNotificationSettingQueryError,
      data: getNotificationSettingQueryResult,
    },
  ] = useLazyQuery(getNotificationSettingQuery, {
    fetchPolicy: "network-only",
  });
  useEffect(() => {
    if (getNotificationSettingQueryError) {
      getNotificationSettingQueryError.graphQLErrors.map(({ message }, i) => {
        enqueueSnackbar(message, { variant: "error" });
      });
    }
  }, [getNotificationSettingQueryError]);

  useEffect(() => {
    getNotificationSetting();
  }, []);
  useEffect(() => {
    if (getNotificationSettingQueryResult && getNotificationSettingQueryResult.getNotificationSetting) {
      
      var decodeResult = JSON.parse(getNotificationSettingQueryResult.getNotificationSetting.notificationsetting);
      setData(decodeResult);
    }
  }, [getNotificationSettingQueryResult]);

  const updateNotificationSettingQuery = gql`
    mutation updateNotificationSetting($setting: String!) {
        updateNotificationSetting(setting: $setting) {
        success
        error
      }
    }
  `;
  let [
    updateNotificationSetting,
    {
      loading: updateNotificationSettingLoading,
      error: updateNotificationSettingError,
      data: updateNotificationSettingResult,
    },
  ] = useMutation(updateNotificationSettingQuery);

  useEffect(() => {
    if (updateNotificationSettingError) {
      updateNotificationSettingError.graphQLErrors.map(({ message }, i) => {
        enqueueSnackbar(message, { variant: "error" });
      });
    }
  }, [updateNotificationSettingError]);

  useEffect(() => {
    if (updateNotificationSettingResult && updateNotificationSettingResult.updateNotificationSetting) {
      if (updateNotificationSettingResult.updateNotificationSetting.success) {
        enqueueSnackbar("Setting saved successfully.", {
            variant: "success",
          });
      } else {
        enqueueSnackbar(updateNotificationSettingResult.updateNotificationSetting.error, {
          variant: "error",
        });
      }
    }
  }, [updateNotificationSettingResult]);

 
    const dataUI = {
        superadmin:[
            {
                heading:"My Chats",
                para: "Close notification for my chats incoming messages"
            },
            {
                heading:"Managers",
                para:"Close notification for managers chats"
            },
            {
                heading:'Agents',
                para:'Close notification for agent chats'
            }
        ],
        manager:[
            {
                heading:"My Chats",
                para:"mute sound notification for my chats incoming messages"
            },
            {
                heading:"Agents",
                para:"mute sound notification for agent chat"
            }
        ],
        agent:[
            {
                heading:"My Chats",
                para:'mute sound notification for my chats incoming messages'
            }
        ]
    }
    const onSwitchChangeHandler = (e,n)=>{
      setData({
        ...data,
        [n]:e
    })
    }
   
    
  const handleSave = ()=>{

    updateNotificationSetting({
        variables: {
          setting: JSON.stringify(data),
        },
      });
  }

const label = { inputProps: { 'aria-label': 'Switch demo' } };

  return (
    <div>
        {
            getNotificationSettingQueryLoading ? "Loading Data...":
            getNotificationSettingQueryResult && dataUI[category].map( curr =>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',borderBottom:'1px solid lightgrey',margin:'10px 0px'}}>
                 <div >
            <h4 style={{fontFamily:'poppins',fontSize:'15px'}}>{curr.heading}</h4>
            <p style={{fontFamily:'poppins',fontSize:'14px'}}>{curr.para}</p>
        </div>
        <div>

        <BootstrapSwitchButton
    checked={data ? data[curr.heading] ? data[curr.heading]:false:false}
    onstyle="success"
    onlabel='On'
    offlabel='Off'
    size="xs"
    onChange={(checked) => {
      onSwitchChangeHandler(checked,curr.heading)
    }}
/>
          
{/*           
        {
          data[curr.heading] === true ? <div><Switch defaultChecked={true}  onChange={(e)=>onSwitchChangeHandler(e,curr.heading)} {...label} /></div>:<div><Switch defaultChecked={false} color="success" onChange={(e)=>onSwitchChangeHandler(e,curr.heading)} {...label} /></div>
        } */}
      
        </div>
                </div>
                )
        }

       
        <div style={{display:'flex',justifyContent:'flex-end',alignItems:'center',marginTop:'30px'}}>
            <button style={{background:'none',border:'1px solid lightgrey',fontFamily:'poppins',fontSize:'14px',marginRight:'10px',padding:'5px 15px'}}>Cancel</button>
            <button style={{background:'green',border:'1px solid lightgrey',fontFamily:'poppins',fontSize:'14px',color:'white',padding:'5px 15px'}} onClick={handleSave}>Save changes</button>
        </div>
    </div>
  )
}

export default NotificationSoundBar