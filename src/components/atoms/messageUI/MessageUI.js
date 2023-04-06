import React from 'react'

function MessageUI({type,messagedata}) {

    let greenBackground = "rgb(85,165,48,.1)";
    let greyBackground = "rgb(238,238,238)";

  return (
    <div style={{display:'flex',justifyContent:type == 'incoming'?'flex-start':'flex-end',width:'95%'}}>
        <div style={{width:'80%',background:type =="incoming"?greyBackground:greenBackground,borderRadius:'15px',padding:'10px 15px'}}>
            <p style={{fontFamily:'poppins',fontSize:'14px',color:type == 'incoming'?'':'rgb(85,165,48)'}}>{messagedata.messageBody}</p>
            <p style={{fontFamily:'poppins',fontSize:'14px',marginBottom:'0px',textAlign:type == 'incoming'?'right':'left',color:type == 'incoming'?'':'rgb(85,165,48)'}}>{messagedata.messagetime}</p>
        </div>
    </div>
  )
}

export default MessageUI