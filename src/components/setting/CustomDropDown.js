import React, { useEffect, useState } from "react";
// import downIcon from "../../assets/chatWindow/Icons-chevron-down.svg";
import { makeStyles } from "@material-ui/core/styles";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Link, useHistory } from "react-router-dom";
import { Settingbar } from "../../store/actions/setttingbar";
import { useDispatch, useSelector } from "react-redux";
const useStyles = makeStyles((theme) => ({
  CustomDropDownMain: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    margin: "15px 0px",
  },
  dropDownMainText: {
    fontFamily: "poppins",
    fontSize: "15px",
  },
  dropDownDataListItem: {
    listStyle: "none",
    marginLeft: "15px",
    marginBottom: "5px",
    fontFamily: "poppins",
    fontSize: "14px",
  },
  listContainer: {
    display: "flex",
    justifyContent: "space-between",
    cursor: "pointer",
  },
  smallButton: {
    // position: "absolute",
    right: "16px",
    fontSize: "12px",
    fontWeight: "600",
    color: "green",
    border: "solid 1px green",
    // backgroundColor: "red",
    textTransform: "uppercase",
    height: "20px",
    // Lineheight: "15px",
    width: "37px",
    textAlign: "center",
    borderRadius: "4px",

  }
}));

function CustomDropDown({
  dropDownMainText,
  dropDownData,
  dropPaths,
  isClicked
}) {
  const classes = useStyles();
  const rowStatexy = useSelector((state) => state.SettingbarReducer2);
  const [isDropDownClicked, setIsDropDownClicked] = useState(isClicked);
  const history = useHistory();
  const { location: { pathname } } = history;
  const trimedPath = pathname.replace("/setting/", "");

  const state = pathname.includes("setting") ? true : false;

  const [tempState, setTempState] = useState(
    "" || localStorage.getItem("signal4")
  );

  // const [state, setstate] = useState("" || localStorage.getItem("signal5"));
  const navigate = useHistory();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const state = pathname.includes("setting") ? true : false;
  // }, [history]);

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     setIsDropDownClicked(JSON.parse(localStorage.getItem("signal3")));
  //     // setTempState(localStorage.getItem("signal4"));
  //     // setstate(localStorage.getItem("signal5"));
  //   }
  // }, []);

  // useEffect(() => {
  //   if (rowStatexy?.signal == true) {
  //     setIsDropDownClicked(false);
  //     // setstate("");
  //     setTempState("");
  //   }
  // }, [rowStatexy]);
  const onItemClick = (data) => {
    let route = dropPaths[data];
    navigate.push(`/setting/${route}`);
    // setTempState(dropPaths[data]);
    // localStorage.setItem("signal4", dropPaths[data]);
    // setIsDropDownClicked(true);
    dispatch(Settingbar(isDropDownClicked));
  };


  const handleIconImage = () => {
    setIsDropDownClicked(!isDropDownClicked);
    // if (isDropDownClicked == false) {
    //   // setstate(dropDownMainText);
    //   localStorage.setItem("signal5", dropDownMainText);
    // } else {
    //   // setstate("");
    // }
  };
  const handlespanclick = () => {
    setIsDropDownClicked(!isDropDownClicked);
    // if (isDropDownClicked == false) {
    //   // setstate(dropDownMainText);
    //   localStorage.setItem("signal5", dropDownMainText);
    // } else {
    //   // setstate("");
    //   // localStorage.setItem("signal5", "");
    // }
  };
  return (
    <div>
      <div
        className={classes.CustomDropDownMain}
        onClick={() => setIsDropDownClicked(!isDropDownClicked)}
      >
        <span
          className={classes.dropDownMainText}
          onClick={handlespanclick}
          style={{
            color:
              // state?.toLowerCase() == dropDownMainText?.toLowerCase()
              isClicked
                ? "green"
                : "gray",
            cursor: "pointer",
            fontWeight:
              // state?.toLowerCase() == dropDownMainText?.toLowerCase()
              isClicked
                ? "600"
                : "",
          }}
        >
          {dropDownMainText}
        </span>
        {isDropDownClicked ? (
          <ArrowDropDownIcon onClick={handleIconImage} />
        ) : (<ArrowRightIcon onClick={handleIconImage} />)}
        {/* <img
          onClick={handleIconImage}
          src={downIcon}
          alt="arrow"
          style={{
            cursor: "pointer",
            transform: !isDropDownClicked ? "rotate(-90deg)" : null,
            width: "15px",
          }}
        /> */}
      </div>
      {isDropDownClicked && (
        <div>
          {dropDownData.map((curr) => (
            <div
              className={classes.listContainer}
              onClick={() => onItemClick(curr)}
            >
              <li
                className={classes.dropDownDataListItem}
                style={{
                  color:
                    trimedPath?.toLowerCase() == curr?.toLowerCase()
                      // isClicked
                      ? "#55A530"
                      : "",
                }}
              >
                {curr}
              </li>
              {
                curr == "Chatpage" || (dropDownMainText == "Channels" && <span className={classes.smallButton}>off</span>)
              }
              {/* {
                dropDownMainText == 'Channels' ? ( {curr} != "Chatpage" && (
                  // <Butto
                  //   style={{ fontSize: "8px",fontWeight:"400", height: "25px", width: "25px" }}
                  //   variant="outlined"
                  //   color="success"
                  //   size="small"
                  // >
                  //   OFF
                  // </Button>
                  <span className={classes.smallButton}>off</span>
                  )
              ) :(null)} */}

            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CustomDropDown;
