import * as React from "react";
import Box from "@material-ui/core/Box";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const AdditionalInfo = () => {
  return (
    <>
      <Box
        component="span"
        sx={{
          display: "inline-block",
          mx: "2px",
          paddingBottom: "0px",
          transform: "scale(0.8)",
          minWidth: 420,
          marginLeft: "-39px",
          paddingLeft: "10px",
          paddingRight: "10px",
          marginTop: "-42px",
        }}
      >
        <React.Fragment>
          <CardContent
            style={{
              marginTop: "12%",
              border: "1px solid gray",
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
              Additional Info
            </Typography>

            <Typography
              variant="p"
              component="div"
              style={{ fontSize: 16, color: "gray", fontFamily: "poppins" }}
              gutterBottom
            >
              Returning Visitor : 5 visits, 2 chats
            </Typography>
            <Typography
              variant="p"
              component="div"
              style={{ fontSize: 16, color: "gray", fontFamily: "poppins" }}
              gutterBottom
            >
              Last seen : today
            </Typography>
            <Typography
              variant="p"
              component="div"
              style={{ fontSize: 16, color: "gray", fontFamily: "poppins" }}
              gutterBottom
            >
              Group : General
            </Typography>
          </CardContent>
        </React.Fragment>
      </Box>
    </>
  );
};

export default AdditionalInfo;
