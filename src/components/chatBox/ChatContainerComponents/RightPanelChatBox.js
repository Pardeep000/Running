import {
    Typography,
    Button,
    makeStyles,
} from "@material-ui/core";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import detail from "../../../assets/chatWindow/Details.svg";
import form from "../../../assets/chatWindow/AddForm.svg";
import closeBtn from "../../../assets/chatWindow/Closeg.svg";
import ChatNoteMain from ".././ChatNoteMain";
import NotificationsIcon from '@mui/icons-material/Notifications';
import LabelsOnRightPanel from ".././LabelsOnRightPanel";
import DateTimePicker from "react-datetime-picker";
import DoneIcon from "@mui/icons-material/Done";
import { styled } from "@mui/material/styles";
import React, { useState } from 'react'
import FacebookAvatar from ".././FacebookAvatar";
import FacebookTypography from ".././FacebookTypography";
import SendMessage from ".././SendMessage";
import downIcon from "../../../assets/chatWindow/Icons-chevron-down.svg";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
        fontSize: "10px !important",
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    }, titlebutton: {
        color: "#55A530",
    },
}));

const useStyles = makeStyles((theme) => ({
    bottomChatsTabTexts: {
        display: "inline",
        fontWeight: "500",
        color: "black",
        marginLeft: 5,
        width: 150,
        whiteSpace: "nowrap",
        overflow: "hidden",
        fontStyle: "bold",
        fontFamily: "Poppins",
        fontSize: "17px",
    },

    datetimepicker: {
        border: "1px solid lightgray",
    },

    buttonhere: {
        display: "flex",
        justifyContent: "center",
    },
    dialogCustomizedWidth: {
        width: "30% !important",
    },
    setup: {
        zIndex: 1000,
    },
}))



