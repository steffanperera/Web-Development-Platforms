import React from "react";
import { Link, NavLink, Route, Switch } from "react-router-dom";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import KeellsViewListing from "./KeellsViewListing";
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
    backgroundImage: "url('/assets/img/bg-pattern.png')",
    backgroundRepeat: "repeat",
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

export default function KeellsDashboard({ match: { url } }) {
  const classes = useStyles();

  return (
    <Grid container direction="row" justify="center">
      <Grid item sm={3} style={{ marginTop: "64px" }}>
        <List component="nav" aria-label="main mailbox folders">
          <NavLink
            to={`${url}/list`}
            activeClassName={classes.activeTab}
            className={classes.tab}
          >
            <ListItem button style={{ backgroundColor: "inherit" }}>
              <ListItemText primary="View Available Listings" />
            </ListItem>
          </NavLink>
        </List>
        <NavLink
          to={`${url}/accepted`}
          activeClassName={classes.activeTab}
          className={classes.tab}
        >
          <ListItem button style={{ backgroundColor: "inherit" }}>
            <ListItemText primary="Accepted Listings" />
          </ListItem>
        </NavLink>
        <NavLink
          to={`${url}/rejected`}
          activeClassName={classes.activeTab}
          className={classes.tab}
        >
          <ListItem button style={{ backgroundColor: "inherit" }}>
            <ListItemText primary="Rejected Listings" />
          </ListItem>
        </NavLink>
      </Grid>
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
            <Switch>
              <Route path={`${url}/list`}>
                <KeellsViewListing />
              </Route>
              <Route path={`${url}/accepted`}>
                <KeellsViewListing status="ACCEPTED" />
              </Route>
              <Route path={`${url}/rejected`}>
                <KeellsViewListing status="REJECTED" />
              </Route>
            </Switch>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
