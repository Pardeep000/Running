import React, { useState, useRef, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import WallpaperRoundedIcon from "@material-ui/icons/WallpaperRounded";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import SearchIcon from "@material-ui/icons/Search";
import { Dropdown, Form } from "react-bootstrap";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import _ from "lodash";
import { gql } from "apollo-boost";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import { useSnackbar } from "notistack";
import ChatIcon from "@material-ui/icons/Chat";
import CloseIcon from "@material-ui/icons/Close";
const useStyles = makeStyles((theme) => ({
  savedReplies: {
    "&::before": {
      content: '""',

      display: "block",
      position: "absolute",
      width: 0,
      height: 0,
      borderTop: " 15px solid transparent",
      borderRight: "15px solid transparent",
      borderBottom: "15px solid lightgrey",
      left: 20,
      bottom: "0.3%",
      transform: "rotate(-45deg)",
    },
    height: "300px",
    width: "350px",
    borderRadius: "5px",
    border: "1px solid lightgrey",
    marginBottom: "10px",
    overflow: "auto",
    background: "white",
  },
  savedRepliesContainer: {
    width: "90%",
    margin: "0 auto",
  },
  savedRepliesTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "60px",
  },
  savedRepliesSearchContainer: {},
  savedCard: {
    padding: "10px",
    display: "grid",
    gridTemplateColumns: "10% auto 10%",
    // justifyContent:'space-between',
    alignItems: "center",
    "&:hover": {
      background: "darkgrey",
    },
    cursor: "pointer",
  },
  inputContainer: {
    display: "grid",
    gridTemplateColumns: "60% auto",
    gridGap: "10px",
    width: "100%",
    marginBottom: "15px",
    alignItems: "center",
  },
  inputField: {
    width: "100%",
    padding: "10px",
    outline: "none",
  },
  savedCardTextContainer: {
    "& *": {
      margin: "5px",
    },
  },
  icon: {
    padding: "9px ",
    position: "absolute",
    // background: 'dodgerblue',
    color: "blue",
    minWidth: "50px",
    textAlign: "center",
  },
  savedCardImageContainer: {
    background: "lightgrey",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "35px",
    height: "35px",
  },
  btnContainer: {
    position: "relative",
    "&:hover": {
      background: "lightgrey",
      width: "",
      padding: 4,
    },
  },
  focusRemove: {
    boxShadow: "none !important",
    fontFamily: "poppins",
    fontSize: '14px'
  },
  shortMessageContainer: {
    padding: "6px",
    background: "white",
    width: "400px",
    minheight: "80px",
    marginRight: "300px",
    border: "1px solid lightgrey",
    borderRadius: "5px",
    "&:hover": {
      background: "lightgrey",
    },
  },
  shortMessageCloseButtonContainer: {
    height: "20px",
    width: "20px",
    borderRadius: "50%",
    margin: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    background: "white",
  },
}));

