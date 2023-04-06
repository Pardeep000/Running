import React, { useEffect, useRef, useState } from "react";
import { CircularProgress, Container } from "@material-ui/core";
import { connect, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import {
  setAddEditUserModalToggle,
  setAddEditUserModalSelectedRowData,
} from "../../../store/actions/AddEditUserModalActions";
import {
  setAllUsersData
} from '../../../store/actions/AdmindataActions';
import { useSnackbar } from "notistack";
import PanelType from "../../../auth/PanelType";
import _ from "lodash";
import './style.css'

// user module imports 

import DeleteConfirmation from '../../modals/deleteConfirmation'
import SingleTable from "../../tables/singleTable";
import InviteAgents from "../../modals/inviteAgents";
import CreateTeam from "../../createTeam";
import Button from "../../atoms/buttons/button";
import AddUser from "../../icons/addUser";
import Link from "../../icons/link";
import Team from "../../icons/team";
import { constants } from "../../../config/constant";
import EditProfileSideBar from "../../modals/editProfileSideBar";
import Edit from "../../icons/edit";
import User from "../../icons/user";
import SquareTag from "../../tags/squareTag";
import Back from "../../icons/back";
import { setUsersListDatas } from "../../../store/actions/UsersListActions";
import useSnackBar from "../../../hooks/useSnackBar";
import { useSelector } from "react-redux";
//
import Header from "../../tables/LeftPanelHeader/LeftPanelHeader";
import RightPanel from '../../tables/RightPanel/RightPanel'

// user module imports 

const useStyles = makeStyles((theme) => ({
  circularProgress: {
    width: 54,
    height: 54,
    margin: "20px auto",
    display: "block",

  },
}));

const AddUsers = (props) => {
  const myRef = useRef()
  const dispatch = useDispatch()
  const store = useSelector(store => store)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [selectedScreen, setSelectedScreen] = useState('userstable')
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isEditProfilePanelOpen, setIsEditProfilePanelOpen] = useState(false)
  const [hoverItem, setHoverItem] = useState('0');
  const [userSelected, setUserSelected] = useState(false)
  const [selectedUserData, setSelectedUserData] = useState({})
  const [deletingUserData, setDeletingUserData] = useState({})
  const { success, error } = useSnackBar()
  const [pagination, setPagination] = useState({
    page: 0,
    hasNextPage: false,
    limit: 10
  })
  const classes = useStyles();
  const [userdata, setUserData] = React.useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const GetUsers = gql`
  query getUsers(
$accessToken: String
$cursor:Int
$limit:Int
) {
    getUsers(
       accessToken:$accessToken
       cursor:$cursor
       limit:$limit
    ) {
      users{
        id
        picture
        pseudonym
        name
        jobTitle
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
      hasNextPage
    }
  }
`;

  let [
    getUsers,
    {
      loading: getUsersQueryLoading,
      error: getUsersQueryError,
      data: getUsersQueryResult,
    },
  ] = useLazyQuery(GetUsers, {
    fetchPolicy: "network-only",
  });

  const loadingComponent = (
    <div className={classes.circularProgress}>
      <CircularProgress size={24} />
    </div>
  );
  const gridColumns = [
    {
      title: "",
      field: "picture",
      render: (rowData) => (
        <img
          src={rowData.picture}
          style={{
            width: 50,
            height: 50,
            marginTop: 3,
            marginBottom: 5,
            borderRadius: "50%",
          }}
        />
      ),
      export: false,
    },
    { title: "Name", field: "name" },
    { title: "Pseudonym", field: "pseudonym" },
    { title: "Username", field: "username" },
    { title: "Email", field: "email" },
    { title: "Mobile Number", field: "number" },
    { title: "Designation", field: "designation.name" },
    { title: "Manager", field: "managerId.name" },
    { title: "Status", field: "status" },
    { title: "comments", field: "comments" },
  ];
  const isEditableDeleteable = (rowData) => {
    return (
      props.authUserId == rowData.id ||
      !(
        props.authPanelType == PanelType.SUPERADMIN ||
        (props.authPanelType != PanelType.SUPERADMIN &&
          rowData.designation.paneltype != PanelType.SUPERADMIN)
      )
    );
  };
  const mainContainerRef = useRef(null);

  // user module code
  const userApiCallingHandle = async () => {
    getUsers({
      variables: {
        mainSuperAdminId: JSON.parse(localStorage.getItem("ActiveUserdetail")).mainSuperAdminId,
        cursor: pagination.page == 0 ?
          pagination.limit * pagination.page :
          Number(store.UsersListReducer.usersListDatas.at(-1).id),
        limit: pagination.limit
      }
    });
  }

  useEffect(() => {
    document.title = "Add/Edit Users";
    window.Object.freeze = function (obj) { return obj } //keep_an_eye
    if (localStorage.getItem("ActiveUserdetail")) {
      userApiCallingHandle()
    }

  }, [localStorage.getItem("ActiveUserdetail")]);

  const fetchUsers = (data) => {
    props.setAllUsersData(data.users)
    dispatch(setUsersListDatas(data.getUsers.users, pagination.page))
    setPagination({ page: pagination.page + 1, limit: 10, hasNextPage: data.getUsers.hasNextPage })
  }


  useEffect(() => {
    if (getUsersQueryResult && getUsersQueryResult.getUsers.users) {
      fetchUsers(getUsersQueryResult, 'new')
    }
  }, [getUsersQueryResult])

  const handleOpenUserEditProfile = (id, flag) => {
    setIsEditProfilePanelOpen(flag)
  }

  const loadMoreDataHandle = (i) => {
    //
    console.log("scrolling...")
    //
    let bottom =
      i.target.scrollHeight - i.target.clientHeight - i.target.scrollTop < 1;
    if (bottom && pagination.hasNextPage) {
      userApiCallingHandle()
    }
  }

  const handleIsUserRowSelected = (item) => {
    setSelectedUserData(item)
    setUserSelected(true)
  }

  // delete user //
  const DeleteUserMutation = gql`
    mutation DeleteUser($id: ID!) {
        deleteuser(id: $id) {
          success
          error
        }
      } `;
  const [
    deleteUser,
    {
      loading: deleteMutationLoading,
      error: deleteMutationError,
      data: deleteMutationResult,
    },
  ] = useMutation(DeleteUserMutation);
  // delete user //

  useEffect(() => {
    if (deleteMutationError && deleteMutationError.errors) {
      error('Something went wrong')
      setIsDeleteModalOpen(false)
      setIsAddModalOpen(false)
    }
  }, [deleteMutationError])

  useEffect(() => {
    if (deleteMutationResult && deleteMutationResult.deleteuser) {
      success('Record delete successfully')
      setIsDeleteModalOpen(false)
      setIsAddModalOpen(false)
    }
  }, [deleteMutationResult])

  const handleSelectedDataForDelete = (data) => {
    setDeletingUserData(data)
    setIsDeleteModalOpen(!isDeleteModalOpen)
  }

  const handleDeleteUser = async () => {
    await deleteUser({
      variables: {
        id: deletingUserData.id,
      },
    });
    setPagination({ page: 0, hasNextPage: false, limit: 10 })
    setSelectedUserData({})
    setIsAddModalOpen(false)
    setIsEditProfilePanelOpen(false)
    await userApiCallingHandle()
  }

  const handleOnProfileUpdate = () => {
    dispatch(setUsersListDatas([], 0))
    // setPagination({ page: pagination.page + 1, limit: 10, hasNextPage: data.getUsers.hasNextPage })
    getUsers({
      variables: {
        mainSuperAdminId: JSON.parse(localStorage.getItem("ActiveUserdetail")).mainSuperAdminId,
        cursor: 0,
        limit: 10
      }
    });
  }


  useEffect(() => {
    console.log("selectedScreen got changed: ", selectedScreen)
  }, [selectedScreen])

  const [userIndex, setUserIndex] = React.useState(null);
  useEffect(() => {
    console.log("user selected: ", userIndex)
  }, [userIndex])


  return (
    <>
      <div onClick={() => {
        myRef.current && myRef.current.handleCloseActionModal()
        setIsAddModalOpen(false)
        //
        { console.log("clicked on the isAddModal Open button") }
      }} className="d-flex"  >
        {/* <div className={`${selectedScreen === 'userstable' && userSelected ? 'w-75' : 'w-100'}`}> */}
        <div style={{ width: "100%" }}>
          <div>
            {selectedScreen === 'createteam' && <CreateTeamBox setSelectedScreen={setSelectedScreen} />}
          </div>
          <div className="d-flex justify-content-between my-4 mx-5">
            {isEditProfilePanelOpen &&
              <EditProfileSideBar
                selectedUserData={selectedUserData}
                handleOnProfileUpdate={handleOnProfileUpdate}
                onClose={() => {
                  setUserSelected(false)
                  setSelectedUserData({})
                  setIsEditProfilePanelOpen(!isEditProfilePanelOpen)
                }}
              />
            }

            {/* header of userspage */}
            {/* <h4 className="m-0 align-self-center">{selectedScreen === 'userstable' || selectedScreen === '' ? 'Users' : ''}</h4> */}
            <h4 className="m-0 align-self-center">{selectedScreen === 'userstable' || selectedScreen === '' ? 'Users' : ''}</h4>
            <div>
              <Button iconColor="white"
                isIcon={true}
                onClick={(event) => {
                  event.stopPropagation()
                  setIsAddModalOpen(!isAddModalOpen)
                }}
                text="Add" isTransparent={false} class="px-4 py-1" color="white" />

              {isAddModalOpen && <AddButtonModal hoverItem={hoverItem} setHoverItem={setHoverItem} setSelectedScreen={setSelectedScreen} setIsAddModalOpen={setIsAddModalOpen} isAddModalOpen={isAddModalOpen} />}
            </div>
          </div>
          {/* <Alerts /> */}
          {isDeleteModalOpen && < DeleteConfirmation
            isLoading={deleteMutationLoading}
            handleDeleteUser={handleDeleteUser}
            onClose={() => {
              setIsAddModalOpen(false)
              setIsDeleteModalOpen(!isDeleteModalOpen)
            }} />}


          {selectedScreen == 'inviteagent' && <InviteAgents onClose={() => setSelectedScreen('userstable')} />}
          {selectedScreen == 'createteam' && < CreateTeam onClose={() => setSelectedScreen('userstable')} />}
          {/* userstable */}
          {selectedScreen == 'userstable' &&
            <div onScroll={loadMoreDataHandle} style={{
              // maxHeight: '450px',
              // overflow: 'scroll',
              // overflowX: 'hidden'
              backgroundColor: "#FFFFFF",
              marginTop: "42px",
              borderRadius: "10px",
              height: "calc(100vh - 120px)",
            }}>
              <Header />
              <SingleTable
                setUserIndex={setUserIndex}
                loadMoreDataHandle={loadMoreDataHandle}
                ref={myRef}
                //used for turning add dropdown off and is used in every single 'td' of the table
                setIsAddModalOpen={() => setIsAddModalOpen(false)}
                isLoading={getUsersQueryLoading}
                handleSelectedDataForDelete={handleSelectedDataForDelete}
                handleOpenEditPanel={() => setIsEditProfilePanelOpen(!isEditProfilePanelOpen)}
                handleIsUserRowSelected={handleIsUserRowSelected}
                handleOpenUserEditProfile={handleOpenUserEditProfile}
                data={store.UsersListReducer.usersListDatas}
                actinsItems={
                  [{ title: 'Edit', method: () => { } },
                  { title: 'Suspended', method: () => { } },
                  { title: 'Delete', method: () => { setIsDeleteModalOpen(!isDeleteModalOpen) } },
                  ]
                }
                // headers={[{ title: 'Name' },
                // { title: 'Email' },
                // { title: 'Designation' },
                // { title: 'Status' },
                // { title: '' }]}
                headers={[{ title: 'Name' },
                { title: 'Role' },
                { title: 'Status' },
                { title: 'Employed' },
                { title: '' }]}
              />
            </div>
          }
        </div>
        {selectedScreen === 'userstable' &&
          // userSelected && <RightDetailPanel setIsAddModalOpen={setIsAddModalOpen} setIsEditProfilePanelOpen={setIsEditProfilePanelOpen} isEditProfilePanelOpen={isEditProfilePanelOpen} selectedUserData={selectedUserData} />}
          userSelected && <RightPanel setRightPanelOpened={setUserSelected} data={store.UsersListReducer.usersListDatas[userIndex]} selectedUserData={selectedUserData} handleOnProfileUpdate={handleOnProfileUpdate} onClose={() => { setUserSelected(false); setSelectedUserData({}); setIsEditProfilePanelOpen(!isEditProfilePanelOpen)}} />}
      </div >
    </>
  );
};
const mapStateToProps = (state) => {
  return { ...state.AuthReducer, ...state.AdminDataReducer };
};
export default connect(mapStateToProps, {
  setAddEditUserModalToggle,
  setAddEditUserModalSelectedRowData,
  setAllUsersData,
  setUsersListDatas
})(AddUsers);


