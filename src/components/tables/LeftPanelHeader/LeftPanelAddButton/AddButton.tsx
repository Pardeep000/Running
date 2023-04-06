import * as React from 'react'
import { styled, alpha } from '@mui/material/styles'
import Button from '@mui/material/Button'
import Menu, { MenuProps } from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
//
import AddIcon from '@mui/icons-material/Add'
import LinkIcon from '@mui/icons-material/Link'
//
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded'
//
// import Modal1 from '../LeftPanelModal/InviteAgent/InviteAgentModal'
// import Modal2 from '../LeftPanelModal/ShareableInviteLink/ShareableInviteLinkModal'
// import Modal3 from '../LeftPanelModal/CreateTeam/CreateTeam'
//
import useStyles from './Styles'

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light'
        ? 'rgb(55, 65, 81)'
        : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}))

const CustomizedMenus: React.FC = () => {
  const { classes } = useStyles()
  //
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  //
  const [openModal, setOpenModal] = React.useState<boolean>(false)
  //
  const closeModal = () => {
    console.log('closing dropdown with invite agents')
    setOpenModal(false)
  }
  //working
  //   React.useEffect(() => {
  //     console.log('changed openModal')
  //   }, [openModal])
  //

  const [openModal2, setOpenModal2] = React.useState<boolean>(false)
  //
  const closeModal2 = () => {
    console.log('closing dropdown with share invitable modal')
    setOpenModal2(false)
  }

  const [openModal3, setOpenModal3] = React.useState<boolean>(false)
  //
  const closeModal3 = () => {
    console.log('closing dropdown with create team modal')
    setOpenModal3(false)
  }

  return (
    <div>
      <Button
        id="user_dropdown"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        disableElevation
        onClick={handleClick}
        //
        variant="contained"
        startIcon={<AddIcon />}
        className={classes.addButton}
      >
        Add
      </Button>
      <StyledMenu
        id="user_dropdown"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem
          className={classes.buttonMenuItem}
          disableRipple
        >
          <PersonAddIcon style={{ color: '#7F3F98' }} />
          <span
            className={classes.MenuItemStyling}
            onClick={() => {
              setOpenModal(true)
              console.log('modal click on button transferred')
            }}
          >
            Invite Agents
            {/* <Modal1
              check={openModal}
              closeModal={closeModal}
              handleCloseDropDown={handleClose}
            /> */}
          </span>
        </MenuItem>
        {/*  */}
        <MenuItem
          className={classes.buttonMenuItem}
          disableRipple
        >
          <LinkIcon style={{ color: '#7F3F98' }} />
          <span
            className={classes.MenuItemStyling}
            onClick={() => {
              setOpenModal2(true)
              console.log('opening shareable Invite Link modal')
            }}
          >
            Share Invite Link
            {/* <Modal2
              check={openModal2}
              closeModal={closeModal2}
              handleCloseDropDown={handleClose}
            /> */}
          </span>
        </MenuItem>
        {/*  */}
        <MenuItem
          className={classes.buttonMenuItem}
          disableRipple
        >
          <GroupsRoundedIcon style={{ color: '#7F3F98' }} />
          <span
           className={classes.MenuItemStyling}
            onClick={() => {
              setOpenModal3(true)
              console.log('opening create team modal')
            }}
          >
            Create Team
            {/* <Modal3
              check={openModal3}
              closeModal={closeModal3}
              handleCloseDropDown={handleClose}
            /> */}
          </span>
        </MenuItem>
      </StyledMenu>
    </div>
  )
}

export default CustomizedMenus
