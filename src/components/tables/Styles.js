import { makeStyles } from 'tss-react/mui'
const useStyles = makeStyles()((theme) => ({
  root: {},
  open: {
    fontSize: '10px',
    marginTop: -3,
    color: "green",
    [theme.breakpoints.down('lg')]: {
      // paddingTop: -3
    },
  },
  closed: {
    fontSize: '10px',
    marginTop: -3,
    color: "red",
    [theme.breakpoints.down('lg')]: {
      // paddingTop: -3
    },
  },
  avatar: {
    marginTop: 10,
  },
  wrap: {
    // height: '60px',
    height: '50px',
    marginBottom: "8px",
    cursor: 'pointer',
    // paddingTop: 10,
    // paddingLeft: 10,
    '&:hover': {
      background: theme.custom?.background,
    },
    '& .MuiListItem-root': {
      padding: 0,
    },
  },
  icon: {
    marginTop: -15
  },
  userName: {
    fontSize: '12px',
    marginTop: 0,
    marginLeft: -1,
    fontWight: '500',
    color: '#272525',
  },
  userEmail: {
    fontSize: '10px',
    marginTop: 0,
    marginLeft: -1,
    fontWight: '400',
    color: '#777777',
  },
  nameAndEmailbox:{
    marginTop: '10px'
  }
}))
export default useStyles
