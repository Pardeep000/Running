import React, { forwardRef, Fragment, useEffect, useImperativeHandle, useState } from 'react';
import { constants } from '../../config/constant';
import AddUser from '../icons/addUser';
import Link from '../icons/link';
import Team from '../icons/team';
import ThreeDots from '../icons/threeDots';
import User from '../icons/user';
import DeleteConfirmation from '../modals/deleteConfirmation';
import SquareTag from '../tags/squareTag'
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import Loader from '../loader';

const SingleTable = forwardRef((props, ref) => {

    useImperativeHandle(ref, () => ({
        handleCloseActionModal() {
            setIsActionModalOpen(false)
        }
    }))

    const [isActionModalOpen, setIsActionModalOpen] = useState(false)
    const [selectedUser, setSelectedUser] = useState(null)

    const handleActions = (data, action, item, index) => {
        if (action === 'Delete') {
            props.handleSelectedDataForDelete(data)
            handleUserRowSelected(item, index)
            setIsActionModalOpen(false)
        }
        if (action === 'Edit') {
            props.handleOpenEditPanel()
            handleUserRowSelected(item, index)
            setIsActionModalOpen(false)
        }
        if (action === 'Suspended') {
            props.handleOpenEditPanel()
            handleUserRowSelected(item, index)
            setIsActionModalOpen(false)
        }
    }

    const handleUserRowSelected = (item, index) => {
        props.handleIsUserRowSelected(item)
        setSelectedUser(index)
    }



    return (
        <Fragment>
            <table class="table" style={{}}>
                <thead className="thead-dark text-light" style={{ backgroundColor: constants.theme.black }}>
                    <tr className=''>
                        {props.headers.map((itm, indx) => {
                            return <th className={`${itm.title === 'Designation' && 'text-center'}
                             ${itm.title == 'Email' || itm.title == 'Name' ? 'px-4' : 'px-6'} font-small`} scope="col">{itm.title}</th>
                        })}
                    </tr>
                </thead>
                {/* <tbody className='' style={{}}> */}
                <tbody>
                    {props.data.length > 0 && props.data.map((item, index) => {
                        return (
                            <tr className='font-small'
                                style={{
                                    backgroundColor: `${selectedUser === index ? constants.theme.lightestGray : ''}`,
                                }} >
                                <td  className='px-3'
                                    onClick={() => {
                                        props.setIsAddModalOpen()
                                        handleUserRowSelected(item, index)
                                        setIsActionModalOpen(false)
                                    }}
                                >
                                    <div className='d-flex '>
                                        {
                                            !item.picture? <User class="align-self-center" color={[constants.theme.gray, 'black']} /> : <img class="align-self-center" style={{borderRadius:'50px'}} width='25px' height='25px' src={item.picture}/>
                                        }
                                        {/**/}
                                       
                                        <p className='m-0 px-2'>{item.name}</p>
                                    </div>
                                </td>
                                <td
                                    onClick={() => {
                                        props.setIsAddModalOpen()
                                        handleUserRowSelected(item, index)
                                        setIsActionModalOpen(false)
                                    }}
                                    className='px-4'>
                                    <p className='m-0'>{item.email}</p>
                                </td>
                                <td className='m-auto px-6'
                                    onClick={() => {
                                        props.setIsAddModalOpen()
                                        handleUserRowSelected(item, index)
                                        setIsActionModalOpen(false)
                                    }}
                                >
                                    <SquareTag styles={{
                                        backgroundColor: constants.designation[item.designation?.paneltype]
                                    }} class="m-auto my-1" text={item.designation?.paneltype} />
                                </td>
                                <td className='px-6'
                                    onClick={() => {
                                        props.setIsAddModalOpen()
                                        handleUserRowSelected(item, index)
                                        setIsActionModalOpen(false)
                                    }}
                                >
                                    <div className='d-flex '>
                                        <div
                                            className={`dot align-self-center mx-1 rounded-circle border `}
                                            style={{ backgroundColor: constants.statusColors[item.status] }}
                                        />
                                        <p className='m-0'
                                            style={{ color: constants.statusColors[item.status] }}
                                        >{item.status}</p>
                                    </div>
                                </td>
                                <td className='text-center px-5'  onClick={() => {
                                    // handleUserRowSelected(item, index)
                                    setIsActionModalOpen(false)
                                    setSelectedUser(index)
                                }}>{item.designation?.paneltype !== 'OWNER' &&
                                    <ThreeDots
                                        onClick={(event) => {
                                            event.stopPropagation()
                                            setIsActionModalOpen(!isActionModalOpen)
                                            setSelectedUser(index)
                                        }}
                                    >
                                        {isActionModalOpen && index == selectedUser && <div className="border p-2 rounded bg-white" style={{
                                            position: 'fixed',
                                            width: '200px',
                                            margin: ' 0px 0px 0px -130px',
                                            boxShadow: ' 5px 5px 9px -6px grey',
                                        }}>
                                            {props.actinsItems.map((itm, indx) => {
                                                return (
                                                    <div
                                                        onClick={() => handleActions(item, itm.title, item, index)}
                                                        className="d-flex align-self-center cursor-pointer  my-2" >
                                                        <p
                                                            style={{
                                                                color: itm.title === 'Delete' ? constants.theme.red : itm.title === 'Edit' ? constants.theme.green : constants.theme.gray,
                                                            }}
                                                            className={`m-0 px-2`}>{itm.title}</p>
                                                    </div>
                                                )
                                            })}
                                        </div>}
                                    </ThreeDots>
                                    }

                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table >
            {props.isLoading && <div className='text-center'>
                <Loader color={constants.theme.green} />
            </div>}
        </Fragment>
    );
})

SingleTable.defaultProps = {
    email: 'zain@gmail.com'
}

export default React.memo(SingleTable);