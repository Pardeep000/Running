import React, { useRef, useState, useReducer, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { gql } from "apollo-boost";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import { useSnackbar } from "notistack";
import VerticallyCenteredModal from "../VerticallyCenteredModal";
import removeIcon from "../../../assets/setting/close-02.svg";
import moment from "moment";
import { CircularProgress } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  loadingCircularProgress: {
    margin: "auto",
    display: "block",
    marginTop: 20,
    color: "#55A530",
  },
  settingLabelMain: {
    width: "70%",
    marginTop: "20px",
    padding: "20px",
  },
  addLabelMain: {
    display: "flex",
    marginBottom: "30px",
  },
  addLabelInput: {
    border: "1px solid rgba(117,117,117,.5)",
    fontFamily: "poppins",
    fontSize: "13px",
    marginRight: "10px",
    padding: "5px",
    borderRadius: "3px",
  },
  addLabelBtn: {
    border: "none",
    borderRadius: "3px",
    color: "white",
    background: "#55A530",
    fontFamily: "poppins",
    fontSize: "12px",
    padding: "6px 18px",
    cursor: "pointer",
  },
  labelListHeadMain: {
    display: "grid",
    gridTemplateColumns: "25% 20% 45% 10%",
    borderBottom: "1px solid rgba(117,117,117,.5)",
    padding: "0px 5px",
  },
  labelListHeadHeading: {
    fontFamily: "poppins",
    fontSize: "13px",
  },
  labelListBodyMain: {
    display: "grid",
    gridTemplateColumns: "25% 20% 45% 10%",
    borderBottom: "1px solid rgba(117,117,117,.5)",
    alignItems: "center",
    padding: "10px 5px",
  },
  labelListBodyText: {
    fontFamily: "poppins",
    fontSize: "13px",
    marginBottom: "0px",
  },
  labelListBodyBtn: {
    border: "none",
    background: "none",
    color: "red",
    fontFamily: "poppins",
    fontSize: "13px",
  },
}));

