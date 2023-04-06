import React,{useState,useEffect} from 'react'
import './dailysummary.css'
import ValidationSelectField from "../../../otherComponents/ValidationSelectField";

import Button from '@material-ui/core/Button';
import { makeStyles } from "@material-ui/core/styles";
import FormControl from '@material-ui/core/FormControl';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';


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
 
import { 
    setChatBoxFacebookIDsWithProfileDetails 
    } from "../../../store/actions/ChatBoxActions";

  
  import { useLazyQuery } from "@apollo/react-hooks";
  import { gql } from "apollo-boost";
  
  import _, { curryRight } from "lodash";
  import { connect } from "react-redux";
  import moment from 'moment';
  import { DateRangePicker } from 'react-date-range';

  import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
  import { Doughnut } from 'react-chartjs-2';
  import { Pie } from 'react-chartjs-2';


const useStyles = makeStyles((theme) => ({
    header_main: {
        borderBottom:'1px solid lightgrey',
        boxShadow:'0px 0px 12.3px 1.1px rgba(0,0,0,0.1)'
    },
    header_content:{
        width:'92%',
        margin:'0 auto',
        display:'flex',
        justifyContent:'space-between',
        alignItems:'center'
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
      title: {
        flexGrow: 1,
      },
      paper_main:{
        width:'98.5%',
        display:'grid',
        gridTemplateColumns:'50% auto',
        gridGap:'40px',
        height:'300px',
        margin:'100px 0px'
      },
      paperStyle:{
          height:'100%',
          width:'100%',
          display:'flex',
          alignItems:'center',
          padding:'10px',
          justifyContent:'center'
         
      },
      chartdiv:{
        width:'100%',
        height:'300px',
      },
      datadiv:{
        width:'90%',
        height:'300px',
        overflow:'auto'
      },
      paper2_main:{
          height:'520px',
          marginBottom:'50px'
      },

      paper2Style:{
        height:'100%',
        width:'100%',
        
       
    },
    select_main:{
        display:'flex',
        justifyContent:'space-between',
        alignItems:'center',
        height:'100',
        width:'98%',
        margin:'20px auto',
        paddingTop:'20px'
    },
    reporthead:{
      marginTop:'10px',
      fontSize:'22px',
      paddingLeft:'10px'
    },
    reportlist:{
      paddingLeft:'10px',
      paddingRight:'20px'


    },
    reportitem:{
      listStyle:'none',
      background:'#fafafa',
      padding:'5px',
      marginBottom:'10px',
      fontSize:'18px',
      padding:'10px 10px'
    }
   
}));

function DailySummary(props) {

    const classes = useStyles();
    const [service, setService] = useState();
    const [provider, setProvider] = useState();
    const [dealerId,setDealerId] = useState();
    const [startdate,setstartdate] = useState();
    const [enddate,setenddate] = useState();
    const [label,setLabel] = useState()

    const[onlycustomerId,setOnlycustomerId] = useState([]);
    const[dataforautoreport,setdataforautoreport] = useState([]);
    const [salesreport,setsalesreport] = useState([])
    const [dealerIdreport,setdealerIdreport] = useState([])
    const [AgentofParticularManager,setAgentofParticularManager] = useState([])
    const [salesreportmanual,setsalesreportmanual] = useState([]);
    const [dealerIdreportmanual,setdealerIdreportmanual] = useState([]);
    const [showDatePicker,setShowDatePicker] = useState(false)
    const [agentArray,setAgentArray] = useState([]);
    const [activeUserData,setActiveUserData] = useState(JSON.parse(localStorage.getItem("ActiveUserdetail")))
    const [ showdropdown,setShowdropdown] = useState(false)

    const [adate,setadate] = useState(new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }));
    const[autostartdate] = useState(  moment(adate).format("YYYY-MM-DD 00:00:00"))
    const[autoenddate] = useState(  moment(adate).format("YYYY-MM-DD 23:59:59"))
    const [state, setState] = useState([
      {
        startDate: new Date(adate),
        endDate: new Date(adate),
        key: 'selection'
      }
    ]);

    useEffect(()=>{
      setDealerId(undefined)
    },[provider])
    const [activeDealerDropdown,setActiveDealerDropdown] = useState([
        ["HRaza", "HRaza"],
        ["FFatima", "FFatima"],
        ["SHaq", "SHaq"],
        ["BKhan", "BKhan"],
        ["DSalar", "DSalar"],
        ["UNY179", "UNY179"],
        ["UNY180", "UNY180"],
        ["SMaria", "SMaria"],
        ["JMundoz", "JMundoz"],

      ])
      
      useEffect(()=>{
        if(props.authPanelType === 'MANAGER'){
            let agentnameandid = props.usersListData.map((curr)=>{
              return curr.id
              
            })  
          setAgentofParticularManager(agentnameandid)
        }
    },[])
    
    const setDateRange = (item )=>{
      let startdate =  moment(item.selection.startDate).format("YYYY-MM-DD 10:00:00");
       let enddate =  moment(item.selection.endDate).add(1,'days').format("YYYY-MM-DD 09:59:59");

     
       setstartdate(startdate);
       setenddate(enddate);
       setState([item.selection])
      }
     
   
    


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
    if (activeUserData.paneltype === "MANAGER" && activeUserData.id) {
      getUsersByManager({
        variables: {
          managerId: activeUserData.id,
        },
      });
    }
    if(activeUserData.paneltype === "AGENT" && activeUserData.id){
      let userdata = [];
      userdata.push(activeUserData.id);
      if(userdata.length){
        setAgentArray(userdata)
      }
    }

  }, [activeUserData.id,activeUserData.paneltype]);

  useEffect(()=>{
   
    let agentIdArray = [];
if(getUsersByManagerQueryResult && getUsersByManagerQueryResult.users){

   agentIdArray= getUsersByManagerQueryResult.users.map((user)=>user.id)

   if(agentIdArray.length){
     setAgentArray(agentIdArray)
   }
}
},[getUsersByManagerQueryResult])

