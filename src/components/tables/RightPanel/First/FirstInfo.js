import { useTheme } from '@mui/material/styles';
import * as React from 'react'
import { Box } from '@mui/material'
import Typography from '@mui/material/Typography'
//
import { Avatar } from '@mui/material'

import image from '../../../../../src/assets/img/person.png'
import fblogo from '../../../../../src/assets/img/fblogo.png'
import Divider from '@mui/material/Divider'
//
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
//
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
//
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Collapse from '@mui/material/Collapse'
//
import useStyles from './Styles'
import User from "../../../icons/user";
import { gql } from "apollo-boost";
import { useLazyQuery } from "@apollo/react-hooks";
//

const getPageData = gql`
query gettingPageData($id:[ID!]){
  page(id:$id){
   id
   name
   pageId
   accesstoken
 }
}
`;


const RightPanel = ({ data }) => {
  const [pagedata, setpagedata] = React.useState([]);
  //
  const getPagesApi = gql`
     query getPages(
        $mainSuperAdminId:ID!
        ) {
      pages(
         mainSuperAdminId: $mainSuperAdminId
      ) {
       id
    name
    pageId
    accesstoken
      }
    }`;

  let [
    getPages,
    {
      loading: getPagesQueryLoading,
      error: getPagesQueryError,
      data: getPagesQueryResult,
    },
  ] = useLazyQuery(getPagesApi, {
    fetchPolicy: "network-only",
  });

  React.useEffect(() => {
    if (localStorage.getItem("ActiveUserdetail")) {
      getPages({
        variables: {
          mainSuperAdminId: JSON.parse(localStorage.getItem("ActiveUserdetail")).mainSuperAdminId,
        }
      });
    }

  }, [localStorage.getItem("ActiveUserdetail")]);
  // get pages //
  React.useEffect(() => {
    if (getPagesQueryResult && getPagesQueryResult.pages) {
      console.log("getPagesQueryResult.pages: ", getPagesQueryResult.pages)
    }
  }, [getPagesQueryResult])
  /////////////////////////////////////////
  const theme = useTheme();
  //
  const { classes } = useStyles();
  //
  const [roleLink, setRoleLink] = React.useState('')
  const [expanded, setExpanded] = React.useState(false)

  const [chatlimit, setChatlimit] = React.useState(99)
  //
  React.useEffect(() => {
    console.log("data for detail: ", data)
  }, [data])



  const [getPage, { loading: getPageLoading, error: getPageError, data: getPageResult }] = useLazyQuery(getPageData, { fetchPolicy: "network-only", });

  // const func = async () => {
  //   getPage({ variables: { id: ["103784858586521", "108127708101629", "103736861910783"] } });
  // }

  // React.useEffect(() => {
  //   console.log("func is running...")
  //   func()
  // }, [])

  // React.useEffect(() => {
  //   if (!getPageLoading) {
  //     console.log("getPageResult", getPageResult)
  //   }
  // }, [getPageResult])

  React.useEffect(() => {
    if (data && getPagesQueryResult) {
      const dataArray = JSON.parse(data.pages)
      getPagesQueryResult.pages.map((item, index) => {
        const result = dataArray.find(itm => itm === item.pageId)
        if (result) {
          console.log("result found: ", result, item.name, pagedata)
          //
          let st = pagedata
          st.push(item.name)
          setpagedata(st)
          //
        }
      })
    }
  }, [data, getPagesQueryResult])



  return <>
    <Box sx={{
      height: 'calc(100vh - 25vh)',
      // height: 'calc(100vh - 30vh)',//working
      padding: '11px 10px',
      // maxHeight: '72vh',
      //
      [theme.breakpoints.down('lg')]: {
        maxHeight: '68.5vh', overflowY: "auto",
      },
      overflowY: 'auto',
      scrollbarWidth: 'thin',
      //
      scrollbarColor: '#ccc transparent', '&::-webkit-scrollbar': {
        width: '4px',
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: '#ccc',
        borderRadius: '3px',
      },
      '&::-webkit-scrollbar-track': {
        backgroundColor: 'transparent',
      },
    }}>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >

        {/* <User height={45} width={45} color={[constants.theme.gray, 'black']} /> */}
        {data.picture ? <Avatar
          alt="John Doe"
          src={data.picture}
          sx={{ height: '80px', width: '80px' }}
        /> : <User height={80} width={80} color={['black']} />}


        {/* <Avatar
          alt="John Doe"
          src={image}
          sx={{ height: '80px', width: '80px' }}
        /> */}

        <Typography
          variant="subtitle2" className={classes.profileName}>
          {/* Andrew Jones */}
          {data.name}
        </Typography>

        <Typography
          variant="subtitle2" className={classes.profilePseudonym}>
          {/* Walter White */}
          {data.pseudonym}
        </Typography>

        <Typography
          variant="subtitle2"
          className={classes.profileRole}
        >
          {/* Agent */}
          {data.designation.paneltype}
        </Typography>
      </Box>

      <Typography
        variant="subtitle2"
        className={classes.profileInfo}
      >
        Personal info
      </Typography>

      <Typography
        variant="subtitle2"
        className={classes.text1}>
        Full name
      </Typography>
      {/* <Box className={classes.text1Box}>Andrew Jones</Box> */}
      <Box className={classes.text1Box}>{data.name}</Box>

      <Box className={classes.rowBox}>
        <Box className={classes.rowBox1}>
          <Typography
            variant="subtitle2"
            className={classes.text2}
          >
            Pseudonym
          </Typography>

          <Box className={classes.text2Box}>
            {/* Walter White */}
            {data.pseudonym}
          </Box>
        </Box>

        <Box className={classes.rowBox2}>
          <Typography
            variant="subtitle2"
            className={classes.text3}
          >
            Job title
          </Typography>

          <Box className={classes.text3Box}>
            {/* Agent */}
            {data.designation.paneltype}
          </Box>
        </Box>
      </Box>

      <Typography
        variant="subtitle2" className={classes.text4}>
        Email
      </Typography>

      <Box className={classes.text4Box}>
        {/* andrewjones.99@kuikwit.com */}
        {data.email}
      </Box>

      <Typography
        variant="subtitle2" className={classes.text5}>
        Phone number
      </Typography>

      <Box className={classes.text5Box}>
        {/* 510-323-6452 */}
        {data.number}
      </Box>

      <Typography
        variant="subtitle2" className={classes.chatLimit1}>
        Chat limit
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <TextField
          // variant="outlined"
          type="number"
          // value={chatlimit}
          value={data.agentlimitchatassign}
          onChange={(event) => setChatlimit(Number(event.target.value))}
          inputProps={{ min: 0, max: 100 }}
          InputProps={{
            disableUnderline: true,
            inputProps: {
              style: {
                padding: '4px 0px 4px 5px',
                width: '40px',
                height: '20px',
              },
            },
          }}
        />
        <Typography
          variant="subtitle2" className={classes.chatLimit2}>
          Concurrent chat
        </Typography>
      </Box>

      <Typography
        variant="subtitle2"
        className={classes.selectBoxText}>
        Select status
      </Typography>

      <Select
        // className={classes.selectStyling}
        style={{
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
        }}
        // value={roleLink}
        value={data.status}
        onChange={(event) => setRoleLink(event.target.value)}
        fullWidth
        displayEmpty
        inputProps={{
          disableUnderline: true,
          style: { borderBottom: 'none' },
        }} //
        disableUnderline
      //
      >
        <MenuItem
          value=""
          disabled
          style={{ color: 'red', display: 'none' }}
        >
          <FiberManualRecordIcon
            style={{
              color: '#00BA34',
              width: '5px',
              height: '5px',
              marginRight: '5px',
            }}
          />
          Active
        </MenuItem>
        <MenuItem
          value="ACTIVE"
          className={classes.MenuItem}
        >
          <FiberManualRecordIcon
            style={{
              color: '#00BA34',
              width: '5px',
              height: '5px',
              marginRight: '5px',
            }}
          />
          Active
        </MenuItem>
        <MenuItem
          value="SUSPENDED"
          className={classes.MenuItem}
        >
          <FiberManualRecordIcon
            style={{
              color: '#FF8A00',
              width: '5px',
              height: '5px',
              marginRight: '5px',
            }}
          />
          Suspended
        </MenuItem>
        <MenuItem
          value="BLOCKED"
          className={classes.MenuItem}
        >
          <FiberManualRecordIcon
            style={{
              color: '#E34D59',
              width: '5px',
              height: '5px',
              marginRight: '5px',
            }}
          />
          Block
        </MenuItem>
      </Select>

      <Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '20px',
            cursor: 'pointer',
          }}
          onClick={() => setExpanded(!expanded)}
        >
          <Typography
            variant="subtitle2" className={classes.collapseText}>
            Chat Channels
          </Typography>{' '}
          {expanded ? (
            <RemoveIcon
              style={{ width: '9.8px', height: '9.8px', color: '#272525' }}
            />
          ) : (
            <AddIcon
              style={{ width: '9.8px', height: '9.8px', color: '#272525' }}
            />
          )}
        </Box>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Box className={classes.collapseBox}>
            {pagedata && pagedata.map((item, index) => <Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}
              >
                {/* <FormControlLabel
                  sx={{ marginRight: '0px' }}
                  label=""
                  control={<Radio size="small" sx={{ fontSize: '10px' }} />}
                /> */}
                <input checked={true} type="radio" style={{ marginRight: "10px" }} />
                <Avatar
                  alt="John Doe"
                  src={fblogo}
                  sx={{ height: '20px', width: '20px' }}
                />
                <Typography
                  variant="subtitle2"
                  className={classes.collapseBoxText}
                >
                  {/* Internet deals */}
                  {item}
                </Typography>
              </Box>
              <Divider sx={{ marginTop: "5px", marginBottom: "5px" }} />
            </Box>)}
            {/* one entry */}
            {/* <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}
            >
              <FormControlLabel
                sx={{ marginRight: '0px' }}
                label=""
                control={<Radio size="small" sx={{ fontSize: '10px' }} />}
              />
              <Avatar
                alt="John Doe"
                src={image}
                sx={{ height: '20px', width: '20px' }}
              />
              <Typography
                variant="subtitle2"
                className={classes.collapseBoxText}
              >
                Internet deals
              </Typography>
            </Box> */}
            {/* second entry */}
            {/* <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}
            >
              <FormControlLabel
                sx={{ marginRight: '0px' }}
                label=""
                control={<Radio size="small" sx={{ fontSize: '10px' }} />}
              />
              <Avatar
                alt="John Doe"
                src={image}
                sx={{ height: '20px', width: '20px' }}
              />
              <Typography
                variant="subtitle2"
                className={classes.collapseBoxText}
              >
                Tele-Communication Providers
              </Typography>
            </Box> */}
            {/* third entry */}
            {/* <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}
            >
              <FormControlLabel
                sx={{ marginRight: '0px' }}
                label=""
                control={<Radio size="small" sx={{ fontSize: '10px' }} />}
              />
              <Avatar
                alt="John Doe"
                src={image}
                sx={{ height: '20px', width: '20px' }}
              />
              <Typography
                variant="subtitle2"
                className={classes.collapseBoxText}
              >
                Tele-Communication Providers
              </Typography>
            </Box> */}
          </Box>
        </Collapse>
      </Box>

      {/* internal box ending */}
    </Box>
  </>
}

export default RightPanel
