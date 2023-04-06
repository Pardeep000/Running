
import Notification from '.././notification/Notification';
import ProfileSection from '.././profileSection/ProfileSection';
import React from 'react'
import { useTheme } from '@mui/material/styles';
import { Grid, } from '@mui/material';
import { AppBar, Toolbar, } from '@mui/material';
import useStyles from './Styles'
import Typography from '@mui/material/Typography';
import { useLocation } from 'react-router-dom';

const Header: React.FC = () => {
    const location = useLocation();
    const data = () => {
        let heading, text;
        switch (location.pathname) {
            case '/dashboard':
                heading = 'Dashboard';
                text = 'Check your stats and suggestions for using Kuikwit.';
                break;
            case '/chats':
                heading = 'Chats';
                text = 'See chats with customers, managers, agents and more.';
                break;
            case '/users':
                heading = 'Users';
                text = 'See chats with customers, managers, agents and more.';
                break;
            case '/settings':
                heading = 'Settings';
                text = 'See chats with customers, managers, agents and more.';
                break;
        }
        return { heading, text }
    }
    const { heading, text } = data()
    const { classes } = useStyles();
    const theme = useTheme();
    return (

        <AppBar
            enableColorOnDark
            position="fixed"
            color="inherit"
            elevation={0}
            sx={{
                zIndex: 100,
                background: '#E6D9EC',
                transition: false ? theme.transitions.create('width') : 'none'
            }}
        >
            <Toolbar>
                <Grid container className={classes.header}>
                    <Grid item md={11} pt={3} pl={7} pr={3}>
                        <Typography className={classes.typography} >{heading}</Typography>
                        <Typography className={classes.text}>{text}</Typography>
                    </Grid>
                    <Grid item md={1} pt={3} pl={3} pr={4} sx={{ display: { xs: 'none', md: 'block', lg: 'block' } }}>
                        <Grid container wrap="nowrap">
                            {/* <Grid item md={7}> </Grid> */}
                            <Grid item md={6}> <Notification /></Grid>
                            {/* <Grid item md={1}> </Grid> */}
                            <Grid item md={6}><ProfileSection /></Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>


    )
}

export default Header