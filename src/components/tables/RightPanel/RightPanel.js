import * as React from 'react'
import { Card, Box } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import Switch from '@mui/material/Switch'
//
import useStyles from './Styles'
import First from './First/FirstInfo'
import Second from './Second/SecondEdit'
//

const RightPanel = ({
  setRightPanelOpened,
  data,
  //for edit panel:
  selectedUserData,
  handleOnProfileUpdate,
  onClose
}) => {
    console.log("data: ",data)
    console.log("selectedUserData: ",selectedUserData)
    //
  const { classes } = useStyles()
  const [edit, setEdit] = React.useState(false)
//className={classes.headRow}
  return (
    <Box className={classes.outerBox}>
      <Card className={classes.cardStyle}>
        <Box className={classes.topPanel}>
          <Box className={classes.topPanelRow}>
            Details
          </Box>
          <span onClick={() => setRightPanelOpened(false)}>
            <CloseIcon className={classes.crossIcon}/>
          </span>
        </Box>
        <Divider className={classes.divider} />
        {/* Switch Box */}
        <Box className={classes.textAndSwitchOuterBox}>
          <Box className={classes.textAndSwitchInnerBox}>
            <Typography variant="subtitle2" className={classes.textAndSwitchInnerBox}>
              {/* General info */}
              {edit ? 'Edit info' : 'General info'}
            </Typography>
            <Box className={classes.switchButtonBox}>
              <Switch
                onClick={() => {
                  console.log('switched')
                  setEdit(!edit)
                }}
              />
              <Typography
                variant="subtitle2" className={classes.switchButtonBoxText}>
                Edit
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* {edit ? <Second /> : <First />} */}
        {edit ? <Second selectedUserData={selectedUserData} handleOnProfileUpdate={handleOnProfileUpdate} onClose={onClose}/>: <First data={data}/>}
      </Card>
    </Box>
  )
}

export default RightPanel
