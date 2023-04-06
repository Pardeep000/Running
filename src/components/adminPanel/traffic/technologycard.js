import * as React from "react";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const TechnologyCard = () => {
  return (
    <>
      <Box
        component="span"
        sx={{
          display: "inline-block",
          mx: "2px",
          paddingBottom: "0px",
          transform: "scale(0.8)",
          paddingLeft: "10px",
          paddingRight: "10px",
          minWidth: 375,
        }}
      >
        <React.Fragment>
          <CardContent
            style={{
              marginTop: "-43px",
              marginLeft: "-45px",
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
              Technology
            </Typography>

            <Typography
              variant="p"
              component="div"
              style={{ fontSize: 16, color: "gray", fontFamily: "poppins" }}
              gutterBottom
            >
              IP Address : 126.1.0.119
            </Typography>
            <Typography
              variant="p"
              component="div"
              style={{ fontSize: 16, color: "gray", fontFamily: "poppins" }}
              gutterBottom
            >
              OS/Device : Windows-10
            </Typography>
            <Typography
              variant="p"
              component="div"
              style={{ fontSize: 16, color: "gray", fontFamily: "poppins" }}
              gutterBottom
            >
              Browser : Chrome loremsfhjshdfhsohfsh shfoidshfisfsdhfshjf
              fsdufsouhfnsnfsjnfsd faohfouanjdsb vnf jfhohfoiewhg
              hwrighfoaisghigj fofjihosudgnf
            </Typography>
          </CardContent>
        </React.Fragment>
      </Box>
    </>
  );
};
export default TechnologyCard;
