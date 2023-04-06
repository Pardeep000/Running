import React, { useEffect, useState } from 'react'
import { useMutation, useLazyQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from 'react-router-dom'

import Button from '@material-ui/core/Button';
import { setRedirectToPath } from "../../store/actions/RedirectToPathActions";
import FormControl from '@material-ui/core/FormControl';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { Modal, Form } from 'react-bootstrap'
import userLogo from '../../assets/img/user.svg';
import {
  setAllUsersData
} from '../../store/actions/AdmindataActions';
import {

  setUsersListData,
  setUsersListSubscriptionData,

} from "../../store/actions/UsersListActions";
import _ from "lodash";
import { useSnackbar } from "notistack";
const useStyles = makeStyles((theme) => ({
  header_main: {
    borderBottom: '1px solid lightgrey',
    boxShadow: '0px 0px 12.3px 1.1px rgba(0,0,0,0.1)'
  },
  header_content: {
    width: '92%',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  agentDataContainer: {
    display: 'flex',
    cursor: 'pointer',
    position: 'relative',
    alignItems: 'center',
    padding: '10px 5px',
    '&:hover': {
      background: '#fafafa',
    }
  },
  agentDataInner: {
    position: 'absolute',
    width: '10px',
    height: '10px',
    top: '12px',
    left: '30px',
    borderRadius: '50%',
    background: 'red',
    zIndex: '100'
  },
  agentDataImageContainer: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'lightgrey'
  },
  focusRemove: {
    boxShadow: 'none !important',

  },

}));
function ChatTransfer(props) {

  const { cid, pid } = props;

  const [agentsData, setAgentsData] = useState([]);
  const [agentsList, setAgentsList] = useState(agentsData);

  const [transferDisabled, setTransferDisabled] = useState(true);
  const [activeId, setActiveId] = useState(null);
  const [tabValue, setTabValue] = useState(1);
  const [managerId, setManagerId] = useState(JSON.parse(localStorage.getItem("ActiveUserdetail")).managerId);
  const [managerData, setManagerData] = useState([])
  const [managersList, setManagersList] = useState(managerData);
  const [searchValue, setSearchValue] = useState("")
  const TransferChatHandler = (edata) => {

    if (cid && pid && edata) {
      chatTransfer({
        variables: {
          customerId: cid,
          pageId: pid,
          agentId: edata,
          loginAgentName: JSON.parse(localStorage.getItem("ActiveUserdetail")).name,
          transferAgentName: agentsData.find(curr => curr.id == edata).name
        }
      });
      props.setModalShow(false)
      props.closeChatWindowHandler(cid);
    }

  }
  useEffect(() => {
    getSubscriptionDataall();
    setTransferDisabled(true)
    setActiveId(null)
    getManagers({
      variables: {
        managersOnly: true,
        mainSuperAdminId: JSON.parse(localStorage.getItem("ActiveUserdetail")).mainSuperAdminId
      },
    });
  }, [props.modalShow])



  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const GetSubscriptionDataQuery = gql`
  query GetSubscriptionDataall {
    getsubscriptiondataall {
      id
      data
        }
  }
`;

  let [
    getSubscriptionDataall,
    {

      data: getSubscriptionDataQueryResult,
    },
  ] = useLazyQuery(GetSubscriptionDataQuery, {
    fetchPolicy: "network-only",
  });
  useEffect(() => {

    if (
      getSubscriptionDataQueryResult &&
      getSubscriptionDataQueryResult.getsubscriptiondataall
    ) {

      props.setUsersListSubscriptionData(
        JSON.parse(getSubscriptionDataQueryResult.getsubscriptiondataall.data)
      );
    }

  }, [getSubscriptionDataQueryResult]);




  const GetUsers = gql`
  query getChatTransferAgents(
$accessToken: String
) {
  getChatTransferAgents(
       accessToken:$accessToken
    ) {
      users{
        id
        picture
        pseudonym
        name
        username
        email
        status
        managerId {
          id
        }
        agentlimitchatassign
        designation  {
          id
          name
          paneltype
        }
        number
        pages
        
      }
    }
  }
`;

  let [
    getChatTransferAgents,
    {
      loading: getUsersQueryLoading,
      error: getUsersQueryError,
      data: getUsersQueryResult,
    },
  ] = useLazyQuery(GetUsers, {
    fetchPolicy: "network-only",
  });

  useEffect(() => {

    getChatTransferAgents();

  }, [props.modalShow, managerId]);

  useEffect(() => {
    if (getUsersQueryResult && getUsersQueryResult.getChatTransferAgents) {
      let AgentsArraywithoutCurrentActiveAgent = getUsersQueryResult && getUsersQueryResult.getChatTransferAgents.users.filter((curr) => curr.id != JSON.parse(localStorage.getItem("ActiveUserdetail")).id);
      let usersListData = [];

      AgentsArraywithoutCurrentActiveAgent.map((user) => {
        const findCurrentSubUserData = _.find(
          props.usersListSubscriptionData,
          (dataSub) => dataSub.agentId == user.id);

        usersListData.push({
          id: user.id,
          name: user.username,
          picture: user.picture,
          isOnline: findCurrentSubUserData
            ? findCurrentSubUserData.isOnline
            : false,
          chatsAssignedCount: findCurrentSubUserData
            ? findCurrentSubUserData.chats.length
            : 0,
        });
      });
      usersListData = _.orderBy(usersListData, (itm) => itm.isOnline, ['desc']);

      setAgentsData(usersListData)
      setAgentsList(usersListData)

      if (searchValue) {
        if (tabValue == 1) {
          let newArray = usersListData.length && usersListData.filter((curr) => curr.name.toLowerCase().includes(searchValue));
          if (newArray && newArray.length) {
            setAgentsList(newArray);
          }
          else {
            setAgentsList([]);
          }
        }

      }



    }
  }, [getUsersQueryResult, props.usersListSubscriptionData])
  const ManagersQuery = gql`
      query Managers(
        $managersOnly: Boolean = true
        $mainSuperAdminId:ID!
        )
        
        {
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
      setManagerData(managersQueryResult.users);
      setManagersList(managersQueryResult.users)
    }
  }, [managersQueryResult]);

  const chatTransferMutation = gql`
      mutation chatTransfer(
            $customerId:String
            $pageId:String
            $agentId:ID!
            $loginAgentName:String
            $transferAgentName:String
      ) {
        chatTransfer(
            customerId:$customerId
            pageId:$pageId
            agentId:$agentId
            loginAgentName:$loginAgentName
            transferAgentName:$transferAgentName
        ) {
          success
          error
        }
      }
    `;
  const [
    chatTransfer,
    {
      loading: chatTransferMutationLoading,
      error: chatTransferMutationError,
      data: chatTransferMutationResult,
    },
  ] = useMutation(chatTransferMutation);

  useEffect(() => {
    if (chatTransferMutationError) {
      chatTransferMutationError.graphQLErrors.map(({ message }, i) => {
        enqueueSnackbar(message, { variant: "error" });
      });
    }
  }, [chatTransferMutationError]);

  useEffect(() => {
    if (chatTransferMutationResult) {

      if (chatTransferMutationResult.chatTransfer.success == 200) {
        props.setModalShow(false);
      }
    }
  }, [chatTransferMutationResult]);
  const onAgentSelectHandler = (id) => {
    if (id == activeId) {
      setActiveId(null);
      setTransferDisabled(true);
    }
    else {
      setActiveId(id)
      setTransferDisabled(false);
    };

  }
  let AgentDataView = (props) => {
    return (
      <div id={`agent-${props.id}`} onClick={() => onAgentSelectHandler(props.id)} className={`${classes.agentDataContainer}`} style={activeId == props.id ? { borderLeft: '5px solid green', background: '#fafafa' } : null}  >
        <div className={classes.agentDataInner} style={props.online ? { background: 'green' } : { background: 'red' }} ></div>

        <div className={`${classes.agentDataImageContainer} `}>
          <img src={userLogo} style={{ width: '50%', height: '50%' }} />
        </div>
        <div style={{ marginLeft: '8px' }}>
          <h4 style={{ marginBottom: '0', fontSize: '16px' }}>{props.name}</h4>
          <p style={{ marginBottom: '0', fontSize: '14px', color: 'grey' }}>{`${props.chatsAssignedCount} active chats`}</p>
        </div>
      </div>
    )
  }
  const onManagertHandler = (id) => {

    setManagerId(id);
    setTabValue(1);

  }
  let ManagerDataView = (props) => {

    return (
      <div onClick={() => onManagertHandler(props.id)} className={`${classes.agentDataContainer}`} style={activeId == props.id ? { borderLeft: '5px solid green', background: '#fafafa' } : null}  >

        <div className={`${classes.agentDataImageContainer} `}>
          <img src={userLogo} style={{ width: '50%', height: '50%' }} />
        </div>
        <div style={{ marginLeft: '8px' }}>
          <h4 style={{ marginBottom: '0', fontSize: '16px' }}>{props.name}</h4>

        </div>
      </div>
    )
  }
  const onTabClickHandler = (id) => {
    setTabValue(id)
  }
  const onSearchUsernameHandler = (e) => {
    const value = e.target.value;

    setSearchValue(value);
    if (tabValue == 1) {
      let newArray = agentsData.length && agentsData.filter((curr) => curr.name.toLowerCase().includes(value));
      if (newArray && newArray.length) {
        setAgentsList(newArray);
      }
      else {
        setAgentsList([]);
      }
    }
    else if (tabValue == 2) {
      let newArray = managerData && managerData.filter((curr) => curr.name.toLowerCase().includes(value))

      if (newArray && newArray.length) {

        setManagersList(newArray)
      }
      else {
        setManagersList([]);
      }

    }
  }
  return (
    //   <MyVerticallyCenteredModal
    //   show={props.modalShow}
    //   onHide={() => props.setModalShow(false)}
    // />
    <Modal
      show={props.modalShow}
      onHide={() => props.setModalShow(false)}
      //  size="lg"
      // style={{width:'00px',margin:'0 auto'}}
      animation={false}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header style={{ padding: '10px 20px 10px 10px', }} closeButton>
        <Modal.Title style={{ fontSize: '20px' }} id="contained-modal-title-vcenter">
          Transfer chat to...
        </Modal.Title>
      </Modal.Header>
      <Modal.Body >
        <div style={{ display: 'grid', gridTemplateColumns: '45% 55%', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Agents(count) */}
          <div style={{ display: 'flex' }}>
            <p onClick={() => onTabClickHandler(1)} style={{ fontSize: '14px', cursor: 'pointer', padding: '0 5px 5px 5px', width: 'fit-content', borderBottom: tabValue == 1 ? '4px solid green' : null, marginBottom: '0', marginRight: '10px', color: tabValue == 1 ? 'green' : null, }}>
              {`Agent(${agentsList ? agentsList.length : null})`}
            </p>
            {/* <p onClick={()=>onTabClickHandler(2)} style={{fontSize:'14px',cursor:'pointer',padding:'0 5px 5px 5px',width:'fit-content',marginBottom:'0',borderBottom: tabValue == 2?'4px solid green':null,color: tabValue == 2?'green':null,}}>
                        {`Select Team(${managersList?managersList.length : 0})`}
                    </p> */}
          </div>
          <form>
            <Form.Group className={classes.focusRemove} controlId="exampleForm.ControlInput1">

              <Form.Control className={classes.focusRemove} type="text" onChange={(e) => onSearchUsernameHandler(e)} placeholder="Search" name="search" value={searchValue} />
            </Form.Group>
          </form>

        </div>
        <div style={{ height: '310px', overflowY: 'auto', marginTop: '10px' }}>


          {
            tabValue == 1 ? (
              <>
                <p>Agents available:</p>
                {
                  agentsList ? agentsList.map((row) => (
                    <AgentDataView
                      online={row.isOnline}
                      chatsAssignedCount={row.chatsAssignedCount}
                      id={row.id}
                      name={row.name}
                    />

                  )) : <p style={{ color: 'grey', opacity: '0.9' }}>No agent</p>
                }
              </>
            ) : (
              <>
                <p>Managers available:</p>
                {
                  managersList ? managersList.map((row) => (
                    <ManagerDataView
                      name={row.name}
                      id={row.id}
                      picture={row.picture}
                    />
                  )) : <p style={{ color: 'grey', opacity: '0.9' }}>No Manager</p>
                }

              </>
            )

          }





        </div>
      </Modal.Body>
      <Modal.Footer style={{ padding: '10px', }}>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ marginBottom: '0', color: 'blue' }}></p>
            {/* lock icon */}
          </div>
          <div>
            <Button variant="contained" color="primary" disabled={transferDisabled} style={{ textTransform: 'capitalize', color: 'white' }} onClick={() => TransferChatHandler(activeId)}>Transfer</Button>
          </div>
        </div>
        {/* <Button onClick={props.onHide}>Close</Button> */}
      </Modal.Footer>
    </Modal>

    // <div>
    //      <AppBar className={classes.header_main} color="transparent" position="static">
    //         <Toolbar className={classes.header_content}>
    //             <Typography variant="h6">
    //                 Select Agent to transfer
    //             </Typography>
    //         </Toolbar>
    //         </AppBar>

    //     <div style={{height:'90vh',width:'800px'}}>
    //     <DataGrid
    //     rows={rows}
    //     columns={columns}
    //     disableSelectionOnClick
    //   />
    //     </div>

    // </div>
  )
}

const mapStateToProps = (state) => {
  return { ...state.AuthReducer, ...state.AdminDataReducer, ...state.LoginForgetPasswordReducer, ...state.UsersListReducer, };
};
export default connect(mapStateToProps, {
  setAllUsersData,
  setRedirectToPath,
  setUsersListSubscriptionData
})(ChatTransfer);