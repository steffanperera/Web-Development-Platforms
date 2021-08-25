import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Grid,
  makeStyles,
  Button,
  useMediaQuery,
  Typography,
  Chip,
} from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";

const useStyles = makeStyles({
  appMain: {
    paddingLeft: "300px",
    paddingRight: "300px",
    /* width: '100%' */
  },
});

export default function Header({ loggedIn, setLoggedIn }) {
  const classes = useStyles();
  const location = useHistory();
  const [user, setUser] = useState({ name: "", id: "", type: "" });

  const isInLargeViewport = useMediaQuery("(min-width:1024px)");

  useEffect(() => {
    if (loggedIn) {
      const data = localStorage.getItem("data");
      if (data) {
        const { name, id, type } = JSON.parse(data);
        setUser({ name: name, id: id, type: type });
      }
    }
  }, [loggedIn]);

  return (
    <AppBar elevation={0} position="fixed" style={{ backgroundColor: "white" }}>
      <div className={isInLargeViewport ? classes.appMain : ""}>
        <Toolbar>
          <Grid container alignItems="center">
            <Grid item>
              <div className="header-logo">
                <Link style={{ textDecoration: "none" }} to="/">
                  <img
                    className="logo"
                    style={{ height: "20px" }}
                    src="https://raw.githubusercontent.com/steffanperera/system-model-keells/main/img/keellslogo.png"
                    alt="#"
                  />
                </Link>
              </div>
            </Grid>
            <Grid item sm></Grid>
            <Grid item>
              {loggedIn ? (
                <>
                  <Typography
                    variant="h6"
                    style={{
                      display: "inline-block",
                      marginRight: "1em",
                      fontSize: "1.1em",
                      color: "black",
                    }}
                  >
                    Hello {user.name}
                  </Typography>
                  <Chip
                    label={user.type}
                    style={{
                      fontSize: "0.8em",
                      minHeight: "32px",
                      marginRight: "15px",
                    }}
                  />

                  <Button
                    elevation={0}
                    size="small"
                    color="inherit"
                    style={{
                      backgroundColor: "#0284FE",
                      textTransform: "none",
                    }}
                    onClick={() => {
                      localStorage.removeItem("data");
                      localStorage.removeItem("token");
                      setLoggedIn(false);
                      location.push("/");
                    }}
                  >
                    Log out
                  </Button>
                </>
              ) : (
                <Button
                  elevation={0}
                  size="small"
                  color="inherit"
                  style={{ backgroundColor: "#0284FE", textTransform: "none" }}
                  onClick={() => {
                    location.push("/signin");
                  }}
                >
                  Sign In
                </Button>
              )}
            </Grid>
          </Grid>
        </Toolbar>
      </div>
    </AppBar>
  );
}
