import FileUploadModal from './FileUploadModal'
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import CloseIcon from "@material-ui/icons/Close";
import Picker from "emoji-picker-react";
import SavedRepliesContainer from "../SavedRepliesContainer";
import ChatContainerTypingMessageStatus from "../ChatContainerTypingMessageStatus";
// import ChatContainerTypingMessageStatus from "./ChatContainerTypingMessageStatus";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";
import SendIcon from "@material-ui/icons/Send";
import Switch from "@mui/material/Switch";
import StopIcon from "@mui/icons-material/Stop";
import ClearIcon from "@material-ui/icons/Clear";
import React, { useRef, useState, useMemo } from 'react'
import { makeStyles } from "@material-ui/core/styles";
// import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
// import SavedRepliesContainer from "../SavedRepliesContainer";
import { useSnackbar } from "notistack";

import Insertsavedreplies from "../../../assets/chatWindow/Insertsavedreply.svg";
import attachment from "../../../assets/chatWindow/Attachments.svg";
import {

    IconButton,

    Box,
    TextareaAutosize,
} from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
    messageTextAndSendContainer: {
        background: "white !important",
        height: "20px !important",
        // border: "1px solid #fff",
        width: "95%",
        margin: "4px auto",
        borderRadius: "5px",
    },
    messageInput: {
        height: 41,
        padding: "0px 4px",
        borderBottom: 0,
    }, messageTextBox: {
        margin: "0",
        padding: "0 6px",
        outline: "none",
        font: "inherit",
        maxHeight: 100,
        flex: 1,
        minHeight: 40,
        paddingTop: 8,
        // paddingLeft: 8,
        paddingRight: "50px",
        paddingLeft: "15px",
        overflow: "auto!important",
        borderRadius: "20px",
        border: "0px solid lightgrey",
        width: "100%",
        resize: "none",
        marginBottom: "-6px",
        fontFamily: "Poppins",
    },
    sendMessageButton: {
        marginLeft: "10px",
        alignSelf: "flex-end",
        background: "#56a530",
        color: "white",
        height: 44,
        borderRadius: "50%",
        fontSize: "16px",
        "&:hover": {
            background: "#9c9c9c",
        },
        "&:disabled": {
            background: "#9c9c9c",
            color: "white",
        }
    },
}))


