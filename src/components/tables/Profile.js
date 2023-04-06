import React from 'react'
import image from '../../../src/assets/img/profile.jpg'
import useStyles from './Styles'
import Box from '@mui/material/Box'
//
import User from '../icons/user';
import Person from '../../assets/img/person.png'

import {
  Typography,
  Avatar,
  Grid,
  ListItem,
  ListItemAvatar,
} from '@mui/material'

const ProfileIcon = ({ name, email,pic }) => {
  const { classes } = useStyles()
  return (
    <>
      <Box className={classes.wrap}>
        <ListItem alignItems="center">
          <ListItemAvatar className={classes.avatar}>
            {!pic? <User class="align-self-center" />:<Avatar alt="John Doe" src={pic}/>}
          </ListItemAvatar>
          <Box className={classes.nameAndEmailbox}>
            <Typography
              variant="subtitle2"
              className={classes.userName}
            >
              {name}
            </Typography>
            <Typography
              variant="subtitle2" className={classes.userEmail}>
              {email}
            </Typography>
          </Box>
        </ListItem>
        <Grid container className="list-container">
        </Grid>
      </Box>
    </>
  )
}

export default ProfileIcon
