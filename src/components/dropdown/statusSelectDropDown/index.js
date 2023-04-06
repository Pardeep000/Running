import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { constants } from '../../../config/constant';
import ArrowDrown from '../../icons/arrowDrown';

const StatusSelectDropDown = forwardRef((props, ref) => {
    const [status, setStatus] = useState(props.value)
    const [statusOptionOpen, setStatusOptionOpen] = useState(false)

    useImperativeHandle(ref, () => ({
        handleCloseSelect() {
            setStatusOptionOpen(false)
        }
    }))

    const handleSelectStatus = (value) => {
        setStatus(value)
        props.handleSelectOption(value)
    }

    useEffect(() => { setStatus(props.value) }, [props.value])

    return (
        <div className='' style={{
            width: '200px'
        }}>
            <div onClick={(event) => {
                event.stopPropagation()
                setStatusOptionOpen(!statusOptionOpen)
            }} className='bg-white shadow-sm border w-100 rounded  px-2 py-2 d-flex justify-content-between'>
                <p className='p-0 m-0 font-small align-self-center'>{status === '' ? 'Select Options' : status}</p>
                <div className='px-2'>
                    <ArrowDrown />
                </div>
            </div>
            {statusOptionOpen && <div className='position-absolute' style={{ width: '200px' }}>
                <div className='bg-white shadow-sm border rounded  '>
                    <p onClick={() => {
                        handleSelectStatus('ACTIVE')
                        setStatusOptionOpen(!statusOptionOpen)
                    }} style={{
                        backgroundColor: constants.theme.lightestGreen,
                        borderColor: constants.theme.green,
                        color: constants.theme.green
                    }}
                        className='m-2 p-2 cursor-pointer border rounded'>Active</p>
                    <p onClick={() => {
                        handleSelectStatus('SUSPENDED')
                        setStatusOptionOpen(!statusOptionOpen)
                    }} style={{
                        backgroundColor: constants.theme.lightestRed,
                        borderColor: constants.theme.red,
                        color: constants.theme.red
                    }}
                        className='m-2 p-2 cursor-pointer border rounded'>Suspended</p>
                    <p onClick={() => {
                        handleSelectStatus('DELETE')
                        setStatusOptionOpen(!statusOptionOpen)
                    }} style={{
                        backgroundColor: constants.theme.lightestGray,
                        borderColor: constants.theme.gray,
                        color: constants.theme.gray
                    }}
                        className='m-2 p-2 cursor-pointer border rounded'>Delete</p>
                </div>
            </div>}
        </div>
    );
})

export default StatusSelectDropDown;