import React,{useState,useEffect,useRef} from 'react'
import {
    setUsersListSearchInputText,
    setUsersListSearchText,
    setUsersListData,
    setUsersListSubscriptionData,
    setUsersListContextMenuPosAndObjectDetails,
    
    setUsersListSelectedUser,
  } from "../../../store/actions/UsersListActions";
  import {
    setManagersListData,
    setManagersListSelectedManager,
  } from "../../../store/actions/ManagersListActions";
  import PropTypes from 'prop-types';
  import Paper from '@material-ui/core/Paper';
  import Popper from '@material-ui/core/Popper';
  import { makeStyles } from '@material-ui/styles';
import { setChatBoxFacebookIDsWithProfileDetails } from "../../../store/actions/ChatBoxActions";

  
  import { useLazyQuery } from "@apollo/react-hooks";
  import { gql } from "apollo-boost";
  
  import _ from "lodash";
  import { connect } from "react-redux";

  import { DateRangePicker } from 'react-date-range';

  import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import moment, { tz } from 'moment';
import 'chart.js/auto';
import { Bar    } from 'react-chartjs-2';
import { DataGrid,GridToolbar } from '@material-ui/data-grid';

import includes from '../../chatBox/includes'
import './totalcustomer.css'
import { useHistory } from 'react-router-dom';
import {Link} from '@material-ui/core'

import { Facebook } from "../../../auth/Facebook";

