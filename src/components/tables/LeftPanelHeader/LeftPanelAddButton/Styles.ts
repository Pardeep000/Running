import { makeStyles } from 'tss-react/mui'
const useStyles = makeStyles()(() => ({
    addButton:{
        width: '78px',
          height: '30px',
          borderRadius: '3px',
          backgroundColor: '#7F3F98',
          color: '#FFFFFF',
          fontWeight: '400',
          fontSize: '14px',
          lineHeight: '16px',
          fontFamily: 'poppins',
          //
          textTransform:"capitalize",
          //
        //   marginTop:"5px",
          marginTop:"10px",
          marginRight:"20px"
    },
    buttonMenuItem:{
        width: '146px',
            height: '28px',
            borderRadius: '3px',
    },
    MenuItemStyling:{
        width: '78px',
        height: '18px',
        fontFamily: 'poppins',
        fontWeight: '400',
        fontSize: '12px',
        lineHeight: '18px',
    }
}))
export default useStyles
