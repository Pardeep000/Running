import React, { useState, useReducer, useEffect, useRef } from 'react';
import { constants } from '../../../../config/constant';
// import Button from '../../../atoms/buttons/button';
import StatusSelectDropDown from '../../../dropdown/statusSelectDropDown';
import Add from '../../../icons/add';
import Close from '../../../icons/close';
import User from '../../../icons/user';
import SingleInput from '../../../input/singleInput';
import gql from "graphql-tag";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import { setAllPagesData } from '../../../../store/actions/AdmindataActions';
import { useDispatch, useSelector } from 'react-redux';
import { helpers } from '../../../../utils/helpers';
import useSnackBar from '../../../../hooks/useSnackBar';
import axios from 'axios';
import expressConfig from "../../../../config/express.json";
//
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material'
import Typography from '@mui/material/Typography'
//
import { Avatar } from '@mui/material'
//
import image from '../../../../../src/assets/img/profile.jpg'
import fblogo from '../../../../../src/assets/img/fblogo.png'
//
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
//
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import Button from '@mui/material/Button'
import RadioGroup from '@mui/material/RadioGroup'
import Divider from '@mui/material/Divider'
//
import { FormEvent } from 'react'
//
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Collapse from '@mui/material/Collapse'
//
import { OutlinedInput } from '@mui/material';
//
import useStyles from './Styles'

const initialState = {
  error: {}
};

function reducer(state, action) {
  switch (action.type) {
    case "ON_ERROR":
      return { ...state, error: { ...action.payload } };
    default:
      return state;
  }
}

