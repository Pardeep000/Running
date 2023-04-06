import React,{useImperativeHandle,forwardRef,useState,useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {makeStyles} from "@material-ui/core/styles";
import saveIcon from '../../../assets/chatWindow/Save.svg'
import backIcon from '../../../assets/chatWindow/Back.svg'
const useStyles = makeStyles((theme) => ({}));
const  MyVerticallyCenteredModal=(props) =>{
    const [inputData ,setInputData] = useState(props.prop.data)
    const classes = useStyles();
    const updateCannedResponse = ()=>{
        if(inputData.shortCut.length && inputData.longText.length){
            props.prop.updatedData(inputData);
        }
    }
    useEffect(()=>setInputData(props.prop.data),[props.prop.data])
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
                  <Modal.Header style={{display:'flex',justifyContent:'flex-start'}} className={classes.chatNoteHeader} >
            <img onClick={()=>props.onHide()} src={backIcon} alt="backIcon" style={{width:'20px',marginRight:'10px', cursor:'pointer'}} />
          <Modal.Title style={{marginLeft:'0px',fontSize:'20px'}} >
            Edit canned response
          </Modal.Title>
        </Modal.Header>
      <Modal.Body>
        <div>
            <p>Canned response text</p>
            <textarea
               rows="4" 
               cols="50"
               value={inputData?.longText}
            onChange={(e)=>setInputData({
                ...inputData,
                longText:e.target.value
            })}

            ></textarea>
        </div>
        <div>
            <p>Shortcut</p>
            <input 
            type="text"
            value={inputData?.shortCut}
            onChange={(e)=>setInputData({
                ...inputData,
                shortCut:e.target.value
            })}
            />
        </div>
      </Modal.Body>
      <Modal.Footer style={{display:'flex',justifyContent:'flex-end'}}>
      <img onClick={updateCannedResponse} className={classes.icon} src={saveIcon} style={{width:'15px'}} alt="SaveIcon" />
     </Modal.Footer>
    </Modal>
  );
}

const EditModal =forwardRef((props,ref)=> {
  const [modalShow, setModalShow] = React.useState(false);
useImperativeHandle(ref,()=>({
   alterModalShow:()=>{
        setModalShow(!modalShow)
    }
}))


  return (
    <>
     
      <MyVerticallyCenteredModal

        prop={props}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
})

export default EditModal;

