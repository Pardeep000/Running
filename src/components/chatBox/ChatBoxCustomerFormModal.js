import React, { useEffect, useRef, useState } from "react";
import {
  Container,
  CircularProgress,
  Radio,
  FormControlLabel,
  Typography,
  RadioGroup,
  Button,
  FormControl,
  IconButton,
} from "@material-ui/core";
import Leadformautocomplete from "./Leadformautocomplete";
import ValidationTextField from "../../otherComponents/ValidationTextField";
import ValidationSelectField from "../../otherComponents/ValidationSelectField";
import { makeStyles } from "@material-ui/core/styles";
import { setChatBoxCustomerFormData } from "../../store/actions/ChatBoxActions";
import _, { cloneDeep } from "lodash";
import { Rnd } from "react-rnd";
import { connect } from "react-redux";
import CloseIcon from "@material-ui/icons/Close";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import { gql } from "apollo-boost";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import { useSnackbar } from "notistack";
import clsx from "clsx";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
const useStyles = makeStyles((theme) => ({
  mainContainer: {
    borderRadius: 0,
    background: "white",
  },
  closeContainer: {
    display: "flex",
    justifyContent: "flex-end",
    borderBottom: "1px solid gray",
  },
  arrowPreviousButtonIcon: {
    fontSize: 30,
  },
  arrowPreviousButton: {
    padding: 0,
    minWidth: 40,
    background: "#1a2733",
    color: "white",
    borderRadius: 0,
    "&:hover": {
      background: "#263b4d",
    },
  },
  arrowPreviousButtonDisabled: {
    background: "#bfbdbd",
    color: "white!important",
  },

  arrowNextButtonIcon: {
    fontSize: 30,
  },
  arrowNextButton: {
    padding: 0,
    minWidth: 40,
    background: "#1a2733",
    color: "white",
    borderRadius: 0,
    "&:hover": {
      background: "#263b4d",
    },
  },
  arrowNextButtonDisabled: {
    background: "#bfbdbd",
    color: "white!important",
  },
  closeButton: {
    paddingLeft: 0,
    paddingRight: 0,
    minWidth: 37,
  },
  titleContainer: {
    display: "flex",
    alignItems: "center",
    cursor: "move",
  },
  titleText: {
    marginLeft: 10,
  },
  loadingCircularProgress: {
    margin: "auto",
    display: "block",
    marginTop: 20,
  },
  buttonContainer: {
    display: "flex",
    alignItems: "center",
    cursor: "default",
    marginBottom: 4,
    borderBottom: "1px solid gray",
  },
  formCountText: {
    background: "gray",
    color: "white",
    padding: "0 15px",
    background: "#f40057",
    borderRadius: 20,
    marginLeft: 10,
  },
  formControl: {
    paddingTop: 6,
    paddingBottom: 6,
    width: "100%",
  },
  textFieldRoot: {
    borderRadius: 0,
  },
  textFieldNotchedOutline: {
    borderWidth: "1px!important",
    top: "0px",
  },
  textFieldInput: {
    padding: "15px 14px",
  },
  textField: {
    width: "100%",
  },
  formContainer: {
    cursor: "default",
    overflowY: "auto",
    overflowX: "hidden",
  },
  submitButton: {
    borderRadius: 0,
    background: "#81ba53",
    color: "#FFFFFF",
    "&:hover": {
      backgroundColor: "#81ba53",
    },
  },
  newFormText: {
    marginTop: 5,
    marginBottom: 5,
    textDecoration: "underline",
  },
  deleteButton: {
    marginLeft: "auto",
    color: "#f40057",
    padding: 0,
  },
  selectFieldRoot:{
    padding: 15
  }
}));

