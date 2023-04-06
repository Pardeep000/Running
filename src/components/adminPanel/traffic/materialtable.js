import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { useState } from "react";
import { TableRowd } from "../../../store/actions/Tablerow";
import { StateControl } from "../../../store/actions/stateControl";
import { useEffect } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.gray,
    color: theme.palette.common.white,
    top: 0,
    left: 0,
    zIndex: 2,
    position: "sticky",
    backgroundColor: "#272525",
  },

  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    lineHeight: "0.43",
    padding: "0px 10px 0px 10px",
    fontFamily: "poppins",

    "&:last-child": {
      width: "0%",
    },
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
    height: "10px",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },

  setting: {
    padding: "0px 10px 0px 10px !important",
    lineHeight: "0.43 !important",
  },
}));

export default function CustomizedTables({ rows, passingFunc }) {
  const [state, setState2] = useState({});
  const [signal, setSignal] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(StateControl(false));
  }, []);

  const toggleActive = (row) => {
    setSignal(true);

    dispatch(TableRowd(row));
    dispatch(StateControl(signal));
    setState2({
      state: row,
    });
  };
  const handleScroll = (e) => {
    var bottom =
      //Set >= to
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    var bottomsmall =
      e.target.scrollHeight - e.target.scrollTop >= e.target.clientHeight;

    if (bottom) {
      passingFunc();
    }
  };

  return (
    <>
      <TableContainer
        component={Paper}
        style={{ margin: "auto", maxHeight: "450px", overflowX: "scroll" }}
        onScroll={handleScroll}
      >
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead style={{ backgroundColor: "#272525" }}>
            <TableRow>
              <StyledTableCell
                align="left"
                style={{ fontFamily: "poppins", whiteSpace: "nowrap" }}
              >
                NAME
              </StyledTableCell>
              <StyledTableCell
                align="left"
                style={{
                  fontFamily: "poppins",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
              >
                EMAIL
              </StyledTableCell>
              <StyledTableCell
                align="left"
                style={{
                  fontFamily: "poppins",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
              >
                ACTIONS
              </StyledTableCell>
              <StyledTableCell
                align="left"
                style={{ fontFamily: "poppins", whiteSpace: "nowrap" }}
              >
                ACTIVITY
              </StyledTableCell>
              <StyledTableCell
                align="left"
                style={{ fontFamily: "poppins", whiteSpace: "nowrap" }}
              >
                CHATTING WITH
              </StyledTableCell>
              <StyledTableCell
                align="left"
                style={{
                  fontFamily: "poppins",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
              >
                IP Address
              </StyledTableCell>
              <StyledTableCell align="right">
                <MoreHorizIcon
                  style={{
                    height: "25px",
                    color: "white",
                    width: "50px",
                  }}
                />
              </StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows
              // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              ?.map((row) => (
                <StyledTableRow
                  key={row?.id}
                  onClick={() => toggleActive(row)}
                  className="setting"
                  style={
                    state?.state === row
                      ? {
                          borderLeft: "10px solid #55A530",
                          cursor: "pointer",
                          background: "#E3E7E2",
                          maxWidth: "100%",
                        }
                      : {
                          background: "white",
                          cursor: "pointer",
                          maxWidth: "100%",
                        }
                  }
                >
                  <StyledTableCell
                    component="th"
                    scope="row"
                    style={{
                      padding: "2px 13px 0px 10px",
                      fontFamily: "poppins",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <div style={{ display: "flex" }}>
                      <Avatar alt="Remy Sharp" src={row?.image} />
                      <p style={{ marginTop: "12px", paddingLeft: "7px" }}>
                        {row?.name}
                      </p>
                    </div>
                  </StyledTableCell>
                  <StyledTableCell align="left">{row?.email}</StyledTableCell>
                  <StyledTableCell align="left">
                    <Button
                      style={{
                        height: "20px",
                        marginTop: "0px",
                        color: "#55A530",
                        border: "none",
                        padding: "6px 16px",
                        backgroundColor: "#EAF9E6",
                        textTransform: "none",
                      }}
                      onClick={() => {
                        alert(row.id);
                      }}
                    >
                      <h6
                        style={{
                          fontSize: "0.7rem",
                          marginTop: "12%",
                          fontFamily: "poppins",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Go to chat
                      </h6>
                    </Button>
                  </StyledTableCell>
                  <StyledTableCell
                    align="left"
                    style={{ color: "#55A530", whiteSpace: "nowrap" }}
                  >
                    <FiberManualRecordIcon style={{ fontSize: "13px" }} />
                    {row?.activity}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {row?.chattingwith}
                  </StyledTableCell>
                  <StyledTableCell align="left">{row.ip}</StyledTableCell>
                  <StyledTableCell align="right">
                    {/* Leave this cell Empty */}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
