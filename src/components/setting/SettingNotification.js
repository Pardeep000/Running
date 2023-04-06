import React,{useState,useEffect} from 'react'
import NotificationSoundBar from './NotificationSoundBar'
import { gql } from "apollo-boost";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import { useSnackbar } from "notistack";


function SettingNotification() {
    const { enqueueSnackbar } = useSnackbar();
   


  return (
    <div style={{width:'60%',paddingLeft:'10px'}}>
        <div style={{}}><span>
            </span>
            <h4 style={{fontFamily:'poppins',fontSize:'16px',padding:'15px 0px',borderBottom:'1px solid lightgrey'}}>Notification sound</h4>
        </div>
        <NotificationSoundBar category="superadmin"/>
       

    </div>
  )
}

export default SettingNotification