import * as React from 'react'
import { Card, Box } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import Switch from '@mui/material/Switch'
//
import First from '../RightPanelInfoFirst/RightPanelInfoFirst'
import Second from '../RightPanelEditSecond/RightPanelEditSecond'
//
import useStyles from './Styles'
//

interface Props {
  setRightPanelOpened: (a: boolean) => void
  // rightPanelOpened: boolean
}

const RightPanel: React.FC<Props> = ({
  setRightPanelOpened,
  // rightPanelOpened,
}) => {
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

        {edit ? <Second /> : <First />}
      </Card>
    </Box>
  )
}

export default RightPanel
