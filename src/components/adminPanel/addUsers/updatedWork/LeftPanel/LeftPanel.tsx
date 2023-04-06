// import { Card } from '@mui/material'
import { useTheme } from '@mui/material/styles';
import React from 'react'
import { Chip, Button } from '@mui/material'
import useStyles from './Styles'
//
import Profile from '../../../../shared/atoms/Profile/Profile'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
} from '@mui/material'

interface Props {
  setRightPanelOpened: (a: boolean) => void
  // rightPanelOpened: boolean
}

const LeftPanel: React.FC<Props> = ({
  setRightPanelOpened,
  // rightPanelOpened,
}) => {
  const { classes } = useStyles()
  const chipSX = {
    fontWeight: '400',
    fontSize: '10px',
    lineHeight: '14px',
    borderRadius: '3px',
    boxShadow: '0px 5px 10px rgba(127, 63, 152, 0.1)',
    height: '25px',
  }

  //superadmin
  const chipRed = {
    ...chipSX,
    // width: '100%',
    color: '#E34D59',
    backgroundColor: 'rgba(127, 63, 152, 0.1);',
  }

  ///////////////////////

  const chipSX2 = {
    width: '60px',
    height: '20px',
    // opacity:"0.05",
    fontWeight: '400',
    fontSize: '10px',
    lineHeight: '14px',
    borderRadius: '3px',
    // boxShadow: '0px 5px 10px rgba(127, 63, 152, 0.1)',
  }

  //admnin
  const chipBlue = {
    ...chipSX2,
    // width: '100%',
    // width:"30px",
    color: '#0085FF',
    backgroundColor: 'rgba(33, 213, 155, .1)',
  }
  //   const chipBlue = {
  //     ...chipSX,
  //     // width: '100%',
  //     color: '#0085FF',
  //     backgroundColor: 'rgba(33, 213, 155, .1)',
  // };
  //manager
  const chipOrange = {
    ...chipSX,
    // width: '100%',
    color: '#FF8A00',
    backgroundColor: 'rgba(20, 156, 255, .1)',
  }

  const data = [1, 2, 3,4,5,6,7,8,9,10]
  // const data = [1, 2, 3]
  const theme = useTheme();
  return (
    <>
      {/* <Card sx={{ width: '100%' }}> */}
      <Box
        sx={{
          maxHeight: 'calc(100vh - 180px)',
          height: "auto",
          // height: 'calc(100vh - 180px)',
          overflowY: 'auto',
          //////////////////////
          [theme.breakpoints.up('lg')]: {
            // backgroundColor: 'red',
          },
          //laptop
          [theme.breakpoints.down('lg')]: {
            // backgroundColor: 'aqua',
            // maxHeight: '490px',
            maxHeight: 'calc(100vh - 180px)',
            height: "auto",
            // height: 'calc(100vh - 180px)',
            overflowY: 'auto',
          },
          // This will apply to screens narrower than 1024px
          //tablet
          // [theme.breakpoints.up('lg')]: {
          //   backgroundColor: 'blue',
          //   height: 'calc(100vh - 180px)',
          // },
          // [theme.breakpoints.down('md')]: {
          //   backgroundColor: 'red',
          //   height: 'calc(100vh - 180px)',
          // },
          //////////////////////
          padding: "0px 20px",
          //
          scrollbarWidth: 'thin',
          scrollbarColor: '#ccc transparent',
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
        }}
      >
        {/* table of data */}
        <Table sx={{ width: '100%' }}>
          <TableHead>
            <TableRow className={classes.headRow}>
              <TableCell colSpan={3} className={classes.head}>
                Name
              </TableCell>
              <TableCell colSpan={2} className={classes.head}>
                Role
              </TableCell>
              <TableCell colSpan={2} className={classes.head}>
                Status
              </TableCell>
              <TableCell colSpan={2} className={classes.head}>
                Employed
              </TableCell>
              <TableCell colSpan={3} className={classes.head}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow className={classes.row}>
              <TableCell colSpan={3} className={classes.rowCell}>
                <Profile
                  name={'Andrew Jones'}
                  email={'andrewjones.99@kuikwit.com'}
                />
              </TableCell>
              <TableCell colSpan={2} className={classes.rowCell}>
                <Chip label="Superadmin" sx={chipRed} />
              </TableCell>
              <TableCell colSpan={2} className={classes.rowCell}>
                <FiberManualRecordIcon
                  style={{
                    fontSize: '10px',
                    color: '#00BA34',
                    marginRight: '3px',
                  }}
                />
                <span style={{ color: '#00BA34' }}>Active</span>
              </TableCell>
              <TableCell colSpan={2} className={classes.rowCell}>
                10/03/23
              </TableCell>
              <TableCell colSpan={3} className={classes.rowCell}>
                <Button
                  variant={'outlined'}
                  className={classes.buttonStyle}
                  onClick={() => setRightPanelOpened(true)}
                >
                  View details
                </Button>
              </TableCell>
            </TableRow>
            {/*  */}
            <TableRow className={classes.row}>
              <TableCell colSpan={3} className={classes.rowCell}>
                <Profile
                  name={'Roger Martinez'}
                  email={'rogermartinez.2@kuikwit.com'}
                />
              </TableCell>
              <TableCell colSpan={2} className={classes.rowCell}>
                <Chip label="Admin" sx={chipBlue} />
              </TableCell>
              <TableCell colSpan={2} className={classes.rowCell}>
                <FiberManualRecordIcon
                  style={{
                    fontSize: '10px',
                    color: '#E34D59',
                    marginRight: '3px',
                  }}
                />
                <span style={{ color: '#E34D59' }}>Block</span>
              </TableCell>
              <TableCell colSpan={2} className={classes.rowCell}>
                10/03/23
              </TableCell>
              <TableCell colSpan={3} className={classes.rowCell}>
                <Button
                  variant={'outlined'}
                  className={classes.buttonStyle}
                  onClick={() => setRightPanelOpened(true)}
                >
                  View details
                </Button>
              </TableCell>
            </TableRow>
            {/*  */}
            <TableRow className={classes.row}>
              <TableCell colSpan={3} className={classes.rowCell}>
                <Profile
                  name={'Corey Franklin'}
                  email={'coreyfranklin@kuikwit.com'}
                />
              </TableCell>
              <TableCell colSpan={2} className={classes.rowCell}>
                <Chip label="Manager" sx={chipOrange} />
              </TableCell>
              <TableCell colSpan={2} className={classes.rowCell}>
                <FiberManualRecordIcon
                  style={{
                    fontSize: '10px',
                    color: '#FF8A00',
                    marginRight: '3px',
                  }}
                />
                <span style={{ color: '#FF8A00' }}>Suspended</span>
              </TableCell>
              <TableCell colSpan={2} className={classes.rowCell}>
                10/03/23
              </TableCell>
              <TableCell colSpan={3} className={classes.rowCell}>
                <Button
                  variant={'outlined'}
                  className={classes.buttonStyle}
                  onClick={() => setRightPanelOpened(true)}
                >
                  View details
                </Button>
              </TableCell>
            </TableRow>
            {data.map(() => (
              <TableRow className={classes.row}>
                <TableCell colSpan={3} className={classes.rowCell}>
                  <Profile
                    name={'Andrew Jones'}
                    email={'andrewjones.99@kuikwit.com'}
                  />
                </TableCell>
                <TableCell colSpan={2} className={classes.rowCell}>
                  <Chip label="Superadmin" sx={chipRed} />
                </TableCell>
                <TableCell colSpan={2} className={classes.rowCell}>
                  <FiberManualRecordIcon
                    style={{
                      fontSize: '10px',
                      color: '#00BA34',
                      marginRight: '3px',
                    }}
                  />
                  <span style={{ color: '#00BA34' }}>Active</span>
                </TableCell>
                <TableCell colSpan={2} className={classes.rowCell}>
                  10/03/23
                </TableCell>
                <TableCell colSpan={3} className={classes.rowCell}>
                  <Button
                    variant={'outlined'}
                    className={classes.buttonStyle}
                    onClick={() => setRightPanelOpened(true)}
                  >
                    View details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
      {/* </Card> */}
    </>
  )
}

export default LeftPanel