if(agentArray.length){
}
    const  getDistinctCustomersWithSaleLabelsdataforSuperAdmin = gql`
    query getDistinctCustomersWithSaleLabelsdataforsuperadmin(
      $start:String!
      $end:String!
    ) {
        getDistinctCustomersWithSaleLabelsforsuperadmin(
          start: $start
          end:$end
        ) {
     customerId
     messagetext
      }
    }
    `; 

    const [
      getDistinctCustomersWithSaleLabelsforsuperadmin,
      {
        loading: getDistinctCustomersWithSaleLabelsforsuperadminLoading,
        error: getDistinctCustomersWithSaleLabelsforsuperadminError,
        data: getDistinctCustomersWithSaleLabelsforsuperadminResult,
      },
    ] = useLazyQuery(getDistinctCustomersWithSaleLabelsdataforSuperAdmin, {
      fetchPolicy: "network-only",
    });
      const getDistinctCustomersWithSaleLabelsdata  = gql`
      
 query getDistinctCustomersWithSaleLabelsdata(
  $start:String!
  $end:String!
  $agentIdArray:[ID]
) {
    getDistinctCustomersWithSaleLabels(
      start: $start
      end:$end
      agentIdArray:$agentIdArray
    ) {
 customerId
 messagetext
  }
}
    `;
  
    const [
      getDistinctCustomersWithSaleLabels,
      {
        loading: getDistinctCustomersWithSaleLabelsQueryLoading,
        error: getDistinctCustomersWithSaleLabelsQueryError,
        data: getDistinctCustomersWithSaleLabelsQueryResult,
      },
    ] = useLazyQuery(getDistinctCustomersWithSaleLabelsdata, {
      fetchPolicy: "network-only",
    });
  
    useEffect(() => {
      if(activeUserData.paneltype === 'MANAGER' || activeUserData.paneltype === 'AGENT'){
        if (getDistinctCustomersWithSaleLabelsQueryResult 
          && getDistinctCustomersWithSaleLabelsQueryResult.getDistinctCustomersWithSaleLabels ) {
  
          let onlycusId = getDistinctCustomersWithSaleLabelsQueryResult.getDistinctCustomersWithSaleLabels.map((curr)=> curr.customerId)
          setOnlycustomerId(onlycusId)
     
        }
      }
  
    
    }, [getDistinctCustomersWithSaleLabelsQueryResult]);

    useEffect (()=>{
      if(activeUserData.paneltype === 'SUPERADMIN'){
        if(getDistinctCustomersWithSaleLabelsforsuperadminResult && getDistinctCustomersWithSaleLabelsforsuperadminResult.getDistinctCustomersWithSaleLabelsforsuperadmin
          ){
          let onlycusId = getDistinctCustomersWithSaleLabelsforsuperadminResult.getDistinctCustomersWithSaleLabelsforsuperadmin.map((curr)=> curr.customerId)
          setOnlycustomerId(onlycusId)
         
        }
      }
    },[getDistinctCustomersWithSaleLabelsforsuperadminResult])
    useEffect(()=>{
      if(activeUserData.paneltype === 'SUPERADMIN'){
        if(autostartdate && autoenddate){
          getDistinctCustomersWithSaleLabelsforsuperadmin({
            variables: {
              start:autostartdate,
              end:autoenddate,
            }})
        }
      }
      else if(activeUserData.paneltype === 'MANAGER' || activeUserData.paneltype === 'AGENT'){
        if(autostartdate && autoenddate && agentArray.length){
          getDistinctCustomersWithSaleLabels({
            variables: {
              start:autostartdate,
              end:autoenddate,
              agentIdArray:agentArray
            }})
        }
      }
   
 
    },[autostartdate,agentArray.length])
   

    const getLeadformdata  = gql`
    query getLeadformdata(
      $customerIdArray: [String!] 
      ) {
          getLeadforms(
            customerIdArray: $customerIdArray
          ) {
       customerId
        dealerId
          provider
        service
        }
      }
       `;
     
       const [
        getLeadforms,
         {
           loading: getLeadformsQueryLoading,
           error: getLeadformsQueryError,
           data: getLeadformsQueryResult,
         },
       ] = useLazyQuery(getLeadformdata, {
         fetchPolicy: "network-only",
       });
       
       useEffect(() => {
         if (getLeadformsQueryResult && getLeadformsQueryResult.getLeadforms ) {
          let dataforauto = [];
         if(activeUserData.paneltype === 'MANAGER' ||  activeUserData.paneltype === 'AGENT'){

           getLeadformsQueryResult.getLeadforms.map((curr) => dataforauto.push({...curr,label:getDistinctCustomersWithSaleLabelsQueryResult.getDistinctCustomersWithSaleLabels.find((crr)=> crr.customerId === curr.customerId ).messagetext}))
         }
         else if(activeUserData.paneltype === 'SUPERADMIN'){
          getLeadformsQueryResult.getLeadforms.map((curr) => dataforauto.push({...curr,label:getDistinctCustomersWithSaleLabelsforsuperadminResult.getDistinctCustomersWithSaleLabelsforsuperadmin.find((crr)=> crr.customerId === curr.customerId ).messagetext}))

         }
         
          if(dataforauto.length){
            setdataforautoreport(dataforauto)
          }
          if(dataforauto.length){
            let saledata = [];
            let dealerdata = [];
            dataforauto.map((current)=> saledata.push(`${current.service} ${current.label} - ${current.provider}`))
            dataforauto.map((current)=> dealerdata.push(`${current.dealerId} - ${current.provider}`))
            
            if(saledata.length){

              let saledatafinal = [];
              const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

          (saledata.map((curr)=> saledatafinal.push({reponame:curr, count:countOccurrences(saledata,curr)})))

          let uniquedata = [...new Set(saledatafinal.map((curr)=>curr.reponame))]
          let superfinalsalesdata = [];

          uniquedata.map((curre)=>superfinalsalesdata.push({reponame:curre,count:saledatafinal.find((curr)=>curr.reponame === curre).count}))
               if(superfinalsalesdata.length){
                 setsalesreport(superfinalsalesdata)
               }
            }
            if(dealerdata.length){
              let dealerdatafinal = [];
              const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

          (dealerdata.map((curr)=> dealerdatafinal.push({reponame:curr, count:countOccurrences(dealerdata,curr)})))

          let uniquedata = [...new Set(dealerdatafinal.map((curr)=>curr.reponame))]
          let superfinaldealerdata = [];

          uniquedata.map((curre)=>superfinaldealerdata.push({reponame:curre,count:dealerdatafinal.find((curr)=>curr.reponame === curre).count}))
               if(superfinaldealerdata.length){
               
                setdealerIdreport(superfinaldealerdata)
               }
            }
          }
          
        }
        
       }, [getLeadformsQueryResult,getLeadformsQueryLoading]);
   
       useEffect(()=>{
         if(onlycustomerId.length){
          getLeadforms({
             variables: {
              customerIdArray: onlycustomerId
             }})
         }
       },[onlycustomerId])



           const getDailySummaryManualReportsdataquery  = gql`
           query getDailySummaryManualReportsdata(
            $agentId:[ID]
            $start: String!
            $end: String!
            $label:String!
            $service:String!
            $provider:String!
            $dealerId:String!
            ) {
                getDailySummaryManualReports(
                  agentId:$agentId
                  start:$start
                  end: $end
                  label:$label
                  service:$service
                  provider:$provider
                  dealerId:$dealerId
                ) {
             customerId
              service
                provider
                dealerId
                label
              
              }
            }
          
          
          
    `;
  
    const [
      getDailySummaryManualReports,
      {
        loading: getDailySummaryManualReportsQueryLoading,
        error: getDailySummaryManualReportsQueryError,
        data: getDailySummaryManualReportsQueryResult,
      },
    ] = useLazyQuery(getDailySummaryManualReportsdataquery, {
      fetchPolicy: "network-only",
    });
  
    useEffect(() => {
      if (getDailySummaryManualReportsQueryResult && getDailySummaryManualReportsQueryResult.getDailySummaryManualReports ) {
          let saledata = [];
          let dealerdata = [];
          getDailySummaryManualReportsQueryResult.getDailySummaryManualReports.map((current)=> saledata.push(`${current.service} ${current.label} - ${current.provider}`))
          getDailySummaryManualReportsQueryResult.getDailySummaryManualReports.map((current)=> dealerdata.push(`${current.dealerId} - ${current.provider}`))
  
            let saledatafinal = [];
            const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

        (saledata.map((curr)=> saledatafinal.push({reponame:curr, count:countOccurrences(saledata,curr)})))

        let uniquedata = [...new Set(saledatafinal.map((curr)=>curr.reponame))]
        let superfinalsalesdata = [];

        uniquedata.map((curre)=>superfinalsalesdata.push({reponame:curre,count:saledatafinal.find((curr)=>curr.reponame === curre).count}))
             if(superfinalsalesdata.length){
               setsalesreportmanual(superfinalsalesdata)
             }
 
          if(dealerdata.length){
            let dealerdatafinal = [];
            const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

        (dealerdata.map((curr)=> dealerdatafinal.push({reponame:curr, count:countOccurrences(dealerdata,curr)})))

        let uniquedata = [...new Set(dealerdatafinal.map((curr)=>curr.reponame))]
        let superfinaldealerdata = [];

        uniquedata.map((curre)=>superfinaldealerdata.push({reponame:curre,count:dealerdatafinal.find((curr)=>curr.reponame === curre).count}))
             if(superfinaldealerdata.length){
              setsalesreportmanual(superfinalsalesdata)
              setdealerIdreportmanual(superfinaldealerdata)
             }
          }
      
        
      }
      else{
        setsalesreportmanual([])
        setdealerIdreportmanual([])
      }
    }, [getDailySummaryManualReportsQueryResult]);

   
    const submitQuery = ()=>{

      setShowDatePicker(false);

      let providervariable = provider;
      let servicevariable = service;
      let dealerIdvariable = dealerId;
      let labelvariable = label;


    


      if(providervariable === undefined || providervariable === ''){
        providervariable = "null"
      }
      if(servicevariable === undefined || servicevariable === ''){
        servicevariable = "null"
      }
      if(dealerIdvariable === undefined || dealerIdvariable === ''){
        dealerIdvariable = "null"
      }
      if(labelvariable === undefined || labelvariable === ''){
        labelvariable = "null"
      }
  
      if(startdate && enddate ){
        if(activeUserData.paneltype === 'SUPERADMIN'){
          getDailySummaryManualReports({
            variables: {
              agentId:["null"],
              start:startdate,
              end:enddate,
              service:servicevariable,
              label:labelvariable,
              provider:providervariable,
              dealerId : dealerIdvariable
            }})
        }
        else if(activeUserData.paneltype === 'MANAGER' || activeUserData.paneltype === 'AGENT'){
          getDailySummaryManualReports({
            variables: {
              agentId:agentArray,
              start:startdate,
              end:enddate,
              service:servicevariable,
              label:labelvariable,
              provider:providervariable,
              dealerId : dealerIdvariable
            }})
        }
      
      }

  
  }
   


  useEffect(()=>{
  
    if(provider === 'Spectrum'){
      setActiveDealerDropdown([["HRaza", "HRaza"],
      ["FFatima", "FFatima"],
      ["SHaq", "SHaq"],
      ["BKhan", "BKhan"],
      ["DSalar", "DSalar"],
      ["UNY179", "UNY179"],
      ["UNY180", "UNY180"],
      ["SMaria", "SMaria"],
      ["JMundoz", "JMundoz"],])          
        
    }
   else if(provider === 'Optimum'){
  
  
    setActiveDealerDropdown([
        ["Optimum", "Optimum"],
        ["SuddenLink", "SuddenLink"],
        ["Altice", "Altice"]
      ])
  }
  else if(provider === 'Ziply' ||provider === 'Wow' || provider === 'Buckeye' || provider === 'Rise Broadband' ){
    
    setActiveDealerDropdown([
      ["WOW -Bundle Dealer", "WOW -Bundle Dealer"],
      ["TDS - Bundle Dealer", "TDS - Bundle Dealer"],
      ["BuckEye -Bundle Dealer", "BuckEye -Bundle Dealer"],
      ["Risebroad Band -Bundle Dealer", "Risebroad Band -Bundle Dealer"],
      ["Ziply- Bundle Dealer", "Ziply- Bundle Dealer"],
    ])
  }
  else if(provider === 'Cox'){
    
    setActiveDealerDropdown([
      ["Cox","Cox"]
    ])
  }
  else if(provider === 'Windstream'){
   
  
    setActiveDealerDropdown([
      ["TS888 - Windstream","TS888 - Windstream"]
    ])
  }
  else if(provider === 'Frontier'){
    
  
    setActiveDealerDropdown([
      ["247DigiKhan - Frontier","247DigiKhan - Frontier"]
    ])
  }
  else if(provider === 'Century Link'){
     
     setActiveDealerDropdown([
      ["Century Link","Century Link"]
    ])
  }
  else if(provider === 'T-Mobile'){
   
    setActiveDealerDropdown([
      ["T-Mobile","T-Mobile"]
    ])
  }
  else {
    
    
    setActiveDealerDropdown([]);
  }
  },[provider])

  const saledata = {
    labels: salesreport.map((curr)=>curr.reponame),
    datasets: [
      {
     
        id : 1,
        data: salesreport.map((curr)=>curr.count),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
       
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        
        ],
        borderWidth: 1,
      },
    ],
  };
 
  
  const dealerdata = {
    labels: dealerIdreport.map((curr)=>curr.reponame),
    datasets: [
      {
     
        id : 1,
        data: dealerIdreport.map((curr)=>curr.count),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
       
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        
        ],
        borderWidth: 1,
      },
    ],
  };
 
  const saledatamanual = {
    labels: salesreportmanual.map((curr)=>curr.reponame),
    datasets: [
      {
     
        id : 1,
        data: salesreportmanual.map((curr)=>curr.count),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
       
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        
        ],
        borderWidth: 1,
      },
    ],
  };
  
  const dealersIdreportmanual = {
    labels: dealerIdreportmanual.map((curr)=>curr.reponame),
    datasets: [
      {
     
        id : 1,
        data: dealerIdreportmanual.map((curr)=>curr.count),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
       
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        
        ],
        borderWidth: 1,
      },
    ],
  };
 
 
  const option = {
    plugins: {
      legend: {
        display: false,
       
      },
      tooltip: {
        titleFont: {
          size: 9
        },
        bodyFont: {
          size: 9
        },
        footerFont: {
          size: 9 // there is no footer by default
        }
      }
     
    }
  ,
    maintainAspectRatio: false,
    
  
   
  }
  const opendatepicker = () =>{
    setadate(new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }))
    setShowDatePicker(!showDatePicker)

  }
    return (
        <div>
            <AppBar className={classes.header_main} color="transparent" position="static">
            <Toolbar className={classes.header_content}>
                <Typography variant="h6">
                Daily Summary
                </Typography>
                <Typography variant="h6" >
                Total Sales:{dataforautoreport.length}
                </Typography>
            </Toolbar>
            </AppBar>
            <Container>
                <div className={classes.paper_main}>
            <Paper className={classes.paperStyle} elevation={3}>
              {
                !getLeadformsQueryLoading && salesreport.length? (
                  <>
<div className={classes.datadiv}>
                    <h4 className={classes.reporthead}>
                      Report List
                    </h4>
                  <ul className={classes.reportlist}>
                    {
                      salesreport.map((curr)=>(
                        <li className={classes.reportitem}>{curr.reponame}</li>
                      ))
                    }
                  </ul>
                </div>
                <div className={classes.chartdiv}>
                <Doughnut   datasetIdKey='id' style={{width:'180px',height:'180px'}}options={option} data={saledata} />;
                </div>
                  </>
                ): !getLeadformsQueryLoading && !salesreport.length ?<h3 style={{opacity:'0.7'}}>
                No data ...
              </h3>: <div class="loader"></div>
            
              }
                {/* Data block */}
                
                {/* chart block */}
            </Paper>
            <Paper className={classes.paperStyle} elevation={3}>
                {/* Data block */}
                {/* chart block */}
                {
                  !getLeadformsQueryLoading && dealerIdreport.length ? (
                    <>
                     <div className={classes.datadiv}>
                    <h4 className={classes.reporthead}>
                      Report List
                    </h4>
                  <ul className={classes.reportlist}>
                    {
                      dealerIdreport.map((curr)=>(
                        <li className={classes.reportitem}>{curr.reponame}</li>
                      ))
                    }
                  </ul>
                </div>
                <div className={classes.chartdiv}>
                <Doughnut datasetIdKey='id' style={{width:'180px',height:'180px'}}options={option} data={dealerdata} />;
                </div>
                    </>
                  ): !getLeadformsQueryLoading && !dealerIdreport.length ?<h3 style={{opacity:'0.7'}}>
                  No data ...
                </h3>: <div class="loader"></div>
                }
               
            </Paper>
                </div>
             <div className={classes.paper2_main}>
            <Paper className={classes.paper2Style} elevation={3}>
            <div className={classes.select_main}>
            <div>
            <FormControl className={classes.formControl}>
                <ValidationSelectField
                  validate={(validate) => {
                    
                    // serviceValidate = validate;
                  }}
          
                  value={label}
                  values={[
                    ["Sales Done wpp", "Sales Done wpp"],
                    ["Sales Done pp", "Sales Done pp"],
                   
                  ]}
              
                  onChange={(e) => {
                  
                    setLabel(e.target.value);
                  }}
                  label="Select Label"
                  notEmpty={true}
                />
              </FormControl>
            <FormControl className={classes.formControl}>
                <ValidationSelectField
                  validate={(validate) => {
                    
                    // serviceValidate = validate;
                  }}
                //   classes={{
                //     root: classes.selectFieldRoot,

                //   }}
                //   className={classes.textField}
                  value={service}
                  values={[
                    ["Single Play(Internet)", "Single Play(Internet)"],
                    ["Single Play(Cable)", "Single Play(Cable)"],
                    ["Single Play(T-mobile)", "Single Play(T-mobile)"],
                    ["Single Play(Spectrum Mobile)", "Single Play(Spectrum Mobile)"],
                    ["Double Play(Internet + Phone)", "Double Play(Internet + Phone)"],
                    ["Double Play(Cable + Internet)", "Double Play(Cable + Internet)"],
                    ["Double Play(Cable + Phone)", "Double Play(Cable + Phone)"],
                    ["Triple Play(Phone + Internet + Cable)", "Triple Play(Phone + Internet + Cable)"],
                    ["Quad Play(All)", "Quad Play(All)"],
                   
                  ]}
                //   disabled={isLoading}
                  onChange={(e) => {
                  
                    setService(e.target.value);
                  }}
                  label="Select Service"
                  notEmpty={true}
                />
              </FormControl>
              <FormControl className={classes.formControl}>
                <ValidationSelectField
                  validate={(validate) => {
                    // providerValidate = validate;
                  }}
                //   classes={{
                //     root: classes.selectFieldRoot,

                //   }}
                //   className={classes.textField}
                  value={provider}
                  values={[
                    ["Spectrum", "Spectrum"],
                    ["Optimum", "Optimum"],
                    ["Ziply", "Ziply"],
                    ["Wow", "Wow"],
                    ["DirecTV", "DirecTV"],
                    ["Cox", "Cox"],
                    ["Buckeye", "Buckeye"],
                    ["Windstream", "Windstream"],
                    ["Frontier", "Frontier"],
                    ["Rise Broadband", "Rise Broadband"],
                    ["Century Link", "Century Link"],
                    ["T-Mobile", "T-Mobile"],
                  ]}
                //   disabled={isLoading}
                  onChange={(e) => {
                  
                    setProvider(e.target.value);
                  }}
                  label="Select Provider"
                  notEmpty={true}
                />
              </FormControl>
              <FormControl className={classes.formControl}>
                <ValidationSelectField
                  validate={(validate) => {
                    // dealerIdValidate = validate;
                  }}
                //   classes={{
                //     root: classes.selectFieldRoot,

                //   }}
                //   className={classes.textField}
                  value={dealerId}
                  values={activeDealerDropdown}
                //   disabled={isLoading}
                  onChange={(e) => {
                  
                    setDealerId(e.target.value);
                  }}
                  label="Select Dealer Id"
                  notEmpty={true}
                />
              </FormControl>
              </div>
              <div>
          <Button onClick={()=>opendatepicker()} style={{height:'50px',marginRight:'10px',background:'transparent'}} variant="contained">Select Date</Button>
          {showDatePicker && 
                    <div style={{position:'absolute',left:'12%',top:'55%',boxShadow:'0px 0px 5px 1px rgba(0,0,0,0.3)',display:'flex',flexDirection:'column',background:'white',zIndex:'10'}}>
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
                    <button style={{width:'120px',marginLeft:'auto',padding:'10px',marginBottom:'20px',marginRight:'20px',border:0,background:'#446beb',color:'white'}} onClick={()=>submitQuery()}>Confirm</button>
                    </div>
                   } 
              </div>
            </div>
            <div style={{margin:'0 auto',height:'300px',display:'grid',gridTemplateColumns:'50% auto',gridGap:'0px' ,width:'99%',margin: '66px auto 0px 26px'}}>
            <Paper style={{width:'90%',height:'300px',display:'flex',alignItems:'center',padding:'10px',justifyContent:'center'}} elevation={1}>
                {/* Data block */}
                {
                  !getDailySummaryManualReportsQueryLoading && salesreportmanual.length ?
                  (
                    <>
                    
<div className={classes.datadiv}>
                    <h4 className={classes.reporthead}>
                      Report List
                    </h4>
                  <ul className={classes.reportlist}>
                    {
                      salesreportmanual.map((curr)=>(
                        <li className={classes.reportitem}>{curr.reponame}</li>
                      ))
                    }
                  </ul>
                </div>
                <div className={classes.chartdiv}>
                <Doughnut   datasetIdKey='id' style={{width:'180px',height:'180px'}}options={option} data={saledatamanual} />;
                </div>
                </>
                  ): !getDailySummaryManualReportsQueryLoading && !salesreportmanual.length ?<h3 style={{opacity:'0.7'}}>
                  No data ...
                </h3>: <div class="loader"></div>
                
                }
               
                
                {/* chart block */}
            </Paper>
            <Paper style={{width:'90%',height:'300px',display:'flex',alignItems:'center',padding:'10px',justifyContent:'center'}} elevation={1}>
                {/* Data block */}
                
               {
                 !getDailySummaryManualReportsQueryLoading && dealerIdreportmanual.length ? 
                 (<>
                  <div className={classes.datadiv}>
                    <h4 className={classes.reporthead}>
                      Report List
                    </h4>
                  <ul className={classes.reportlist}>
                    {
                      dealerIdreportmanual.map((curr)=>(
                        <li className={classes.reportitem}>{curr.reponame}</li>
                      ))
                    }
                  </ul>
                </div>
                <div className={classes.chartdiv}>
                <Doughnut   datasetIdKey='id' style={{width:'180px',height:'180px'}}options={option} data={dealersIdreportmanual} />;
                </div>
                 </>): !getDailySummaryManualReportsQueryLoading && !dealerIdreportmanual.length ?<h3 style={{opacity:'0.7'}}>
                  No data ...
                </h3>: <div class="loader"></div>
               }
               
               
                {/* chart block */}
            </Paper>
            </div>
            </Paper>
            
                </div>
            </Container>

          

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
    setManagersListData,
    setChatBoxFacebookIDsWithProfileDetails
   
  })(DailySummary);