// const EditProfileSideBar = ({ selectedUserData,handleOnProfileUpdate,onClose })=> {
const EditProfileSideBar = (props) => {

  const [state, dispatch] = useReducer(reducer, initialState);
  const dispatch_ = useDispatch()
  const store = useSelector(store => store)
  const [image, setImage] = useState(null)
  const { success, error } = useSnackBar()
  const env = process.env.NODE_ENV || "development";
  const config = expressConfig[env];
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    jobTitle: '',
    comments: 0,
    status: '',
    pseudonym: '',
    mobile: '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
    picture: '',
    pages: []
  })

  useEffect(() => {
    const tempData = { ...data }
    tempData.firstName = helpers.nameDivider(props.selectedUserData.name).firstName
    tempData.lastName = helpers.nameDivider(props.selectedUserData.name).lastName
    tempData.email = props.selectedUserData.email
    // tempData.mobile = Number(props.selectedUserData.number)
    tempData.mobile = props.selectedUserData.number
    tempData.status = props.selectedUserData.status
    tempData.comments = props.selectedUserData?.agentlimitchatassign
    tempData.pseudonym = props.selectedUserData.pseudonym
    tempData.pages = JSON.parse(props.selectedUserData.pages)
    tempData.jobTitle = props.selectedUserData.designation.paneltype
    tempData.picture = props.selectedUserData.picture;

    setData({ ...tempData })
  }, [])

  //
  useEffect(() => {
    console.log("got the data from props: ", data)
    //
    setName(data.firstName + data.lastName)
    setPname(data.pseudonym ? data.pseudonym : "")
    setTitle(data.jobTitle ? data.jobTitle : "")
    setEmail(data.email ? data.email : "")
    setPhone(data.mobile ? data.mobile : "")
    setOldpass(data.oldPassword ? data.oldPassword : "")
    setNewpass(data.newPassword ? data.newPassword : "")
    setConpass(data.confirmPassword ? data.confirmPassword : "")
    setChatlimit(data.comments ? data.comments : "")
    setRoleLink(data.status ? data.status : "")
    //
  }, [data])
  //


  // get pages //
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

  useEffect(() => {
    document.title = "Add/Edit Users";
    window.Object.freeze = function (obj) { return obj } //keep_an_eye
    if (localStorage.getItem("ActiveUserdetail")) {
      getPages({
        variables: {
          mainSuperAdminId: JSON.parse(localStorage.getItem("ActiveUserdetail")).mainSuperAdminId,
        }
      });
    }

  }, [localStorage.getItem("ActiveUserdetail")]);
  // get pages //

  useEffect(() => {
    if (getPagesQueryResult && getPagesQueryResult.pages) {
      console.log("getPagesQueryResult: ",getPagesQueryResult)
      console.log("getPagesQueryResult.pages: ",getPagesQueryResult.pages)
      dispatch_(setAllPagesData(getPagesQueryResult.pages))
    }
  }, [getPagesQueryResult])

  const handleSave = async () => {
    const isValid = checkProfileValidation(data);
    if (isValid) {
      if (image) {
        // var reader = new FileReader();
        // reader.readAsDataURL(image);

        if (true) {
          await updateUser({
            variables: {
              id: props.selectedUserData.id,
              username: props.selectedUserData.username,
              name: data.firstName + ' ' + data.lastName,
              pseudonym: data.pseudonym,
              picture: image,
              jobTitle: data.jobTitle,
              email: props.selectedUserData.email,
              number: String(data.mobile),
              status: constants.status[data.status],
              agentlimitchatassign: Number(data.comments),
              designationId: props.selectedUserData.designation.id,
              managerId: props.selectedUserData.managerId?.id,
              pages: JSON.stringify(data.pages)
            },
          });
          props.onClose();
          props.handleOnProfileUpdate()
        }


        let imagedata = '';
        // reader.onload = async() => {
        //     imagedata = reader.result; //base64encoded string
        //     await updateUser({
        //         variables: {
        //             id: props.selectedUserData.id,
        //             username: props.selectedUserData.username,
        //             name: data.firstName + ' ' + data.lastName,
        //             pseudonym: data.pseudonym,
        //             picture: imagedata,
        //             jobTitle:data.jobTitle,
        //             email: props.selectedUserData.email,
        //             number: String(data.mobile),
        //             status: constants.status[data.status],
        //             agentlimitchatassign: Number(data.comments),
        //             designationId: props.selectedUserData.designation.id,
        //             managerId: props.selectedUserData.managerId?.id,
        //             pages: JSON.stringify(data.pages)

        //         },
        //     });
        //     props.onClose();
        //     props.handleOnProfileUpdate()

        // };
        // reader.onerror = error => {
        //     console.log("Error: ", error);
        // };

      }
      else {
        console.log(constants.status[data.status], "data.status");
        await updateUser({
          variables: {
            id: props.selectedUserData.id,
            username: props.selectedUserData.username,
            name: data.firstName + ' ' + data.lastName,
            pseudonym: data.pseudonym,
            jobTitle: data.jobTitle,
            email: props.selectedUserData.email,
            number: String(data.mobile),
            status: constants.status[data.status],
            agentlimitchatassign: Number(data.comments),
            designationId: props.selectedUserData.designation.id,
            managerId: props.selectedUserData.managerId?.id,
            pages: JSON.stringify(data.pages)
          },
        });
        props.onClose();
        props.handleOnProfileUpdate()
      }


    }
  }


  const handleUpdatePassword = () => {
    const isValid = checkPasswordValidation(data);
    if (isValid) {
      updatePassword({
        variables: {
          id: props.selectedUserData.id,
          oldPassword: data.oldPassword,
          password: data.newPassword
        }
      })
    }
  }

  const checkProfileValidation = (data) => {
    try {
      let invalidfield = [];
      const error = {};
      if (data.firstName.trim() === '') {
        error.firstName = "First name required"
        invalidfield.push("firstName")
      }
      if (data.lastName.trim() === '') {
        error.lastName = "Last name required"
        invalidfield.push("lastName")

      }
      if (data.jobTitle == null || data.jobTitle.length === 0) {
        error.jobTitle = "Job title required"
        invalidfield.push("jobtitle")

      }
      if (data.mobile === '') {
        error.mobile = "Mobile required"
        invalidfield.push("mobile")

      }
      if (data.pseudonym.trim() === '') {
        error.pseudonym = "Pseudonym required"
        invalidfield.push("pseudonym")

      }
      if (data.email.trim() === '') {
        invalidfield.push("email")
        error.email = "Email required"

      }
      dispatch({ type: "ON_ERROR", payload: error });
      if (invalidfield.length) {
        const firstfield = invalidfield[0];
        var el = document.getElementById(firstfield);
        el.scrollIntoView({
          behavior: "smooth",
          block: "center"
        })

      }

      return !Object.keys(error).length;
    } catch (error) {
      console.log(error)
    }
  }

  const checkPasswordValidation = (data) => {
    try {
      const error = {};
      if (data.oldPassword.trim() === '') {
        error.oldPassword = "Old password required"
      }
      if (data.newPassword.trim() === '') {
        error.newPassword = "New password required"
      }
      if (data.confirmPassword.trim() === '') {
        error.confirmPassword = "Confirm password required"
      }
      if (data.confirmPassword.trim() !== data.newPassword.trim()) {
        error.notmatch = "Confirm password & New password not match"
      }
      dispatch({ type: "ON_ERROR", payload: error });

      return !Object.keys(error).length;
    } catch (error) {
      console.log(error)
    }
  }

  // update user //
  const updateUserMutation = gql`
     mutation UpdateUser(
      $id: ID!
      $username: String!
      $name: String!
      $pseudonym: String
      $picture: String
      $email: String!
      $number: String
      $status: ID!
      $comments: String
      $designationId: ID!
      $managerId: ID
      $settings: String
      $agentlimitchatassign: Int
      $jobTitle:String
      $pages: String
    ) {
      updateuser(
        id: $id
        username: $username
        name: $name
        pseudonym: $pseudonym
        picture: $picture
        jobTitle:$jobTitle
        email: $email
        number: $number
        status: $status
        comments: $comments
        designationId: $designationId
        managerId: $managerId
        settings: $settings
        agentlimitchatassign: $agentlimitchatassign
        pages: $pages
      ) {
        success
        error
      }
    } `;
  const [
    updateUser,
    {
      loading: updateMutationLoading,
      error: updateMutationError,
      data: updateMutationResult,
    },
  ] = useMutation(updateUserMutation);
  // update user //

  // update password //
  const updatePasswordMutation = gql`
    mutation updatePassword(
      $id: ID!
      $password: String
      $oldPassword: String
) {
      updatePassword(
        id:$id
        password:$password
        oldPassword:$oldPassword

      ) {
      success
     error
     result
      }
}
`;
  const [
    updatePassword,
    {
      loading: updatePasswordMutationLoading,
      error: updatePasswordMutationError,
      data: updatePasswordMutationResult,
    },
  ] = useMutation(updatePasswordMutation);

  const handleChangeValue = (key, value) => {
    const tempData = { ...data };
    tempData[key] = value;
    setData(tempData)
  }
  // update password //

  const handleSelectOption = (value) => {
    handleChangeValue('status', value)
  }

  const handleAddPage = (id, flag) => {
    const tempData = { ...data };
    if (flag) {
      const isExist = tempData.pages.includes(id)
      if (!isExist) {
        tempData.pages.push(id)
      }
    }
    if (!flag) {
      const index = tempData.pages.findIndex(item => item.id == id)
      tempData.pages.splice(index, 1)
    }
    setData(tempData)
  }

  const handleSelectImage = async (e) => {


    const formData = new FormData();

    formData.append("file", e.target.files[0]);

    const data = await axios.post(
      `${config.graphql_domain}:${config.port}/uploads`,
      formData
    )

    setImage(data.data.filePath)
  }

  useEffect(() => {
    if (updatePasswordMutationError && updatePasswordMutationError) {
      error('Something went wrong')
    }
  }, [updatePasswordMutationError])

  useEffect(() => {

    if (updatePasswordMutationResult && updatePasswordMutationResult) {
      success('Invite sent successfully')
    }
  }, [updatePasswordMutationResult])

  useEffect(() => {
    if (updateMutationError && updateMutationError) {
      error('Something went wrong')
    }
  }, [updateMutationError])

  useEffect(() => {

    if (updateMutationResult && updateMutationResult) {
      success('Profile update successfully')
    }
  }, [updateMutationResult])

  const myRef = useRef()


  ///////////////////////////////////////////////////////////////////////////


  //
  console.log("in the edit panel:")
  console.log("selectedUserData:", props.selectedUserData)
  //
  const theme = useTheme();
  //
  const { classes } = useStyles();
  //
  const [name, setName] = useState(data.firstName + data.lastName)
  const [pname, setPname] = useState(data.pseudonym)
  const [title, setTitle] = useState(data.jobTitle)
  const [email, setEmail] = useState(data.email)
  const [phone, setPhone] = useState(data.mobile)
  const [oldpass, setOldpass] = useState(data.oldPassword)
  const [newpass, setNewpass] = useState(data.newPassword)
  const [conpass, setConpass] = useState(data.confirmPassword)
  const [chatlimit, setChatlimit] = useState(99)
  // const [status, setStatus] = React.useState('Active')
  //
  const [roleLink, setRoleLink] = useState(data.status)
  const [expanded, setExpanded] = useState(false)

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    console.log('submitted form')
    console.log({
      name,
      pname,
      title,
      email,
      phone,
      oldpass,
      newpass,
      conpass,
      chatlimit,
      roleLink,
    })
  }

  const fieldStyle = {
    root: {
      width: "180px"
    },
    // width: '260px',
    width: '100%',
    height: '25px',
    border: '0.0px solid #BDC0CC',
    borderRadius: '3px',
    padding: '0px',
    marginTop: '0px',
    marginBottom: '0px',
    //
    [theme.breakpoints.down('lg')]: {
      width: "180px",
    },
  }

  const fieldStyle2 = {
    // width: '125px',
    width: '100%',
    height: '25px',
    //
    border: '0.0px solid #BDC0CC',
    borderRadius: '3px',
    //
    padding: '0px',
    marginTop: '0px',
    marginBottom: '0px',
  }

  const fieldStyle3 = {
    // width: '125px',
    width: '100%',
    height: '25px',
    border: '0.0px solid #BDC0CC',
    borderRadius: '3px',
    padding: '0px',
    marginTop: '0px',
    marginBottom: '0px',
  }

  const fieldStylepass = {
    // width: '260px',
    width: '100%',
    height: '25px',
    border: '0.0px solid #BDC0CC',
    borderRadius: '3px',
    padding: '0px',
    marginTop: '5px',
    marginBottom: '0px',
  }



  ///////////////////////////////////////////////////////////////////////////






  const [selectedValue, setSelectedValue] = useState('value');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };




  return (
    <>
      <form onSubmit={handleSubmit}>
        {/* internal box after divider */}
        <Box className={classes.formBox}>

          <Box className={classes.profileSection}>

            {/* <Avatar
              alt="John Doe"
              src={image}
              sx={{ height: '80px', width: '80px' }}
            /> */}

            {data.picture ? <Avatar
              alt="John Doe"
              src={data.picture}
              sx={{ height: '80px', width: '80px' }}
            /> : <User height={80} width={80} color={['black']} />}


            <Typography
              variant="subtitle2" className={classes.username}>
              {/* Andrew Jones */}
              {data.firstName + data.lastName}
            </Typography>

            <Typography
              variant="subtitle2" className={classes.pseudonym}>
              {/* Walter White */}
              {data.pseudonym}
            </Typography>

            <Typography
              variant="subtitle2" className={classes.userrole}>
              {/* Agent */}
              {data.jobTitle}
            </Typography>
          </Box>

          <Typography
            variant="subtitle2" className={classes.infoText}>
            Personal info
          </Typography>

          <Typography
            variant="subtitle2" className={classes.text1}>
            Full name
          </Typography>

          <OutlinedInput
            className={classes.outlineName}
            style={fieldStyle}
            value={name}
            onChange={(event) => setName(event.target.value)}
            // fullWidth
            placeholder="Enter your full name"
            inputProps={{
              style: {
                // width: '260px',
                width: '100%',
                height: '12.5px',
                fontWeight: '400',
                fontFamily: 'poppins',
                fontSize: '10px',
                lineHeight: '15px',
                color: '#272525',
                // marginLeft: '5px',
                padding: "0",
                paddingLeft: "5px",
                //
                [theme.breakpoints.down('lg')]: {
                  width: "180px",
                  backgroundColor: "black"
                },
              }
            }}
          />



          <Box className={classes.rowBox}>
            <Box className={classes.rowBox1}>
              <Typography
                variant="subtitle2" className={classes.text2}>
                Pseudonym
              </Typography>

              <OutlinedInput
                className={classes.outlineName}
                style={fieldStyle2}
                value={pname}
                onChange={(event) => setPname(event.target.value)}
                fullWidth
                placeholder="Enter your Pseudonym"
                inputProps={{
                  //
                  classes: {
                    root: classes.responsiveness
                  },
                  //
                  disableUnderline: true,
                  style: {
                    // width: '125px',
                    width: '100%',
                    height: '12.5px',
                    //
                    fontWeight: '400',
                    fontFamily: 'poppins',
                    fontSize: '10px',
                    lineHeight: '15px',
                    color: '#272525',
                    marginLeft: '5px',
                    //
                    padding: "0",
                    paddingLeft: "5px",
                  },
                }}
              />
            </Box>

            <Box className={classes.rowBox2}>
              <Typography
                variant="subtitle2" className={classes.text3}>
                Job title
              </Typography>

              <OutlinedInput
                className={classes.outlineName}
                style={fieldStyle3}
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                fullWidth
                placeholder="Enter your job title"
                inputProps={{
                  //
                  classes: {
                    root: classes.responsiveness
                  },
                  //
                  disableUnderline: true,
                  style: {
                    // width: '125px',
                    width: '100%',
                    height: '12.5px',
                    //
                    fontWeight: '400',
                    fontFamily: 'poppins',
                    fontSize: '10px',
                    lineHeight: '15px',
                    color: '#272525',
                    marginLeft: '5px',
                    //
                    padding: "0",
                    paddingLeft: "5px"
                  },
                }}
              />
            </Box>
          </Box>

          <Typography
            variant="subtitle2" className={classes.text4}>
            Email
          </Typography>

          <OutlinedInput
            className={classes.outlineName}
            style={fieldStyle}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            fullWidth
            placeholder="Enter your email address"
            inputProps={{
              //
              classes: {
                root: classes.responsiveness
              },
              //
              disableUnderline: true,
              style: {
                // width: '260px',
                width: '100%',
                height: '12.5px',
                //
                fontWeight: '400',
                fontFamily: 'poppins',
                fontSize: '10px',
                lineHeight: '15px',
                color: '#272525',
                marginLeft: '5px',
                //
                padding: "0",
                paddingLeft: "5px"
              },
            }}
          />

          <Typography
            variant="subtitle2" className={classes.text5}>
            Phone number
          </Typography>

          <OutlinedInput
            className={classes.outlineName}
            style={fieldStyle}
            type="number"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            fullWidth
            placeholder="Enter your contact number"
            inputProps={{
              //
              classes: {
                root: classes.responsiveness
              },
              //
              disableUnderline: true,
              style: {
                // width: '260px',
                width: '100%',
                height: '12.5px',
                //
                fontWeight: '400',
                fontFamily: 'poppins',
                fontSize: '10px',
                lineHeight: '15px',
                color: '#272525',
                marginLeft: '5px',
                //
                padding: "0",
                paddingLeft: "5px"
              },
            }}
          />

          {/* password */}
          <Typography
            variant="subtitle2" className={classes.text6}>
            Change password
          </Typography>

          <OutlinedInput
            className={classes.outlinedInput}
            style={fieldStylepass}
            value={oldpass}
            onChange={(event) => setOldpass(event.target.value)}
            fullWidth
            placeholder="Enter your old password"
            inputProps={{
              //
              classes: {
                root: classes.responsiveness
              },
              //
              disableUnderline: true,
              style: {
                // width: '260px',
                width: '260px',
                height: '12.5px',
                //
                fontWeight: '400',
                fontFamily: 'poppins',
                fontSize: '10px',
                lineHeight: '15px',
                color: '#272525',
                //
                padding: "0",
                paddingLeft: "5px"
              },
            }}
          />

          <OutlinedInput
            className={classes.outlinedInput}
            style={fieldStylepass}
            value={newpass}
            onChange={(event) => setNewpass(event.target.value)}
            fullWidth
            placeholder="Enter your new password"
            inputProps={{
              //
              classes: {
                root: classes.responsiveness
              },
              //
              disableUnderline: true,
              style: {
                width: '260px',
                height: '12.5px',
                //
                fontWeight: '400',
                fontFamily: 'poppins',
                fontSize: '10px',
                lineHeight: '15px',
                color: '#272525',
                //
                padding: "0",
                paddingLeft: "5px"
              },
            }}
          />

          <OutlinedInput
            className={classes.outlinedInput}
            style={fieldStylepass}
            value={conpass}
            onChange={(event) => setConpass(event.target.value)}
            fullWidth
            placeholder="Re-enter your new password"
            inputProps={{
              //
              classes: {
                root: classes.responsiveness
              },
              //
              disableUnderline: true,
              style: {
                width: '260px',
                height: '12.5px',
                //
                fontWeight: '400',
                fontFamily: 'poppins',
                fontSize: '10px',
                lineHeight: '15px',
                color: '#272525',
                //
                padding: "0",
                paddingLeft: "5px"
              },
            }}
          />

          {/* password */}

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              //
              [theme.breakpoints.down('lg')]: {
                justifyContent: 'center',
              },
              //
              marginTop: '7px',
            }}
          >
            <Button
              // onClick={handleClose}
              variant="contained"
              color="primary"
              type="submit"
              className={classes.cancelButton}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              type="submit" className={classes.submitButton}>
              Submit
            </Button>
          </Box>

          <Typography
            variant="subtitle2"
            className={classes.chatLimitStyle}
          >
            Chat limit
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              type="number"
              //
              value={chatlimit}
              onChange={(event) => setChatlimit(Number(event.target.value))}
              //
              inputProps={{ min: 0, max: 100 }}
              //
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
              variant="subtitle2" className={classes.concurrentChatStyle}>
              Concurrent chat
            </Typography>
          </Box>

          <Typography
            variant="subtitle2" className={classes.selectText}>
            Select status
          </Typography>

          <Select
            // className={classes.selectButton}
            //
            style={{
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
            }}
            //
            value={roleLink}
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
              className={classes.menuItem}
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
              className={classes.menuItem}
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
              className={classes.menuItem}
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
                  style={{
                    width: '9.8px',
                    height: '9.8px',
                    color: '#272525',
                  }}
                />
              ) : (
                <AddIcon
                  style={{
                    width: '9.8px',
                    height: '9.8px',
                    color: '#272525',
                  }}
                />
              )}
            </Box>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <Box className={classes.collapseBox}>

                {/* <div
                  style={{ height: '250px' }}
                  className='bg-white overflow-auto shadow-sm border rounded w-75 px-2 scrollspy-example'>
                  {store.AdminDataReducer.allpagesdata.length > 0 &&
                    store.AdminDataReducer.allpagesdata.map((item, index) => {
                      const isSelected = data.pages.includes(item.pageId)
                      return (
                        <div className='d-flex align-self-center'>
                          <input onChange={() => handleAddPage(item.pageId, isSelected ? false : true)} checked={isSelected} type="checkbox" className='input-check-user-module align-self-center mx-1 p-1' />
                          <p className='first-character-display font-small text-white m-0 border rounded-circle  bg-success m-1'>ZA</p>
                          <p className='m-0 align-self-center font-small'>{item.name}</p>
                        </div>
                      )
                    })}
                </div> */}

                {store.AdminDataReducer.allpagesdata.length > 0 &&
                  store.AdminDataReducer.allpagesdata.map((item, index) => {
                    const isSelected = data.pages.includes(item.pageId)
                    return (
                      <Box>
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                          }}
                        >
                          <input onChange={() => {handleAddPage(item.pageId, isSelected ? false : true);console.log("pageItem:",item)}} checked={isSelected} type="radio" style={{marginRight:"10px"}}/>
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
                            {item.name}
                          </Typography>
                        </Box>
                        <Divider sx={{marginTop:"5px",marginBottom:"5px"}}/>
                      </Box>
                    )
                  })}


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
                    variant="subtitle2" className={classes.collapseBoxText}>
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
                    variant="subtitle2" className={classes.collapseBoxText}>
                    Tele-Communication Providers
                  </Typography>
                </Box> */}
              </Box>
            </Collapse>
          </Box>
          {/* internal box ending */}
        </Box>
      </form>
    </>
    // <div class="modal fade show zIndex-10000 display-block "
    //     onClick={() => {
    //         myRef.current && myRef.current.handleCloseSelect()
    //     }}
    //     style={{ background: 'rgb(110 110 110 / 50%)' }}
    //     id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    //     <div class="modal-dialog  m-0 float-end  h-100" role="document" style={{
    //         width: '30%'
    //     }}>
    //         <div class="modal-content border-0 shadow-sm">
    //             <div class="modal-body p-0">
    //                 <div class="bg-white px-16 py-14 rounded-md">
    //                     <div className='d-flex justify-content-between px-4 py-2'>
    //                         <h5 style={{ color: constants.theme.gray }}>Edit Profile</h5>
    //                         <div onClick={props.onClose} className="cursor-pointer">
    //                             <Close color={constants.theme.gray} /></div>
    //                     </div>
    //                     <div className='d-flex px-5 py-2'>
    //                         <div>
    //                             <div className='border border-white cursor-pointer' style={{
    //                                 position: 'absolute',
    //                                 zIndex: 10000,
    //                                 margin: '0px 62px',
    //                                 borderRadius: '16px',
    //                                 backgroundColor: constants.theme.lightestGray
    //                             }}>
    //                                 <Add />
    //                             </div>
    //                             <div className=' cursor-pointer' style={{
    //                                 position: 'absolute',
    //                                 width: '29px',
    //                                 zIndex: 10000,
    //                                 opacity: '0',
    //                                 margin: '0px 60px',
    //                             }}>
    //                                 <input type="file" onChange={handleSelectImage} />
    //                             </div>
    //                             {image ? <img style={{
    //                                 height: '80px',
    //                                 width: '80px',
    //                                 borderRadius: '50%',
    //                             }} className="" src={image} />:data.picture ?<img style={{
    //                                 height: '80px',
    //                                 width: '80px',
    //                                 borderRadius: '50%',
    //                             }} className="" src={data.picture} />:<User
    //                             height={86} width={86}
    //                             color={[constants.theme.gray, 'black']} />}

    //                         </div>
    //                         <div className='mx-3 align-self-center w-75'>
    //                             <h5 className='m-0'>{data.firstName + ' ' + data.lastName}</h5>
    //                             <span className='font-small' style={{ color: constants.theme.gray }}>Manage your personal information password and more</span>
    //                         </div>
    //                     </div>
    //                     <div className='px-5 py-2'>
    //                         <p className='my-2 fw-bold px-2'>Personal info</p>
    //                         <div className='d-flex'>
    //                             <div id="firstName" className='py-3 px-2'>
    //                                 <SingleInput placeHolder="Firs Name"
    //                                     onChange={(e) => handleChangeValue('firstName', e.target.value)}
    //                                     class="m-0" value={data.firstName} />
    //                                 {state.error.firstName && <p className='font-small m-0 text-danger'>{state.error.firstName}</p>}
    //                             </div>
    //                             <div id='lastName' className='py-3 px-2'>
    //                                 <SingleInput placeHolder="Last Name" onChange={(e) => handleChangeValue('lastName', e.target.value)} class="m-0" value={data.lastName} />
    //                                 {state.error.lastName && <p className='font-small m-0 text-danger'>{state.error.lastName}</p>}
    //                             </div>
    //                         </div>
    //                         <div id='pseudonym' className='d-flex'>
    //                             <div className='py-3 px-2'>
    //                                 <SingleInput placeHolder="Pseudonym" onChange={(e) => handleChangeValue('pseudonym', e.target.value)} class="m-0" value={data.pseudonym} inputClass="font-small" />
    //                                 {state.error.pseudonym && <p className='font-small m-0 text-danger'>{state.error.pseudonym}</p>}
    //                             </div>
    //                             <div id='jobtitle' className='py-3 px-2'>
    //                                 <SingleInput placeHolder="Job Title" onChange={(e) => handleChangeValue('jobTitle', e.target.value)} value={data.jobTitle} class="m-0" inputClass="font-small" />
    //                                 {state.error.jobTitle && <p className='font-small m-0 text-danger'>{state.error.jobTitle}</p>}
    //                             </div>
    //                         </div>
    //                         <div className='d-flex'>
    //                             <div id='email' className='py-3 px-2 w-50'>
    //                                 <SingleInput disabled={true} placeHolder="Email"
    //                                     onChange={(e) => handleChangeValue('email', e.target.value)} value={data.email} class="m-0" inputClass="font-small" />
    //                                 {state.error.email && <p className='font-small m-0 text-danger'>{state.error.email}</p>}
    //                             </div>
    //                             <div id='mobile' className='py-3 px-2 w-50'>
    //                                 <SingleInput placeHolder="Mobile"
    //                                     type="number"
    //                                     onChange={(e) => handleChangeValue('mobile', e.target.value)}
    //                                     value={data.mobile} class="m-0"
    //                                     inputClass="font-small" />
    //                                 {state.error.mobile && <p className='font-small m-0 text-danger'>{state.error.mobile}</p>}
    //                             </div>
    //                         </div>
    //                     </div>
    //                     <div className='px-5 py-2'>
    //                         <p className='my-2 fw-bold px-2'>Change password</p>
    //                         <div className='d-flex'>
    //                             <div className='py-3 px-2'>
    //                                 <SingleInput
    //                                     onChange={(e) => handleChangeValue('oldPassword', e.target.value)}
    //                                     placeHolder="old password" type="password"
    //                                     inputClass="font-small" />
    //                                 {state.error.oldPassword && <p className='font-small m-0 text-danger'>{state.error.oldPassword}</p>}
    //                             </div>
    //                         </div>
    //                         <div className='d-flex'>
    //                             <div className='py-3 px-2'>
    //                                 <SingleInput onChange={(e) => handleChangeValue('newPassword', e.target.value)} placeHolder="new password" type="password" inputClass="font-small" />
    //                                 {state.error.newPassword && <p className='font-small m-0 text-danger'>{state.error.newPassword}</p>}
    //                             </div>
    //                         </div>
    //                         <div className='d-flex'>
    //                             <div className='py-3 px-2'>
    //                                 <SingleInput onChange={(e) => handleChangeValue('confirmPassword', e.target.value)} placeHolder="confirm password" type="password" inputClass="font-small" />
    //                                 {state.error.confirmPassword && <p className='font-small m-0 text-danger'>{state.error.confirmPassword}</p>}
    //                                 {state.error.notmatch && <p className='font-small m-0 text-danger'>{state.error.notmatch}</p>}
    //                             </div>
    //                         </div>
    //                     </div>
    //                     <div className='d-flex justify-content-end px-3'>
    //                         <Button class="mx-2 py-2" text="Cancel" isTransparent={true} />
    //                         <Button
    //                             isLoading={updatePasswordMutationLoading}
    //                             isDisabled={updatePasswordMutationLoading}
    //                             text="Change Password" class="py-2" onClick={handleUpdatePassword} bgColor={constants.theme.green} color="light" />
    //                     </div>
    //                     <div className='px-5 py-2'>
    //                         <p className='my-2 fw-bold px-2'>Chat limit</p>
    //                     </div>
    //                     <div className='d-flex align-self-center px-5 py-2'>
    //                         <div className='d-flex py-3 px-2'>
    //                             <SingleInput
    //                                 onChange={(e) => handleChangeValue('comments', e.target.value)}
    //                                 isBorder={false} type="number"
    //                                 value={data.comments}
    //                                 isLabel={false} placeHolder="0"
    //                                 class='w-25 border-1 rounded' style={{
    //                                     border: `1px solid ${constants.theme.green}`
    //                                 }} />
    //                             <p className='m-0 align-self-center font-small px-2'>Concurrent chat</p>
    //                         </div>
    //                     </div>
    //                     <div className='px-5 py-2'>
    //                         <div className='d-flex'>
    //                             <p className='my-2 fw-bold'>Selected status</p>
    //                         </div>
    //                         <StatusSelectDropDown
    //                             ref={myRef}
    //                             value={data.status}
    //                             handleSelectOption={handleSelectOption} />
    //                     </div>
    //                     <div className='px-5 py-2'>
    //                         <p className='my-2 fw-bold'>Chat channels</p>
    //                         <div
    //                             style={{ height: '250px' }}
    //                             className='bg-white overflow-auto shadow-sm border rounded w-75 px-2 scrollspy-example'>
    //                             {store.AdminDataReducer.allpagesdata.length > 0 &&
    //                                 store.AdminDataReducer.allpagesdata.map((item, index) => {
    //                                     const isSelected = data.pages.includes(item.pageId)
    //                                     return (
    //                                         <div className='d-flex align-self-center'>
    //                                             <input onChange={() => handleAddPage(item.pageId, isSelected ? false : true)} checked={isSelected} type="checkbox" className='input-check-user-module align-self-center mx-1 p-1' />
    //                                             <p className='first-character-display font-small text-white m-0 border rounded-circle  bg-success m-1'>ZA</p>
    //                                             <p className='m-0 align-self-center font-small'>{item.name}</p>
    //                                         </div>
    //                                     )
    //                                 })}
    //                         </div>
    //                     </div>
    //                     <div className=''>
    //                         <Button
    //                             isDisabled={updateMutationLoading}
    //                             isLoading={updateMutationLoading} text="Save"
    //                             onClick={handleSave} class="w-100 m-0 p-0 py-2" color="white" />
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // </div >
  );
}