const RightPanelChatBox = ({
    showUserDetailPanel,
    showUserDetail,
    showLeadFormDetail,
    selectedChatsOnFloatingTabpanelItem,
    setOpenAddLabelInput,
    openAddLabelInput,
    authUserId,
    handledateTime,
    value,
    setValue,
    setOpenReminder,
    openReminder,
    setFollowUpDialogToggle
}) => {
    const classes = useStyles()
    console.log("right panel", openAddLabelInput);
    const [iconpos, seticonpos] = useState(false);

    const handleOk = () => {
        setOpenReminder(false);
        seticonpos(false);
    };
    return (
        <>
            <div
                style={{
                    display: "flex",
                    justifyContent:
                        showUserDetail || showLeadFormDetail
                            ? "space-between "
                            : null,
                    alignItems: "center",
                }}
            >
                <div
                    style={{
                        width: "100%",
                        display: "flex",
                        flexDirection:
                            showUserDetail || showLeadFormDetail ? "row" : "column",
                        justifyContent: showUserDetail ? null : null,
                        alignItems: showUserDetail ? null : "center",
                    }}
                >
                    <div onClick={showUserDetailPanel}>
                        <img
                            src={detail}
                            alt="user detail"
                            style={{
                                borderBottom: showUserDetail && "3px solid green",
                                paddingBottom: "5px",
                                width: "25px",
                                margin:
                                    showUserDetail || showLeadFormDetail
                                        ? "20px 10px 10px 30px"
                                        : "20px 0px 0px 0px",
                                cursor: "pointer",
                            }}
                        />
                    </div>
                    <div>
                        <img
                            src={form}
                            alt="add form"
                            style={{
                                width: "25px",
                                margin:
                                    showUserDetail || showLeadFormDetail
                                        ? "20px 10px 10px 10px"
                                        : "20px 0px 0px 0px",
                                cursor: "pointer",
                            }}
                        />
                    </div>
                </div>
                <div
                    style={{
                        display:
                            showUserDetail || showLeadFormDetail ? "block" : "none",
                    }}
                >
                    <img
                        onClick={showUserDetailPanel}
                        alt=""
                        src={closeBtn}
                        style={{
                            marginRight: "10px",
                            width: "15px",
                            cursor: "pointer",
                        }}
                    />
                </div>
            </div>

            <div
                style={{
                    width: "95%",
                    margin: "0 auto",
                    display: showUserDetail ? "block" : "none",
                }}
            >
                <h3
                    style={{
                        fontSize: "20px",
                        color: "#777777",
                        marginTop: "20px",
                        fontFamily: '"Poppins", sans-serif',
                        fontWeight: "500",
                    }}
                >
                    Details
                </h3>
                <div
                    style={{
                        width: "100%",
                        padding: "10px 10px",
                        border: "1px solid lightgrey",
                        borderRadius: "5px",
                        margin: "8px 0px",
                    }}
                >
                    <span
                        style={{
                            color: "#777777",
                            fontSize: "16px",
                            fontFamily: '"Poppins", sans-serif',
                            fontWeight: "500",
                        }}
                    >
                        General info
                    </span>
                    <div
                        style={{
                            display: "flex",
                            marginTop: "10px",
                            alignItems: "center",
                        }}
                    >
                        {/* avatar */}
                        <FacebookAvatar
                            item={selectedChatsOnFloatingTabpanelItem}
                            type="customer"
                            className={classes.bottomChatsTabCustomerImage}
                        ></FacebookAvatar>
                        <FacebookTypography
                            item={selectedChatsOnFloatingTabpanelItem}
                            className={classes.bottomChatsTabTexts}
                        ></FacebookTypography>
                    </div>
                </div>
                <div
                    style={{
                        width: "100%",
                        padding: "10px 10px",
                        border: "1px solid lightgrey",
                        borderRadius: "5px",
                        margin: "8px 0px",
                    }}
                >
                    <span
                        style={{
                            fontFamily: '"Poppins", sans-serif',
                            fontWeight: "500",
                            color: "#777777",
                            fontSize: "16px",
                        }}
                    >
                        Facebook
                    </span>
                    {/* secondary */}
                    <div style={{ display: "flex", marginTop: "10px" }}>
                        <p
                            style={{
                                fontSize: "15px",
                                margin: 0,
                                fontFamily: '"Poppins", sans-serif',
                                fontWeight: "400",
                            }}
                        >
                            Name:
                        </p>
                        <FacebookTypography
                            item={selectedChatsOnFloatingTabpanelItem}
                            className={classes.bottomChatsTabText}
                        ></FacebookTypography>
                    </div>

                    <div style={{ display: "flex" }}>
                        <p
                            style={{
                                fontSize: "15px",
                                margin: 0,
                                fontFamily: '"Poppins", sans-serif',
                                fontWeight: "400",
                            }}
                        >
                            PageName:
                        </p>
                        <FacebookTypography
                            pageName
                            item={selectedChatsOnFloatingTabpanelItem}
                            className={classes.bottomChatsTabText}
                        ></FacebookTypography>
                    </div>
                </div>
                <SendMessage
                    customerId={selectedChatsOnFloatingTabpanelItem.customerId}
                    agentId={selectedChatsOnFloatingTabpanelItem.agentId}
                />

                <LabelsOnRightPanel
                    customerId={selectedChatsOnFloatingTabpanelItem.customerId}
                    pageId={selectedChatsOnFloatingTabpanelItem.pageId}
                    agentId={selectedChatsOnFloatingTabpanelItem.agentId}
                    setOpenAddLabelInput={setOpenAddLabelInput}
                    openAddLabelInput={openAddLabelInput}
                    setFollowUpDialogToggle={setFollowUpDialogToggle}
                />
                <ChatNoteMain
                    customerId={selectedChatsOnFloatingTabpanelItem.customerId}
                    pageId={selectedChatsOnFloatingTabpanelItem.pageId}
                    agentId={selectedChatsOnFloatingTabpanelItem.agentId}
                    authUserId={authUserId}
                />

                <div
                    style={{
                        width: "100%",
                        padding: "10px 10px",
                        border: "1px solid lightgrey",
                        borderRadius: "5px",
                        margin: "8px 0px",
                    }}
                >
                    <div
                        style={{ display: "flex", justifyContent: "space-between" }}
                    >
                        <span
                            style={{
                                color: "#777777",
                                fontSize: "16px",
                                fontFamily: '"Poppins", sans-serif',
                                fontWeight: "500",
                            }}
                        >
                            Set reminder
                        </span>
                        <img
                            onClick={() => {
                                seticonpos(!iconpos);
                            }}
                            src={downIcon}
                            alt=""
                            style={{
                                cursor: "pointer",
                                transform: iconpos == false ? "rotate(-90deg)" : "",
                                width: "15px",
                            }}
                        />
                    </div>
                    {iconpos == true ? (
                        <div className={classes.datetimepicker}>
                            <DateTimePicker
                                onChange={setValue}
                                value={
                                    typeof value === "string" ? new Date(value) : value
                                }
                                className={classes.setup}
                                disableClock
                            />
                            <DoneIcon
                                onClick={handledateTime}
                                style={{
                                    cursor: "pointer",
                                    marginLeft: "8px",
                                    marginTop: "-5px",
                                }}
                                color="success"
                            />
                        </div>
                    ) : null}
                </div>
                <>
                    <BootstrapDialog
                        classes={{ paper: classes.dialogCustomizedWidth }}
                        onClose={handleOk}
                        aria-labelledby="customized-dialog-title"
                        open={openReminder}
                    >
                        <div style={{ display: "flex" }}>
                            <DialogContent dividers>
                                <Typography
                                    variant="p"
                                    component="div"
                                    style={{
                                        color: "gray",
                                        fontFamily: "poppins",
                                        fontSize: "12px",
                                        display: "flex",
                                        justifyContent: "center",
                                    }}
                                    gutterBottom
                                >
                                    <NotificationsIcon />
                                </Typography>
                                <Typography
                                    variant="p"
                                    component="div"
                                    style={{
                                        color: "gray",
                                        fontFamily: "poppins",
                                        fontSize: "14px",
                                        display: "flex",
                                        justifyContent: "center",
                                    }}
                                    gutterBottom
                                >
                                    Your Reminder has been added !
                                </Typography>
                            </DialogContent>
                        </div>

                        <div className={classes.buttonhere}>
                            <Button
                                variant="light"
                                className={classes.titlebutton}
                                onClick={handleOk}
                            >
                                Ok
                            </Button>
                        </div>
                    </BootstrapDialog>
                </>
            </div>
        </>
    )
}

export default RightPanelChatBox