const ChatBoxCustomerFormModal = (props) => {
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const LeadFormQuery = gql`
    query LeadForm($customerId: String!) {
      leadform(customerId: $customerId) {
        id
        customerId
        firstname
        lastname
        phonenumber
        alternatephonenumber
        emailaddress
        previousaddress
        currentaddress
        dateofbirth
        ssn
        provider
        service
        referencenumber
        accountnumber
        monthlytotal
        firstmonthbill
        comments
      }
    }
  `;

  let [
    getLeadForms,
    {
      loading: leadFormQueryLoading,
      error: leadFormQueryError,
      data: leadFormQueryResult,
    },
  ] = useLazyQuery(LeadFormQuery, {
    fetchPolicy: "network-only",
  });

  const [selectedFormIndex, setSelectedFormIndex] = useState(-1);
  useEffect(() => {
    if (leadFormQueryResult && leadFormQueryResult.leadform) {
      checkNextPreviousButtonStatus();
    }
  }, [leadFormQueryResult]);

  useEffect(() => {
    checkNextPreviousButtonStatus();
  }, [selectedFormIndex]);

  const checkNextPreviousButtonStatus = () => {
    if (leadFormQueryResult && leadFormQueryResult.leadform) {
      if (leadFormQueryResult.leadform.length > 0) {
        if (leadFormQueryResult.leadform.length - 1 == selectedFormIndex)
          sethaveNextForm(false);
        else sethaveNextForm(true);
      } else sethaveNextForm(false);

      if (selectedFormIndex > -1) setHavePreviousForm(true);
      else setHavePreviousForm(false);

      if (selectedFormIndex == -1) {
        setId(null);
        setFirstName("");
        setLastName("");
        setPhoneNumber("");
        setAlternatePhoneNumber("");
        setEmailAddress("");
        setPreviousAddress("");
        setCurrentAddress("");
        setDateOfBirth("");
        setSSN("");
        setProvider("");
        setService("");
        setDealerId("")
        setReferenceNumber("");
        setAccountNumber("");
        setMonthlyTotal("");
        setFirstMonthBill("");
        setComments("");
      } else {
        var currentData = leadFormQueryResult.leadform[selectedFormIndex];
        setId(currentData.id);
        setFirstName(currentData.firstname);
        setLastName(currentData.lastname);
        setPhoneNumber(currentData.phonenumber);
        setAlternatePhoneNumber(currentData.alternatephonenumber);
        setEmailAddress(currentData.emailaddress);
        setPreviousAddress(currentData.previousaddress);
        setCurrentAddress(currentData.currentaddress);
        setDateOfBirth(currentData.dateofbirth);
        setSSN(currentData.ssn);

        setProvider(currentData.provider);

        setService(currentData.service);
        setDealerId(currentData.dealerId)
        setReferenceNumber(currentData.referencenumber);
        setAccountNumber(currentData.accountnumber);
        setMonthlyTotal(currentData.monthlytotal);
        setFirstMonthBill(currentData.firstmonthbill);
        setComments(currentData.comments);
      }
    }
  };

  useEffect(() => {
    getLeadForms({
      variables: {
        customerId: props?.customerData?.customerId,
      },
    });
  }, [props?.customerData && props?.customerData?.customerId]);

  let firstNameValidate = null;
  let lastNameValidate = null;
  let phoneNumberValidate = null;
  let alternatePhoneNumberValidate = null;
  let emailAddressValidate = null;
  let previousAddressValidate = null;
  let currentAddressValidate = null;
  let dateOfBirthValidate = null;
  let SSNValidate = null;
  let providerValidate = null;
  let serviceValidate = null;
  let dealerIdValidate = null;
  let referenceNumberValidate = null;
  let accountNumberValidate = null;
  let monthlyTotalValidate = null;
  let firstMonthBillValidate = null;
  let commentsValidate = null;

  const [id, setId] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [alternatePhoneNumber, setAlternatePhoneNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [previousAddress, setPreviousAddress] = useState("");
  const [currentAddress, setCurrentAddress] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [SSN, setSSN] = useState("");
  const [service, setService] = useState("");
  const [provider, setProvider] = useState("");
  const [dealerId,setDealerId] = useState("");
  const [referenceNumber, setReferenceNumber] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [monthlyTotal, setMonthlyTotal] = useState("");
  const [firstMonthBill, setFirstMonthBill] = useState("");
  const [comments, setComments] = useState("");


  const [activeDealerDropdown,setActiveDealerDropdown] = useState([
    ["HRaza", "HRaza"],
  ["FFatima", "FFatima"],
  ["SHaq", "SHaq"],
  ["BKhan", "BKhan"],
  ["DSalar", "DSalar"],
  ["UNY179", "UNY179"],
  ["UNY180", "UNY180"],
  ["SMaria", "SMaria"],
  ["JMundoz", "JMundoz"],])

  const [haveNextForm, sethaveNextForm] = useState(false);
  const [havePreviousForm, setHavePreviousForm] = useState(false);

  useEffect(()=>{
  
    if(provider === 'Spectrum'){
      setActiveDealerDropdown([["HRaza", "HRaza"],
      ["FFatima", "FFatima"],
      ["SHaq", "SHaq"],
      ["BKhan", "BKhan"],
      ["DSalar", "DSalar"],
      ["UNY179", "UNY179"],
      ["UNY180", "UNY180"],
      ["SMaria", "SMaria"],
      ["JMundoz", "JMundoz"],])          
        
    }
   else if(provider === 'Optimum'){
  
  
    setActiveDealerDropdown([
        ["Optimum", "Optimum"],
        ["SuddenLink", "SuddenLink"],
        ["Altice", "Altice"]
      ])
  }
  else if(provider === 'Ziply' ||provider === 'Wow' || provider === 'Buckeye' || provider === 'Rise Broadband' ){
    
    setActiveDealerDropdown([
      ["WOW -Bundle Dealer", "WOW -Bundle Dealer"],
      ["TDS - Bundle Dealer", "TDS - Bundle Dealer"],
      ["BuckEye -Bundle Dealer", "BuckEye -Bundle Dealer"],
      ["Risebroad Band -Bundle Dealer", "Risebroad Band -Bundle Dealer"],
      ["Ziply- Bundle Dealer", "Ziply- Bundle Dealer"],
    ])
  }
  else if(provider === 'Cox'){
    
    setActiveDealerDropdown([
      ["Cox","Cox"]
    ])
  }
  else if(provider === 'Windstream'){
   
  
    setActiveDealerDropdown([
      ["TS888 - Windstream","TS888 - Windstream"]
    ])
  }
  else if(provider === 'Frontier'){
    
  
    setActiveDealerDropdown([
      ["247DigiKhan - Frontier","247DigiKhan - Frontier"]
    ])
  }
  else if(provider === 'Century Link'){
     
     setActiveDealerDropdown([
      ["Century Link","Century Link"]
    ])
  }
  else if(provider === 'T-Mobile'){
   
    setActiveDealerDropdown([
      ["T-Mobile","T-Mobile"]
    ])
  }
  else {
    
    
    setActiveDealerDropdown([]);
  }
  },[provider])
 
  const AddLeadFormQuery = gql`
    mutation AddLeadForm(
      $customerId: String!
      $firstname: String!
      $lastname: String!
      $phonenumber: String!
      $alternatephonenumber: String
      $emailaddress: String
      $previousaddress: String
      $currentaddress: String!
      $dateofbirth: String!
      $ssn: String
      $provider: String!
      $service: String!
     
      $referencenumber: String!
      $accountnumber: String!
      $monthlytotal: String!
      $firstmonthbill: String!
      $comments: String
      $dealerId: String!
    ) {
      addleadform(
        customerId: $customerId
        firstname: $firstname
        lastname: $lastname
        phonenumber: $phonenumber
        alternatephonenumber: $alternatephonenumber
        emailaddress: $emailaddress
        previousaddress: $previousaddress
        currentaddress: $currentaddress
        dateofbirth: $dateofbirth
        ssn: $ssn
        provider: $provider
        service: $service
        
        referencenumber: $referencenumber
        accountnumber: $accountnumber
        monthlytotal: $monthlytotal
        firstmonthbill: $firstmonthbill
        comments: $comments
        dealerId: $dealerId
      ) {
        success
        error
      }
    }
  `;

  let [
    addLeadForm,
    {
      loading: addLeadFormLoading,
      error: addLeadFormQueryError,
      data: addLeadFormQueryResult,
    },
  ] = useMutation(AddLeadFormQuery);

  useEffect(() => {
    if (addLeadFormQueryError) {
      addLeadFormQueryError.graphQLErrors.map(({ message }, i) => {
        enqueueSnackbar(message, { variant: "error" });
      });
    }
  }, [addLeadFormQueryError]);

  useEffect(() => {
    if (addLeadFormQueryResult && addLeadFormQueryResult.addleadform) {
      if (addLeadFormQueryResult.addleadform.success) {
        enqueueSnackbar("Lead form added successfully.", {
          variant: "success",
        });
      } else {
        enqueueSnackbar(addLeadFormQueryResult.addleadform.error, {
          variant: "error",
        });
      }
    }
  }, [addLeadFormQueryResult]);

  const DeleteLeadFormQuery = gql`
    mutation DeleteLeadForm($id: ID!) {
      deleteleadform(id: $id) {
        success
        error
      }
    }
  `;

  let [
    deleteLeadForm,
    {
      loading: deletLeadFormLoading,
      error: deletLeadFormQueryError,
      data: deletLeadFormQueryResult,
    },
  ] = useMutation(DeleteLeadFormQuery);

  useEffect(() => {
    if (deletLeadFormQueryError) {
      deletLeadFormQueryError.graphQLErrors.map(({ message }, i) => {
        enqueueSnackbar(message, { variant: "error" });
      });
    }
  }, [deletLeadFormQueryError]);

  useEffect(() => {
    if (deletLeadFormQueryResult && deletLeadFormQueryResult.deleteleadform) {
      if (deletLeadFormQueryResult.deleteleadform.success) {
        enqueueSnackbar("Lead form deleted successfully.", {
          variant: "success",
        });
        setSelectedFormIndex(-1);
        getLeadForms({
          variables: {
            customerId: props.customerData.customerId,
          },
        });
      } else {
        enqueueSnackbar(deletLeadFormQueryResult.deleteleadform.error, {
          variant: "error",
        });
      }
    }
  }, [deletLeadFormQueryResult]);

  const UpdateLeadFormQuery = gql`
    mutation UpdateLeadForm(
      $id: ID!
      $firstname: String!
      $lastname: String!
      $phonenumber: String!
      $alternatephonenumber: String
      $emailaddress: String
      $previousaddress: String
      $currentaddress: String!
      $dateofbirth: String!
      $ssn: String
      $provider: String!
      $service: String!
     
      $referencenumber: String!
      $accountnumber: String!
      $monthlytotal: String!
      $firstmonthbill: String!
      $comments: String
      $dealerId: String!
    ) {
      updateleadform(
        id: $id
        firstname: $firstname
        lastname: $lastname
        phonenumber: $phonenumber
        alternatephonenumber: $alternatephonenumber
        emailaddress: $emailaddress
        previousaddress: $previousaddress
        currentaddress: $currentaddress
        dateofbirth: $dateofbirth
        ssn: $ssn
        provider: $provider
        service: $service
        
        referencenumber: $referencenumber
        accountnumber: $accountnumber
        monthlytotal: $monthlytotal
        firstmonthbill: $firstmonthbill
        comments: $comments
        dealerId : $dealerId
      ) {
        success
        error
      }
    }
  `;

  let [
    updateLeadForm,
    {
      loading: updateLeadFormLoading,
      error: updateLeadFormQueryError,
      data: updateLeadFormQueryResult,
    },
  ] = useMutation(UpdateLeadFormQuery);

  useEffect(() => {
    if (updateLeadFormQueryError) {
      updateLeadFormQueryError.graphQLErrors.map(({ message }, i) => {
        enqueueSnackbar(message, { variant: "error" });
      });
    }
  }, [updateLeadFormQueryError]);

  useEffect(() => {
    if (updateLeadFormQueryResult && updateLeadFormQueryResult.updateleadform) {
      if (updateLeadFormQueryResult.updateleadform.success) {
        enqueueSnackbar("Lead form updated successfully.", {
          variant: "success",
        });
      } else {
        enqueueSnackbar(updateLeadFormQueryResult.updateleadform.error, {
          variant: "error",
        });
      }
    }
  }, [updateLeadFormQueryResult]);

  var isLoading =
    addLeadFormLoading || deletLeadFormLoading || updateLeadFormLoading;
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isLoading) return;

    let isValid = true;

    if (!firstNameValidate()) {
      isValid = false;
    }
    if (!lastNameValidate()) {
      isValid = false;
    }
    if (!phoneNumberValidate()) {
      isValid = false;
    }
    if (!alternatePhoneNumberValidate()) {
      isValid = false;
    }
    if (!emailAddressValidate()) {
      isValid = false;
    }
    // if (!previousAddressValidate()) {
    //   isValid = false;
    // }
    // if (!currentAddressValidate()) {
    //   isValid = false;
    // }
    if (!dateOfBirthValidate()) {
      isValid = false;
    }
    if (!SSNValidate()) {
      isValid = false;
    }

    if (!providerValidate()) {
      isValid = false;
    }
    if(!serviceValidate()){
      isValid = false
    }
    if(!dealerIdValidate()){
      isValid = false
    }

    if (!referenceNumberValidate()) {
      isValid = false;
    }
    if (!accountNumberValidate()) {
      isValid = false;
    }
    if (!monthlyTotalValidate()) {
      isValid = false;
    }
    if (!firstMonthBillValidate()) {
      isValid = false;
    }
    if (!commentsValidate()) {
      isValid = false;
    }
  
    let invalidfield = [];
   

    if(firstNameValidate() === false) {
    
        invalidfield.push('firstname');
    }
    if (lastNameValidate() ===false) {
      invalidfield.push('lastname');
    }
    if (phoneNumberValidate()===false) {
      invalidfield.push('phonenumber');   
     }
  
    if (emailAddressValidate()===false) {
      invalidfield.push('emailaddress'); 
    }
    if (dateOfBirthValidate()===false) {
      invalidfield.push('dateofbirth'); 
    }
    if (SSNValidate()===false) {
      invalidfield.push('ssn'); 

    }
    if(serviceValidate()===false){
      invalidfield.push('service'); 

    }
    if(dealerIdValidate()===false){
      invalidfield.push('dealerid'); 
    }

    if (referenceNumberValidate()===false) {
      invalidfield.push('reference'); 

    }
    if (accountNumberValidate()===false) {
      invalidfield.push('accountnumber'); 

    }
    if (monthlyTotalValidate()===false) {
      invalidfield.push('monthlytotal'); 

    }
    if (firstMonthBillValidate()===false) {
      invalidfield.push('firstmonth'); 

    }
    if(invalidfield.length){
    

     const firstfield = invalidfield[0];
     var el = document.getElementById(firstfield);
     el.scrollIntoView({
       behavior:"smooth",
       block:"center"
     })
   
    }


    if (!isValid) return;
   
    try {
      if (selectedFormIndex == -1) {
        await addLeadForm({
          variables: {
            customerId: props.customerData.customerId,
            firstname: firstName,
            lastname: lastName,
            phonenumber: phoneNumber,
            alternatephonenumber: alternatePhoneNumber,
            emailaddress: emailAddress,
            previousaddress: previousAddress,
            currentaddress: currentAddress,
            dateofbirth: dateOfBirth,
            ssn: SSN,
            provider: provider,
            service: service,
            dealerId:dealerId,
            referencenumber: referenceNumber,
            accountnumber: accountNumber,
            monthlytotal: monthlyTotal,
            firstmonthbill: firstMonthBill,
            comments: comments,
          },
        }).then((curr)=>{
          if(curr.data.addleadform.error){
            isValid = false 
           
          }
        });
        if(isValid != false){
          _.remove(
            props.chatBoxCustomerFormData,
            (itm) => itm.customerData.customerId == props.customerData.customerId
          );
        }
      

        props.setChatBoxCustomerFormData(
          cloneDeep(props.chatBoxCustomerFormData)
        );
      } else {
        await updateLeadForm({
          variables: {
            id: leadFormQueryResult.leadform[selectedFormIndex].id,
            firstname: firstName,
            lastname: lastName,
            phonenumber: phoneNumber,
            alternatephonenumber: alternatePhoneNumber,
            emailaddress: emailAddress,
            previousaddress: previousAddress,
            currentaddress: currentAddress,
            dateofbirth: dateOfBirth,
            ssn: SSN,
            provider: provider,
            service: service,
            dealerId:dealerId,
            referencenumber: referenceNumber,
            accountnumber: accountNumber,
            monthlytotal: monthlyTotal,
            firstmonthbill: firstMonthBill,
            comments: comments,
          },
        })
      
      }
    } catch (e) {}
  };

  return (
    <Rnd
    
      dragHandleClassName={"draggable"}
      style={{ background: "white", border: "1px solid #bab9b9",zIndex:100 }}
      size={{
        width: props?.modalData?.modalWidth,
        height: props?.modalData?.modalHeight,
      }}
      bounds={"parent"}
      position={{ x: props?.modalData?.modalX, y: props?.modalData?.modalY }}
      onDragStop={(e, d) => {
        var findItem = _.find(
          props.chatBoxCustomerFormData,
          (itm) => itm?.customerData?.customerId == props?.customerData?.customerId
        );

        if (findItem) {
          findItem.modalData.modalX = d.x;
          findItem.modalData.modalY = d.y;

          props.setChatBoxCustomerFormData(
            _.cloneDeep(props.chatBoxCustomerFormData)
          );
        }
      }}
      onResizeStop={(e, direction, ref, delta, position) => {
        var findItem = _.find(
          props.chatBoxCustomerFormData,
          (itm) => itm.customerData.customerId == props.customerData.customerId
        );

        if (findItem) {
          findItem.modalData.modalX = position.x;
          findItem.modalData.modalY = position.y;
          findItem.modalData.modalWidth = ref.style.width.replace("px", "");
          findItem.modalData.modalHeight = ref.style.height.replace("px", "");
          props.setChatBoxCustomerFormData(
            _.cloneDeep(props.chatBoxCustomerFormData)
          );
        }
      }}
    >
      <Container disableGutters={true} className={classes.mainContainer}>
        {leadFormQueryLoading ? (
          <CircularProgress
            className={classes.loadingCircularProgress}
            size={24}
          />
        ) : (
          <>
            <Container disableGutters={true} className={classes.closeContainer}>
              <Container
                disableGutters={true}
                className={clsx(classes.titleContainer, "draggable")}
              >
                <Typography className={classes.titleText}>
                  {`${props?.customerData?.customerName}  @${props?.customerData?.pageName}`}
                </Typography>
              </Container>
              <Button
                className={classes.closeButton}
                onClick={() => {
                  _.remove(
                    props.chatBoxCustomerFormData,
                    (itm) =>
                      itm.customerData.customerId ==
                      props.customerData.customerId
                  );

                  props.setChatBoxCustomerFormData(
                    cloneDeep(props.chatBoxCustomerFormData)
                  );
                }}
              >
                <CloseIcon />
              </Button>
            </Container>
            <Container
              disableGutters={true}
              className={classes.buttonContainer}
            >
              <Button
                className={clsx(classes.arrowPreviousButton, {
                  [classes.arrowPreviousButtonDisabled]: !havePreviousForm,
                })}
                onClick={() => {
                  var index = selectedFormIndex - 1;
                  setSelectedFormIndex(index);
                }}
                disabled={!havePreviousForm}
              >
                <ArrowLeftIcon className={classes.arrowPreviousButtonIcon} />
              </Button>
              <Button
                className={clsx(classes.arrowNextButton, {
                  [classes.arrowNextButtonDisabled]: !haveNextForm,
                })}
                onClick={() => {
                  var index = selectedFormIndex + 1;
                  setSelectedFormIndex(index);
                }}
                disabled={!haveNextForm}
              >
                <ArrowRightIcon className={classes.arrowNextButtonIcon} />
              </Button>
              <Typography className={classes.formCountText}>
                {leadFormQueryResult && leadFormQueryResult.leadform.length > 0
                  ? leadFormQueryResult.leadform.length
                  : 0}
              </Typography>
              {selectedFormIndex != -1 && (
                <IconButton
                  disabled={deletLeadFormLoading}
                  className={classes.deleteButton}
                  onClick={() => {
                    deleteLeadForm({
                      variables: {
                        id: id,
                      },
                    });
                  }}
                >
                  <DeleteForeverIcon />
                </IconButton>
              )}
            </Container>
            <Container
              className={classes.formContainer}
              style={{
                maxHeight: `${props?.modalData?.modalHeight - 120}px`,
              }}
            >
              {selectedFormIndex == -1 && (
                <Typography className={classes.newFormText}>
                  New Form
                </Typography>
              )}
              <FormControl id="firstname" className={classes.formControl}>
                <ValidationTextField
                  autoFocus
                  type="text"
                  className={classes.textField}
                  InputProps={{
                    classes: {
                      root: classes.textFieldRoot,
                      input: classes.textFieldInput,
                      notchedOutline: classes.textFieldNotchedOutline,
                    },
                  }}
                  validate={(validate) => {
                    firstNameValidate = validate;
                  }}
                  notEmpty={true}
                  disabled={isLoading}
                  onInput={(e) => setFirstName(e.target.value)}
                  label="First Name"
                  variant="outlined"
                  value={firstName}
                />
              </FormControl>
              <FormControl id="lastname" className={classes.formControl}>
                <ValidationTextField
                  type="text"
                  className={classes.textField}
                  InputProps={{
                    classes: {
                      root: classes.textFieldRoot,
                      input: classes.textFieldInput,
                      notchedOutline: classes.textFieldNotchedOutline,
                    },
                  }}
                  validate={(validate) => {
                    lastNameValidate = validate;
                  }}
                  notEmpty={true}
                  disabled={isLoading}
                  onInput={(e) => setLastName(e.target.value)}
                  label="Last Name"
                  variant="outlined"
                  value={lastName}
                />
              </FormControl>
              <FormControl id="phonenumber" className={classes.formControl}>
                <ValidationTextField
                  className={classes.textField}
                  value={phoneNumber}
                  InputProps={{
                    classes: {
                      root: classes.textFieldRoot,
                      input: classes.textFieldInput,
                      notchedOutline: classes.textFieldNotchedOutline,
                    },
                  }}
                  validate={(validate) => {
                    phoneNumberValidate = validate;
                    
                  }}
                  mask={[
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                  ]}
                  disabled={isLoading}
                  onInput={(e) => setPhoneNumber(e.target.value)}
                  id="mobileTextField"
                  label="Phone Number"
                  minValueErrorText="Not a valid mobile number."
                  minValue={10}
                  variant="outlined"
                  notEmpty={true}
                />
              </FormControl>
              <FormControl  className={classes.formControl}>
                <ValidationTextField
                  className={classes.textField}
                  InputProps={{
                    classes: {
                      root: classes.textFieldRoot,
                      input: classes.textFieldInput,
                      notchedOutline: classes.textFieldNotchedOutline,
                    },
                  }}
                  validate={(validate) => {
                    alternatePhoneNumberValidate = validate;
                  }}
                  mask={[
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                  ]}
                  notEmpty={false}
                  disabled={isLoading}
                  onInput={(e) => setAlternatePhoneNumber(e.target.value)}
                  label="Alternate Phone Number"
                  variant="outlined"
                  value={alternatePhoneNumber}
                />
              </FormControl>
              <FormControl id="emailaddress" className={classes.formControl}>
                <ValidationTextField
                  type="text"
                  className={classes.textField}
                  InputProps={{
                    classes: {
                      root: classes.textFieldRoot,
                      input: classes.textFieldInput,
                      notchedOutline: classes.textFieldNotchedOutline,
                    },
                  }}
                  validate={(validate) => {
                    emailAddressValidate = validate;
                  }}
                  Email={true}
                  notEmpty={true}
                  disabled={isLoading}
                  onInput={(e) => setEmailAddress(e.target.value)}
                  label="Email Address"
                  variant="outlined"
                  value={emailAddress}
                />
              </FormControl>
              {/* <FormControl className={classes.formControl}>
                
              </FormControl> */}
              {/* <FormControl className={classes.formControl}> */}
                {/* <ValidationTextField
                  type="text"
                  className={classes.textField}
                  InputProps={{
                    classes: {
                      root: classes.textFieldRoot,
                      input: classes.textFieldInput,
                      notchedOutline: classes.textFieldNotchedOutline,
                    },
                  }}
                  validate={(validate) => {
                    currentAddressValidate = validate;
                  }}
                  notEmpty={true}
                  disabled={isLoading}
                  onInput={(e) => setCurrentAddress(e.target.value)}
                  label="Current Address"
                  variant="outlined"
                  value={currentAddress}
                /> */}
              {/* </FormControl> */}
                 <Leadformautocomplete currentAddressValidate previousAddressValidate setPreviousAddress={setPreviousAddress} previousAddress={previousAddress} currentAddress={currentAddress} setCurrentAddress={setCurrentAddress}/>
              <FormControl id="dateofbirth" className={classes.formControl}>
                <ValidationTextField
                  placeHolderVisiblePlaceHolder={"MM-DD-YYYY"}
                  placeHolderVisible={true}
                  mask={"00-00-0000"}
                  className={classes.textField}
                  InputProps={{
                    classes: {
                      root: classes.textFieldRoot,
                      input: classes.textFieldInput,
                      notchedOutline: classes.textFieldNotchedOutline,
                    },
                  }}
                  validate={(validate) => {
                    dateOfBirthValidate = validate;
                  }}
                  notEmpty={true}
                  disabled={isLoading}
                  onInput={(e) => setDateOfBirth(e.target.value)}
                  placeholder="MM-DD-YYYY"
                  label="Date of Birth"
                  variant="outlined"
                  value={dateOfBirth}
                  minValueErrorText="Not a valid DOB."
                  minValue={8}
                />
              </FormControl>
              <FormControl id="ssn" className={classes.formControl}>
                <ValidationTextField
                  type="text"
                  className={classes.textField}
                  InputProps={{
                    classes: {
                      root: classes.textFieldRoot,
                      input: classes.textFieldInput,
                      notchedOutline: classes.textFieldNotchedOutline,
                    },
                  }}
                  validate={(validate) => {
                    SSNValidate = validate;
                  }}
                  notEmpty={false}
                  disabled={isLoading}
                  onInput={(e) => setSSN(e.target.value)}
                  label="SSN"
                  variant="outlined"
                  value={SSN}
                />
              </FormControl>
              {/* <FormControl className={classes.formControl}>
                <RadioGroup
                  aria-label="service"
                  name="service"
                  value={service}
                  onChange={(event) => {
                    setService(event.target.value);
                  }}
                >
                  <FormControlLabel
                    value="SinglePlay"
                    control={<Radio />}
                    label="Single Play"
                  />
                  <FormControlLabel
                    value="DoublePlay"
                    control={<Radio />}
                    label="Double Play"
                  />
                  <FormControlLabel
                    value="Tripleplay"
                    control={<Radio />}
                    label="Triple play"
                  />
                  <FormControlLabel
                    value="QuadPlay"
                    control={<Radio />}
                    label="Quad Play"
                  />
                </RadioGroup>
              </FormControl> */}
              <FormControl className={classes.formControl}>
                <ValidationSelectField
                  validate={(validate) => {
                    serviceValidate = validate;
                  }}
                  classes={{
                    root: classes.selectFieldRoot,

                  }}
                  className={classes.textField}
                  value={service}
                  values={[
                    ["Single Play(Internet)", "Single Play(Internet)"],
                    ["Single Play(Cable)", "Single Play(Cable)"],
                    ["Single Play(T-mobile)", "Single Play(T-mobile)"],
                    ["Single Play(Spectrum Mobile)", "Single Play(Spectrum Mobile)"],
                    ["Double Play(Internet + Phone)", "Double Play(Internet + Phone)"],
                    ["Double Play(Cable + Internet)", "Double Play(Cable + Internet)"],
                    ["Double Play(Cable + Phone)", "Double Play(Cable + Phone)"],
                    ["Triple Play(Phone + Internet + Cable)", "Triple Play(Phone + Internet + Cable)"],
                    ["Quad Play(All)", "Quad Play(All)"],
                   
                  ]}
                  disabled={isLoading}
                  onChange={(e) => {
                  
                    setService(e.target.value);
                  }}
                  label="Select Service"
                  notEmpty={true}
                />
              </FormControl>
              <FormControl className={classes.formControl}>
                <ValidationSelectField
                  validate={(validate) => {
                   providerValidate = validate;
                   
                  }}
                  classes={{
                    root: classes.selectFieldRoot,

                  }}
                  className={classes.textField}
                  value={provider}
                  values={[
                    ["Spectrum", "Spectrum"],
                    ["Optimum", "Optimum"],
                    ["Ziply", "Ziply"],
                    ["Wow", "Wow"],
                    ["DirecTV", "DirecTV"],
                    ["Cox", "Cox"],
                    ["Buckeye", "Buckeye"],
                    ["Windstream", "Windstream"],
                    ["Frontier", "Frontier"],
                    ["Rise Broadband", "Rise Broadband"],
                    ["Century Link", "Century Link"],
                    ["T-Mobile", "T-Mobile"],
                  ]}
                  disabled={isLoading}
                  onChange={(e) => {
                  
                    setProvider(e.target.value);
                  }}
                  label="Select Provider"
                  notEmpty={true}
                />
              </FormControl>
              <FormControl className={classes.formControl}>
                <ValidationSelectField
                  validate={(validate) => {
                    dealerIdValidate = validate;
                  }}
                  classes={{
                    root: classes.selectFieldRoot,

                  }}
                  className={classes.textField}
                  value={dealerId}
                  values={activeDealerDropdown}
                  disabled={isLoading}
                  onChange={(e) => {
                  
                    setDealerId(e.target.value);
                  }}
                  label="Select Dealer Id"
                  notEmpty={true}
                />
              </FormControl>
              <FormControl id="reference" className={classes.formControl}>
                <ValidationTextField
                  type="text"
                  className={classes.textField}
                  InputProps={{
                    classes: {
                      root: classes.textFieldRoot,
                      input: classes.textFieldInput,
                      notchedOutline: classes.textFieldNotchedOutline,
                    },
                  }}
                  validate={(validate) => {
                    referenceNumberValidate = validate;
                  }}
                  notEmpty={true}
                  disabled={isLoading}
                  onInput={(e) => setReferenceNumber(e.target.value)}
                  label="Reference Number"
                  variant="outlined"
                  value={referenceNumber}
                />
              </FormControl>
              <FormControl id="accountnumber" className={classes.formControl}>
                <ValidationTextField
                  type="text"
                  className={classes.textField}
                  InputProps={{
                    classes: {
                      root: classes.textFieldRoot,
                      input: classes.textFieldInput,
                      notchedOutline: classes.textFieldNotchedOutline,
                    },
                  }}
                  validate={(validate) => {
                    accountNumberValidate = validate;
                  }}
                  notEmpty={true}
                  disabled={isLoading}
                  onInput={(e) => setAccountNumber(e.target.value)}
                  label="Account Number"
                  variant="outlined"
                  value={accountNumber}
                />
              </FormControl>
              <FormControl id="monthlytotal" className={classes.formControl}>
                <ValidationTextField
                  type="text"
                  className={classes.textField}
                  InputProps={{
                    classes: {
                      root: classes.textFieldRoot,
                      input: classes.textFieldInput,
                      notchedOutline: classes.textFieldNotchedOutline,
                    },
                  }}
                  validate={(validate) => {
                    monthlyTotalValidate = validate;
                  }}
                  notEmpty={true}
                  disabled={isLoading}
                  onInput={(e) => setMonthlyTotal(e.target.value)}
                  label="Monthly Total"
                  variant="outlined"
                  value={monthlyTotal}
                />
              </FormControl>
              <FormControl id="firstmonth" className={classes.formControl}>
                <ValidationTextField
                  type="text"
                  className={classes.textField}
                  InputProps={{
                    classes: {
                      root: classes.textFieldRoot,
                      input: classes.textFieldInput,
                      notchedOutline: classes.textFieldNotchedOutline,
                    },
                  }}
                  validate={(validate) => {
                    firstMonthBillValidate = validate;
                  }}
                  notEmpty={true}
                  disabled={isLoading}
                  onInput={(e) => setFirstMonthBill(e.target.value)}
                  label="First Month Bill"
                  variant="outlined"
                  value={firstMonthBill}
                />
              </FormControl>
             
              <FormControl id="" className={classes.formControl}>
                <ValidationTextField
                  multiline
                  type="text"
                  className={classes.textField}
                  InputProps={{
                    classes: {
                      root: classes.textFieldRoot,
                      input: classes.textFieldInput,
                      notchedOutline: classes.textFieldNotchedOutline,
                    },
                  }}
                  validate={(validate) => {
                    commentsValidate = validate;
                  }}
                  notEmpty={false}
                  disabled={isLoading}
                  onInput={(e) => setComments(e.target.value)}
                  label="Notes/Remarks/Comments"
                  variant="outlined"
                  value={comments}
                />
              </FormControl>
            </Container>
            <FormControl className={classes.formControl}>
              <Button
                variant="contained"
                type="submit"
                onClick={handleSubmit}
                disabled={isLoading}
                className={classes.submitButton}
              >
                {isLoading && <CircularProgress size={25} />}
                {!isLoading && (selectedFormIndex == -1 ? "Save" : "Edit")}
              </Button>
            </FormControl>
          </>
        )}
      </Container>
    </Rnd>
  );
};
const mapStateToProps = (state) => {
  return {
    ...state.ChatBoxReducer,
  };
};
export default connect(mapStateToProps, {
  setChatBoxCustomerFormData,
})(ChatBoxCustomerFormModal);