export default React.memo(EditProfileSideBar);







// import { useTheme } from '@mui/material/styles';
// import * as React from 'react'
// import { Box } from '@mui/material'
// import Typography from '@mui/material/Typography'
// //
// import { Avatar } from '@mui/material'
// //
// import image from '../../../../../src/assets/img/profile.jpg'
// //
// import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
// //
// import AddIcon from '@mui/icons-material/Add'
// import RemoveIcon from '@mui/icons-material/Remove'
// import FormControlLabel from '@mui/material/FormControlLabel'
// import Radio from '@mui/material/Radio'
// import Button from '@mui/material/Button'
// //
// import { FormEvent } from 'react'
// //
// import TextField from '@mui/material/TextField'
// import MenuItem from '@mui/material/MenuItem'
// import Select from '@mui/material/Select'
// import Collapse from '@mui/material/Collapse'
// //
// import { OutlinedInput } from '@mui/material';
// //
// import useStyles from './Styles'

// const RightPanel = ({ selectedUserData,handleOnProfileUpdate,onClose }) => {
//   //
//   console.log("in the edit panel:")
//   console.log("selectedUserData:",selectedUserData)
//   //
//   const theme = useTheme();
//   //
//   const { classes } = useStyles();
//   //
//   const [name, setName] = React.useState('Andrew Jones')
//   const [pname, setPname] = React.useState('Walter White')
//   const [title, setTitle] = React.useState('Agent')
//   const [email, setEmail] = React.useState('andrewjones.99@kuikwit.com')
//   const [phone, setPhone] = React.useState('510-323-6452')
//   const [oldpass, setOldpass] = React.useState('')
//   const [newpass, setNewpass] = React.useState('')
//   const [conpass, setConpass] = React.useState('')
//   const [chatlimit, setChatlimit] = React.useState(99)
//   // const [status, setStatus] = React.useState('Active')
//   //
//   const [roleLink, setRoleLink] = React.useState('')
//   const [expanded, setExpanded] = React.useState(false)

