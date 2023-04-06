import React, { useEffect, useReducer, useState } from 'react';
import { useSelector } from 'react-redux';
import { constants } from '../../config/constant';
import useSnackBar from '../../hooks/useSnackBar';
import Button from '../atoms/buttons/button';
import Back from '../icons/back';
import Close from '../icons/close';
import User from '../icons/user';
import SingleInput from '../input/singleInput';
import Loader from '../loader';
import SquareTag from '../tags/squareTag';

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

function MultiSelectList(props) {

    const store = useSelector(store => store)
    const [listData, setListData] = useState([])
    const { error } = useSnackBar()
    const [tempListData, setTemListData] = useState([])
    const [allSelected, setAllSelected] = useState(false)
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        if (props.openPanelCategory === 'managerlist') {
            const list = []
            store.ManagersListReducer.managersListData.map((item, index) => {
                list.push({ ...item, isSelected: false })
            })
            setListData(list)
            setTemListData(list)
        }
        if (props.openPanelCategory === 'agentlist') {
            const list = []
            store.AgentsListReducer.setAgentsListData.map((item, index) => {
                list.push({ ...item, isSelected: false })
            })
            setListData(list)
            setTemListData(list)
        }
    }, [props.openPanelCategory, store.ManagersListReducer.managersListData])

    const handleSelectAll = (flag) => {
        const list = [...listData];
        list.forEach(element => {
            element.isSelected = flag
        });
        setListData(list)
        setAllSelected(flag)
    }

    const handleCheckListItem = (data, flag) => {
        const list = [...listData];
        list.forEach(element => {
            if (element.id != null && data.id != null) {
                if (element.id === data.id) {
                    element.isSelected = !flag;
                }
            }
        });
        setListData(list)
    }

    const handleSubmit = () => {

        const tempData = []
        listData.forEach(element => {
            if (element.isSelected) {
                tempData.push(element)
            }
        });
        const isValid = checkProfileValidation({ tempData })
        if (isValid) {
            props.handleSelectedUsers(tempData)
            props.onClose()
        }
    }

    const handleSearch = (e) => {
        let list = [];
        if (e.target.value == '') {
            setListData(tempListData)
        } else {
            list = tempListData.filter(item => item.name.toUpperCase().includes(e.target.value.toUpperCase()));
            setListData(list)
        }
    }

    const checkProfileValidation = (data) => {
        try {
            const error = {};
            if (data.tempData.length == 0) {
                error.listEmpty = "Please select at least one user"
            }

            dispatch({ type: "ON_ERROR", payload: error });

            return !Object.keys(error).length;
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div class="modal fade show zIndex-10000 display-block"
            style={{ background: 'rgb(110 110 110 / 50%)' }} id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content border-0 shadow">
                    <div class="modal-body p-0">
                        <div class="bg-white px-16 py-14 rounded-md ">
                            <div className='px-3 py-2 bg-light'>
                                <div className='d-flex justify-content-between mb-3'>
                                    <div className='px-1 bg-light align-self-center'
                                        onClick={props.onClose}>
                                        <Back color={constants.theme.green} />
                                    </div>
                                    <h5>{props.title}</h5>
                                    <div onClick={props.onClose}><Close color={constants.theme.black} /></div>
                                </div>
                            </div>
                            <div className='px-3 py-1'>
                                <SingleInput onChange={handleSearch} isRightIcon={true} isLabel={false} btnClass="border-0" />
                            </div>
                            <div className='px-3'>
                                {state.error.listEmpty && <p className='font-small m-0 text-danger'>{state.error.listEmpty}</p>}
                            </div>
                            <div className='p-3'>
                                <div className='d-flex my-2'>
                                    <input type="checkbox" checked={allSelected} className='input-check-user-module align-self-center' onChange={() => handleSelectAll(!allSelected)} />
                                    <p className='m-0 mx-2 font-small'>Select all</p>
                                </div>
                                <div className='border-bottom' />
                                <div onScroll={props.loadMoreDataHandle} className='my-4' style={{
                                    maxHeight: '175px',
                                    overflow: 'auto',
                                    overflowX: 'hidden'
                                }}>
                                    {!props.getManagersQueryLoading &&
                                        props.openPanelCategory === 'managerlist' &&
                                        listData.length == 0 &&
                                        <div className='m-auto text-center'>
                                            <p className='font-small'>No record found</p>
                                        </div>}
                                    {!props.getAgentsQueryLoading &&
                                        props.openPanelCategory === 'agentlist' &&
                                        listData.length == 0 &&
                                        <div className='m-auto text-center'>
                                            <p className='font-small'>No record found</p>
                                        </div>}
                                    {listData.length > 0 && listData.map((item_, index) => {
                                        return (
                                            <div className='d-flex my-2 align-self-center justify-content-between'>
                                                <div className='d-flex align-self-center'>
                                                    <input checked={item_.isSelected} onChange={() => handleCheckListItem(item_, item_.isSelected)} type="checkbox" className='input-check-user-module align-self-center border border-light' />
                                                    <div>
                                                        <User color={[constants.theme.gray, 'black']} class="align-self-center ms-2" />
                                                        <div
                                                            className={`dot align-self-center  rounded-circle border `}
                                                            style={{
                                                                backgroundColor: constants.theme.green,
                                                                position: 'relative',
                                                                margin: '-10px 20px'
                                                            }}
                                                        />
                                                    </div>
                                                    <p className='d-flex px-2 m-0 font-small align-self-center'>{item_.name}</p>
                                                    <SquareTag styles={{
                                                        backgroundColor: constants.theme.blue
                                                    }}
                                                        class="m-auto my-1  font-xssmall" text={item_.designation.paneltype} />
                                                </div>
                                            </div>
                                        )
                                    })}
                                    {props.getManagersQueryLoading &&
                                        props.openPanelCategory === 'managerlist' &&
                                        <div className='text-center'>
                                            <Loader color={constants.theme.green} /></div>}
                                    {props.getAgentsQueryLoading &&
                                        props.openPanelCategory === 'agentlist' &&
                                        <div className='text-center'>
                                            <Loader color={constants.theme.green} /></div>}
                                </div>
                            </div>
                            <div className='p-3 bg-light'>
                                <div className='d-flex justify-content-end'>
                                    <Button
                                        onClick={handleSubmit}
                                        isTransparent={false}
                                        class="py-1 px-4"
                                        bgColor={constants.theme.green}
                                        color="light" text="Save" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default React.memo(MultiSelectList);