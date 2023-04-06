import AddIcon from "@mui/icons-material/Add";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import CustomizedTables from "./materialtable";
import { IconButton } from "@material-ui/core";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useState, useEffect } from "react";
import "./navbar.css";

function MainNavbar() {
  const handlefilterbox = (event) => {
    setAge(event.target.value);
  };
  //useEffect for the first time it counts the tabs items
  useEffect(() => {
    var row = [];
    var browsingcounting = 0;
    var chatcounting = 0;
    var quecounting = 0;
    var allcustomercount = 0;
    for (let i = 0; i < data.length; i++) {
      row.push(data[i]);

      allcustomercount = allcustomercount + 1;
      if (data[i]?.activity == "Browsing") {
        browsingcounting = browsingcounting + 1;
      }
      if (data[i]?.activity == "Chatting") {
        chatcounting = chatcounting + 1;
      }
      if (data[i]?.activity == "Queued") {
        quecounting = quecounting + 1;
      } else {
      }
      setRows(row);
      setRows2(row.slice(0, 15));
    }

    setcustomerCount(allcustomercount);
    setbrowsingCount(browsingcounting);
    setchatCount(chatcounting);
    setqueuedCount(quecounting);
  }, []);
  //for select box

  const [age, setAge] = useState("10");

  //for initial table data
  const [rows, setRows] = useState([]);
  const [rows2, setRows2] = useState([]);
  //For count chats of tabs
  const [chatCount, setchatCount] = useState();
  const [customerCount, setcustomerCount] = useState();
  const [queuedCount, setqueuedCount] = useState();
  const [browsingCount, setbrowsingCount] = useState();
  //for styling
  const [isActiveChat, setActiveChat] = useState(false);
  const [isActiveBrows, setisActiveBrows] = useState(false);
  const [isActiveAll, setisActiveAll] = useState(true);
  const [isActiveQue, setisActiveQue] = useState(false);
  const [handleBrowsingRow, sethandleBrowsingRow] = useState([]);
  //dummy data for table
  const data = [
    {
      id: "1",
      name: "Waseem ali",
      email: "abc@gmail.com",
      actions: "-",
      activity: "Chatting",
      chattingwith: "Harry Zexa",
      ip: "1.009.245.2",
      image:
        "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000",
    },
    {
      id: "2",
      name: "Mr Waseem khan",
      email: "abc@gmail.com",
      actions: "-",
      activity: "Queued",
      chattingwith: "Harry Zexa",
      ip: "1.009.245.2",
      image:
        "https://cdn1.iconfinder.com/data/icons/user-pictures/100/female1-512.png",
    },

    {
      id: "3",
      name: "Mr Waseem khan",
      email: "abc@gmail.com",
      actions: "-",
      activity: "Chatting",
      chattingwith: "Harry Zexa",
      ip: "1.009.245.2",
      image:
        "https://cdn1.vectorstock.com/i/1000x1000/32/10/young-man-avatar-character-vector-14213210.jpg",
    },

    {
      id: "4",
      name: "Mr Waseem khan",
      email: "abc@gmail.com",
      actions: "-",
      activity: "Browsing",
      chattingwith: "Harry Zexa",
      ip: "1.009.245.2",
      image:
        "https://thumbs.dreamstime.com/b/happy-smiling-geek-hipster-beard-man-cool-avatar-geek-man-avatar-104871313.jpg",
    },
    {
      id: "5",
      name: "Mr Waseem khan",
      email: "abc@gmail.com",
      actions: "-",
      activity: "Browsing",
      chattingwith: "Harry Zexa",
      ip: "1.009.245.2",
      image:
        "https://cdn2.vectorstock.com/i/1000x1000/32/01/user-sign-icon-person-symbol-human-avatar-vector-12693201.jpg",
    },
    {
      id: "6",
      name: "Mr Waseem khan",
      email: "abc@gmail.com",
      actions: "-",
      activity: "Chatting",
      chattingwith: "Harry Zexa",
      ip: "1.009.245.2",
      image:
        "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000",
    },
    {
      id: "7",
      name: "Mr Waseem khan",
      email: "abc@gmail.com",
      actions: "-",
      activity: "Queued",
      chattingwith: "Harry Zexa",
      ip: "1.009.245.2",
      image:
        "https://cdn1.iconfinder.com/data/icons/user-pictures/100/female1-512.png",
    },

    {
      id: "8",
      name: "Mr Waseem khan",
      email: "abc@gmail.com",
      actions: "-",
      activity: "Chatting",
      chattingwith: "Harry Zexa",
      ip: "1.009.245.2",
      image:
        "https://cdn1.vectorstock.com/i/1000x1000/32/10/young-man-avatar-character-vector-14213210.jpg",
    },

    {
      id: "9",
      name: "Mr Waseem khan",
      email: "abc@gmail.com",
      actions: "-",
      activity: "Browsing",
      chattingwith: "Harry Zexa",
      ip: "1.009.245.2",
      image:
        "https://thumbs.dreamstime.com/b/happy-smiling-geek-hipster-beard-man-cool-avatar-geek-man-avatar-104871313.jpg",
    },
    {
      id: "10",
      name: "Mr Waseem khan",
      email: "abc@gmail.com",
      actions: "-",
      activity: "Browsing",
      chattingwith: "Harry Zexa",
      ip: "1.009.245.2",
      image:
        "https://cdn2.vectorstock.com/i/1000x1000/32/01/user-sign-icon-person-symbol-human-avatar-vector-12693201.jpg",
    },
    {
      id: "11",
      name: "Mr Waseem khan",
      email: "abc@gmail.com",
      actions: "-",
      activity: "Chatting",
      chattingwith: "Harry Zexa",
      ip: "1.009.245.2",
      image:
        "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000",
    },
    {
      id: "12",
      name: "Mr Waseem khan",
      email: "abc@gmail.com",
      actions: "-",
      activity: "Queued",
      chattingwith: "Harry Zexa",
      ip: "1.009.245.2",
      image:
        "https://cdn1.iconfinder.com/data/icons/user-pictures/100/female1-512.png",
    },

    {
      id: "13",
      name: "Mr Waseem khan",
      email: "abc@gmail.com",
      actions: "-",
      activity: "Chatting",
      chattingwith: "Harry Zexa",
      ip: "1.009.245.2",
      image:
        "https://cdn1.vectorstock.com/i/1000x1000/32/10/young-man-avatar-character-vector-14213210.jpg",
    },

    {
      id: "14",
      name: "Mr Waseem khan",
      email: "abc@gmail.com",
      actions: "-",
      activity: "Browsing",
      chattingwith: "Harry Zexa",
      ip: "1.009.245.2",
      image:
        "https://thumbs.dreamstime.com/b/happy-smiling-geek-hipster-beard-man-cool-avatar-geek-man-avatar-104871313.jpg",
    },
    {
      id: "15",
      name: "Mr Waseem khan",
      email: "abc@gmail.com",
      actions: "-",
      activity: "Browsing",
      chattingwith: "Harry Zexa",
      ip: "1.009.245.2",
      image:
        "https://cdn2.vectorstock.com/i/1000x1000/32/01/user-sign-icon-person-symbol-human-avatar-vector-12693201.jpg",
    },
    {
      id: "16",
      name: "Mr Waseem khan",
      email: "abc@gmail.com",
      actions: "-",
      activity: "Chatting",
      chattingwith: "Harry Zexa",
      ip: "1.009.245.2",
      image:
        "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000",
    },
    {
      id: "17",
      name: "Mr Waseem khan",
      email: "abc@gmail.com",
      actions: "-",
      activity: "Queued",
      chattingwith: "Harry Zexa",
      ip: "1.009.245.2",
      image:
        "https://cdn1.iconfinder.com/data/icons/user-pictures/100/female1-512.png",
    },

    {
      id: "18",
      name: "Mr Waseem khan",
      email: "abc@gmail.com",
      actions: "-",
      activity: "Chatting",
      chattingwith: "Harry Zexa",
      ip: "1.009.245.2",
      image:
        "https://cdn1.vectorstock.com/i/1000x1000/32/10/young-man-avatar-character-vector-14213210.jpg",
    },

    {
      id: "19",
      name: "Mr Waseem khan",
      email: "abc@gmail.com",
      actions: "-",
      activity: "Browsing",
      chattingwith: "Harry Zexa",
      ip: "1.009.245.2",
      image:
        "https://thumbs.dreamstime.com/b/happy-smiling-geek-hipster-beard-man-cool-avatar-geek-man-avatar-104871313.jpg",
    },
    {
      id: "20",
      name: "Mr Waseem khan",
      email: "abc@gmail.com",
      actions: "-",
      activity: "Browsing",
      chattingwith: "Harry Zexa",
      ip: "1.009.245.2",
      image:
        "https://cdn2.vectorstock.com/i/1000x1000/32/01/user-sign-icon-person-symbol-human-avatar-vector-12693201.jpg",
    },
    {
      id: "21",
      name: "Mr Waseem khan",
      email: "abc@gmail.com",
      actions: "-",
      activity: "Chatting",
      chattingwith: "Harry Zexa",
      ip: "1.009.245.2",
      image:
        "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000",
    },
    {
      id: "22",
      name: "DEF",
      email: "abc@gmail.com",
      actions: "-",
      activity: "Queued",
      chattingwith: "Harry Zexa",
      ip: "1.009.245.2",
      image:
        "https://cdn1.iconfinder.com/data/icons/user-pictures/100/female1-512.png",
    },

    {
      id: "23",
      name: "GHI",
      email: "abc@gmail.com",
      actions: "-",
      activity: "Chatting",
      chattingwith: "Agent 23",
      ip: "1.009.245.2",
      image:
        "https://cdn1.vectorstock.com/i/1000x1000/32/10/young-man-avatar-character-vector-14213210.jpg",
    },

    {
      id: "24",
      name: "JKL",
      email: "abc@gmail.com",
      actions: "-",
      activity: "Browsing",
      chattingwith: "Agent 24",
      ip: "1.009.245.2",
      image:
        "https://thumbs.dreamstime.com/b/happy-smiling-geek-hipster-beard-man-cool-avatar-geek-man-avatar-104871313.jpg",
    },
    {
      id: "25",
      name: "MNO",
      email: "abc@gmail.com",
      actions: "-",
      activity: "Browsing",
      chattingwith: "Agent 25",
      ip: "1.009.245.2",
      image:
        "https://cdn2.vectorstock.com/i/1000x1000/32/01/user-sign-icon-person-symbol-human-avatar-vector-12693201.jpg",
    },
    {
      id: "26",
      name: "ABC",
      email: "abc@gmail.com",
      actions: "-",
      activity: "Chatting",
      chattingwith: "Agent 26",
      ip: "1.009.245.2",
      image:
        "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000",
    },
    {
      id: "27",
      name: "DEF",
      email: "abc@gmail.com",
      actions: "-",
      activity: "Queued",
      chattingwith: "Agent 27",
      ip: "1.009.245.2",
      image:
        "https://cdn1.iconfinder.com/data/icons/user-pictures/100/female1-512.png",
    },

    {
      id: "28",
      name: "GHI",
      email: "abc@gmail.com",
      actions: "-",
      activity: "Chatting",
      chattingwith: "Agent 28",
      ip: "1.009.245.2",
      image:
        "https://cdn1.vectorstock.com/i/1000x1000/32/10/young-man-avatar-character-vector-14213210.jpg",
    },

    {
      id: "29",
      name: "JKL",
      email: "abc@gmail.com",
      actions: "-",
      activity: "Browsing",
      chattingwith: "Agent 29",
      ip: "1.009.245.2",
      image:
        "https://thumbs.dreamstime.com/b/happy-smiling-geek-hipster-beard-man-cool-avatar-geek-man-avatar-104871313.jpg",
    },
    {
      id: "30",
      name: "MNO",
      email: "abc@gmail.com",
      actions: "-",
      activity: "Browsing",
      chattingwith: "Agent 30",
      ip: "1.009.245.2",
      image:
        "https://cdn2.vectorstock.com/i/1000x1000/32/01/user-sign-icon-person-symbol-human-avatar-vector-12693201.jpg",
    },
    {
      id: "31",
      name: "JKL",
      email: "abc@gmail.com",
      actions: "-",
      activity: "Browsing",
      chattingwith: "Agent 31",
      ip: "1.009.245.2",
      image:
        "https://thumbs.dreamstime.com/b/happy-smiling-geek-hipster-beard-man-cool-avatar-geek-man-avatar-104871313.jpg",
    },
    {
      id: "32",
      name: "MNO",
      email: "abc@gmail.com",
      actions: "-",
      activity: "Browsing",
      chattingwith: "Agent 32",
      ip: "1.009.245.2",
      image:
        "https://cdn2.vectorstock.com/i/1000x1000/32/01/user-sign-icon-person-symbol-human-avatar-vector-12693201.jpg",
    },
    {
      id: "33",
      name: "ABC",
      email: "abc@gmail.com",
      actions: "-",
      activity: "Chatting",
      chattingwith: "Agent 33",
      ip: "1.009.245.2",
      image:
        "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000",
    },
    {
      id: "34",
      name: "DEF",
      email: "abc@gmail.com",
      actions: "-",
      activity: "Queued",
      chattingwith: "Agent 34",
      ip: "1.009.245.2",
      image:
        "https://cdn1.iconfinder.com/data/icons/user-pictures/100/female1-512.png",
    },

    {
      id: "35",
      name: "GHI",
      email: "abc@gmail.com",
      actions: "-",
      activity: "Chatting",
      chattingwith: "Agent 35",
      ip: "1.009.245.2",
      image:
        "https://cdn1.vectorstock.com/i/1000x1000/32/10/young-man-avatar-character-vector-14213210.jpg",
    },

    {
      id: "36",
      name: "JKL",
      email: "abc@gmail.com",
      actions: "-",
      activity: "Browsing",
      chattingwith: "Agent 36",
      ip: "1.009.245.2",
      image:
        "https://thumbs.dreamstime.com/b/happy-smiling-geek-hipster-beard-man-cool-avatar-geek-man-avatar-104871313.jpg",
    },
    {
      id: "37",
      name: "MNO",
      email: "abc@gmail.com",
      actions: "-",
      activity: "Browsing",
      chattingwith: "Agent 37",
      ip: "1.009.245.2",
      image:
        "https://cdn2.vectorstock.com/i/1000x1000/32/01/user-sign-icon-person-symbol-human-avatar-vector-12693201.jpg",
    },
    {
      id: "38",
      name: "ABC",
      email: "abc@gmail.com",
      actions: "-",
      activity: "Chatting",
      chattingwith: "Agent 38",
      ip: "1.009.245.2",
      image:
        "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000",
    },
    {
      id: "39",
      name: "DEF",
      email: "abc@gmail.com",
      actions: "-",
      activity: "Queued",
      chattingwith: "Agent 39",
      ip: "1.009.245.2",
      image:
        "https://cdn1.iconfinder.com/data/icons/user-pictures/100/female1-512.png",
    },

    {
      id: "40",
      name: "GHI",
      email: "abc@gmail.com",
      actions: "-",
      activity: "Chatting",
      chattingwith: "Agent 40",
      ip: "1.009.245.2",
      image:
        "https://cdn1.vectorstock.com/i/1000x1000/32/10/young-man-avatar-character-vector-14213210.jpg",
    },

    {
      id: "41",
      name: "JKL",
      email: "abc@gmail.com",
      actions: "-",
      activity: "Browsing",
      chattingwith: "Agent 41",
      ip: "1.009.245.2",
      image:
        "https://thumbs.dreamstime.com/b/happy-smiling-geek-hipster-beard-man-cool-avatar-geek-man-avatar-104871313.jpg",
    },
    {
      id: "42",
      name: "MNO",
      email: "abc@gmail.com",
      actions: "-",
      activity: "Browsing",
      chattingwith: "Agent 42",
      ip: "1.009.245.2",
      image:
        "https://cdn2.vectorstock.com/i/1000x1000/32/01/user-sign-icon-person-symbol-human-avatar-vector-12693201.jpg",
    },
    {
      id: "43",
      name: "JKL",
      email: "abc@gmail.com",
      actions: "-",
      activity: "Browsing",
      chattingwith: "Agent 43",
      ip: "1.009.245.2",
      image:
        "https://thumbs.dreamstime.com/b/happy-smiling-geek-hipster-beard-man-cool-avatar-geek-man-avatar-104871313.jpg",
    },
    {
      id: "44",
      name: "MNO",
      email: "abc@gmail.com",
      actions: "-",
      activity: "Browsing",
      chattingwith: "Agent 44",
      ip: "1.009.245.2",
      image:
        "https://cdn2.vectorstock.com/i/1000x1000/32/01/user-sign-icon-person-symbol-human-avatar-vector-12693201.jpg",
    },

    {
      id: "45",
      name: "MNO",
      email: "abc@gmail.com",
      actions: "-",
      activity: "Browsing",
      chattingwith: "Agent 42",
      ip: "1.009.245.2",
      image:
        "https://cdn2.vectorstock.com/i/1000x1000/32/01/user-sign-icon-person-symbol-human-avatar-vector-12693201.jpg",
    },
    {
      id: "46",
      name: "JKL",
      email: "abc@gmail.com",
      actions: "-",
      activity: "Browsing",
      chattingwith: "Agent 43",
      ip: "1.009.245.2",
      image:
        "https://thumbs.dreamstime.com/b/happy-smiling-geek-hipster-beard-man-cool-avatar-geek-man-avatar-104871313.jpg",
    },
    {
      id: "47",
      name: "MNO",
      email: "abc@gmail.com",
      actions: "-",
      activity: "Browsing",
      chattingwith: "Agent 44",
      ip: "1.009.245.2",
      image:
        "https://cdn2.vectorstock.com/i/1000x1000/32/01/user-sign-icon-person-symbol-human-avatar-vector-12693201.jpg",
    },
    {
      id: "48",
      name: "GHI",
      email: "abc@gmail.com",
      actions: "-",
      activity: "Chatting",
      chattingwith: "Agent 40",
      ip: "1.009.245.2",
      image:
        "https://cdn1.vectorstock.com/i/1000x1000/32/10/young-man-avatar-character-vector-14213210.jpg",
    },

    {
      id: "49",
      name: "JKL",
      email: "abc@gmail.com",
      actions: "-",
      activity: "Browsing",
      chattingwith: "Agent 41",
      ip: "1.009.245.2",
      image:
        "https://thumbs.dreamstime.com/b/happy-smiling-geek-hipster-beard-man-cool-avatar-geek-man-avatar-104871313.jpg",
    },
    {
      id: "50",
      name: "MNO",
      email: "abc@gmail.com",
      actions: "-",
      activity: "Browsing",
      chattingwith: "Agent 42",
      ip: "1.009.245.2",
      image:
        "https://cdn2.vectorstock.com/i/1000x1000/32/01/user-sign-icon-person-symbol-human-avatar-vector-12693201.jpg",
    },
  ];
  //for infinite scroll
  const passingFunc = () => {
    if (isActiveAll) {
      var last_element = rows2[rows2.length - 1];
      var last_elements = Number(last_element?.id);

      var temporary = [];
      var count = 1;
      for (var i = last_elements; i < rows.length; i++) {
        temporary.push(rows[i]);
        count += 1;
        if (count == 15) {
          break;
        }
      }

      const children = rows2.concat(temporary);
      setRows2(children);
    }
  };
  //when click on browsing tab
  const handleBrowsing = () => {
    var row = [];
    setRows2([]);
    for (let i = 0; i < rows.length; i++) {
      if (rows[i].activity == "Browsing") {
        row.push(rows[i]);

        setRows2(row);
        setActiveChat(false);
        setisActiveAll(false);
        setisActiveQue(false);
        setisActiveBrows(true);
      }
    }
  };
  //when click on chatting tab
  const handleChatting = () => {
    var row = [];
    setRows2([]);

    for (let i = 0; i < rows.length; i++) {
      if (rows[i].activity == "Chatting") {
        row.push(rows[i]);
        setRows2(row);
        setActiveChat(true);
        setisActiveAll(false);
        setisActiveQue(false);
        setisActiveBrows(false);
      }
    }
  };
  //when click on queued tab
  const handleQueued = () => {
    var row = [];
    setRows2([]);

    for (let i = 0; i < rows.length; i++) {
      if (rows[i].activity == "Queued") {
        row.push(rows[i]);
        setRows2(row);
        setActiveChat(false);
        setisActiveAll(false);
        setisActiveQue(true);
        setisActiveBrows(false);
      }
    }
  };
  //Bydefault and clicked on allCustomers
  const handleCustomers = () => {
    setRows2([]);
    var row = [];
    for (let i = 0; i < rows.length; i++) {
      row.push(rows[i]);
      setRows2(row);
      setActiveChat(false);
      setisActiveBrows(false);
      setisActiveQue(false);
      setisActiveAll(true);
    }
  };

  return (
    <>
      <>
        <nav className="navbar navbar-expand-lg navbar-expand-md navbar-dark bg-white">
          <div className="container" style={{ marginTop: "-2%" }}>
            <div className="container-fluid">
              <div className="collapse navbar-collapse">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li
                    className={isActiveAll ? "nav-link active" : "nav-link"}
                    default
                    aria-current="page"
                    onClick={handleCustomers}
                    style={{
                      color: "gray",
                      marginRight: "4%",
                      cursor: "pointer",
                      fontFamily: "poppins",
                      fontSize: "15px",
                    }}
                  >
                    AllCustomers({customerCount})
                  </li>
                  <li
                    style={{
                      color: "gray",
                      marginRight: "4%",
                      cursor: "pointer",
                      fontFamily: "poppins",
                      fontSize: "15px",
                    }}
                    onClick={handleBrowsing}
                    className={isActiveBrows ? "nav-link active" : "nav-link"}
                  >
                    Browsing({browsingCount})
                  </li>
                  <li
                    onClick={handleChatting}
                    style={{
                      color: "gray",
                      marginRight: "4%",
                      cursor: "pointer",
                      fontFamily: "poppins",
                      fontSize: "15px",
                    }}
                    className={isActiveChat ? "nav-link active" : "nav-link"}
                  >
                    Chatting({chatCount})
                  </li>
                  <li
                    onClick={handleQueued}
                    style={{
                      color: "gray",
                      marginRight: "4%",
                      cursor: "pointer",
                      fontFamily: "poppins",
                      fontSize: "15px",
                    }}
                    className={isActiveQue ? "nav-link active" : "nav-link"}
                  >
                    Queued({queuedCount})
                  </li>
                </ul>

                <IconButton>
                  <MoreHorizIcon style={{ fontSize: "30px" }} />
                </IconButton>
              </div>
              <hr
                style={{ marginTop: "0%", width: "120%", marginLeft: "-2%" }}
              />
              <div style={{ marginTop: "-1%" }}>
                <select
                  class="form-select"
                  aria-label="Default select example"
                  style={{
                    width: "13%",
                    color: "gray",
                    marginRight: "1%",
                    marginTop: "1%",
                    fontSize: "15px",
                    fontFamily: "poppins",
                  }}
                  onChange={handlefilterbox}
                  value={age}
                >
                  <option value="10">Match all filter</option>
                  <option value="20">Match any filter</option>
                </select>

                <Stack direction="row" spacing={2}>
                  <Button
                    style={{
                      height: "35px",
                      textTransform: "none",
                      marginTop: "-37px",
                      marginLeft: "14%",
                      color: "#55A530",
                      border: "none",
                      padding: "0px 6px",
                      backgroundColor: "#EAF9E6",
                      fontSize: "15px",
                      fontFamily: "poppins",
                    }}
                    variant="outlined"
                    startIcon={
                      <AddIcon
                        style={{
                          marginLeft: "-2px",
                          marginTop: "-2px",
                          marginRight: "-5px",
                        }}
                      />
                    }
                  >
                    Add filter
                  </Button>
                </Stack>
              </div>
            </div>
          </div>
        </nav>

        <CustomizedTables rows={rows2} passingFunc={passingFunc} />
      </>
    </>
  );
}

export default MainNavbar;