function SavedRepliesContainer(props) {
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const [AddNewFormShow, setAddNewFormShow] = useState(false);
  const [savedDisabled, setSavedDisabled] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [searchArray, setSearchArray] = useState([]);
  const [sortValue, setSortValue] = useState("Frequently used");
  const [FormValues, setFormValues] = useState({
    id: null,
    shortcut: "",
    messagebox: "",
  });

  const [searchData, setSearchData] = useState({
    id: null,
    short: "",
    long: "",
    count: 0,
  });
  {


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
            listData_.push(item);
          });
        let finalArray = _.orderBy(listData_, "count", "desc");
        setSavedReplies(finalArray);

        if (props.searchText.length) {
          let value = props.searchText;
          let searchedArray = [];
          let SearchArray = [];
          let FormatArray = [];
          listData_.length &&
            listData_.map((curr) =>
              SearchArray.push(`${curr.short.toLowerCase()}`)
            );
          if (SearchArray.length) {
            searchedArray = SearchArray.filter((curr) =>
              curr.includes(value.toLowerCase())
            );

            searchedArray.length &&
              searchedArray.map((currs) =>
                FormatArray.push({
                  id:
                    listData_ &&
                    listData_.find((curr) => curr.short.toLowerCase() == currs)
                      .id,
                  short: currs,
                  long:
                    listData_ &&
                    listData_.find((curr) => curr.short.toLowerCase() == currs)
                      .long,
                })
              );

            // setSearchArray(FormatArray);
            setSavedReplies(FormatArray);
          }
        }
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
        } else {
          enqueueSnackbar(updateresponseQueryResult.updateresponse.error, {
            variant: "error",
          });
        }
      }
    }, [updateresponseQueryResult]);

    const [savedReplies, setSavedReplies] = useState([]);
    const [dataArray, setDataArray] = useState(savedReplies);

    const inputRef = useRef(null);
    const setAddFormValues = (e) => {
      let name = e.target.name;
      let values = e.target.value;
      setFormValues(() => {
        return {
          ...FormValues,
          [name]: values,
        };
      });
    };
    useEffect(() => {
      if (FormValues.shortcut.length > 0 && FormValues.messagebox.length > 0) {
        setSavedDisabled(false);
      } else {
        setSavedDisabled(true);
      }
    }, [FormValues]);

    const handleSave = () => {
      if (FormValues.id != null) {
        let editRecord = savedReplies.find((curr) => curr.id == FormValues.id);
        editRecord.short = FormValues.shortcut;
        editRecord.long = FormValues.messagebox;
        let RemainingArray =
          savedReplies.length &&
          savedReplies.filter((curr) => curr.id != FormValues.id);
        let finalArray = [editRecord, ...RemainingArray];
        finalArray = _.orderBy(finalArray, "id", "asc");
        updateresponse({
          variables: {
            response: JSON.stringify(finalArray),
          },
        });
      } else {
        setSavedReplies([
          ...savedReplies,
          {
            id: savedReplies.length,
            short: FormValues.shortcut,
            long: FormValues.messagebox,
            count: 0,
          },
        ]);
        updateresponse({
          variables: {
            response: JSON.stringify([
              ...savedReplies,
              {
                id: savedReplies.length,
                short: FormValues.shortcut,
                long: FormValues.messagebox,
                count: 0,
              },
            ]),
          },
        });
      }

      setFormValues({
        id: null,
        shortcut: "",
        messagebox: "",
      });
      setAddNewFormShow(false);
    };

    useEffect(() => {
      if (props.searchText.length) {
        let value = props.searchText;
        let searchedArray = [];
        let SearchArray = [];
        let FormatArray = [];
        if (value.length) {
          savedReplies.length &&
            savedReplies.map((curr) =>
              SearchArray.push(`${curr.short.toLowerCase()}`)
            );

          if (SearchArray.length) {
            searchedArray = SearchArray.filter((curr) =>
              curr.startsWith(value.toLowerCase())
            );
            searchedArray.length &&
              searchedArray.map((currs) =>
                FormatArray.push({
                  id:
                    savedReplies &&
                    savedReplies.find((curr) => curr.short.toLowerCase() == currs)
                      .id,
                  short: currs,
                  long:
                    savedReplies &&
                    savedReplies.find((curr) => curr.short.toLowerCase() == currs)
                      .long,
                })
              );

            // setSearchArray(FormatArray);
            if (FormatArray.length == 1) {
              setSearchData(FormatArray[0]);
            } else {
              setSearchData({
                id: null,
                short: "",
                long: "",
                count: 0,
              });
            }
          } else {
            setSearchData({
              id: null,
              short: "",
              long: "",
              count: 0,
            });
          }
        } else {
          setSearchData({
            id: null,
            short: "",
            long: "",
            count: 0,
          });
        }
      }
    }, [props.searchText]);

    const SearchReplies = (e) => {
      setSearchValue(e.target.value);
      let value = e.target.value;
      let searchedArray = [];
      let SearchArray = [];
      let FormatArray = [];
      if (value.length) {
        savedReplies.length &&
          savedReplies.map((curr) =>
            SearchArray.push(`${curr.short.toLowerCase()}`)
          );
        if (SearchArray.length) {
          searchedArray = SearchArray.filter((curr) =>
            curr.includes(value.toLowerCase())
          );
          searchedArray.length &&
            searchedArray.map((currs) =>
              FormatArray.push({
                id:
                  savedReplies &&
                  savedReplies.find((curr) => curr.short.toLowerCase() == currs)
                    .id,
                short: currs,
                long:
                  savedReplies &&
                  savedReplies.find((curr) => curr.short.toLowerCase() == currs)
                    .long,
              })
            );

          // setSearchArray(FormatArray);
          setDataArray(FormatArray);
        } else {
          setSearchArray([]);
          setDataArray([]);
          return;
        }
      } else {
        setDataArray(savedReplies);
      }
    };
    const editShortCut = (id) => {
      let dataArray = savedReplies.find((curr) => curr.id == id);
      setFormValues(() => {
        return {
          id: id,
          shortcut: dataArray.short,
          messagebox: dataArray.long,
        };
      });
      setAddNewFormShow(true);
    };
    const deleteSavedReply = (id) => {
      let updatedArray = [];

      updatedArray =
        savedReplies &&
        savedReplies.length &&
        savedReplies.filter((curr) => curr.id != id);

      setSavedReplies(updatedArray);
      updateresponse({
        variables: {
          response: JSON.stringify(updatedArray),
        },
      });
    };
    const sendMessageDataToParentComponent = (data) => {
      let cloneOfDataArray = dataArray;
      // let arrayWithoutMatchRecord = cloneOfDataArray.filter((curr)=>curr != data);
      //  arrayWithoutMatchRecord.unshift(data);
      let index = cloneOfDataArray.indexOf(data);

      for (let i = 0; i < cloneOfDataArray.length; i++) {
        if (i == index) {
          cloneOfDataArray[i].id = 0;
          cloneOfDataArray[i].count = cloneOfDataArray[i].count + 1;
        } else {
          cloneOfDataArray[i].id = cloneOfDataArray[i].id + 1;
        }
        // arrayWithoutMatchRecord[i].id = arrayWithoutMatchRecord[i].id + 1;
      }

      updateresponse({
        variables: {
          response: JSON.stringify(cloneOfDataArray),
        },
      });

      props.setInputTextField(data.long);
      props.setcloseSavedRepliesWindow(false);
      props.setSearchText("");
    };
    const sendSearchDataToParentComponent = (data) => {
      props.setInputTextField(data.long);
      props.setcloseSavedRepliesWindow(false);
      props.setSearchText("");
    };
    const ListSortedHandler = (e) => {
      let value = e.target.value;
      if (value == "Recently used") {
        let finalArray = _.orderBy(dataArray, "id", "asc");
        setDataArray(finalArray);
        // setSortValue("Recently used");
      } else if (value == "Frequently used") {
        let finalArray = _.orderBy(dataArray, "count", "desc");
        setDataArray(finalArray);
        // setSortValue("Frequently used");
      }
    };
    useEffect(() => {
      if (savedReplies) {
        setDataArray(savedReplies);
      }
    }, [savedReplies]);

    const SavedCard = ({ data }) => {
      return (
        <div className={classes.savedCard}>
          {/* avatar */}
          <div className={classes.savedCardImageContainer}>
            <WallpaperRoundedIcon />
          </div>
          <div
            onClick={() => sendMessageDataToParentComponent(data)}
            className={classes.savedCardTextContainer}
          >
            <h4 style={{ fontSize: "16px" }}>{data.short}</h4>
            <p>{data.long}</p>
          </div>
          {/* dropdown */}
          <div style={{ position: "relative" }}>
            {/* <Button style={{background:'transparent'}} aria-controls="simple-menu" aria-haspopup="true" onClick={()=>{editShortCut(data.id)}}>
              <MoreHorizIcon className={classes.btnContainer}/>
                </Button> */}
            <Dropdown>
              <Dropdown.Toggle
                className={classes.focusRemove}
                variant="default"
                id="dropdown-basic"
              >
                <MoreHorizIcon className={classes.btnContainer} />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() => {
                    editShortCut(data.id);
                  }}
                >
                  Edit
                </Dropdown.Item>
                <Dropdown.Item onClick={() => deleteSavedReply(data.id)}>
                  Delete
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      );
    };

    return props.searchText.length ? (
      searchData.short != "" && searchData.long != "" ? (
        <div className={classes.shortMessageContainer}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "-10px",
            }}
          >
            <ChatIcon />
            <p>From your shortcut in saved reply. Click to fill</p>
            <div
              onClick={() => props.setSearchText("")}
              className={classes.shortMessageCloseButtonContainer}
            >
              <CloseIcon style={{ fontSize: "18px" }} />
            </div>
          </div>
          <div
            onClick={() => sendSearchDataToParentComponent(searchData)}
            style={{ margin: "0", cursor: "pointer" }}
          >
            <h4 style={{ fontSize: "16px", margin: "0" }}>{searchData.short}</h4>
            <p>{searchData.long}</p>
          </div>
        </div>
      ) : null
    ) : (
      <div className={classes.savedReplies}>
        <div className={classes.savedRepliesContainer}>
          {!AddNewFormShow && (
            <>



              <div className={classes.savedRepliesTop}>
                <h3 style={{ fontSize: "20px" }}>Saved replies</h3>
                <Button
                  style={{ height: "30px", fontFamily: 'poppins' }}
                  onClick={() => {
                    setFormValues({
                      id: null,
                      shortcut: "",
                      messagebox: "",
                    });
                    setAddNewFormShow(!AddNewFormShow);
                  }}
                >
                  Add new
                </Button>
              </div>
              <div className={classes.savedRepliesSearchContainer}>
                {/* input field */}
                <div className={classes.inputContainer}>
                  {/* <SearchIcon className={classes.icon}/> */}
                  {/* <i className="fa fa-user icon"></i> */}
                  <Form.Group
                    className={classes.focusRemove}
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      className={classes.focusRemove}
                      type="text"
                      onChange={(e) => SearchReplies(e)}
                      placeholder="Search"
                      name="search"
                      value={searchValue}
                    />
                  </Form.Group>
                  {/* <input className={classes.inputField} type="text" onChange={(e)=>SearchReplies(e)} placeholder="Search" name="search" value={searchValue}/> */}

                  <Form.Select
                    onChange={(e) => ListSortedHandler(e)}
                    className={classes.focusRemove}
                    aria-label="Default select example"
                  >
                    {/* <option>Open this select menu</option> */}
                    <option style={{ fontFamily: 'poppins' }} value="Frequently used">Frequently used</option>
                    <option style={{ fontFamily: 'poppins' }} value="Recently used">Recently used</option>
                  </Form.Select>
                </div>
              </div>
              <div>
                {dataArray.length > 0 &&
                  dataArray.map((curr, i) => <SavedCard data={curr} />)}
                {dataArray.length == 0 && (
                  <h4 style={{ opacity: "0.8", fontSize: "17px" }}>
                    No Saved Replies
                  </h4>
                )}
              </div>
            </>
          )}
          {AddNewFormShow && (
            // <AddSavedResponse/>
            <div>
              <h3 style={{ fontSize: "22px", marginTop: "10px" }}>
                Create saved reply
              </h3>
              <p>
                Add a text shortcut to quickly insert this reply. Shortcuts must
                be at least 3 characters.
              </p>

              <h3 style={{ fontSize: "18px" }}>Shortcut</h3>
              <div>
                <input
                  ref={inputRef}
                  className={classes.inputField}
                  type="text"
                  onChange={(e) => setAddFormValues(e)}
                  placeholder="Shortchut"
                  name="shortcut"
                  value={FormValues.shortcut}
                />
              </div>

              <h3 style={{ fontSize: "18px" }}>Message</h3>
              <textarea
                id="message"
                name="messagebox"
                rows="4"
                cols="58"
                placeholder="Type a message"
                onChange={(e) =>
                  FormValues.messagebox.length < 1000 ||
                    e.target.value.length < 1000
                    ? setAddFormValues(e)
                    : null
                }
                value={FormValues.messagebox}
              ></textarea>
              <div
                style={{
                  marginTop: "10px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>{1000 - FormValues.messagebox.length}/1000</span>
                <span />
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setAddNewFormShow(false);
                    }}
                  >
                    cancel
                  </Button>
                  <Button
                    style={{ marginLeft: "10px", width: "80px" }}
                    variant="outlined"
                    color="primary"
                    onClick={handleSave}
                    disabled={savedDisabled}
                  >
                    save
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
export default SavedRepliesContainer;
