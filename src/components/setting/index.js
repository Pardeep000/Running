import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import SettingLeftPane from "./SettingLeftPane";
import SettingRightPane from "./SettingRightPane";
import { Facebook } from "../../auth/Facebook";
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { styled, useTheme } from '@mui/material/styles';
import { Box, CssBaseline, } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from '../layout/header/Header';

const useStyles = makeStyles((theme) => ({
  settingMain: {
    marginLeft: "5px",
    width: "calc(100% - 5px)",
    display: "grid",
    gridTemplateColumns: "26% auto",
    height: "calc(100vh - 65px)",
  },
  leftPane: {
    borderRight: "1px solid lightgrey",
    height: "calc(100vh - 65px)",
    // backgroundColor: "#f5f5f5",
  },
}));

const Setting = (props) => {
  // console.log(props, "props")
  const classes = useStyles();
  useEffect(() => {
    Facebook.fbInt();
    document.title = "Settings"
  }, []);
  const theme = useTheme();

  return (

    <Grid container xs={12} marginTop={10} style={{ height: 'calc(100vh - 80px)' }}>
      <Grid xs={3} sx={{ paddingRight: '10px', overflowY: 'auto', height: 'calc(100vh - 80px)' }} padding={2}>
        <SettingLeftPane />    </Grid>
      <Grid xs={9} sx={{ padding: '16px 20px 16px 10px' }}>
        <SettingRightPane setPage={props.match.path} />
      </Grid>
    </Grid>

  );
};

export default Setting;
