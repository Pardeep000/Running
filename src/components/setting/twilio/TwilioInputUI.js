import { makeStyles } from '@material-ui/core';
import React from 'react'


const useStyles = makeStyles((theme) => ({
  mainContainer: {
    display:'flex',
    flexDirection:'column',
    width:'60%'
  },
  inpLabel:{
    fontFamily:'poppins',
    fontSize:'15px',
    color:'#272525',
    marginBottom:'5px'
  },
  inpBox:{
    border:'1px solid #777777',
    fontFamily:'poppins',
    padding:'5px'
  }
 
}));
function TwilioInputUI(props) {
  const Style = useStyles();
  return (
    <div className={Style.mainContainer}>
      <label 
      className={Style.inpLabel}
      for={props.label}
      >{props.label}
      </label>

      <input 
      className={Style.inpBox}
      type='text' 
      name={props.label} 
      onChange={(e)=> props.onChange(e.target.value)}
      value={props.value}
      />
    </div>
  )
}
TwilioInputUI.defaultProps = {
  label: "Account SID",
  onChange: (e)=>console.log(e.target.value),
  value: "asdf"
}

export default TwilioInputUI