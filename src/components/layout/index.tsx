// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Box, CssBaseline, } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from './header/Header';
import NavigationList from '../adminPanel/NavigationList'
import type { FC, ReactNode } from 'react';

const Main = styled('main')(({ theme }) => ({
    ...(true && {
        // background: theme.custom?.background,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        }),
        //
        backgroundColor:"#E6D9EC",
        //
        paddingLeft: 20,
        paddingRight: 20,
        marginLeft: 60,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        // height: '90%',
        width: `calc(100% - ${60}px)`,
        // width: '1380px',
        // height:  `calc(100% - ${80}px)`,
        [theme.breakpoints.down('md')]: {
            marginLeft: '40px'
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: '20px'
        }
    })
}));

interface MainLayoutProps {
    children?: ReactNode;
}


const MainLayout: FC<MainLayoutProps> = ({ children }) => {
    const theme = useTheme();
    // Handle left drawer

    return (
        <Box sx={{ display: 'flex', height: "100vh" }}>
            <CssBaseline />
            {/* header */}
            {/* drawer */}
            {/* <Sidebar routes={routes} /> */}
            <NavigationList setAdminPanelDrawerToggle={function (arg0: boolean): void {
                throw new Error('Function not implemented.');
            }} setAdminPanelChatBoxDrawerToggle={function (arg0: boolean): void {
                throw new Error('Function not implemented.');
            }} adminPanelDrawerToggle={undefined} adminPanelClosedDrawerToggle={undefined} />

            <Header />

            {/* main content */}
            <Main theme={theme}>

                {/* <Outlet /> */}


                {children}
            </Main>
        </Box>
    );
};

export default MainLayout;