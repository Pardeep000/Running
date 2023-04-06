import { makeStyles } from 'tss-react/mui'
// import theme from '../../style/theme';
//
const useStyles = makeStyles()(() => ({
  search: {
    position: 'absolute',
    backgroundColor: '#FBFBFB',
    '&:hover': { backgroundColor: '#f3f1f1' },
    left: '100px',
    top: '110px',
    width: '250px',
    height: '30px',
    //
    border: '0.5px solid #E8E8E8',
    borderRadius: '3px',
  },
  searchIcon: {
    // padding: " 8.9px 229.21px 9.21px 8.29px",
    padding: ' 8.9px 229.21px 9.21px 12.29px',
    height: '27.5px',
    width: '12.49px',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    paddingLeft: '25.50px',
    fontWeight: '400',
    fontSize: '12px',
    lineHeight: '18px',
    textAlign: 'center',
    color: '#838383',
    // color:"red",
    //
    width: '100%',
    // transition: theme.transitions.create('width'),
    // [theme.breakpoints.up('md')]: {
    //     width: '20ch',
    // },
  },
}))
export default useStyles