const AddButtonModal = (props) => {
  return <div className="border p-2 rounded bg-white zIndex-10000" style={{
    position: 'absolute',
    width: '200px',
    margin: ' 0px 0px 0px -123px',
    boxShadow: ' 5px 5px 9px -6px grey',
  }}>
    <div onMouseEnter={() => props.setHoverItem('1')}
      onClick={() => {
        props.setSelectedScreen('inviteagent')
        props.setIsAddModalOpen(!props.isAddModalOpen)
      }}
      style={{ backgroundColor: props.hoverItem === '1' ? constants.theme.hoverGray : '' }}
      className="d-flex align-self-center cursor-pointer my-1 p-2 rounded">
      <AddUser height={15} width={20} color={props.hoverItem === '1' ? constants.theme.green : constants.theme.gray} />
      <p className="m-0 px-1 font-medium"
        style={{ color: props.hoverItem === '1' ? constants.theme.green : constants.theme.gray }}>Invite Agent(s)</p>
    </div>
    <div onMouseEnter={() => props.setHoverItem('2')}
      onClick={() => {
        props.setSelectedScreen('inviteagent')
        props.setIsAddModalOpen(!props.isAddModalOpen)
      }}
      style={{ backgroundColor: props.hoverItem === '2' ? constants.theme.hoverGray : '' }}
      className="d-flex align-self-center cursor-pointer my-1 p-2 rounded">
      <Link class="align-self-center" color={props.hoverItem === '2' ? constants.theme.green : constants.theme.gray} />
      <p className="m-0 px-1 font-medium"
        style={{ color: props.hoverItem === '2' ? constants.theme.green : constants.theme.gray }} >Share Invite Link(s)</p>
    </div>
    <div onMouseEnter={() => props.setHoverItem('3')}
      onClick={() => {
        props.setSelectedScreen('createteam')
        props.setIsAddModalOpen(!props.isAddModalOpen)
      }}
      style={{ backgroundColor: props.hoverItem === '3' ? constants.theme.hoverGray : '' }}
      className="d-flex align-self-center cursor-pointer my-1 p-2 rounded">
      <Team color={props.hoverItem === '3' ? constants.theme.green : constants.theme.gray} />
      <p className="m-0 px-1 font-medium"
        style={{ color: props.hoverItem === '3' ? constants.theme.green : constants.theme.gray }}>Create Team</p>
    </div>
  </div>
}