import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import { Button } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import FacebookTypography from '../../chatBox/FacebookTypography';
const useStyles = makeStyles(() => ({
  root: {
    alignItems: 'center',
    lineHeight: '24px',
    width: '100%',
    height: '100%',
    position: 'relative',
    display: 'flex',
    '& .cellValue': {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  },
}));
const TotalCustomer = (props) =>{
  const [tablesdetaildata,setTabledetaildata] = useState([]);
  const [personName, setPersonName] = React.useState([[],[],[],[],[]]);
  const [ipersonname,setIpersonNames] = useState([])
  const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 350,
      },
    },
  };
  let personArray = personName;
  const handleChange = (event,k) => {
 
 

    const {
      target: { value },
    } = event;
    setIpersonNames(value)

    personArray[k] = value;

   
    setPersonName(

      personArray
    );

    let agentIdList = [];
    let agentList = [];
    let agentstring = []
    agentIdList = personArray.map(currArray => currArray.map((curr)=>getusersbymanagersQueryResult.getusersbymanagers.find((agent)=>agent.username == curr).id))
     agentIdList.map(curr => agentList.push(...curr))
     if(agentList.length){
      agentstring =  agentList.map((curr)=>curr.toString());
     } 
     if(agentstring.length){
       setAgentArray(agentstring)
     }
     else{
       setAgentArray([])
     }
    
  };
    useEffect(()=>{
      if(ipersonname.length){
        setPersonName(
          personArray
        );

      }
    },[ipersonname]) 

    function isOverflown(element) {
      return (
        element.scrollHeight > element.clientHeight ||
        element.scrollWidth > element.clientWidth
      );
    }
    
    const GridCellExpand = React.memo(function GridCellExpand(props) {
      const { width, value } = props;
      const wrapper = React.useRef(null);
      const cellDiv = React.useRef(null);
      const cellValue = React.useRef(null);
      const [anchorEl, setAnchorEl] = React.useState(null);
      const classes = useStyles();
      const [showFullCell, setShowFullCell] = React.useState(false);
      const [showPopper, setShowPopper] = React.useState(false);
    
      const handleMouseEnter = () => {
        const isCurrentlyOverflown = isOverflown(cellValue.current);
        setShowPopper(isCurrentlyOverflown);
        setAnchorEl(cellDiv.current);
        setShowFullCell(true);
      };
    
      const handleMouseLeave = () => {
        setShowFullCell(false);
      };
    
      React.useEffect(() => {
        if (!showFullCell) {
          return undefined;
        }
    
        function handleKeyDown(nativeEvent) {
          // IE11, Edge (prior to using Bink?) use 'Esc'
          if (nativeEvent.key === 'Escape' || nativeEvent.key === 'Esc') {
            setShowFullCell(false);
          }
        }
    
        document.addEventListener('keydown', handleKeyDown);
    
        return () => {
          document.removeEventListener('keydown', handleKeyDown);
        };
      }, [setShowFullCell, showFullCell]);
    
      return (
        <div
          ref={wrapper}
          className={classes.root}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div
            ref={cellDiv}
            style={{
              height: 1,
              width,
              display: 'block',
              position: 'absolute',
              top: 0,
            }}
          />
          <div ref={cellValue} className="cellValue">
            {value}
          </div>
          {showPopper && (
            <Popper
              open={showFullCell && anchorEl !== null}
              anchorEl={anchorEl}
              style={{ width, marginLeft: -17 }}
            >
              <Paper
                elevation={1}
                style={{ minHeight: wrapper.current.offsetHeight - 3 }}
              >
                <Typography variant="body2" style={{ padding: 8 }}>
                  {value}
                </Typography>
              </Paper>
            </Popper>
          )}
        </div>
      );
    });
    
    GridCellExpand.propTypes = {
      value: PropTypes.string.isRequired,
      width: PropTypes.number.isRequired,
    };
    
    function renderCellExpand(params) {
      return (
        <GridCellExpand
          value={params.value ? params.value.toString() : ''}
          width={params.colDef.computedWidth}
        />
      );
    }
    
    renderCellExpand.propTypes = {
      /**
       * The column of the row that the current cell belongs to.
       */
      colDef: PropTypes.object.isRequired,
      /**
       * The cell value, but if the column has valueGetter, use getValue.
       */
      value: PropTypes.oneOfType([
        PropTypes.instanceOf(Date),
        PropTypes.number,
        PropTypes.object,
        PropTypes.string,
        PropTypes.bool,
      ]),
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 120 },
        {
          field: 'customerId',
          headerName: 'Customer Id',
          width: 180,
          editable: false,
        },
        {
          field: 'Timestamp',
          headerName: 'TimeStamp',
          width: 180,
          editable: false,
        },
        {
          field: 'PageName',
          headerName: 'Page Name',
          width: 300,
          editable: true,
        },
        {
          field: 'CustomerName',
          headerName: 'Customer Name',
          width: 200,
          editable: true,
        },
        {
          field: 'label',
          headerName: 'Labels',
          width: 160,
           renderCell:renderCellExpand
     
         
        },
        {
            field: 'chatdetails',
            headerName: 'Chat Details',
            width: 200,
            renderCell: rowData =><Link target="_blank" style={{color:'blue'}} href={`/reports/totalcustomerreport/cid=${rowData.row.customerId}&pid=${PageNameWithPageCount.find((page)=>page.name === rowData.row.PageName)?PageNameWithPageCount.find((page)=>page.name === rowData.row.PageName).pageId:null}`}>Chat Details</Link>
           
          },
      ];
      let rowss = [];
      if(tablesdetaildata.length){
       
        tablesdetaildata.map((row) =>(
          rowss.push({id: row.id ,customerId:row.customerId,CustomerName:row.customername, pageId:row.pageId,Timestamp:row.messagetimestamp , PageName:row.pagename ,label:row.labels.includes("!-!-!-")
          ? row.labels.split("!-!-!-")[0]
          : row.labels ,chatdetails:row.chatDetails})
        ))
      }
      const rows = rowss;
     

      
  useEffect(()=>{
    document.title = "Total no of Chats";

  },[])


      
    const [managerId,setManagerId] = useState(null)
    const [agentarray,setAgentArray] = useState([]);
    const [customerIdArray,setCustomerIdArray] = useState([])
    const [PageNameWithPageCount,setPageNameWithPageCount]=useState([]);
    const [totalcustomer,setTotalcustomer] = useState([]);
    const [ showdropdown,setShowdropdown] = useState(false)
    const [AgentofParticularManager,setAgentofParticularManager] = useState([])
    const [showDatePicker,setShowDatePicker] = useState(false)
    const [distinctCustomerData,setDistinctCustomerData] = useState([])
    const [customernamewithid,setCustomernamewithid] = useState([]);
    const [activeUserData,setActiveUserData] = useState(JSON.parse(localStorage.getItem("ActiveUserdetail")))
    const [onlySPManager,setSPManagers] = useState([]);
    const [definiteData,setDefiniteData] = useState([]);
    const [customerName,setcustomerName] = useState([]);
    const [customerDetail,setCustomerdetail] = useState([]);
    const [datedisabled,setDatedisabled] = useState(true);

    const [StartEnd,setStartEnd] = useState({
      start:'',
      end:''
    })


    const [managerusers,setManagerUsers] = useState([])
    
    const [adate,setadate] = useState(new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }));
    const [state, setState] = useState([
      {
        startDate: new Date(adate),
        endDate: (new Date(adate)),
        key: 'selection'
      }
    ]);

    const ManagersQuery = gql`
    query Managers(
      $managersOnly: Boolean = true
      $mainSuperAdminId:ID!
      ) {
      users(
        managersOnly: $managersOnly
        mainSuperAdminId:$mainSuperAdminId
        ) {
        id
        name
      }
    }
  `;

  const [
    getManagers,
    {
      loading: managersQueryLoading,
      error: managersQueryError,
      data: managersQueryResult,
    },
  ] = useLazyQuery(ManagersQuery, {
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (managersQueryResult && managersQueryResult.users) {
      props.setManagersListData(managersQueryResult.users);
        let onlyspmanager = [];
        managersQueryResult.users.map((curr)=>onlyspmanager.push(curr.id));
       
        if(onlyspmanager.length){
          setSPManagers(onlyspmanager)
        }
    }
  }, [managersQueryResult]);

  useEffect(() => {
    getManagers({
      variables: {
        managersOnly: true,
        mainSuperAdminId:JSON.parse(localStorage.getItem("ActiveUserdetail")).mainSuperAdminId
      },
    });
  }, []);

  useEffect(() => {
    Facebook.fbInt();
  }, []);
  const includesObj = new includes();

  const getusersbymanagersquery = gql `
  query getusersbymanagers(
    $managerId:[String!]
   
  ) {
      getusersbymanagers(
       managerId:$managerId
      ) {
      managerId
      id
      designationId
      username
      
    }
  }
  `;
  let [
    getusersbymanagers,
    {
      loading: getusersbymanagersQueryLoading,
      error:getusersbymanagersQueryError,
      data:getusersbymanagersQueryResult,
    },
  ] = useLazyQuery(getusersbymanagersquery, {
    fetchPolicy: "network-only",
  });

  useEffect(()=>{
    if(getusersbymanagersQueryResult && getusersbymanagersQueryResult.getusersbymanagers){
      let definiteData = []; 
      if(activeUserData.paneltype === 'SUPERADMIN'){
          if(onlySPManager.length){
            definiteData =  onlySPManager.map((currManager,i)=>{
              return{
                managerId:currManager,
                userList: getusersbymanagersQueryResult.getusersbymanagers.filter((curr)=>curr.managerId == currManager)
              }
            })
            if(definiteData.length){
              setDefiniteData(definiteData);
            }
          }
         
        }
        if(activeUserData.paneltype === 'MANAGER'){
          definiteData = [{
            managerId : activeUserData.id,
            userList :  getusersbymanagersQueryResult.getusersbymanagers.filter((curr)=>curr.managerId == activeUserData.id)
          }]
          if(definiteData.length){
            setDefiniteData(definiteData);
          }

        }
     
       
    }
  },[getusersbymanagersQueryResult])

