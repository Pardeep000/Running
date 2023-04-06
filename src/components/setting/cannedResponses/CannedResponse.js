import React, { useReducer, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import removeIcon from "../../../assets/setting/close-02.svg";
import VerticallyCenteredModal from "../VerticallyCenteredModal";
import { gql } from "apollo-boost";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import { useSnackbar } from "notistack";
import { Form } from "react-bootstrap";
import EditModal from "./EditModal";
import _ from "lodash";
import { CircularProgress } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  loadingCircularProgress: {
    margin: "auto",
    display: "block",
    marginTop: 20,
    color: "#55A530",
  },
  cannedMain: {
    width: "70%",
    marginTop: "20px",
    padding: "10px",
  },
  whatAreHeading: {
    fontFamily: "poppins",
    fontSize: "14px",
    padding: "5px 0px",
    borderBottom: "1px solid rgba(119, 119, 119,.5)",
  },
  whatArePara: {
    fontFamily: "poppins",
    fontSize: "12px",
    color: "rgba(119, 119, 119,1)",
    marginBottom: "30px",
  },
  addCannedResponseMain: {
    width: "80%",
  },
  addCannedResponseShortcutMain: {
    display: "grid",
    gridTemplateColumns: "65% auto",
    gridGap: "7px",
    marginBottom: "5px",
  },
  addCannedResponseShortcutInput: {
    fontFamily: "poppins",
    fontSize: "12px",
    color: "#777777",
    border: "1px solid rgba(119,119,119,.5)",
    borderRadius: "3px",
    paddingLeft: "5px",
  },
  addCannedResponseShortcutBtn: {
    border: "none",
    borderRadius: "3px",
    color: "white",
    background: "#55A530",
    fontFamily: "poppins",
    fontSize: "12px",
    padding: "6px 15px",
    cursor: "pointer",
  },
  addCannedResponseMainLong: {
    display: "grid",
    gridTemplateColumns: "65%",
  },
  addCannedResponseLongInput: {
    fontFamily: "poppins",
    fontSize: "12px",
    color: "#777777",
    border: "1px solid rgba(119,119,119,.5)",
    borderRadius: "3px",
    paddingLeft: "5px",
  },
  addCannedResponseLongPara: {
    marginTop: "10px",
    fontFamily: "poppins",
    fontSize: "11.5px",
    color: "#777777",
  },
  addCannedResponseListSearch: {
    display: "flex",

    paddingBottom: "20px",
    borderBottom: "1px solid rgba(119,119,119,.5)",
  },
  addCannedResponseListSearchInput: {
    fontFamily: "poppins",
    fontSize: "12px",
    color: "#777777",
    border: "1px solid rgba(119,119,119,.5)",
    borderRadius: "3px",
    paddingLeft: "5px",
    width: "200px",
    height: "29px",
  },
  addCannedResponseListItemMain: {
    padding: "15px 0px 10px 0",
    borderBottom: "1px solid rgba(119,119,119,.5)",
  },
  addCannedResponseListItemLongText: {
    color: "black",
    fontSize: "13.5px",
    fontFamily: "poppins",
    fontWeight: "500",
    marginBottom: "5px",
  },
  addCannedResponseListItemShortTextMain: {
    fontFamily: "poppins",
    fontSize: "12px",
    color: "#777777",
  },
  addCannedResponseListItemShortText: {
    marginLeft: "5px",
    border: "1px solid rgba(119,119,119,.5)",
    padding: "1px 6px",
    fontSize: "12px",
    color: "black",
  },
  addCannedResponseListItemBtnMain: {
    display: "flex",
    justifyContent: "flex-end",
    paddingRight: "10px",
    marginTop: "-25px",
  },
  addCannedResponseListItemBtnEdit: {
    border: "none",
    background: "none",
    fontFamily: "poppins",
    fontSize: "13px",
    color: "green",
  },
  addCannedResponseListItemBtnDelete: {
    border: "none",
    background: "none",
    fontFamily: "poppins",
    fontSize: "13px",
    color: "red",
  },
  focusRemove: {
    width: "160px",
    height: "30px",
    fontFamily: "poppins",
    fontSize: "13px",
    marginLeft: "10px",
    outline: "none",
    boxShadow: "none !important",
  },
}));
function CannedResponse() {
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const verticalRef = React.useRef(null);
  const editModalRef = React.useRef(null);

  const ResponseQuery = gql`
    query getResponse($accessToken: String) {
      getResponse(accessToken: $accessToken) {
        id
        responses
      }
    }
  `;
  let [
    getResponse,
    {
      loading: ResponseQueryLoading,
      error: ResponseQueryError,
      data: ResponseQueryResult,
    },
  ] = useLazyQuery(ResponseQuery, {
    fetchPolicy: "network-only",
  });
  useEffect(() => {
    if (ResponseQueryError) {
      ResponseQueryError.graphQLErrors.map(({ message }, i) => {
        enqueueSnackbar(message, { variant: "error" });
      });
    }
  }, [ResponseQueryError]);

  useEffect(() => {
    getResponse();
  }, []);
  useEffect(() => {
    if (ResponseQueryResult && ResponseQueryResult.getResponse) {
      var listData_ = [];

      var decodeResult = JSON.parse(ResponseQueryResult.getResponse.responses);

      decodeResult &&
        decodeResult.map((item) => {
          listData_.push({
            id: item.id,
            shortCut: item.short,
            longText: item.long,
          });
        });

      dispatch({ type: "RESPONSEFROMDB", data: listData_ });
      dispatch({ type: "DUPLICATE" });
    }
  }, [ResponseQueryResult]);

  const updateresponseQuery = gql`
    mutation updateresponse($response: String!) {
      updateresponse(response: $response) {
        success
        error
      }
    }
  `;
  let [
    updateresponse,
    {
      loading: updateresponseQueryLoading,
      error: updateresponseQueryError,
      data: updateresponseQueryResult,
    },
  ] = useMutation(updateresponseQuery);

  useEffect(() => {
    if (updateresponseQueryError) {
      updateresponseQueryError.graphQLErrors.map(({ message }, i) => {
        enqueueSnackbar(message, { variant: "error" });
      });
    }
  }, [updateresponseQueryError]);

  useEffect(() => {
    if (updateresponseQueryResult && updateresponseQueryResult.updateresponse) {
      if (updateresponseQueryResult.updateresponse.success) {
        dispatch({ type: "DUPLICATE" });
      } else {
        enqueueSnackbar(updateresponseQueryResult.updateresponse.error, {
          variant: "error",
        });
      }
    }
  }, [updateresponseQueryResult]);

  const initialState = {
    shortCut: "",
    longText: "",
    btnDisabled: true,
    cannedList: [],
    activeCannedId: null,
    searchText: "",
    duplicate: [],
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "SHORTCUT":
        return {
          ...state,
          shortCut: action.data,
        };
      case "LONGTEXT":
        return {
          ...state,
          longText: action.data,
        };
      case "BTNDISABLED":
        return {
          ...state,
          btnDisabled: action.data,
        };
      case "ACTIVEID":
        return {
          ...state,
          activeCannedId: action.data,
        };
      case "ADDRESPONSE":
        let newCannedListed = [...state.cannedList, action.data];
        let listData__ = [];
        newCannedListed.map((item) => {
          listData__.push({
            id: item.id,
            short: item.shortCut,
            long: item.longText,
          });
        });

        updateresponse({
          variables: {
            response: JSON.stringify(listData__),
          },
        });
        return {
          ...state,
          cannedList: [...state.cannedList, action.data],
        };
      case "DELETERESPONSE":
        let newStateofCannedList = state.cannedList.filter(
          (curr) => curr.id != state.activeCannedId
        );
        let listData___ = [];
        newStateofCannedList.map((item) => {
          listData___.push({
            id: item.id,
            short: item.shortCut,
            long: item.longText,
          });
        });

        updateresponse({
          variables: {
            response: JSON.stringify(listData___),
          },
        });

        return {
          ...state,
          cannedList: newStateofCannedList,
        };
      case "DUPLICATE":
        return {
          ...state,
          duplicate: state.cannedList,
        };
      case "SEARCHTEXT":
        return {
          ...state,
          searchText: action.data,
        };
      case "UPDATERESPONSE":
        let copyOfCannedList = state.cannedList;
        let removeUpdatedData = copyOfCannedList.filter(
          (curr) => curr.id != action.data.id
        );
        let newCannedList = [...removeUpdatedData, action.data];
        let sortListWithId = _.orderBy(newCannedList, "id", "asc");
        let listData_ = [];
        sortListWithId.map((item) => {
          listData_.push({
            id: item.id,
            short: item.shortCut,
            long: item.longText,
          });
        });

        updateresponse({
          variables: {
            response: JSON.stringify(listData_),
          },
        });
        return {
          ...state,
          cannedList: sortListWithId,
        };
      case "SEARCHFUNCTIION":
        if (state.searchText.length) {
          return {
            ...state,
            cannedList: state.duplicate.filter((curr) =>
              curr.shortCut.includes(state.searchText)
            ),
          };
        } else {
          return {
            ...state,
            cannedList: state.duplicate,
          };
        }
      case "RESPONSEFROMDB":
        return {
          ...state,
          cannedList: action.data,
        };
      default:
        return state;
    }
  };
  useEffect(() => {
    dispatch({ type: "DUPLICATE" });
  }, []);
  const [inputData, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (inputData.shortCut.length && inputData.longText.length) {
      dispatch({ type: "BTNDISABLED", data: false });
    } else {
      dispatch({ type: "BTNDISABLED", data: true });
    }
  }, [inputData.shortCut, inputData.longText]);

  useEffect(() => {
    dispatch({ type: "SEARCHFUNCTIION" });
  }, [inputData.searchText]);

  const onDeleteHandler = (id) => {
    verticalRef.current.alterModalShow();
    dispatch({ type: "ACTIVEID", data: id });
  };
  const onEditHandler = (id) => {
    dispatch({ type: "ACTIVEID", data: id });

    editModalRef.current.alterModalShow();
  };

  const listItems = inputData.cannedList.length ? (
    inputData.cannedList.map((curr) => (
      <>
        <div className={classes.addCannedResponseListItemMain}>
          <p className={classes.addCannedResponseListItemLongText}>
            {curr.longText}
          </p>

          <p className={classes.addCannedResponseListItemShortTextMain}>
            SHORTCUTS{" "}
            <span className={classes.addCannedResponseListItemShortText}>
              {curr.shortCut}
            </span>
          </p>

          <div className={classes.addCannedResponseListItemBtnMain}>
            <button
              onClick={() => onEditHandler(curr.id)}
              className={classes.addCannedResponseListItemBtnEdit}
            >
              edit
            </button>
            <button
              onClick={() => onDeleteHandler(curr.id)}
              className={classes.addCannedResponseListItemBtnDelete}
            >
              delete
            </button>
          </div>
        </div>
      </>
    ))
  ) : (
    <div>No Canned Response</div>
  );

  const addResponseHandler = () => {
    dispatch({
      type: "ADDRESPONSE",
      data: {
        id: inputData.cannedList.length,
        shortCut: inputData.shortCut,
        longText: inputData.longText,
      },
    });
    dispatch({ type: "SHORTCUT", data: "" });
    dispatch({ type: "LONGTEXT", data: "" });
    dispatch({ type: "DUPLICATE" });

    // #varaible
  };
  const updateCannedResponse = (e) => {
    dispatch({ type: "UPDATERESPONSE", data: e });
    editModalRef.current.alterModalShow();
  };
  const deleteCannedResponse = () => {
    dispatch({ type: "DELETERESPONSE" });
    verticalRef.current.alterModalShow();
  };
  return (
    <div className={classes.cannedMain}>
      <div className={classes.whatAre}>
        <h4 className={classes.whatAreHeading}>What are canned responses</h4>
        <p className={classes.whatArePara}>
          Canned responses are re-made messages you can recall easily during
          chat.
          <a style={{ textDecoration: "none", color: "#55A530" }} href="#">
            Learn more..
          </a>
        </p>
      </div>
      <div className={classes.addCannedResponseMain}>
        <div className={classes.addCannedResponseShortcutMain}>
          <input
            type="text"
            placeholder="Shortcut..."
            onChange={(e) =>
              dispatch({ type: "SHORTCUT", data: e.target.value })
            }
            value={inputData.shortCut}
            className={classes.addCannedResponseShortcutInput}
          />
          <button
            disabled={inputData.btnDisabled}
            className={classes.addCannedResponseShortcutBtn}
            onClick={addResponseHandler}
          >
            Add this response
          </button>
        </div>
        <div className={classes.addCannedResponseMainLong}>
          <textarea
            type="text"
            placeholder="Canned response text..."
            col="4"
            value={inputData.longText}
            onChange={(e) =>
              dispatch({ type: "LONGTEXT", data: e.target.value })
            }
            className={classes.addCannedResponseLongInput}
          />
          <p className={classes.addCannedResponseLongPara}>
            To use a canned response during a chat, Start type in your shortcut
            in message bar and text will appear
          </p>
        </div>
      </div>
      <div className={classes.addCannedResponseListMain}>
        <div className={classes.addCannedResponseListSearch}>
          <input
            type="text"
            placeholder="Search"
            value={inputData.searchText}
            onChange={(e) =>
              dispatch({ type: "SEARCHTEXT", data: e.target.value })
            }
            className={classes.addCannedResponseListSearchInput}
          />
          <Form.Select
            onChange={(e) => e}
            className={classes.focusRemove}
            aria-label="Default select example"
          >
            {/* <option>Open this select menu</option> */}
            <option value="Frequently used">Frequently used</option>
            <option value="Recently used">Recently used</option>
          </Form.Select>
        </div>
        {ResponseQueryLoading ? (
          <div>
            <CircularProgress
              className={classes.loadingCircularProgress}
              size={24}
            />
          </div>
        ) : (
          ""
        )}
        {ResponseQueryLoading == false ? (
          <>
            {listItems.length > 0 ? (
              <>{listItems}</>
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
                No CannedResponse
              </div>
            )}
          </>
        ) : (
          ""
        )}
      </div>
      <VerticallyCenteredModal
        img={removeIcon}
        text={"Are you sure you want to delete this canned response"}
        btnText={"Delete"}
        removeHandler={deleteCannedResponse}
        ref={verticalRef}
      />
      <EditModal
        ref={editModalRef}
        data={inputData.cannedList.find(
          (curr) => curr.id == inputData.activeCannedId
        )}
        updatedData={(e) => updateCannedResponse(e)}
      />
    </div>
  );
}

export default CannedResponse;
