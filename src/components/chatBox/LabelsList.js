import React, { useEffect, useRef, useState } from "react";
import {
  Container,
  CircularProgress,
  ListItem,
  List,
  Typography,
  TextField,
  Button,
  IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import _ from "lodash";
import AddIcon from "@material-ui/icons/Add";
import { gql } from "apollo-boost";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import AddAlertIcon from "@material-ui/icons/AddAlert";
import { useSnackbar } from "notistack";
import {
  setLabelListData,
  setLabelListTextInput,
} from "../../store/actions/LabelListActions";
import { connect } from "react-redux";
import BackspaceIcon from "@material-ui/icons/Backspace";
const useStyles = makeStyles((theme) => ({
  mainContainerRoot: {
    // padding: 2,
    padding: 0,

    borderRadius: 0,
    minHeight: 100,
  },
  listItemButton: {
    // borderBottom: "1px solid #d0cfcf",
    height: "35px",
    display: "flex",
    // padding:'10px 0px'
  },
  loadingCircularProgress: {
    margin: "auto",
    display: "block",
    marginTop: 20,
  },
  listItemButtonText: {
    padding: 15,
    border: "1p solid gray",
    color: "#686d6a",
    flex: 1,
  },
  listItem: {
    background: "white",
    padding: 0,
  },
  labelAddForm: {
    margin: "10px 0px",
    // display: "flex",
  },
  labelAddFormButton: {
    color: "white",
    background: "#f50057",

    "&:hover": {
      background: "#e14079",
    },
    marginLeft: 6,
  },
  labelTextInput: {
    paddingTop: 2,
    paddingBottom: 4,
    fontFamily: "Poppins",
    fontSize: "13px",
  },
  labelAddFormButtonIcon: {
    fontSize: 25,
  },
  deleteButton: {
    color: "#f40057",
    background: "gray",
    background: "#e0dfdf",
    "&:hover": {
      background: "#dcdcdc",
    },
  },
  followUpIcon: {
    marginRight: 12,
  },
  closeLabelIcon: {
    marginRight: 12,
    color: "red",
  },
  closeSalesIcon: {
    marginRight: 12,
    color: "blue",
  },
}));

const LabelsList = (props) => {

  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const UpdateLabelsQuery = gql`
    mutation UpdateLabels($labels: String!) {
      updatelabels(labels: $labels) {
        success
        error
      }
    }
  `;
  let [
    updateLabels,
    {
      loading: updateLabelsQueryLoading,
      error: updateLabelsQueryError,
      data: updateLabelsQueryResult,
    },
  ] = useMutation(UpdateLabelsQuery);

  useEffect(() => {
    if (updateLabelsQueryError) {
      updateLabelsQueryError.graphQLErrors.map(({ message }, i) => {
        enqueueSnackbar(message, { variant: "error" });
      });
    }
  }, [updateLabelsQueryError]);

  useEffect(() => {
    if (updateLabelsQueryResult && updateLabelsQueryResult.updatelabels) {
      if (updateLabelsQueryResult.updatelabels.success) {
      } else {
        enqueueSnackbar(updateLabelsQueryResult.updatelabels.error, {
          variant: "error",
        });
      }
    }
  }, [updateLabelsQueryResult]);

  const LabelsQuery = gql`
    query GetLabels($accessToken: String) {
      getlabels(accessToken: $accessToken) {
        id
        labels
      }
    }
  `;
  let [
    getLabels,
    {
      loading: labelsQueryLoading,
      error: labelsQueryError,
      data: labelsQueryResult,
    },
  ] = useLazyQuery(LabelsQuery, {
    fetchPolicy: "network-only",
  });
  useEffect(() => {
    if (labelsQueryError) {
      labelsQueryError.graphQLErrors.map(({ message }, i) => {
        enqueueSnackbar(message, { variant: "error" });
      });
    }
  }, [labelsQueryError]);

  useEffect(() => {
    getLabels();
  },[props.customerId]);

  var followUpText = "Follow Up";
  var closeText = "Close";
  var salesdonewpp = "Sales Done wpp";
  var salesdonepp = "Sales Done pp";
  var important = "Important";
  var newCustomer = "New Customer";

  useEffect(() => {
    if (labelsQueryResult && labelsQueryResult.getlabels) {
      var listData_ = [{ id: 0, text: followUpText }];

      var decodeResult = JSON.parse(labelsQueryResult.getlabels.labels);

      if (decodeResult) {
      }

      decodeResult &&
        decodeResult.map((item) => {
          listData_.push(item);
        });

      props.setLabelListData(_.cloneDeep(listData_));
    }
  }, [labelsQueryResult, props.marknottoaddinchatcircle]);

  const isLoading = labelsQueryLoading;

  var labelListDataSearch = [];
  if (!isLoading) {
    if (props.labelListTextInput != "") {
      labelListDataSearch = _.filter(props.labelListData, (label) => {
        if (!_.find(props.usedLabels, (label_) => label.text == label_.text))
          return label.text
            .toLowerCase()
            .includes(props.labelListTextInput.toLowerCase());
      });
    }
  }

  useEffect(() => {}, [labelListDataSearch]);

  const addItem = () => {
    // if (!isLoading) {
    // var id = props.labelListData[props.labelListData.length - 1].id + 1;
    // if(id == 1){ //because it is close id
    //   // id++;
    //   id = id+5;
    // }
    // if(id == 2){
    //   id =  id + 4;
    // }
    // if(id == 3){
    //   id = id + 3;
    // }
    // if(id == 4){
    //   id = id + 2;
    // }
    // if(id == 5){
    //   id = id + 1;
    // }
    // var text = props.labelListTextInput;
    // var listData_ = _.cloneDeep(props.labelListData);
    // if (text != "" && text.toLowerCase() != followUpText.toLowerCase() && text.toLowerCase() != closeText.toLowerCase() && text.toLowerCase() != salesdonewpp.toLowerCase() && text.toLowerCase() != salesdonepp.toLowerCase() && text.toLowerCase() != closeText.toLowerCase() && important.toLowerCase() != newCustomer.toLowerCase()) {
    //   var alreadyExist = _.find(listData_, (itm) => itm.text.toLowerCase() == text.toLowerCase());
    //   if (!alreadyExist) {
    //     listData_.push({ id: id, text: text });
    //     props.setLabelListData(_.cloneDeep(listData_));
    //   } else {
    //   }
    //   _.remove(listData_, (itm) => itm.id === 0 || itm.id === 1 || itm.id === 2 || itm.id === 3 || itm.id === 4 || itm.id === 5);
    //   updateLabels({
    //     variables: {
    //       labels: JSON.stringify(listData_),
    //     },
    //   });
    // }
    // }
  };

  return (
    <>
      <Container
        classes={{
          root: classes.mainContainerRoot,
        }}
      >
        <Container disableGutters={true} className={classes.labelAddForm}>
          <TextField
            style={{ width: "100%" }}
            value={props.labelListTextInput}
            onKeyDown={(e) => {
              if (e.keyCode == 13) {
                props.onItemClick(props.labelListTextInput);
                props.setLabelListTextInput("");
              }
            }}
            InputProps={{
              classes: {
                input: classes.labelTextInput,
              },
            }}
            onInput={(e) => props.setLabelListTextInput(e.target.value)}
            autoFocus
            variant={"outlined"}
            placeholder={"Search or add"}
          />

          {/* <Button
          disabled={isLoading}
          onClick={() => {
            addItem();
          }}
          className={classes.labelAddFormButton}
        >
          <AddIcon className={classes.labelAddFormButtonIcon} />
        </Button> */}
        </Container>

        {isLoading ? (
          <CircularProgress
            className={classes.loadingCircularProgress}
            size={24}
          />
        ) : (
          <List
            style={{
              height: props.containerHeight,
              background: "white",
              boxShadow: "0px 0px 3px 1px rgba(0,0,0,0.4)",
              marginTop: "-10px",
              display: labelListDataSearch.length ? "block" : "none",
            }}
          >
            {labelListDataSearch.map((item) => {
        
              return (
                <ListItem
                  classes={{
                    root: classes.listItem,
                  }}
                  button
                  className={classes.listItemButton}
                >
                  <Typography
                    onClick={(e) => {
                      if (item.id != 0) {
                        var listData_ = props.labelListData;
                        _.remove(listData_, (itm) => itm.id == item.id);
                        props.setLabelListData(_.cloneDeep(listData_));
                      }
                      props.onItemClick && props.onItemClick(item.text);
                    }}
                    className={classes.listItemButtonText}
                  >
                    {item.text}
                  </Typography>
                  {/* {item.id !== 0 && item.id !== 1 && item.id !== 2 && item.id !== 3? (
                  <IconButton
                    className={classes.deleteButton}
                    onClick={() => {
                      var listData_ = props.labelListData;
                      _.remove(listData_, (itm) => itm.id == item.id);
                      props.setLabelListData(_.cloneDeep(listData_));

                      _.remove(listData_, (itm) => itm.id === 0 ||  itm.id === 1 || itm.id === 2 || itm.id === 3) ;
                      updateLabels({
                        variables: {
                          labels: JSON.stringify(listData_),
                        },
                      });
                    }}
                  >
                    <DeleteForeverIcon />
                  </IconButton>
                ) : item.id == 0 ? (
                  <AddAlertIcon
                    className={classes.followUpIcon}
                    onClick={() => {
                      props.onItemClick && props.onItemClick(item);
                    }}
                  />
                ) : (
                  <BackspaceIcon
                    className={item.id === 1?classes.closeLabelIcon : classes.closeSalesIcon }
                    onClick={() => {
                      props.onItemClick && props.onItemClick(item);
                    }}
                  />
                )} */}
                </ListItem>
              );
            })}
          </List>
        )}
      </Container>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    ...state.LabelListReducer,
  };
};

export default connect(mapStateToProps, {
  setLabelListData,
  setLabelListTextInput,
})(LabelsList);