//   const handleSubmit = (event: FormEvent) => {
//     event.preventDefault()
//     console.log('submitted form')
//     console.log({
//       name,
//       pname,
//       title,
//       email,
//       phone,
//       oldpass,
//       newpass,
//       conpass,
//       chatlimit,
//       roleLink,
//     })
//   }

//   const fieldStyle = {
//     root: {
//       width: "180px"
//     },
//     // width: '260px',
//     width: '100%',
//     height: '25px',
//     border: '0.0px solid #BDC0CC',
//     borderRadius: '3px',
//     padding: '0px',
//     marginTop: '0px',
//     marginBottom: '0px',
//     //
//     [theme.breakpoints.down('lg')]: {
//       width: "180px",
//     },
//   }

//   const fieldStyle2 = {
//     // width: '125px',
//     width: '100%',
//     height: '25px',
//     //
//     border: '0.0px solid #BDC0CC',
//     borderRadius: '3px',
//     //
//     padding: '0px',
//     marginTop: '0px',
//     marginBottom: '0px',
//   }

//   const fieldStyle3 = {
//     // width: '125px',
//     width: '100%',
//     height: '25px',
//     border: '0.0px solid #BDC0CC',
//     borderRadius: '3px',
//     padding: '0px',
//     marginTop: '0px',
//     marginBottom: '0px',
//   }

