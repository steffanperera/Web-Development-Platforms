import React from "react";
import { Link, NavLink, Redirect, Route, Switch } from "react-router-dom";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";

import DoAViewListing from "./DoAViewListing";
import DoAInsights from "./DoAInsights";

const {
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} = require("@material-ui/core");

const useStyles = makeStyles({
  bgPattern: {
    minHeight: "100vh",
  },
  scrollableWrapper: {
    height: "100vh",
    overflow: "hidden",
  },
  scrollableContainer: {
    overflow: "auto",
    height: "calc(100% - 64px)",
    marginTop: "64px",
  },
  bg: {
    backgroundImage: "url('/assets/img/bg-pattern.png')",
    backgroundRepeat: "repeat",
  },
  tab: {
    textDecoration: "none",
    color: "black",
    fontSize: "1.1em",
  },
  activeTab: {
    fontWeight: "bold",
    color: "#0284FE",
    backgroundColor: "#ecf0f1",
  },
});

export default function DoADashboard({ match: { url } }) {
  const classes = useStyles();

  return (
    <Grid container direction="row" justify="center">
      <Grid item sm={3} style={{ marginTop: "64px" }}>
        <List component="nav" aria-label="main mailbox folders">
          <NavLink
            to={`${url}/insights`}
            activeClassName={classes.activeTab}
            className={classes.tab}
          >
            <ListItem button style={{ backgroundColor: "inherit" }}>
              <ListItemIcon></ListItemIcon>
              <ListItemText primary="Insights" />
            </ListItem>
          </NavLink>
          <NavLink
            Link
            to={`${url}/list`}
            activeClassName={classes.activeTab}
            className={classes.tab}
          >
            <ListItem button style={{ backgroundColor: "inherit" }}>
              <ListItemIcon></ListItemIcon>
              <ListItemText primary="View Listings" />
            </ListItem>
          </NavLink>
        </List>
      </Grid>

      <Switch>
        <Route path={`${url}/insights`}>
          <Grid item sm={9} className={classes.bgPattern}>
            <Grid item xs={12} className={classes.scrollableWrapper}>
              <Grid
                item
                container
                spacing={2}
                className={classes.scrollableContainer}
                direction="row"
                justify="center"
              >
                <DoAInsights />
              </Grid>
            </Grid>
          </Grid>
        </Route>
        <Route path={`${url}/list`}>
          <Grid item sm={9} className={`${classes.bg} ${classes.bgPattern}`}>
            <Grid item xs={12} className={classes.scrollableWrapper}>
              <Grid
                item
                container
                spacing={2}
                className={classes.scrollableContainer}
                direction="row"
                justify="center"
              >
                <DoAViewListing />
              </Grid>
            </Grid>
          </Grid>
        </Route>
        <Route path={`${url}/`}>
          <Redirect to={`${url}/insights`} />
        </Route>
      </Switch>
    </Grid>
  );
}
