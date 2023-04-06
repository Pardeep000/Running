import React, { useEffect, useReducer, useState } from 'react';
import { constants } from '../../config/constant';
import Button from '../atoms/buttons/button';
import Add from '../icons/add';
import Close from '../icons/close';
import Profile from '../icons/profile';
import User from '../icons/user';
import MultiSelectList from '../modals/multiSelectList';
import SquareTag from '../tags/squareTag';
import { gql } from "apollo-boost";
import { useDispatch, useSelector } from 'react-redux';
import { setManagersListData } from '../../store/actions/ManagersListActions';
import { setAgentsListData } from '../../store/actions/AgentsListActions';
import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import { useHistory } from 'react-router-dom';
import useSnackBar from '../../hooks/useSnackBar';

const initialState = {
    error: {}
};

function reducer(state, action) {
    switch (action.type) {
        case "ON_ERROR":
            return { ...state, error: { ...action.payload } };
        default:
            return state;
    }
}

function CreateTeam(props) {
    const dispatch = useDispatch()
    const [state, dispatch_] = useReducer(reducer, initialState);
    const { success, error } = useSnackBar()
    const store = useSelector(store => store)
    const history = useHistory()
    const [isListOfAgentManagerOpen, setIsListOfAgentManagerOpen] = useState(false)
    const [openPanelCategory, setOpenPanelCategory] = useState('')
    const [teamName, setTeamName] = useState('')
    const [pagination, setPagination] = useState({
        page: 0,
        hasAgentNextPage: false,
        hasManagerNextPage: false,
        limit: 10
    })
    const [inviteList, setInviteList] = useState([])

    // get managers //
    const handleGetManagers = gql`
  query getManagers(
    $mainSuperAdminId:ID!
    $cursor:Int
    $limit:Int

  ) {
    getManagers(
      mainSuperAdminId: $mainSuperAdminId
      cursor:$cursor
      limit:$limit
    ) {
      users{
       id
        name
        username
        email
        status
        number
        agentlimitchatassign
        isUserLoggedIn
        pages
        number
        designation {
              id
             name
             paneltype
        }
      }
      hasNextPage
    }
    }`;

    let [
        getManagers,
        {
            loading: getManagersQueryLoading,
            error: getManagersQueryError,
            data: getManagersQueryResult,
        },
    ] = useLazyQuery(handleGetManagers, {
        fetchPolicy: "network-only",
    });
    // get managers //

    // get agents //
    const handleGetAgents = gql`
  query getAgents(
  $mainSuperAdminId:ID!
  $cursor:Int
  $limit:Int
  ) {
getAgents(
   mainSuperAdminId: $mainSuperAdminId
   cursor:$cursor
   limit:$limit
) {
  users{
    id
    name
    username
    email
    status
    number
    agentlimitchatassign
    isUserLoggedIn
    pages
    number
   designation {
          id
         name
         paneltype
    }
  }
  hasNextPage
}
}`;

    let [
        getAgents,
        {
            loading: getAgentsQueryLoading,
            error: getAgentsQueryError,
            data: getAgentsQueryResult,
        },
    ] = useLazyQuery(handleGetAgents, {
        fetchPolicy: "network-only",
    });
    // get agents //


    useEffect(() => {
        if (getAgentsQueryResult && getAgentsQueryResult.getAgents.users) {
            console.log("getAgentsQueryResult", getAgentsQueryResult.getAgents.users)
            fetchAgents(getAgentsQueryResult)
        }
    }, [getAgentsQueryResult])

    useEffect(() => {
        if (getManagersQueryResult && getManagersQueryResult.getManagers.users) {
            fetchManagers(getManagersQueryResult)
        }
    }, [getManagersQueryResult])

    const fetchAgents = (data) => {
        setPagination({ page: pagination.page + 1, limit: 10, hasAgentNextPage: data.getAgents.hasNextPage })
        dispatch(setAgentsListData(data.getAgents.users, pagination.page))
    }
    const fetchManagers = (data) => {
        setPagination({ page: pagination.page + 1, limit: 10, hasManagerNextPage: data.getManagers.hasNextPage })
        dispatch(setManagersListData(data.getManagers.users, pagination.page))
    }


    useEffect(() => {
        document.title = "Add/Edit Users";
        window.Object.freeze = function (obj) { return obj } //keep_an_eye
        if (localStorage.getItem("ActiveUserdetail")) {
            getManagers({
                variables: {
                    mainSuperAdminId: JSON.parse(localStorage.getItem("ActiveUserdetail")).mainSuperAdminId,
                    cursor: pagination.page == 0 ?
                        pagination.limit * pagination.page :
                        Number(store.ManagersListReducer.managersListData.at(-1).id),
                    limit: pagination.limit
                }
            });
            getAgents({
                variables: {
                    mainSuperAdminId: JSON.parse(localStorage.getItem("ActiveUserdetail")).mainSuperAdminId,
                    cursor: pagination.page == 0 ?
                        pagination.limit * pagination.page :
                        Number(store.AgentsListReducer.setAgentsListData.at(-1).id),
                    limit: 9
                }
            });
        }

    }, [localStorage.getItem("ActiveUserdetail")]);

    const loadMoreDataHandle = (i) => {
        let bottom =
            i.target.scrollHeight - i.target.clientHeight - i.target.scrollTop <= 1;
        if (bottom) {
            if (openPanelCategory === 'managerlist' && pagination.hasManagerNextPage) {
                getManagers({
                    variables: {
                        mainSuperAdminId: JSON.parse(localStorage.getItem("ActiveUserdetail")).mainSuperAdminId,
                        cursor: pagination.page == 0 ?
                            pagination.limit * pagination.page :
                            Number(store.ManagersListReducer.managersListData.at(-1).id),
                        limit: pagination.limit
                    }
                });
            }
            if (openPanelCategory === 'agentlist' && pagination.hasAgentNextPage) {
                getAgents({
                    variables: {
                        mainSuperAdminId: JSON.parse(localStorage.getItem("ActiveUserdetail")).mainSuperAdminId,
                        cursor: pagination.page == 0 ?
                            pagination.limit * pagination.page :
                            Number(store.AgentsListReducer.setAgentsListData.at(-1).id),
                        limit: pagination.limit
                    }
                });
            }
        }
    }

    const checkValidation = (data) => {
        const error = {};

        if (data.teamName.trim() == '') {
            error.teamName = "Team name required"
        }
        if (data.agentArr.length == 0) {
            error.listError = "Please add members"
        }
        if (data.managerId == null) {
            error.listError = "Please add members"
        }
        dispatch_({ type: "ON_ERROR", payload: error });

        return !Object.keys(error).length;
    }

    const handleSelectedUsers = (data) => {
        let tempData = [...inviteList];
        const arrForNewManagerAgentList = [...inviteList]
        if (tempData.length > 0) {
            for (let index = 0; index < data.length; index++) {
                const isExist = tempData.filter(item => item.id == data[index].id)
                // console.log()
                if (isExist.length == 0) {
                    arrForNewManagerAgentList.push(data[index])
                }
            }
            tempData = [...arrForNewManagerAgentList]
            setInviteList(tempData)
        } else {
            setInviteList([...data])
        }

    }

    const handleRemoveUser = (index) => {
        let tempData = [...inviteList];
        tempData.splice(index, 1)
        setInviteList(tempData)
    }

    // create team  //
    const handleCreateTeam = gql`
        mutation creamTeam(
        $managerId: ID!
        $agentArray:[ID!]
        $teamName:String!
        ) {
            createTeam(
            managerId:$managerId
            agentArray:$agentArray
            teamName:$teamName

        ) {
        success
        error
        }
    }`;

    let [
        creamTeam,
        {
            loading: CreateTeamMutationLoading,
            error: CreateTeamMutationError,
            data: CreateTeamMutationResult,
        },
    ] = useMutation(handleCreateTeam);
    // create team  //

    useEffect(() => {
        if (CreateTeamMutationResult && CreateTeamMutationResult.createTeam) {
            CreateTeamMutationResult.createTeam.success == 1 && props.onClose()
            success('Team created successfully')
        }
    }, [CreateTeamMutationResult])


    const handleCreateTeamSubmit = () => {
        const agentArr = [];
        let managerId = null;
        inviteList.forEach(element => {
            if (element.designation.paneltype == "AGENT") {
                agentArr.push(Number(element.id))
            }
            if (element.designation.paneltype == "MANAGER") {
                managerId = Number(element.id)
            }
        });
        const isValid = checkValidation({ teamName, agentArr, managerId })
        if (isValid) {
            creamTeam({
                variables: {
                    managerId: managerId,
                    agentArray: agentArr,
                    teamName: teamName
                }
            });
        }
    }

    useEffect(() => {
        if (CreateTeamMutationError && CreateTeamMutationError.errors) {
            error('Something went wrong')
        }
    }, [CreateTeamMutationError])

    return (
        <div className="card m-auto my-5 " style={{
            width: '560px'
        }}>
            <div className="card-body px-5">
                <div className='text-center'>
                    <input value={teamName} className='border-0 input-text text-center' onChange={(e) => setTeamName(e.target.value)} />
                </div>
                <div className='border-bottom w-50 m-auto my-2' />
                <p className='text-center m-0 font-xsmall' style={{ color: constants.theme.darkGray }}>Team Name</p>
                {state.error && <p className='m-0 px-2 font-xsmall text-danger'>{state.error.teamName}</p>}
                <div>
                    <p className='m-0 mx-2' style={{ color: constants.theme.darkGray }}>Members</p>
                    {state.error && state.error.listError && <p className='m-0 px-2 font-xsmall text-danger'>{state.error.listError}</p>}

                    <div className='border-bottom m-auto' />
                    <div className='my-4' style={{
                        maxHeight: '175px',
                        overflow: 'scroll',
                        overflowX: 'hidden'
                    }}>
                        {inviteList.map((item, index) => {
                            return (
                                <div className='d-flex my-2 align-self-center justify-content-between'>
                                    <div className='d-flex'>
                                        <div>
                                            <User color={[constants.theme.gray, 'black']} class="align-self-center" />
                                            <div
                                                className={`dot align-self-center  rounded-circle border `}
                                                style={{
                                                    backgroundColor: constants.theme.green,
                                                    position: 'relative',
                                                    margin: '-10px 15px'
                                                }}
                                            />
                                        </div>
                                        <p className='d-flex px-2 m-0 font-small  align-self-center'>{item.name}</p>
                                        <SquareTag text={item.designation.paneltype} styles={{
                                            backgroundColor: constants.theme.red
                                        }} />
                                    </div>
                                    <Close color={constants.theme.darkGray}
                                        onClick={() => handleRemoveUser(index)} />
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className='d-flex my-3'>
                    <div className='d-flex mx-1'>
                        <div className='cursor-pointer' onClick={() => {
                            setOpenPanelCategory('managerlist')
                            setIsListOfAgentManagerOpen(!isListOfAgentManagerOpen)
                        }}>
                            <Add isBorder={true} color={constants.theme.green} />
                        </div>
                        <p className='m-2 text-success font-xsmall '>Choose managers<span className='text-danger'>*</span></p>
                    </div>
                    <div className='d-flex mx-1'>
                        <div className='cursor-pointer' onClick={() => {
                            setOpenPanelCategory('agentlist')
                            setIsListOfAgentManagerOpen(!isListOfAgentManagerOpen)
                        }}>
                            <Add isBorder={true} color={constants.theme.green} />
                        </div>
                        <p className='m-2 text-success font-xsmall '>Choose agents<span className='text-danger'>*</span></p>
                    </div>
                </div>
                <div className='d-flex justify-content-end mt-3'>
                    <Button
                        onClick={props.onClose}
                        text="Cancel" isTransparent={true}
                        color={constants.theme.green}
                        class="py-1 px-4 mx-2" />
                    <Button
                        onClick={handleCreateTeamSubmit}
                        text="Save Changes"
                        isLoading={CreateTeamMutationLoading}
                        isDisabled={CreateTeamMutationLoading}
                        bgColor={constants.theme.green}
                        color="light"
                        class="py-1 px-4" />
                </div>
            </div>
            {isListOfAgentManagerOpen &&
                <MultiSelectList
                    handleSelectedUsers={handleSelectedUsers}
                    loadMoreDataHandle={loadMoreDataHandle}
                    openPanelCategory={openPanelCategory}
                    getManagersQueryLoading={getManagersQueryLoading}
                    getAgentsQueryLoading={getAgentsQueryLoading}
                    onClose={() => setIsListOfAgentManagerOpen(!isListOfAgentManagerOpen)} />}
        </div >
    );
}

export default React.memo(CreateTeam);