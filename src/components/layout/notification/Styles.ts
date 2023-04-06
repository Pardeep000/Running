import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles()((theme) => ({
  root: {
    margin: '8px 0px 8px -8px ',
    cursor: 'pointer',
    color: theme.palette.primary.main,
    [theme.breakpoints.down('lg')]:{
    margin: '8px 0px 8px -24px ',
    }
  },
}))

export default useStyles
