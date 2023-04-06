import React, { useEffect, useReducer, useRef, useState } from 'react';
import { constants } from '../../config/constant';
import Button from '../atoms/buttons/button';
import Add from '../icons/add';
import Back from '../icons/back';
import Close from '../icons/close';
import SingleInput from '../input/singleInput';
import expressConfig from "../../config/express.json";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import useSnackBar from '../../hooks/useSnackBar';
import { invalid } from 'moment';
import Dropdown from 'react-bootstrap/Dropdown';
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


function InviteAgents(props) {
    const [state, dispatch_] = useReducer(reducer, initialState);
    const { success, error } = useSnackBar()
    const [designation,setDesignation] = useState("4")
    const emailRegex = /^[a-z0-9][a-z0-9-_\.]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/
    const env = process.env.NODE_ENV || "development";
    const config = expressConfig[env];
    const role = ['Admin', 'Manager', 'Agent']
    const [isCopied, setIsCopied] = useState(false)
    const ref = useRef(null);
    const [inviteEmail, setInviteEmail] = useState([
        { id: 1, email: '', role: '', designation: '' },
        { id: 2, email: '', role: '', designation: '' },
        { id: 3, email: '', role: '', designation: '' },
    ])

    const mainSuperAdminId = JSON.parse(localStorage.getItem("ActiveUserdetail")).mainSuperAdminId;

    const handleAddNewInviteEmail = () => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
        const tempData = [...inviteEmail];
        tempData.push({ id: tempData.length + 1, email: '', isChecked: false })
        setInviteEmail([...tempData])
    }

    const handleCopyInviteLink = () => {
        const inviteLink = document.getElementById("invite-link")
        window.navigator.clipboard.writeText(inviteLink.value)
        setIsCopied(true)
    }

    const handleCheckInviteEmail = (data, index, flag) => {
        const tempData = [...inviteEmail];
        tempData[index].role = flag
        tempData[index].designation = Number(constants.role[flag])
        setInviteEmail([...tempData])
    }

    // invite agents //
    const handleInviteAgents = gql`
    mutation inviteAgent(
        $argsArray: [invite_agents_data!]
        $superAdminId:ID!
        ) {
            inviteAgent(
            argsArray:$argsArray
            superAdminId:$superAdminId
        ) {
        success
        error
        }
    }`;

    let [
        inviteAgent,
        {
            loading: inviteAgentsQueryLoading,
            error: inviteAgentsQueryError,
            data: inviteAgentsQueryResult,
        },
    ] = useMutation(handleInviteAgents);
    // invite agents //

    const checkValidation = (data) => {
        const error = {};
        let errorMessage = ''
        let emailRequiredCounter = 0
        for (let index = 0; index < data.length; index++) {
            if (data[index].email.trim() == "") {
                emailRequiredCounter++
            }
            if (data[index].email.trim() != "") {
                if (!emailRegex.test(data[index].email)) {
                    error[data[index].id] = "Email invalid"
                }
              
                if (emailRegex.test(data[index].email)) {
                    if (data[index].role.trim() == "") {
                        error[`${data[index].id}role`] = 'Please select role'
                    }
                }
            }
        }
        if (emailRequiredCounter == data.length) {
            error.emailRequired = 'Email required'
        }

        dispatch_({ type: "ON_ERROR", payload: error });

        return !Object.keys(error).length;
    }

    const handleInviteAgent = () => {
        const isValid = checkValidation(inviteEmail)
        if (isValid) {
            const tempData = [...inviteEmail]
            tempData.forEach(item => {
                delete item.role
                delete item.id
            })
            inviteAgent({
                variables: {
                    argsArray: tempData,
                    superAdminId: JSON.parse(localStorage.getItem("ActiveUserdetail")).mainSuperAdminId
                }
            });
        }
    }

    const handleOnChangeEmailText = (value, index) => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
        const tempData = [...inviteEmail];
        tempData[index].email = value
        setInviteEmail(tempData)
    }

    useEffect(() => {
        if (inviteAgentsQueryError && inviteAgentsQueryError.createTeam) {
            error('Something went wrong')
        }
    }, [inviteAgentsQueryError])

    useEffect(() => {
        if (inviteAgentsQueryResult && inviteAgentsQueryResult.inviteAgent && inviteAgentsQueryResult.inviteAgent.success == 1) {
            success('Invite sent successfully')
            props.onClose()
        }
    }, [inviteAgentsQueryResult])



    return (
        <div class="modal fade show zIndex-10000 display-block "
            style={{ background: 'rgb(110 110 110 / 50%)' }} id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered max-w-650" role="document">
                <div class="modal-content border-0 shadow ">
                    <div class="modal-body p-0 rounded">
                        <div class="bg-white px-16 py-14 rounded-md ">
                            <div className='d-flex justify-content-between px-4 py-3' style={{ backgroundColor: constants.theme.shadowGray }}>
                                <h5 className='font-medium' style={{ color: constants.theme.darkGray }}>Invite Agents</h5>
                                <div className='cursor-pointer' onClick={props.onClose}><Close color={constants.theme.darkGray} /></div>
                            </div>
                            <div className='d-flex justify-content-between px-4 py-2'>
                                <p className='m-0 font-small' style={{ color: constants.theme.darkGray }}>Email(s)</p>
                                <p className='m-0 font-xsmall' style={{ color: constants.theme.darkGray }}>Admin/Manager/Agent</p>
                            </div>
                            <div className=' px-2'>
                                {state.error && state.error.emailRequired &&
                                    <p className='m-0 px-2 font-xsmall text-danger'>{state.error.emailRequired}</p>}
                            </div>
                            {/* <div className="px-4">
                                <Add color={constants.theme.green} isBorder={true} />
                            </div> */}
                            <div className='' style={{
                                maxHeight: '155px',
                                overflow: 'auto',
                                overflowX: 'hidden'
                            }}>
                                {inviteEmail.map((item, index) => {
                                    return (
                                        <div className='d-flex my-2  px-3 '>
                                            <div className='w-100'>
                                                <SingleInput isLabel={false}
                                                    value={item.value}
                                                    onChange={(e) => handleOnChangeEmailText(e.target.value, index)}
                                                    class="input-text input-text shadow-sm" placeHolder="email" />
                                                {state.error && state.error[item.id] && <p className='m-0 px-2 font-xsmall text-danger'>{state.error[item.id]}</p>}
                                                {state.error && state.error[`${item.id}role`] && <p className='m-0 px-2 font-xsmall text-danger'>{state.error[`${item.id}role`]}</p>}
                                            </div>
                                            <div className='flex flex-nowrap align-self-center text-center' style={{ width: '80px' }}>
                                                <input onClick={() => handleCheckInviteEmail(item, index, 'Admin')}
                                                    type="checkbox" checked={item.role === "Admin"} className='input-check-user-module mx-1 align-self-center' />
                                                <input onClick={() => handleCheckInviteEmail(item, index, 'Manager')}
                                                    type="checkbox" checked={item.role === "Manager"} className='input-check-user-module mx-1 align-self-center' />
                                                <input onClick={() => handleCheckInviteEmail(item, index, 'Agent')}
                                                    type="checkbox" checked={item.role === "Agent"} className='input-check-user-module mx-1 align-self-center' />
                                            </div>
                                        </div>
                                    )
                                })}
                                <div ref={ref}></div>
                            </div>
                            <div className=' d-flex flex-row-reverse cursor-pointer' style={{ padding: '0px 70px' }}>
                                <p onClick={() => handleAddNewInviteEmail()} className='font-xsmall m-0' style={{ width: 'fit-content', color: constants.theme.green }}><ins>Invite more user</ins></p>
                            </div>
                            <div className=' px-4'>
                                <p className='my-3 font-small' style={{ color: constants.theme.darkGray }}>Shareable invite link</p>
                                <div className='d-flex'>
                                    <SingleInput inputId="invite-link" isLabel={false} disabled={true} value={`${config.SHAREABLEINVITELINK}${designation}/${mainSuperAdminId}/asdk343ui3lkdjf34934jdklfje94i`} />
                                    <Dropdown style={{marginLeft:'10px'}}>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Select
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={()=>{setDesignation("4")}}>superAdmin</Dropdown.Item>
        <Dropdown.Item onClick={()=>{setDesignation("3")}}>Manager</Dropdown.Item>
        <Dropdown.Item onClick={()=>{setDesignation("14")}} >Agent</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
                                    <div className='mx-2 align-self-center'>
                                        <Button onClick={handleCopyInviteLink}
                                            text={`${isCopied ? 'Copied!' : 'Copy'}`} isTransparent={isCopied ? false : true} color={isCopied ? 'white' : constants.theme.green} class="py-2 px-4" />
                                    </div>
                                </div>
                                <p className='my-2 font-xsmall ' style={{ color: constants.theme.darkGray }}>For security reason, this link will expire in 6 days (28 May 2022). <small className='text-success cursor-pointer'>Generate new link</small></p>
                            </div>
                            <div className='d-flex justify-content-end  px-4 py-3' style={{ backgroundColor: constants.theme.shadowGray }}>
                                <Button text="Cancel" onClick={props.onClose} isTransparent={true} color={constants.theme.green} class="py-2 px-4 mx-2" />
                                <Button
                                    isDisabled={inviteAgentsQueryLoading}
                                    isLoading={inviteAgentsQueryLoading}
                                    text="Invite" onClick={handleInviteAgent}
                                    bgColor={constants.theme.green} color="light" class="py-2 px-4" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default React.memo(InviteAgents);