import React,{useState} from "react";
import PlacesAutocomplete from "react-places-autocomplete";
import scriptLoader from "react-async-script-loader";
import ValidationTextField from "../../otherComponents/ValidationTextField";
import { makeStyles } from "@material-ui/core/styles";
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

const useStyles = makeStyles((theme) => ({
    textFieldInput: {
        padding: "15px 14px",
      },
    
     textFieldRoot: {
        borderRadius: 0,
      },
    
     textFieldNotchedOutline: {
        borderWidth: "1px!important",
        top: "0px",
      },
      textField: {
        width: "100%",
      },
      formControl: {
        paddingTop: 6,
        paddingBottom: 6,
        width: "100%",
      },
}))

function Leadformautocomplete({ currentAddress,isScriptLoaded, isScriptLoadSucceed ,setCurrentAddress,previousAddress,setPreviousAddress,currentAddressValidate,previousAddressValidate}) {

    const classes = useStyles();
  
  const handleChangecurrent = (value) => {
    
    setCurrentAddress(value)
  }

  const handleSelectcurrent = (value) => {
    setCurrentAddress(value)
  }

  const handleChangePrev = (value) => {
    setPreviousAddress(value)
  }

  const handleSelectPrev = (value) => {
    setPreviousAddress(value)
  }


  if (isScriptLoaded && isScriptLoadSucceed) {
    return (
      <div>

        <PlacesAutocomplete
          value={previousAddress}
          onChange={handleChangePrev}
          onSelect={handleSelectPrev}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading,
          }) => (
            <div>
            <FormControl className={classes.formControl}>
            <ValidationTextField
               {...getInputProps({
            })}
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
                    previousAddressValidate = validate;
                  }}
                  notEmpty={false}
                  onInput={(e) => setPreviousAddress(e.target.value)}
                  label="Previous Address"
                  variant="outlined"
                  value={previousAddress}
                />
                </FormControl>
          
              <div>
                {loading && <div>Loading...</div>}
                
                {suggestions.map((suggestion) => {
                   const style = suggestion.active
                    ? { backgroundColor: "#a83232", cursor: "pointer" }
                    : { backgroundColor: "#ffffff", cursor: "pointer" };

                  return (
                    <div style={{border:'1px solid red'}} {...getSuggestionItemProps(suggestion, { style })}>
                      {suggestion.description}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
        <PlacesAutocomplete
          value={currentAddress}
          onChange={handleChangecurrent}
          onSelect={handleSelectcurrent}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading,
          }) => (
            <div>
                 <FormControl className={classes.formControl}>
           
                <ValidationTextField
                 {...getInputProps({
                  })}
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
                
                   onInput={(e) => setCurrentAddress(e.target.value)}
                  label="Current Address"
                  variant="outlined"
                  value={currentAddress}
                />
                </FormControl>

              <div>
                {loading && <div>Loading...</div>}
                {suggestions.map((suggestion) => {
                
                  const style = suggestion.active
                    ? { backgroundColor: "#a83232", cursor: "pointer" }
                    : { backgroundColor: "#ffffff", cursor: "pointer" };

                  return (
                    <div style={{border:'1px solid red'}} {...getSuggestionItemProps(suggestion, { style })}>
                      {suggestion.description}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>

      </div>
    );
  } else {
    return <div></div>;
  }
}

export default scriptLoader([
  `https://maps.googleapis.com/maps/api/js?key=AIzaSyBzSZGQkqRimpfGntSgXQg1rDWyMpX3VxM&libraries=places`,
])(Leadformautocomplete);