import * as React from "react";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const VisitedPages = () => {
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
          minWidth: 420,
          marginLeft: "-39px",
          marginTop: "-29px",
        }}
      >
        <React.Fragment>
          <CardContent
            style={{
              marginBottom: "-47%",
              marginTop: "-10%",
              paddingBottom: "30px",
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
              Visited Pages
            </Typography>

            <Typography
              variant="p"
              component="div"
              style={{ fontSize: 16, color: "gray", fontFamily: "poppins" }}
              gutterBottom
            >
              Sample Page | Preview your chat window
            </Typography>
            <Typography variant="p" component="div">
              <Link
                to="https://facebook.com/ternionsolution"
                style={{ color: "#55A530", fontFamily: "poppins" }}
              >
                https://facebook.com/ternionsolution
              </Link>
            </Typography>
          </CardContent>
        </React.Fragment>
      </Box>
    </>
  );
};

export default VisitedPages;
