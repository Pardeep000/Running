import React, { forwardRef, Fragment, useEffect, useImperativeHandle, useState } from 'react';
import { constants } from '../../config/constant';
import ThreeDots from '../icons/threeDots';
import SquareTag from '../tags/squareTag'
import Loader from '../loader';
//new work
import { Table, TableBody, TableCell, TableHead, TableRow, Box } from '@mui/material'
import Profile from './Profile'
import useStyles from './SingleTableStyle';
import { Chip, Button } from '@mui/material'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
//header
import Header from './LeftPanelHeader/LeftPanelHeader';

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
        props.setUserIndex(index)
    }




    const { classes } = useStyles();
    const chipSX = {
        fontWeight: '400',
        fontSize: '10px',
        lineHeight: '14px',
        borderRadius: '3px',
        boxShadow: '0px 5px 10px rgba(127, 63, 152, 0.1)',
        height: '25px',
    }

    //superadmin
    const chipRed = {
        ...chipSX,
        // width: '100%',
        color: '#E34D59',
        backgroundColor: 'rgba(127, 63, 152, 0.1);',
    }

    ///////////////////////

    const chipSX2 = {
        width: '60px',
        height: '20px',
        // opacity:"0.05",
        fontWeight: '400',
        fontSize: '10px',
        lineHeight: '14px',
        borderRadius: '3px',
        // boxShadow: '0px 5px 10px rgba(127, 63, 152, 0.1)',
    }

    //admnin
    const chipBlue = {
        ...chipSX2,
        // width: '100%',
        // width:"30px",
        color: '#0085FF',
        backgroundColor: 'rgba(33, 213, 155, .1)',
    }
    //   const chipBlue = {
    //     ...chipSX,
    //     // width: '100%',
    //     color: '#0085FF',
    //     backgroundColor: 'rgba(33, 213, 155, .1)',
    // };
    //manager
    const chipOrange = {
        ...chipSX,
        // width: '100%',
        color: '#FF8A00',
        backgroundColor: 'rgba(20, 156, 255, .1)',
    }

    //
    // const [selectedUserNull,setselectedUserNull] = useState()


    return (
        <>
            {/* <Header/> */}
            <Box className={classes.outerBox} onScroll={props.loadMoreDataHandle}>
                <Table sx={{ width: '100%' }}>
                    <TableHead>
                        <TableRow className={classes.headRow}>
                            {props.headers.map((headerItem, indx) => <TableCell colSpan={headerItem.title === "Name" || headerItem.title === "" ? 3 : 2} className={classes.head}>{headerItem.title}</TableCell>)}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.data.length > 0 && props.data.map((item, index) => (
                            <TableRow className={classes.row} onClick={() => {
                                console.log("clicked anywhere on the singleTable")
                                props.setIsAddModalOpen()
                                //right panel should get open on clicking on the button (view detail only), not on everywhere
                                // handleUserRowSelected(item, index)
                                setIsActionModalOpen(false)
                            }} style={{
                                backgroundColor: `${selectedUser === index ? constants.theme.lightestGray : ''}`,
                            }}>
                                <TableCell colSpan={3} className={classes.rowCell}>
                                    <Profile
                                        name={item.name}
                                        email={item.email}
                                        pic = {item.picture}
                                    />
                                </TableCell>
                                <TableCell colSpan={2} className={classes.rowCell}>
                                    {/* <Chip label={item.designation?.paneltype} sx={chipRed} /> */}
                                    {/* <Chip label="Superadmin" sx={chipRed} /> */}
                                    {item.designation?.paneltype === "SUPERADMIN" ? <Chip label="Superadmin" sx={chipRed} /> : item.designation?.paneltype === "MANAGER" ? <Chip label="Manager" sx={chipOrange} /> : <Chip label="Admin" sx={chipBlue} />}
                                </TableCell>
                                <TableCell colSpan={2} className={classes.rowCell}>
                                    <FiberManualRecordIcon
                                        style={{
                                            fontSize: '10px',
                                            color: item.status === "BLOCKED" ? "#E34D59" : item.status === "ACTIVE" ? "#00BA34" : "#FF8A00",
                                            marginRight: '3px',
                                        }}
                                    />
                                    <span style={{ color: item.status === "BLOCKED" ? "#E34D59" : item.status === "ACTIVE" ? "#00BA34" : "#FF8A00", }}>{item.status}</span>
                                </TableCell>
                                <TableCell colSpan={2} className={classes.rowCell}>
                                    10/03/23
                                </TableCell>
                                <TableCell colSpan={3} className={classes.rowCell}>
                                    <Button
                                        variant={'outlined'}
                                        className={classes.buttonStyle}
                                        // onClick={() => setRightPanelOpened(true)}
                                        onClick={() => {
                                            handleUserRowSelected(item, index)
                                        }}
                                    >
                                        View details
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}


                    </TableBody>
                </Table>

                {/* <table class="table" style={{}}>
                <thead className="thead-dark text-light" style={{ backgroundColor: constants.theme.black }}>
                    <tr className=''>
                        {props.headers.map((itm, indx) => {
                            return <th className={`${itm.title === 'Designation' && 'text-center'}
                             ${itm.title == 'Email' || itm.title == 'Name' ? 'px-4' : 'px-6'} font-small`} scope="col">{itm.title}</th>
                        })}
                    </tr>
                </thead>
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
            </table > */}
                {props.isLoading && <div className='text-center'>
                    <Loader color={constants.theme.green} />
                </div>}
            </Box>
        </>
    );
})

SingleTable.defaultProps = {
    email: 'zain@gmail.com'
}

export default React.memo(SingleTable);