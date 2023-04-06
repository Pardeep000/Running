import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles()((theme) => ({
 
  header: {
    height: "75px",
    color: theme.palette.common.black,
    // background: theme.custom?.background,
    // background: "#E6D9EC"
    // border: "1px solid black"

  },
  typography:{
    fontFamily: "Poppins",
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '24px',
    display: "flex",
    // lineHeight: "48px"
  },
  text:{
    fontFamily: "Poppins",
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '14px',
    display: "flex",
    lineHeight: "48px",  
    marginTop: -20
  }
}))

export default useStyles