function SettingLabel() {
  const { enqueueSnackbar } = useSnackbar();

  const LabelsQuery = gql`
    query settingLabels($accessToken: String) {
      settingLabels(accessToken: $accessToken) {
        id
        text
        count
        createdBy
        dateOfcreation
      }
    }
  `;
  let [
    settingLabels,
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
    settingLabels();
  }, []);

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

  const classes = useStyles();
  const verticalRef = useRef(null);
  const [addInput, setAddInput] = useState("");

  const reducer = (state, action) => {
    switch (action.type) {
      case "ADDLABEL":
        let listData__ = state.labelList.map((curr) => {
          return {
            id: curr.id,
            text: curr.text,
            dateOfcreation: curr.dateOfcreation,
          };
        });

        updateLabels({
          variables: {
            labels: JSON.stringify([
              ...listData__,
              {
                id: state.labelList.length,
                text: action.data,
                dateOfcreation: (moment().unix() * 1000).toString(),
              },
            ]),
          },
        });
        return {
          ...state,
          labelList: [
            ...state.labelList,
            {
              id: state.labelList.length,
              text: action.data,
              count: 0,
              dateOfcreation: (moment().unix() * 1000).toString(),
              createdBy: JSON.parse(localStorage.getItem("ActiveUserdetail"))
                .name,
            },
          ],
        };
      case "DELETELABELDETAIL":
        return {
          ...state,
          delLabelDetail: state.labelList.find(
            (curr) => curr.id == action.data
          ),
        };
      case "DELETELABEL":
        let newList = state.labelList.filter(
          (curr) => curr.id != state.delLabelDetail.id
        );
        let listData_ = newList.map((curr) => {
          return {
            id: curr.id,
            text: curr.text,
            dateOfcreation: curr.dateOfcreation,
          };
        });
        updateLabels({
          variables: {
            labels: JSON.stringify(listData_),
          },
        });
        return {
          ...state,
          labelList: state.labelList.filter(
            (curr) => curr.id != state.delLabelDetail.id
          ),
        };
      case "GETRESPONSEFROMDB":
        return {
          ...state,
          labelList: action.data,
        };

      default:
        return state;
    }
  };
  const [compState, dispatch] = useReducer(reducer, {
    labelList: [],
    delLabelDetail: {},
  });

  const openDelModal = (id) => {
    dispatch({ type: "DELETELABELDETAIL", data: id });
    verticalRef.current.alterModalShow();
  };
  const deleteLabel = (id) => {
    dispatch({ type: "DELETELABEL" });
    verticalRef.current.alterModalShow();
  };

  const addLabelHandler = () => {
    if (addInput.length) {
      dispatch({ type: "ADDLABEL", data: addInput });
      setAddInput("");
    }
  };
  useEffect(() => {
    if (labelsQueryResult && labelsQueryResult.settingLabels) {
      dispatch({
        type: "GETRESPONSEFROMDB",
        data: labelsQueryResult.settingLabels,
      });
      // console.log(labelsQueryResult.settingLabels[1], "sdfghjkjhgf");
    }
  }, [labelsQueryResult]);
  const labelListData = compState.labelList?.map((curr, index) => (
    <>
      <div className={classes.labelListBodyMain}>
        <div className={classes.labelListBody}>
          <p className={classes.labelListBodyText}>
            <span
              style={{
                background: "rgba(87,184,255,.1)",
                color: "rgb(87,184,255)",
                fontSize: "12px",
                padding: "5px 10px",
              }}
            >
              {curr.text}
            </span>
          </p>
        </div>
        <div className={classes.labelListBody}>
          <p className={classes.labelListBodyText}>{curr.count} Uses</p>
        </div>
        <div className={classes.labelListBody}>
          <div className={classes.labelListBodyCreatedBy}>
            <p className={classes.labelListBodyText}>{curr.createdBy}</p>
            <p
              style={{ color: "rgba(117,117,117,.8)" }}
              className={classes.labelListBodyText}
            >
              {moment
                .unix(curr.dateOfcreation / 1000)
                .format("DD MMM YYYY hh:mm a")}{" "}
            </p>
          </div>
        </div>
        <button
          onClick={() => openDelModal(curr.id)}
          className={classes.labelListBodyBtn}
        >
          delete
        </button>
      </div>
    </>
  ));
  return (
    <div className={classes.settingLabelMain}>
      <div className={classes.addLabelMain}>
        <input
          className={classes.addLabelInput}
          value={addInput}
          onChange={(e) => setAddInput(e.target.value)}
          type="text"
          placeholder="Labels"
        />
        <button onClick={addLabelHandler} className={classes.addLabelBtn}>
          Add a Label
        </button>
      </div>

      <div className={classes.labelListMain}>
        <div className={classes.labelListHeadMain}>
          <div className={classes.labelListHead}>
            <h5 className={classes.labelListHeadHeading}>Labels</h5>
          </div>
          <div className={classes.labelListHead}>
            <h5 className={classes.labelListHeadHeading}>Uses</h5>
          </div>
          <div className={classes.labelListHead}>
            <h5 className={classes.labelListHeadHeading}>Created by</h5>
          </div>
        </div>

        {labelsQueryLoading ? (
          <div>
            <CircularProgress
              className={classes.loadingCircularProgress}
              size={24}
            />
          </div>
        ) : (
          ""
        )}
        {labelsQueryLoading == false ? (
          <>
            {labelListData.length > 0 ? (
              <div className={classes.labelListBodyParent}>{labelListData}</div>
            ) : (
              <div
                style={{
                  fontFamily: "poppins",
                  fontSize: "16px",
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "20px",
                }}
              >
                No Labels
              </div>
            )}
          </>
        ) : (
          ""
        )}
      </div>
      <VerticallyCenteredModal
        img={removeIcon}
        text={"Are you sure you want to delete this Label"}
        btnText={"Delete"}
        removeHandler={deleteLabel}
        ref={verticalRef}
      />
    </div>
  );
}

export default SettingLabel;
