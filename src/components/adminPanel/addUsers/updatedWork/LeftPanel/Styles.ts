import { makeStyles } from 'tss-react/mui'
// import theme from '../../style/theme';
//
const useStyles = makeStyles()(() => ({
  headRow: {
    // height:"2vh"
  },

  head: {
    width: '37px',
    height: '20px',
    fontWeight: '300',
    fontSize: '12px',
    lineHeight: '20px',
    color: '#777777',
    //
    marginLeft: '20px',
    //
    borderBottom: 'none',
    //
    // backgroundColor: "#fafafa",
    backgroundColor: '#FFFFFF',
    position: 'sticky',
    top: 0,
    zIndex: 1,
    //
    padding:"16px 0px",
  },

  row: {
    // height: "2vh",
    padding: '0px',
  },
  rowCell: {
    // padding: '0px 20px',
    padding: '0px 0px',
    borderBottom:"0.8px solid #EFF2F6",
  },

  buttonStyle: {
    width: '80px',
    height: '25px',
    fontSize: '10px',
    lineHeight: '15px',
    padding: '5px',
    textTransform: 'capitalize',
    borderColor: '#7F3F98',
    color: '#7F3F98',
    //
    opacity: 0,
    transition: 'opacity 0.2s',
    '&:hover': {
      opacity: 1,
    },
    //
  },
}))
export default useStyles