useEffect(()=>{
  if(activeUserData.paneltype === 'SUPERADMIN' && onlySPManager.length){
    getusersbymanagers({
      variables: {
        managerId: onlySPManager,
      },
    });
  }
  if(activeUserData.paneltype === 'MANAGER'){
    getusersbymanagers({
      variables: {
        managerId: activeUserData.id,
      },
    });
  }
  
},[onlySPManager,activeUserData.id])


  const getDistintCustomerLabelQuery = gql`
  query getDistintCustomerLabel(
    $customerIdArray:[String]
   ) {
         getDistinctCustomersLabels(
          customerIdArray:$customerIdArray
         ) {
           customerId
           messagetext
         }
       }
  `
  let [
    getDistintCustomerLabel,
    {
      loading: getDistintCustomerLabelQueryLoading,
      error:getDistintCustomerLabelQueryError,
      data:getDistintCustomerLabelQueryResult,
    },
  ] = useLazyQuery(getDistintCustomerLabelQuery, {
    fetchPolicy: "network-only",
  });




  useEffect(()=>{
    let customername = [];
    if(distinctCustomerData && distinctCustomerData.length){
     
      distinctCustomerData.map((curr,index) =>{
       customername.push(props.chatBoxFacebookIDsWithProfileDetails.find((customer)=>customer.id === curr.customerId)?props.chatBoxFacebookIDsWithProfileDetails.find((customer)=>customer.id === curr.customerId):{id:-9999999})
    })
  }
  setcustomerName(customername);

  },[distinctCustomerData,props.chatBoxFacebookIDsWithProfileDetails])

  useEffect(()=>{
    if(distinctCustomerData.length && getDistintCustomerLabelQueryResult &&getDistintCustomerLabelQueryResult.getDistinctCustomersLabels && PageNameWithPageCount.length){
      let tabledetail = [];
  
      distinctCustomerData.map((curr,index) =>(
      
        tabledetail.push({
          id: index+1,
          customerId:curr.customerId,
          pageId:curr.pageId,
          customername:curr.customername,
          messagetimestamp :moment
          .unix(curr.messagetimestamp / 1000)
          .format("yyyy-MM-DD hh:mm A"),
          pagename:PageNameWithPageCount.find((page)=> page.pageId === curr.pageId).name ,
          labels:getDistintCustomerLabelQueryResult.getDistinctCustomersLabels.find((customer)=>customer.customerId === curr.customerId) !== undefined ?getDistintCustomerLabelQueryResult.getDistinctCustomersLabels.find((customer)=>customer.customerId === curr.customerId).messagetext:'no labels',
           chatDetails:'chatdetails'
      })
     
  
    ))
    if(tabledetail.length){
      setTabledetaildata(tabledetail)
    } 
    
    }
  },[distinctCustomerData.length,getDistintCustomerLabelQueryResult,customerName,setTabledetaildata])


  const GetUsersByManagerQuery = gql`
    query UsersByManager($managerId: String) {
      users(managerId: $managerId) {
        id
        picture
        name
        username
      }
    }
  `;
    const getDistinctCustomerQuery = gql`
    query getDistintCustomer(
      $idArray: [ID] 
      $start:String
      $end:String
      
    ) {
          getDistinctCustomers(
            idArray: $idArray
            start:$start
            end:$end
          ) {
              id
        customerId
          pageId
        messagetimestamp
        customername
          }
        }
    `

    const GetPages = gql`
    query Pages($mainSuperAdminId:ID!) {
      pages(mainSuperAdminId:$mainSuperAdminId) {
        id
        name
        pageId
        accesstoken
      }
    }
  `;
  
  let [
    getPages,
    {
      loading: getPagesQueryLoading,
      error: getUsersQueryError,
      data: getPagesQueryResult,
    },
  ] = useLazyQuery(GetPages, {
    fetchPolicy: "network-only",
  });


  useEffect(()=>{
    document.title = "Reports";
    getPages({
      variables: {
        mainSuperAdminId:JSON.parse(localStorage.getItem("ActiveUserdetail")).mainSuperAdminId
      }
    });
  },[])

    let [
      getDistinctCustomers,
      {
        loading: getDistinctCustomerQueryLoading,
        error: getDistinctCustomerQueryError,
        data: getDistinctCustomerQueryResult,
      },
    ] = useLazyQuery(getDistinctCustomerQuery, {
      fetchPolicy: "network-only",
    });

    useEffect(()=>{
      if(getDistinctCustomerQueryLoading){
        setTabledetaildata([]);
      }
    },[getDistinctCustomerQueryLoading])
    useEffect(()=>{
     
        if(agentarray.length){
            setDatedisabled(false);
        }
        else if(agentarray.length == 0){
            setDatedisabled(true);
        }
    },[agentarray])

    useEffect(()=>{
      if(getDistinctCustomerQueryResult && getDistinctCustomerQueryResult.getDistinctCustomers.length ){
        let pageIdArray = [];
        let filterArray = [];
        let specific_page_detail = [];
        let each_page_count = [];
        let customerIdArray = []; 
        getDistinctCustomerQueryResult.getDistinctCustomers.map((curr)=> pageIdArray.push(curr.pageId))
        getDistinctCustomerQueryResult.getDistinctCustomers.map((curr)=>customerIdArray.push(curr.customerId))
        setDistinctCustomerData(getDistinctCustomerQueryResult.getDistinctCustomers)
        if(customerIdArray){
          setCustomerIdArray(customerIdArray)
        }

        if(pageIdArray.length){
       
          filterArray =  pageIdArray.filter((data,index)=>{
            return pageIdArray.indexOf(data) === index;
        })}
            if(getPagesQueryResult && getPagesQueryResult.pages){
            
              for(let i = 0 ; i < filterArray.length  ; i++){
                 specific_page_detail.push( getPagesQueryResult.pages.find((page)=> page.pageId === filterArray[i]) ? getPagesQueryResult.pages.find((page)=> page.pageId === filterArray[i]):'page info not found' )
              }
            }
            const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

          (specific_page_detail.map((curr)=> each_page_count.push({pageId:curr.pageId,name:curr.name, count:countOccurrences(pageIdArray,curr.pageId), })))

            setPageNameWithPageCount(each_page_count)
            setTotalcustomer(pageIdArray);

        
      }
      else{
        setDistinctCustomerData([])
        setCustomerIdArray([])
        setPageNameWithPageCount([])
        setTotalcustomer([])

      }
    },[getDistinctCustomerQueryResult])
  let [
    getUsersByManager,
    {
      loading: getUsersByManagerQueryLoading,
      error: getUsersByManagerQueryError,
      data: getUsersByManagerQueryResult,
    },
  ] = useLazyQuery(GetUsersByManagerQuery, {
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (managerId) {
   
      getUsersByManager({
        variables: {
          managerId: managerId,
        },
      });
    }

  }, [managerId]);

  useEffect(()=>{
      if(props.authPanelType === 'MANAGER'){
          let agentnameandid = props.usersListData.map((curr)=>{
            return{
              name:curr.name,
              id:curr.id
            }
          })  
        setAgentofParticularManager(agentnameandid)
      }
  },[])


