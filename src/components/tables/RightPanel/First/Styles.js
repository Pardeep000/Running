import { makeStyles } from 'tss-react/mui'
//
const useStyles = makeStyles()((theme) => ({

    selectStyling: {
        border: '0.5px solid #E8E8E8',
        color: '#777777',
        width: '100px',
        height: '25px',
        borderRadius: '3px',
        // marginLeft: '10px',
        paddingLeft: '7px',
        // paddingTop: '7.5px',
        // paddingBottom: '7.5px',
        fontFamily: 'poppins',
        fontSize: '10px',
        lineHeight: '15px',
        fontWeight: '400',
    },



    profileName: {
        fontFamily: 'poppins',
        fontWeight: '500',
        fontSize: '14px',
        lineHeight: '21px',
        marginTop: '5px',
        color: '#272525',
        // width: '100px',
        height: '20px',
        //
        width: "100%",
        display: "flex",
        justifyContent: "center"
    },
    profilePseudonym: {
        fontFamily: 'poppins',
        fontWeight: '400',
        fontSize: '10px',
        lineHeight: '15px',
        // marginTop: "5px",
        // marginLeft: "10px",
        color: '#777777',
        // width: '64px',
        height: '15px',
        //
        width: "100%",
        display: "flex",
        justifyContent: "center"
    },
    profileRole: {
        fontFamily: 'poppins',
        fontWeight: '400',
        fontSize: '8px',
        lineHeight: '10px',
        // marginTop: "5px",
        // marginLeft: "10px",
        color: '#0085FF',
        // width: '24px',
        height: '10px',
        //
        width: "100%",
        display: "flex",
        justifyContent: "center"
    },
    profileInfo: {
        fontFamily: 'poppins',
        fontWeight: '500',
        fontSize: '10px',
        lineHeight: '15px',
        // marginTop: "5px",
        // marginLeft: "10px",
        color: '#272525',
        width: '66px',
        height: '15px',
    },
    text1: {
        fontFamily: 'poppins',
        fontWeight: '400',
        fontSize: '8px',
        lineHeight: '12px',
        marginTop: '10px',
        // marginLeft: "10px",
        color: '#777777',
        width: '39px',
        height: '12px',
    },
    text1Box: {
        width: '260px',
        height: '25px',
        //
        border: '0.5px solid #BDC0CC',
        borderRadius: '3px',
        //
        fontWeight: '400',
        fontFamily: 'poppins',
        fontSize: '10px',
        lineHeight: '15px',
        color: '#272525',
        //
        padding: '5px',
        //
        //
        [theme.breakpoints.down('lg')]: {
            width: "100%"
        },
    },

    rowBox: {
        display: "flex",
        [theme.breakpoints.down('lg')]: {
            flexDirection: "column"
        },
    },

    rowBox1: {

    },
    rowBox2: {
        marginLeft: "10px",
        [theme.breakpoints.down('lg')]: {
            marginLeft: "0px",
        },
    },
    text2: {
        fontFamily: 'poppins',
        fontWeight: '400',
        fontSize: '8px',
        lineHeight: '12px',
        marginTop: '10px',
        // marginLeft: "10px",
        color: '#777777',
        width: '48px',
        height: '12px',
    },
    text2Box: {
        width: '125px',
        height: '25px',
        //
        border: '0.5px solid #BDC0CC',
        borderRadius: '3px',
        //
        fontWeight: '400',
        fontFamily: 'poppins',
        fontSize: '10px',
        lineHeight: '15px',
        color: '#272525',
        //
        padding: '5px',
        //
        [theme.breakpoints.down('lg')]: {
            width: "100%"
        },
    },
    text3: {
        fontFamily: 'poppins',
        fontWeight: '400',
        fontSize: '8px',
        lineHeight: '12px',
        marginTop: '10px',
        // marginLeft: "10px",
        color: '#777777',
        width: '32px',
        height: '12px',
    },
    text3Box: {
        width: '125px',
        height: '25px',
        //
        border: '0.5px solid #BDC0CC',
        borderRadius: '3px',
        //
        fontWeight: '400',
        fontFamily: 'poppins',
        fontSize: '10px',
        lineHeight: '15px',
        color: '#272525',
        //
        padding: '5px',
        //
        [theme.breakpoints.down('lg')]: {
            width: "100%"
        },
    },
    text4: {
        fontFamily: 'poppins',
        fontWeight: '400',
        fontSize: '8px',
        lineHeight: '12px',
        marginTop: '10px',
        // marginLeft: "10px",
        color: '#777777',
        width: '22px',
        height: '12px',
    },
    text4Box: {
        width: '260px',
        height: '25px',
        //
        border: '0.5px solid #BDC0CC',
        borderRadius: '3px',
        //
        fontWeight: '400',
        fontFamily: 'poppins',
        fontSize: '10px',
        lineHeight: '15px',
        color: '#272525',
        //
        padding: '5px',
        //
        [theme.breakpoints.down('lg')]: {
            width: "100%"
        },
    },
    text5: {
        fontFamily: 'poppins',
        fontWeight: '400',
        fontSize: '8px',
        lineHeight: '12px',
        marginTop: '10px',
        // marginLeft: "10px",
        color: '#777777',
        width: '59px',
        height: '12px',
    },
    text5Box: {
        width: '260px',
        height: '25px',
        //
        border: '0.5px solid #BDC0CC',
        borderRadius: '3px',
        //
        fontWeight: '400',
        fontFamily: 'poppins',
        fontSize: '10px',
        lineHeight: '15px',
        color: '#272525',
        //
        padding: '5px',
        //
        [theme.breakpoints.down('lg')]: {
            width: "100%"
        },
    },
    chatLimit1: {
        fontFamily: 'poppins',
        fontWeight: '500',
        fontSize: '10px',
        lineHeight: '15px',
        marginTop: '20px',
        // marginLeft: "10px",
        color: '#272525',
        width: '50px',
        height: '15px',
    },
    chatLimit2: {
        fontFamily: 'poppins',
        fontWeight: '400',
        fontSize: '8px',
        lineHeight: '12px',
        // marginTop: "20px",
        marginLeft: '5px',
        color: '#272525',
        width: '66px',
        height: '12px',
    },
    selectBoxText: {
        fontFamily: 'poppins',
        fontWeight: '400',
        fontSize: '10px',
        lineHeight: '15px',
        marginTop: '20px',
        // marginLeft: "5px",
        color: '#272525',
        width: '65px',
        height: '15px',
    },
    MenuItem: {
        width: '96px',
        height: '25px',
        borderRadius: '3px',
        backgroundColor: '#F7F7F7',
        color: '#777777',
        fontFamily: 'poppins',
        fontSize: '10px',
        lineHeight: '15px',
        fontWeight: '400',
        paddingLeft: '10px',
    },
    collapseText: {
        fontFamily: 'poppins',
        fontWeight: '500',
        fontSize: '10px',
        lineHeight: '15px',
        // marginTop: "20px",
        // marginLeft: "5px",
        color: '#272525',
        width: '76px',
        height: '15px',
    },
    collapseBox: {
        width: '250px',
        maxHeight: '10vh',
        minHeight: '12vh',
        overflowY: 'auto',
        padding: '10px',
        //
        [theme.breakpoints.down('lg')]: {
            width: "100%"
        },
        //
        overflowX: "hidden",
        //
        scrollbarWidth: 'thin',
        scrollbarColor: '#ccc transparent',
        //
        '&::-webkit-scrollbar': {
            width: '4px',
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#ccc',
            borderRadius: '3px',
        },
        '&::-webkit-scrollbar-track': {
            backgroundColor: 'transparent',
        },
    },
    collapseBoxText: {
        //
        overflowY: "auto",
        scrollbarWidth: 'thin',
        scrollbarColor: '#ccc transparent',
        //
        '&::-webkit-scrollbar': {
            width: '4px',
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#ccc',
            borderRadius: '3px',
        },
        '&::-webkit-scrollbar-track': {
            backgroundColor: 'transparent',
        },
        //
        fontFamily: 'poppins',
        fontWeight: '400',
        fontSize: '10px',
        lineHeight: '15px',
        // marginTop: "20px",
        marginLeft: '5px',
        color: '#272525',
        width: '175px',
        height: '15px',
        //
        [theme.breakpoints.down('lg')]: {
            fontSize: "8px"
        },
    }
}))
export default useStyles
