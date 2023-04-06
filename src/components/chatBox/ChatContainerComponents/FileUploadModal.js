import React, { useEffect, useState } from 'react'
import { makeStyles } from "@material-ui/core/styles";

import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { Modal } from 'react-bootstrap'
import { grey } from '@mui/material/colors';
import _ from "lodash";

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
        // cursor: 'pointer',
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
        background: 'green',
        zIndex: '100'
    },
    agentDataImageContainer: {
        width: '40px',
        height: '40px',
        // borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'lightgrey'
    },
    focusRemove: {
        boxShadow: 'none !important',

    },

}));

const FileUploadModal = (props) => {

    const [preview, setPreview] = useState()

    useEffect(() => {
        if (!props.file) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(props.file)
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [props.file])

    const classes = useStyles();
    console.log(props.file);
    function formatBytes(bytes, decimals = 2) {
        if (!+bytes) return '0 Bytes'

        const k = 1024
        const dm = decimals < 0 ? 0 : decimals
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

        const i = Math.floor(Math.log(bytes) / Math.log(k))

        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
    }


    return (
        <Modal
            show={props.fileModal && props.file}
            onHide={() => props.setFileModal(false)}
            //  size="lg"
            // style={{width:'00px',margin:'0 auto'}}
            animation={false}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header style={{ padding: '10px 20px 10px 10px', }} closeButton>
                <Modal.Title style={{ fontSize: '20px' }} id="contained-modal-title-vcenter">
                    Files To Upload
                </Modal.Title>
            </Modal.Header>
            <Modal.Body >
                <div style={{ display: 'grid', justifyContent: 'space-between', alignItems: 'center' }}>
                    {/* Agents(count) */}
                    <div style={{ display: 'flex' }}>
                        <p style={{ fontSize: '14px', cursor: 'pointer', padding: '0 5px 5px 5px', width: 'fit-content', borderBottom: '4px solid purple', marginBottom: '0', marginRight: '10px', color: 'purple', }}>
                            Ready To Upload:
                        </p>

                    </div>
                </div>
                <div
                    style={{
                        height: '100px', overflowY: 'auto',
                        marginTop: '10px'
                    }}>
                    <div id={`agent-${props.id}`} className={`${classes.agentDataContainer}`}
                        style={{ borderLeft: '5px solid green', background: '#fafafa' }}  >
                        {/* <div className={classes.agentDataInner}></div> */}

                        <div className={`${classes.agentDataImageContainer} `}>
                            <img src={preview} alt="preview" style={{ width: '75%', height: '75%' }} />
                        </div>
                        <span style={{ marginLeft: '8px' }}>
                            <h4 style={{ marginBottom: '0', fontSize: '16px' }}>{props?.file?.name}</h4>
                            <p style={{ marginBottom: '0', fontSize: '14px', color: 'grey' }}>{formatBytes(props?.file?.size)}</p>
                        </span>
                    </div>
                    <span>

                        {/* <AddIcon /><p>Add File</p> */}
                    </span>
                </div>
            </Modal.Body>
            <Modal.Footer style={{ padding: '10px', }}>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <p style={{ marginBottom: '0', color: 'blue' }}></p>
                        {/* lock icon */}
                    </div>
                    <div>
                        <Button variant="contained" color="grey" style={{
                            textTransform: 'capitalize', color: 'BLACK', marginLeft:
                                "17rem"
                        }} onClick={() => {
                            props.setFileModal(false);
                            props.setFile(null);

                        }}>Cancel</Button>
                    </div>
                    <div>
                        <Button variant="contained" color="success" style={{ textTransform: 'capitalize', color: 'white' }}
                            onClick={() => { props.addMessageInputText(); props.setFileModal(false) }}>Upload</Button>
                    </div>
                </div>
                {/* <Button onClick={props.onHide}>Close</Button> */}
            </Modal.Footer>
        </Modal >
    )
}

export default FileUploadModal