const BottomChatContainer = ({
    setIsShown,
    stopRecording,
    setContainerHeightFunction,
    setChatBoxMessageTextInput,
    chatBoxMessageTextInputRef,
    file,
    isRecording,
    wrapperRef,
    setFile,
    audioURL,
    setChange,
    change,
    startRecording,
    isShown,
    chatBoxSubscriptionStatus,
    textFieldValue,
    setTextFieldValue,
    setSearchText,
    onEnterMessageTextInput,
    emojiBtnRef,
    emojiShow,
    setEmojiShow,
    addChatToFacebookQueryLoading,
    addMessageInputText,
    emojiRef,
    buttonRef,
    setcloseSavedRepliesWindow,
    hiddenFileInput,
    closeSavedRepliesWindow,
    searchText,
    setInputTextField,
    onEmojiClick
}) => {
    function SwitchThumb({ isChecked }) {
        return (
            <div className={`switch ${isChecked ? "checked" : "unchecked"}`}>
                {isChecked ? (
                    <LockIcon style={{ fontSize: "19px", marginTop: "-15%" }} />
                ) : (
                    <LockOpenIcon style={{ fontSize: "19px", marginTop: "-15%" }} />
                )}
            </div>
        );
    }
    function openuploader() {
        setFile(null)
        hiddenFileInput.current.click();
        setFileModal(true)
    }
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const [isChecked, setisChecked] = useState(false);
    const [fileModal, setFileModal] = useState(false);
    const chatBoxMessageTextInputDivRef = useRef(null);

    // const [change, setChange] = useState(false);
    // const chatBoxMessageTextInputDivRef = useRef(null);
    // let [audioURL, isRecording, startRecording, stopRecording] = useRecorder();
    const handleChange = async (event) => {
        const fileUploaded = event.target.files[0];
        // CircularProgresssetIsShown(true);
        setFile(fileUploaded);
        setContainerHeightFunction(
            chatBoxMessageTextInputDivRef.current.clientHeight
        );
    };
    const handleReset = () => {
        // setState1(true);
        stopRecording();
        audioURL = "";
        setChange(false);
    };
    const handlevoice = () => {
        // setState1(false);
        startRecording();
        if (startRecording) {
            setChange(true);
        }
        enqueueSnackbar(` Recording Started.`, {
            variant: "success",
        });
    };
    const handlestopRecording = () => {
        // setState1(true);
        stopRecording();
        enqueueSnackbar(` Recording Stoped.`, {
            variant: "warning",
        });
    };

    const handleClose = () => {
        setIsShown(false);
        setFile(null);
    };

    const mediaAttachmentUI = (
        <div>
            <span>
                <span>
                    <div style={{ position: "relative", width: "50px" }}>
                        <span style={{ marginLeft: "10px" }}>
                            {file && (
                                <img
                                    alt=""
                                    src={URL.createObjectURL(file)}
                                    style={{
                                        width: "50px",
                                        height: "50px",
                                        border: "1px solid grey",
                                    }}
                                />
                            )}
                        </span>
                        <IconButton
                            style={{
                                position: "absolute",
                                top: "-2px",
                                right: "-12px",
                                padding: "5px",
                            }}
                            onClick={() => handleClose()}
                        >
                            <CloseIcon style={{ fontSize: "15px" }} />
                        </IconButton>
                    </div>
                </span>
            </span>
        </div>
    );
    const fileUploadModal = useMemo(
        () => (
            <FileUploadModal
                fileModal={fileModal}
                setFileModal={setFileModal}
                file={file}
                setFile={setFile}
                addMessageInputText={addMessageInputText}
            />

        ), [file, fileModal]
    )

    return (
        <Box className={classes.messageTextAndSendContainer}>
            <div
                style={{
                    width: "95%",
                    position: "relative",
                    margin: "0 auto",
                    background: "white",
                }}
            >
                <div style={{ display: "flex" }}>
                    {change == false ? (
                        <div
                            ref={chatBoxMessageTextInputDivRef}
                            style={{
                                width: "100%",
                                
                                border: "1px solid lightgrey",
                                borderRadius: "20px",
                            }}
                        >
                            {isShown && mediaAttachmentUI}
                            <TextareaAutosize
                                onKeyUp={() => {
                                    setChatBoxMessageTextInput();
                                }}
                                ref={chatBoxMessageTextInputRef}
                                disabled={!chatBoxSubscriptionStatus}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            addMessageInputText();
                                            setTextFieldValue("");
                                            setSearchText("");
                                        }
                                        return;
                                    }

                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        // AvataraddMessageInputText();
                                        e.preventDefault();
                                        setTextFieldValue("");
                                        setSearchText("");
                                    }

                                }}
                                // onKeyDown={(e) => {
                                //     if (e.key === 'Enter' && !e.shiftKey) {
                                //         // AvataraddMessageInputText();
                                //         e.preventDefault();
                                //         setTextFieldValue("");
                                //         setSearchText("");
                                //     }
                                // }}
                                value={textFieldValue}
                                onInput={
                                    (e) => onEnterMessageTextInput(e)
                                    // setChatBoxMessageTextInput(e.target.value)
                                }
                                InputProps={{
                                    classes: {
                                        input: classes.messageInput,
                                    },
                                }}
                                classes={
                                    {
                                        // root: classes.messageInputRoot,
                                    }
                                }
                                placeholder={"Type message"}
                                autoFocus
                                className={classes.messageTextBox}
                            />

                            <IconButton
                                style={{
                                    position: "absolute",
                                    bottom: "32px",
                                    right: "65px",
                                    padding: "5px",
                                }}
                                ref={emojiBtnRef}
                                onClick={() => {
                                    setEmojiShow(!emojiShow);
                                }}
                            // className={classes.sendMessageButton}
                            >
                                <EmojiEmotionsIcon
                                    style={{ color: "#55a530", fontSize: "" }}
                                />
                            </IconButton>
                        </div>
                    ) : (
                        <>
                            <ClearIcon
                                style={{
                                    // position: "absolute",
                                    cursor: "pointer",
                                    color: "red",
                                    marginTop: "2%",
                                }}
                                onClick={handleReset}
                            />
                            <StopIcon
                                style={{
                                    // position: "absolute",
                                    cursor: "pointer",
                                    // marginLeft: "16px",
                                    color: "#56a530",
                                    marginTop: "2%",
                                }}
                                onClick={handlestopRecording}
                                disabled={!isRecording}
                            />
                            <audio
                                src={audioURL}
                                controls
                                controlsList="nodownload"
                                style={{ width: "100%" }}
                            />
                        </>
                        // </div>
                    )}
                    <IconButton
                        disabled={
                            !chatBoxSubscriptionStatus ||
                            addChatToFacebookQueryLoading || !textFieldValue
                        }

                        onClick={() => {
                            addMessageInputText();
                            setSearchText("");
                        }}
                        className={classes.sendMessageButton}
                    >
                        {false ? (
                            <KeyboardVoiceIcon
                                style={{ marginLeft: "0px", fontSize: "23px" }}
                                onClick={handlevoice}
                                disabled={isRecording}
                            />
                        ) : (
                            <>
                                <SendIcon
                                    style={{ marginLeft: "3px", fontSize: "17px" }}
                                />
                            </>
                        )}
                    </IconButton>

                    {emojiShow && (
                        <div
                            style={{
                                position: "absolute",
                                bottom: "75px",
                                right: "20px",
                            }}
                            ref={emojiRef}
                        >emojiRef
                            <Picker onEmojiClick={onEmojiClick} />
                        </div>
                    )}
                </div>
                <div
                    style={{
                        width: "95%",
                        margin: "-10px auto 0px auto",
                        display: "flex",
                        justifyContent: "space-between",
                        position: "relative",
                        bottom: "-8px",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {/* <div></div> */}
                        <Switch
                            icon={<SwitchThumb isChecked={false} />}
                            checkedIcon={<SwitchThumb isChecked={true} />}
                            onClick={() => {
                                setisChecked(!isChecked);
                            }}
                            classes={{
                                root: classes.root,
                                switchBase: classes.switchBase,
                                thumb: classes.thumb,
                                track: classes.track,
                                checked: classes.checked,
                                unchecked: classes.unchecked,
                            }}
                        />
                        <p
                            style={{
                                color: isChecked == true ? "green" : "gray",
                                // color: "gray",
                                marginBottom: " 1%",
                                fontSize: "small",
                                marginLeft: "-5%",
                            }}
                        >
                            Private
                        </p>
                        <p
                            style={{
                                marginTop: 0,
                                marginBottom: "0rem",
                                marginLeft: "8%",
                                color: "gray",
                            }}
                        >
                            |
                        </p>
                        <IconButton
                            style={{ padding: "2px" }}
                            ref={buttonRef}
                            disabled={!chatBoxSubscriptionStatus}
                            onClick={() => {
                                setcloseSavedRepliesWindow(!closeSavedRepliesWindow);
                            }}
                        >
                            <img
                                src={Insertsavedreplies}
                                style={{ width: "30px" }}
                                alt="Insertsavedreplies"
                            />
                        </IconButton>
                        <IconButton
                            style={{ padding: "2px" }}
                            onClick={() => openuploader()}
                            id="upfile1"
                        >
                            {" "}
                            <img
                                src={attachment}
                                style={{ width: "30px" }}
                                alt="attachment"
                            />
                        </IconButton>

                        <input
                            type="file"
                            ref={hiddenFileInput}
                            onChange={handleChange}
                            onClick={(event) => {
                                event.target.value = null
                            }}
                            id="file1"
                            name="file1"
                            style={{ display: "none" }}
                        />

                        {(closeSavedRepliesWindow || searchText) && (
                            <div
                                ref={wrapperRef}
                                style={{
                                    position: "absolute",
                                    bottom: "32px",
                                    left: "88px",
                                }}
                            >
                                <SavedRepliesContainer
                                    setSearchText={setSearchText}
                                    searchText={searchText}
                                    setInputTextField={(e) => setInputTextField(e)}
                                    setcloseSavedRepliesWindow={
                                        setcloseSavedRepliesWindow
                                    }
                                />
                            </div>
                        )}
                    </div>
                </div>

                <ChatContainerTypingMessageStatus />

            </div>   {
                <>
                    {fileUploadModal}
                </>
            }
            {/* <ChatTransfer
                fileModal={fileModal}
                setFileModal={setFileModal}
            /> */}
        </Box>
    )
}

export default BottomChatContainer