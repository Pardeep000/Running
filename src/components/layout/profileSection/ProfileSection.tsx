import React from 'react'
import { Avatar, Box } from '@mui/material';
import useStyles from './Styles';
// import profile from '../../../../assets/images/profile.jpg';
import image from '../../../assets/img/profile.jpg'
const ProfileSection: React.FC = () => {
    const { classes } = useStyles()
    return (
        <Box
            className={classes.profile}>
            <Avatar src={image}
            />
        </Box>

    )
}

export default ProfileSection
