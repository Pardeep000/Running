import React,{useState,useEffect} from 'react';
import {
    setUsersListSearchInputText,
    setUsersListSearchText,
    setUsersListData,
    setUsersListSubscriptionData,
    setUsersListContextMenuPosAndObjectDetails,
    setUsersListSelectedUser,
  } from "../../store/actions/UsersListActions";
  import '../../App.css'

  import _ from "lodash";
  import { connect } from "react-redux";


  import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

import { useHistory } from 'react-router-dom';
import './report.css'

const Report = (props) =>{

    const history = useHistory();
    

    const routeChange = (id) =>{ 
      if(id === 'totalchat'){
        let path = `/reports/totalcustomerreport`; 
        history.push(path);

      }
      else if(id === 'salesreport'){
        let path = `/reports/dailysummary`; 
        history.push(path);
      }
    }

  
   


  useEffect(()=>{
    document.title = "Reports";

  },[])



    return(
        <div style={{width:'100%'}}>
          <div style={{width:'100%',height:'80px',borderBottom:'1px solid lightgrey',boxShadow:'0px 0px 12.3px 1.1px rgba(0,0,0,0.1)'}}>
            <h3 style={{marginTop:'0',padding:'20px 30px',fontSize:'24px'}}>Reports</h3>
          </div>
            <ul className='reportlistul'>
                <li onClick={()=>(routeChange('totalchat'))}><div></div><div>Total No of Chats</div></li>
                <li onClick={()=>(routeChange('salesreport'))}>Sales Report</li>
               
            </ul>
           
         
               
        </div>
        
    )
}
const mapStateToProps = (state) => {
    return {
      ...state.UsersListReducer,
      ...state.AuthReducer,
      ...state.ManagersListReducer,
    };
  };
  export default connect(mapStateToProps, {
    setUsersListSearchInputText,
    setUsersListSearchText,
    setUsersListData,
    setUsersListSubscriptionData,
    setUsersListContextMenuPosAndObjectDetails,
    setUsersListSelectedUser,
   
  })(Report);
  