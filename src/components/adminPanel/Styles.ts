import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  root: {
    // backgroundColor: theme.palette.primary.main,
    transition: "all .2s ease-in-out",
    background: theme.palette.primary.main,
    color: theme.palette.secondary.dark,
    '&[aria-controls="menu-list-grow"],&:hover': {
      background: theme.palette.secondary.main,
      color: theme.palette.primary.main,
    },
  },
  label: {
    color: "#fff",
  },
  navListItem: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",

    // padding: "4px",
    "&:hover": {
      navListText: {
        color: theme.palette.primary.main,
        fontWeight: "500",
        transition: theme.transitions.create(["color"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.standard,
          delay: 100,
        }),
      },
    },
  },
  navListIcon: {
    margin: "auto",
    textAlign: "center",

    // color: "rgb(255 255 255 / 80%)",
    color: theme.palette.primary.main,
    fontSize: 28,
  },
  navListText: {
    marginTop: 0,
    textAlign: "left",
    color: theme.palette.primary.main,
  },
  listLink: {
    textDecoration: "none",
    // // marginLeft: 5,
    display: "flex",
  },
  linkSelected: {
    background: "#E6D9EC",
    borderLeft: "4px solid #4D1277",
    marginLeft: 0,
  },
  linkSelectedInner: {
    color: theme.palette.primary.main,
  },
}));

export default useStyles;