//   const fieldStylepass = {
//     // width: '260px',
//     width: '100%',
//     height: '25px',
//     border: '0.0px solid #BDC0CC',
//     borderRadius: '3px',
//     padding: '0px',
//     marginTop: '5px',
//     marginBottom: '0px',
//   }

//   return (
    // <>
    //   <form onSubmit={handleSubmit}>
    //     {/* internal box after divider */}
    //     <Box className={classes.formBox}>

    //       <Box className={classes.profileSection}>

    //         <Avatar
    //           alt="John Doe"
    //           src={image}
    //           sx={{ height: '80px', width: '80px' }}
    //         />

    //         <Typography
    //           variant="subtitle2" className={classes.username}>
    //           Andrew Jones
    //         </Typography>

    //         <Typography
    //           variant="subtitle2" className={classes.pseudonym}>
    //           Walter White
    //         </Typography>

    //         <Typography
    //           variant="subtitle2" className={classes.userrole}>
    //           Agent
    //         </Typography>
    //       </Box>

    //       <Typography
    //         variant="subtitle2" className={classes.infoText}>
    //         Personal info
    //       </Typography>

    //       <Typography
    //         variant="subtitle2" className={classes.text1}>
    //         Full name
    //       </Typography>

    //       <OutlinedInput
    //         style={fieldStyle}
    //         value={name}
    //         onChange={(event) => setName(event.target.value)}
    //         // fullWidth
    //         placeholder="Enter your full name"
    //         inputProps={{
    //           style: {
    //             width: '260px',
    //             height: '12.5px',
    //             fontWeight: '400',
    //             fontFamily: 'poppins',
    //             fontSize: '10px',
    //             lineHeight: '15px',
    //             color: '#272525',
    //             // marginLeft: '5px',
    //             padding: "0",
    //             paddingLeft: "5px",
    //             //
    //             [theme.breakpoints.down('lg')]: {
    //               width: "180px",
    //               backgroundColor: "black"
    //             },
    //           }
    //         }}
    //       />



    //       <Box className={classes.rowBox}>
    //         <Box className={classes.rowBox1}>
    //           <Typography
    //             variant="subtitle2" className={classes.text2}>
    //             Pseudonym
    //           </Typography>

    //           <OutlinedInput
    //             style={fieldStyle2}
    //             value={pname}
    //             onChange={(event) => setPname(event.target.value)}
    //             fullWidth
    //             placeholder="Enter your Pseudonym"
    //             inputProps={{
    //               //
    //               classes: {
    //                 root: classes.responsiveness
    //               },
    //               //
    //               disableUnderline: true,
    //               style: {
    //                 width: '125px',
    //                 height: '12.5px',
    //                 //
    //                 fontWeight: '400',
    //                 fontFamily: 'poppins',
    //                 fontSize: '10px',
    //                 lineHeight: '15px',
    //                 color: '#272525',
    //                 marginLeft: '5px',
    //                 //
    //                 padding: "0",
    //                 paddingLeft: "5px",
    //               },
    //             }}
    //           />
    //         </Box>

    //         <Box className={classes.rowBox2}>
    //           <Typography
    //             variant="subtitle2" className={classes.text3}>
    //             Job title
    //           </Typography>

    //           <OutlinedInput
    //             style={fieldStyle3}
    //             value={title}
    //             onChange={(event) => setTitle(event.target.value)}
    //             fullWidth
    //             placeholder="Enter your job title"
    //             inputProps={{
    //               //
    //               classes: {
    //                 root: classes.responsiveness
    //               },
    //               //
    //               disableUnderline: true,
    //               style: {
    //                 // width: '125px',
    //                 width: '100%',
    //                 height: '12.5px',
    //                 //
    //                 fontWeight: '400',
    //                 fontFamily: 'poppins',
    //                 fontSize: '10px',
    //                 lineHeight: '15px',
    //                 color: '#272525',
    //                 marginLeft: '5px',
    //                 //
    //                 padding: "0",
    //                 paddingLeft: "5px"
    //               },
    //             }}
    //           />
    //         </Box>
    //       </Box>

    //       <Typography
    //         variant="subtitle2" className={classes.text4}>
    //         Email
    //       </Typography>

    //       <OutlinedInput
    //         style={fieldStyle}
    //         value={email}
    //         onChange={(event) => setEmail(event.target.value)}
    //         fullWidth
    //         placeholder="Enter your email address"
    //         inputProps={{
    //           //
    //           classes: {
    //             root: classes.responsiveness
    //           },
    //           //
    //           disableUnderline: true,
    //           style: {
    //             width: '260px',
    //             height: '12.5px',
    //             //
    //             fontWeight: '400',
    //             fontFamily: 'poppins',
    //             fontSize: '10px',
    //             lineHeight: '15px',
    //             color: '#272525',
    //             marginLeft: '5px',
    //             //
    //             padding: "0",
    //             paddingLeft: "5px"
    //           },
    //         }}
    //       />

    //       <Typography
    //         variant="subtitle2" className={classes.text5}>
    //         Phone number
    //       </Typography>

    //       <OutlinedInput
    //         style={fieldStyle}
    //         value={phone}
    //         onChange={(event) => setPhone(event.target.value)}
    //         fullWidth
    //         placeholder="Enter your contact number"
    //         inputProps={{
    //           //
    //           classes: {
    //             root: classes.responsiveness
    //           },
    //           //
    //           disableUnderline: true,
    //           style: {
    //             width: '260px',
    //             height: '12.5px',
    //             //
    //             fontWeight: '400',
    //             fontFamily: 'poppins',
    //             fontSize: '10px',
    //             lineHeight: '15px',
    //             color: '#272525',
    //             marginLeft: '5px',
    //             //
    //             padding: "0",
    //             paddingLeft: "5px"
    //           },
    //         }}
    //       />

    //       {/* password */}
    //       <Typography
    //         variant="subtitle2" className={classes.text6}>
    //         Change password
    //       </Typography>

    //       <OutlinedInput
    //         className={classes.outlinedInput}
    //         style={fieldStylepass}
    //         value={oldpass}
    //         onChange={(event) => setOldpass(event.target.value)}
    //         fullWidth
    //         placeholder="Enter your old password"
    //         inputProps={{
    //           //
    //           classes: {
    //             root: classes.responsiveness
    //           },
    //           //
    //           disableUnderline: true,
    //           style: {
    //             // width: '260px',
    //             width: '260px',
    //             height: '12.5px',
    //             //
    //             fontWeight: '400',
    //             fontFamily: 'poppins',
    //             fontSize: '10px',
    //             lineHeight: '15px',
    //             color: '#272525',
    //             //
    //             padding: "0",
    //             paddingLeft: "5px"
    //           },
    //         }}
    //       />

    //       <OutlinedInput
    //         className={classes.outlinedInput}
    //         style={fieldStylepass}
    //         value={newpass}
    //         onChange={(event) => setNewpass(event.target.value)}
    //         fullWidth
    //         placeholder="Enter your new password"
    //         inputProps={{
    //           //
    //           classes: {
    //             root: classes.responsiveness
    //           },
    //           //
    //           disableUnderline: true,
    //           style: {
    //             width: '260px',
    //             height: '12.5px',
    //             //
    //             fontWeight: '400',
    //             fontFamily: 'poppins',
    //             fontSize: '10px',
    //             lineHeight: '15px',
    //             color: '#272525',
    //             //
    //             padding: "0",
    //             paddingLeft: "5px"
    //           },
    //         }}
    //       />

    //       <OutlinedInput
    //         className={classes.outlinedInput}
    //         style={fieldStylepass}
    //         value={conpass}
    //         onChange={(event) => setConpass(event.target.value)}
    //         fullWidth
    //         placeholder="Re-enter your new password"
    //         inputProps={{
    //           //
    //           classes: {
    //             root: classes.responsiveness
    //           },
    //           //
    //           disableUnderline: true,
    //           style: {
    //             width: '260px',
    //             height: '12.5px',
    //             //
    //             fontWeight: '400',
    //             fontFamily: 'poppins',
    //             fontSize: '10px',
    //             lineHeight: '15px',
    //             color: '#272525',
    //             //
    //             padding: "0",
    //             paddingLeft: "5px"
    //           },
    //         }}
    //       />

    //       {/* password */}

    //       <Box
    //         sx={{
    //           display: 'flex',
    //           justifyContent: 'flex-end',
    //           //
    //           [theme.breakpoints.down('lg')]: {
    //             justifyContent: 'center',
    //           },
    //           //
    //           marginTop: '7px',
    //         }}
    //       >
    //         <Button
    //           // onClick={handleClose}
    //           variant="contained"
    //           color="primary"
    //           type="submit"
    //           className={classes.cancelButton}
    //         >
    //           Cancel
    //         </Button>
    //         <Button
    //           variant="contained"
    //           color="primary"
    //           type="submit" className={classes.submitButton}>
    //           Submit
    //         </Button>
    //       </Box>

    //       <Typography
    //         variant="subtitle2"
    //         className={classes.chatLimitStyle}
    //       >
    //         Chat limit
    //       </Typography>

    //       <Box sx={{ display: 'flex', alignItems: 'center' }}>
    //         <TextField
    //           type="number"
    //           //
    //           value={chatlimit}
    //           onChange={(event) => setChatlimit(Number(event.target.value))}
    //           //
    //           inputProps={{ min: 0, max: 100 }}
    //           //
    //           InputProps={{
    //             disableUnderline: true,
    //             inputProps: {
    //               style: {
    //                 padding: '4px 0px 4px 5px',
    //                 width: '40px',
    //                 height: '20px',
    //               },
    //             },
    //           }}
    //         />
    //         <Typography
    //           variant="subtitle2" className={classes.concurrentChatStyle}>
    //           Concurrent chat
    //         </Typography>
    //       </Box>

    //       <Typography
    //         variant="subtitle2" className={classes.selectText}>
    //         Select status
    //       </Typography>

    //       <Select
    //         // className={classes.selectButton}
    //         //
    //         style={{
    //           border: '0.5px solid #E8E8E8',
    //           color: '#777777',
    //           width: '100px',
    //           height: '25px',
    //           borderRadius: '3px',
    //           paddingLeft: '7px',
    //           fontFamily: 'poppins',
    //           fontSize: '10px',
    //           lineHeight: '15px',
    //           fontWeight: '400',
    //         }}
    //         //
    //         value={roleLink}
    //         onChange={(event) => setRoleLink(event.target.value)}
    //         fullWidth
    //         displayEmpty
    //         inputProps={{
    //           disableUnderline: true,
    //           style: { borderBottom: 'none' },
    //         }} //
    //         disableUnderline
    //       //
    //       >
    //         <MenuItem
    //           value=""
    //           disabled
    //           style={{ color: 'red', display: 'none' }}
    //         >
    //           <FiberManualRecordIcon
    //             style={{
    //               color: '#00BA34',
    //               width: '5px',
    //               height: '5px',
    //               marginRight: '5px',
    //             }}
    //           />
    //           Active
    //         </MenuItem>
    //         <MenuItem
    //           value="Active"
    //           className={classes.menuItem}
    //         >
    //           <FiberManualRecordIcon
    //             style={{
    //               color: '#00BA34',
    //               width: '5px',
    //               height: '5px',
    //               marginRight: '5px',
    //             }}
    //           />
    //           Active
    //         </MenuItem>
    //         <MenuItem
    //           value="Suspended"
    //           className={classes.menuItem}
    //         >
    //           <FiberManualRecordIcon
    //             style={{
    //               color: '#FF8A00',
    //               width: '5px',
    //               height: '5px',
    //               marginRight: '5px',
    //             }}
    //           />
    //           Suspended
    //         </MenuItem>
    //         <MenuItem
    //           value="Block"
    //           className={classes.menuItem}
    //         >
    //           <FiberManualRecordIcon
    //             style={{
    //               color: '#E34D59',
    //               width: '5px',
    //               height: '5px',
    //               marginRight: '5px',
    //             }}
    //           />
    //           Block
    //         </MenuItem>
    //       </Select>

    //       <Box>
    //         <Box
    //           sx={{
    //             display: 'flex',
    //             justifyContent: 'space-between',
    //             marginTop: '20px',
    //             cursor: 'pointer',
    //           }}
    //           onClick={() => setExpanded(!expanded)}
    //         >
    //           <Typography
    //             variant="subtitle2" className={classes.collapseText}>
    //             Chat Channels
    //           </Typography>{' '}
    //           {expanded ? (
    //             <RemoveIcon
    //               style={{
    //                 width: '9.8px',
    //                 height: '9.8px',
    //                 color: '#272525',
    //               }}
    //             />
    //           ) : (
    //             <AddIcon
    //               style={{
    //                 width: '9.8px',
    //                 height: '9.8px',
    //                 color: '#272525',
    //               }}
    //             />
    //           )}
    //         </Box>
    //         <Collapse in={expanded} timeout="auto" unmountOnExit>
    //           <Box className={classes.collapseBox}>
    //             {/* one entry */}
    //             <Box
    //               sx={{
    //                 display: 'flex',
    //                 justifyContent: 'flex-start',
    //                 alignItems: 'center',
    //               }}
    //             >
    //               <FormControlLabel
    //                 sx={{ marginRight: '0px' }}
    //                 label=""
    //                 control={<Radio size="small" sx={{ fontSize: '10px' }} />}
    //               />
    //               <Avatar
    //                 alt="John Doe"
    //                 src={image}
    //                 sx={{ height: '20px', width: '20px' }}
    //               />
    //               <Typography
    //                 variant="subtitle2"
    //                 className={classes.collapseBoxText}
    //               >
    //                 Internet deals
    //               </Typography>
    //             </Box>
    //             {/* second entry */}
    //             <Box
    //               sx={{
    //                 display: 'flex',
    //                 justifyContent: 'flex-start',
    //                 alignItems: 'center',
    //               }}
    //             >
    //               <FormControlLabel
    //                 sx={{ marginRight: '0px' }}
    //                 label=""
    //                 control={<Radio size="small" sx={{ fontSize: '10px' }} />}
    //               />
    //               <Avatar
    //                 alt="John Doe"
    //                 src={image}
    //                 sx={{ height: '20px', width: '20px' }}
    //               />
    //               <Typography
    //                 variant="subtitle2" className={classes.collapseBoxText}>
    //                 Tele-Communication Providers
    //               </Typography>
    //             </Box>
    //             {/* third entry */}
    //             <Box
    //               sx={{
    //                 display: 'flex',
    //                 justifyContent: 'flex-start',
    //                 alignItems: 'center',
    //               }}
    //             >
    //               <FormControlLabel
    //                 sx={{ marginRight: '0px' }}
    //                 label=""
    //                 control={<Radio size="small" sx={{ fontSize: '10px' }} />}
    //               />
    //               <Avatar
    //                 alt="John Doe"
    //                 src={image}
    //                 sx={{ height: '20px', width: '20px' }}
    //               />
    //               <Typography
    //                 variant="subtitle2" className={classes.collapseBoxText}>
    //                 Tele-Communication Providers
    //               </Typography>
    //             </Box>
    //           </Box>
    //         </Collapse>
    //       </Box>
    //       {/* internal box ending */}
    //     </Box>
    //   </form>
    // </>
//   )
// }

// export default RightPanel
