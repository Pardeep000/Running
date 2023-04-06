import { makeStyles } from 'tss-react/mui'
//

const useStyles = makeStyles()((theme) => ({
  outerBox: {
    //
    height: 'auto',
    //
    width: '280px',
    // width: '20.55%',
    // margin: '100px 20px 0px 0px',
    marginTop: '100px',
    // marginRight: '20px',
    //
    marginLeft: '20px',
    //
    backgroundColor: '#FFFFFF',
    //
    boxShadow: '0px 5px 10px rgba(127, 63, 152, 0.1)',
    borderRadius: '10px',
    //
    marginBottom: '20px',
    //////////////////////////////////////
    //laptop
    [theme.breakpoints.down('lg')]: {
      maxHeight: '83vh',
      overflowY:"auto",
      // backgroundColor:"orange"
    },
    //
  },
  cardStyle: {
    height: 'calc(100vh - 120px)',
    backgroundColor: '#FFFFFF',
    //
    borderRadius:"10px",
    //
    // border: 'none',
    boxShadow: 'none',
  },
  topPanel: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  topPanelRow: {
    width: '55px',
    height: '20px',
    fontWeight: '500',
    fontFamily: 'poppins',
    fontSize: '16px',
    lineHeight: '20px',
    color: '#272525',
    marginTop: '20px',
    marginLeft: '10px',
  },
  crossIcon: {
    height: '10.8px',
    width: '10.8px',
    color: '#B9B9B9',
    marginTop: '13.61px',
    marginRight: '13.6px',
    cursor: 'pointer',
  },
  divider: {
    width: '600px',
    marginTop: '10px',
    color: '#E8E8E8',
  },
  textAndSwitchOuterBox: {
    padding: '11px 10px 0px 10px',
  },
  textAndSwitchInnerBox: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  rightPanelTopText: {
    fontFamily: 'poppins',
    fontWeight: '400',
    fontSize: '12px',
    lineHeight: '18px',
    // marginTop: "11px",
    // marginLeft: "10px",
    color: '#838383',
    width: '73px',
    height: '18px',
  },
  switchButtonBox: {
    display: 'flex',
    position: 'relative',
    top: '-9px',
  },
  switchButtonBoxText: {
    fontFamily: 'poppins',
    fontWeight: '400',
    fontSize: '10px',
    lineHeight: '16.67px',
    marginTop: '11.5px',
    marginRight: '10px',
    color: '#A0A0A0',
    width: '18px',
    height: '17px',
  },
}))
export default useStyles
