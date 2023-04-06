import * as React from "react";
import Box from "@material-ui/core/Box";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import SimpleMap from "./googlemap";
import Avatar from "@material-ui/core/Avatar";
import { useSelector } from "react-redux";
const locations = require("./location.json");

const GeneralInfo = () => {
  const rowState = useSelector((state) => state.TablerowReducer);
  return (
    <>
      {/* <div
        style={{
          
          transform: "scale(0.8)",
          width: "100%",
        }}
      >
        <div style={{ border: "1px solid gray", width: "100%" }}>
          <Typography
            style={{
              fontSize: 17,
              fontWeight: "bold",
              color: "gray",
              fontFamily: "poppins",
            }}
            gutterBottom
          >
            General Info
          </Typography>
          <Typography
            variant="h6"
            component="div"
            style={{ display: "flex", fontFamily: "poppins" }}
          >
            <Avatar
              alt="Remy Sharp"
              src={rowState.tablerow.image}
              style={{ marginRight: "7px" }}
            />
            {rowState.tablerow.name}
          </Typography>
          <Typography
            variant="p"
            component="div"
            style={{
              fontSize: 16,
              color: "gray",
              // marginTop: "2%",
              fontFamily: "poppins",
            }}
          >
            <QueryBuilderIcon />
            10:30pm local time
          </Typography>
          <Typography
            variant="p"
            component="div"
            style={{ fontSize: 16, color: "gray", fontFamily: "poppins" }}
          >
            <LocationOnIcon />
            Karachi Sindh ,Pakistan
          </Typography>
          <SimpleMap locations={locations} />
        </div>
      </div> */}
      <Box
        component="span"
        sx={{
          display: "inline-block",
          mx: "2px",
          paddingBottom: "0px",
          transform: "scale(0.8)",
          width: "100%",
          paddingLeft: "10px",
          paddingRight: "10px",
          minWidth: 420,
          maxWidth: 300,
          marginLeft: "-39px",
          marginTop: "-29px",
        }}
      >
        <React.Fragment>
          <CardContent
            style={{
              paddingBottom: "2px",

              marginBottom: "8%",
              border: "1px solid gray",
              width: "100%",
              borderRadius: "5px",
            }}
          >
            <Typography
              style={{
                fontSize: 17,
                fontWeight: "bold",
                color: "gray",
                fontFamily: "poppins",
              }}
              gutterBottom
            >
              General Info
            </Typography>
            <Typography
              variant="h6"
              component="div"
              style={{ display: "flex", fontFamily: "poppins" }}
            >
              <Avatar
                alt="Remy Sharp"
                src={rowState.tablerow.image}
                style={{ marginRight: "7px" }}
              />
              {rowState.tablerow.name}
            </Typography>
            <Typography
              variant="p"
              component="div"
              style={{
                fontSize: 16,
                color: "gray",
                marginTop: "2%",
                fontFamily: "poppins",
              }}
            >
              <QueryBuilderIcon />
              10:30pm local time
            </Typography>
            <Typography
              variant="p"
              component="div"
              style={{ fontSize: 16, color: "gray", fontFamily: "poppins" }}
            >
              <LocationOnIcon />
              Karachi Sindh ,Pakistan
            </Typography>
            <SimpleMap locations={locations} />
          </CardContent>
        </React.Fragment>
      </Box>
    </>
  );
};

export default GeneralInfo;