const CreateTeamBox = (props) => {
  return <div className="d-flex border p-3 align-self-center">
    <div className="d-flex align-self-center cursor-pointer" onClick={() => props.setSelectedScreen('userstable')}>
      <Back height={12} width={12} class="align-self-cente" color={constants.theme.gray} />
      <p className="m-0 px-2 align-self-center font-small" style={{ color: constants.theme.gray }}>Back</p>
    </div>
    <div className="d-flex m-auto">
      <h5 className="m-0 px-2 align-self-center" style={{ color: constants.theme.gray }}>Create Team</h5>
    </div>
  </div>
}



const RightDetailPanel = (props) => {
  return <div className="edit-profile h-100 border-start  p-3 w-25">
    {/* header */}
    <div className='d-flex justify-content-between p-2'>
      <h5 className=" font-weight-bold font-large" style={{ color: constants.theme.darkGray }}>Details</h5>
      <div className="cursor-pointer" onClick={() => {
        props.setIsAddModalOpen(false)
        props.setIsEditProfilePanelOpen(!props.isEditProfilePanelOpen)
      }}>
        <Edit color={constants.theme.gray} />
      </div>
    </div>
    {/* body */}
    <div className="p-2 border rounded shadow-sm d-flex">
      <div className="mx-2">
        {
          props.selectedUserData.picture ? <img style={{ borderRadius: '50%', width: '50px', height: '50px' }} src={props.selectedUserData.picture} /> :
            <User height={45} width={45} color={[constants.theme.gray, 'black']} />

        }
      </div>
      <div className="mx-2 ">
        <div className="d-flex">
          <h5 className="m-0 font-medium">{props.selectedUserData.name}</h5>
          <div className="mx-2 ">
            <SquareTag text={props.selectedUserData.designation.paneltype} styles={{
              backgroundColor: constants.theme.red
            }} />
          </div>
        </div>
        <p className="m-0 font-xssmall" style={{ color: constants.theme.gray }}>{props.selectedUserData.name}</p>
        <p className="m-0 font-xssmall" style={{ color: constants.theme.gray }}>{props.selectedUserData.email}</p>
      </div>

    </div>
  </div>
}