useEffect(()=>{
  if(customerIdArray){
    getDistintCustomerLabel({
      variables: {
        customerIdArray:customerIdArray
      },
    })
  }
},[customerIdArray])



useEffect(()=>{
    let allow = undefined;
    let userArray = [];
if(getUsersByManagerQueryResult && getUsersByManagerQueryResult.users && managerId){

   userArray= getUsersByManagerQueryResult.users.map((user)=>{
   
       return{
           id:user.id,
           name:user.name
       }
    })
 
    let manageranduserdata = {
      managerId:managerId,
      usersdata:userArray
  }

    
    allow = managerusers.find((user)=>user.managerId === managerId);



  if(allow === undefined){
 
    setManagerUsers([...managerusers, manageranduserdata ])
  }
  

}
},[getUsersByManagerQueryResult])
   


const setDateRange = (item )=>{

 let startdate =  moment(item.selection.startDate).format("YYYY-MM-DD 10:00:00");
  let enddate = moment(item.selection.endDate).add(1,'days').format("YYYY-MM-DD 09:59:59");


  setStartEnd({start:startdate,end:enddate})

  setState([item.selection])

}


 
    const dropdown = (
      onlySPManager.length &&  definiteData.map((data,i)=>(
       
        <FormControl sx={{  width: 300 }}>
        <InputLabel style={{marginLeft:'10px',marginTop:'-5px'}} id="demo-multiple-checkbox-label">{` ${props.managersListData.find((curr)=>curr.id == data.managerId).name}`}</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
     
          value={personName[i]}
          onChange={(e)=>handleChange(e,i)}
          input={<OutlinedInput label={` ${props.managersListData.find((curr)=>curr.id == data.managerId).name}`} />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {data.userList.map(({username,id}) => (
           
            <MenuItem key={username} value={username}>
              <Checkbox checked={personName[i].indexOf(username) > -1} />
              <ListItemText primary={username} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      ))
    
    )
    const onselectdate = ()=>{
      setadate(new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }))
      setShowDatePicker(!showDatePicker)
    }
    useEffect(()=>{
      if(activeUserData.paneltype === 'AGENT'){
        setAgentArray([activeUserData.id])
      }
    },[activeUserData])
  
      const submitQuery = ()=>{

          setShowDatePicker(false);
        if (StartEnd && agentarray.length) {
          let variabledata = {
            StartEnd:StartEnd,
            agentarray:agentarray
          }
          localStorage.setItem('totalchatvariable',JSON.stringify(variabledata))
       
          let startdate =  moment(state[0].startDate).format("YYYY-MM-DD 10:00:00");
          let enddate = moment(state[0].endDate).add(1,'days').format("YYYY-MM-DD 09:59:59");
          //
          console.log("startdate",startdate)
          console.log("enddate",enddate)
          //ssss
          getDistinctCustomers({
            variables: {
              idArray: agentarray,
              start:StartEnd.start == ''? startdate:StartEnd.start,
              end:StartEnd.end == ''? enddate:StartEnd.end
            },
          });
        }
      }

    
    const [age, setAge] = React.useState('');
    let labelname = [];
    let datacount = [];
    if(PageNameWithPageCount.length){

       labelname = PageNameWithPageCount.map((curr)=>`${curr.name.split(' ').slice(0, 3).join(' ')}`)
       datacount = PageNameWithPageCount.map((curr)=>curr.count)
   
    }
    return(
     
      
     
    
      <div className='loader-container' style={{height:'100%',overflow:'scroll'}}>
  
        {
          
           managersQueryLoading?<div  style={{height:'100vh',display:'flex',justifyContent:'center',alignItems:'center'}}><div className='loader'></div>  </div>  :
          <>
           <div style={{width:'100%',height:'80px',borderBottom:'1px solid lightgrey',boxShadow:'0px 0px 12.3px 1.1px rgba(0,0,0,0.1)'}}>
           <div style={{width:'90%',margin:'0 auto'}}>
            <h3 style={{marginTop:'0',padding:'20px 30px',fontSize:'24px'}}>Total No of Customer Report</h3>
           </div>
          </div>
            {
                <div style={{display:'flex',justifyContent:'space-between', alignItems:'center',width:'90%',margin:'20px auto'}}>

                    {props.authPanelType !== 'MANAGER' && props.authPanelType !== 'AGENT' && <div style={{display:'grid' , gridTemplateColumns:'auto auto auto',gridGap:'20px'}}>{dropdown}</div>}
                    {
                      props.authPanelType === 'MANAGER' && dropdown
                    }
                    <div> 
          <Button disabled={datedisabled} onClick={()=>onselectdate()} style={{height:'50px',marginRight:'10px',background:'transparent'}} variant="contained">Select Date</Button>
                      
                      {/* <button style={{padding:'10px 30px',border:'none',background:'white',marginRight:'40px',marginTop:'20px',boxShadow:'0px 0px 5px 1px rgba(0,0,0,0.1)'}} onClick={()=>setShowDatePicker(!showDatePicker)}>Select Date </button> */}
                   {showDatePicker && 
                    <div style={{position:'absolute',left:'15%',zIndex:'10',top:'25%',boxShadow:'0px 0px 5px 1px rgba(0,0,0,0.1)',display:'flex',flexDirection:'column',background:'white'}}>
                    <DateRangePicker
  onChange={item => setDateRange(item)}
  showSelectionPreview={true}
  moveRangeOnFirstSelection={false}
  months={2}
  ranges={state}
  direction="horizontal"
  preventSnapRefocus={true}
  calendarFocus="backwards"
/>
                    <button style={{width:'120px',marginLeft:'auto',padding:'10px',marginBottom:'10px',marginRight:'20px',border:0,background:'#446beb',color:'white'}} onClick={()=>submitQuery()}>Confirm</button>
                    </div>
                   } 
                   </div>
                </div>

                


            }
            <div style={{width:'90%',height:'350px',margin:'100px auto 50px auto',boxShadow:'0px 0px 10px 1px rgba(0,0,0,0.1)',display:'flex',justifyContent:'center',alignItems:'center'}}>
                {
                   !PageNameWithPageCount.length && !getDistinctCustomerQueryLoading ? <div>
                        <div>
                       <p style={{opacity:0.5}}>No data yet...</p> 
                        </div>
                    </div> :   !PageNameWithPageCount.length && getDistinctCustomerQueryLoading ? <div className='loader'></div>:
                    <div style={{width:'100%',display:'flex',justifyContent:'space-around',alignItems:'center'}}>
                        <div style={{width:'400px',height:'300px',background:'lightgrey',textAlign:'center'}}>
                            <h2 style={{fontSize:'32px',marginTop:'60px',padding:'20px'}}>Total Number of Customers Received</h2>
                            <h1 style={{fontSize:'62px'}}>{totalcustomer.length}</h1>
                        </div>
                        <div style={{width:'55%'}}>
                        <Bar    
                    datasetIdKey='id'
                    data={{
                      labels: labelname,
                      datasets: [
                        {
                          id: 1,
                          label: 'Page Count',
                          data: datacount,
                        },
                        
                      ],
                    }}
                  />
                        </div>
                    </div>
                    
                }

            </div>
            <div style={{width:'90%',margin:'0 auto'}}>
           
           <div style={{ height:'900px', width: '100%' }}>
           
      <DataGrid
        rows={rows}
        columns={columns}
       
        components={{ Toolbar: GridToolbar }}
        disableSelectionOnClick
      />
    </div>
           </div>
          </>
        }
          
      </div>

    )
    
    
    
}

const mapStateToProps = (state) => {
    return {
      ...state.UsersListReducer,
      ...state.AuthReducer,
      ...state.ManagersListReducer,
      ...state.ChatBoxReducer
    };
  };
  export default connect(mapStateToProps, {
    setUsersListSearchInputText,
    setUsersListSearchText,
    setUsersListData,
    setUsersListSubscriptionData,
    setUsersListContextMenuPosAndObjectDetails,
    setUsersListSelectedUser,
    setManagersListData,
    setChatBoxFacebookIDsWithProfileDetails
   
  })(TotalCustomer);