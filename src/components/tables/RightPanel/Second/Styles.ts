import { makeStyles } from 'tss-react/mui'
//
const useStyles = makeStyles()((theme) => ({

    outlineName: {
        '& input::-webkit-input-placeholder': {
            fontWeight: '400',
            fontFamily: 'poppins',
            fontSize: '10px',
            lineHeight: '15px',
            color: '#272525',
        },
    },



    outlinedInput: {
        '& input::-webkit-input-placeholder': {
            fontWeight: '400',
            fontFamily: 'poppins',
            fontSize: '10px',
            lineHeight: '15px',
            color: '#272525',
        },
    },

    responsiveness: {
        // width:"180px",
        [theme.breakpoints.down('lg')]: {
            width: "180px !important"
        },
    },



    formBox: {
        padding: '11px 10px',
        // maxHeight: '72vh',
        height: "calc(100vh - 29vh)",
        // height: "calc(100vh - 56vh)",
        overflowY: 'auto',
        scrollbarWidth: 'thin',
        scrollbarColor: '#ccc transparent',
        //////////////////////////////////////////////

        [theme.breakpoints.down('lg')]: {
            maxHeight: '68.5vh', overflowY: "auto", overflowX: "hidden"
        },


        //////////////////////////////////////////////
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
    profileSection: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    username: {
        fontFamily: 'poppins',
        fontWeight: '500',
        fontSize: '14px',
        lineHeight: '21px',
        marginTop: '5px',
        color: '#272525',
        height: '20px',
        //
        width: "100%",
        display: "flex",
        justifyContent: "center"
    },
    pseudonym: {
        fontFamily: 'poppins',
        fontWeight: '400',
        fontSize: '10px',
        lineHeight: '15px',
        color: '#777777',
        height: '15px',
        //
        width: "100%",
        display: "flex",
        justifyContent: "center"
    },
    userrole: {
        fontFamily: 'poppins',
        fontWeight: '400',
        fontSize: '8px',
        lineHeight: '10px',
        color: '#0085FF',
        height: '10px',
        //
        width: "100%",
        display: "flex",
        justifyContent: "center"
    },
    infoText: {
        fontFamily: 'poppins',
        fontWeight: '500',
        fontSize: '10px',
        lineHeight: '15px',
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
    text3: {
        fontFamily: 'poppins',
        fontWeight: '400',
        fontSize: '8px',
        lineHeight: '12px',
        marginTop: '10px',
        color: '#777777',
        width: '32px',
        height: '12px',
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
    text6: {
        fontFamily: 'poppins',
        fontWeight: '500',
        fontSize: '10px',
        lineHeight: '15px',
        marginTop: '20px',
        // marginLeft: "10px",
        color: '#272525',
        width: '93px',
        height: '15px',
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

    cancelButton: {
        width: '55px',
        height: '25px',
        backgroundColor: '#F5F5F5',
        borderRadius: '3px',
        fontFamily: 'poppins',
        fontSize: '10px',
        fontWright: '400',
        lineHeight: '15px',
        color: '#777777',
        marginRight: '5px',
        '&:hover': {
            color: '#777777',
            backgroundColor: '#F5F5F5',
        },
    },
    submitButton: {
        width: '55px',
        height: '25px',
        backgroundColor: '#4D1277',
        borderRadius: '3px',
        fontFamily: 'poppins',
        fontSize: '10px',
        fontWright: '500',
        lineHeight: '15px',
        color: '#FFFFFF',
    },
    chatLimitStyle: {
        fontFamily: 'poppins',
        fontWeight: '500',
        fontSize: '10px',
        lineHeight: '15px',
        marginTop: '20px',
        color: '#272525',
        width: '50px',
        height: '15px',
    },
    concurrentChatStyle: {
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
    selectText: {
        fontFamily: 'poppins',
        fontWeight: '400',
        fontSize: '10px',
        lineHeight: '15px',
        marginTop: '20px',
        color: '#272525',
        width: '65px',
        height: '15px',
    },
    selectButton: {
        border: '0.5px solid #E8E8E8',
        color: '#777777',
        width: '100px',
        height: '25px',
        borderRadius: '3px',
        paddingLeft: '7px',
        fontFamily: 'poppins',
        fontSize: '10px',
        lineHeight: '15px',
        fontWeight: '400',
    },
    menuItem: {
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
        overflowY:"auto",
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
    },
}))
export default useStyles
