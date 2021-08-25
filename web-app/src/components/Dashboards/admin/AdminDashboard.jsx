import React from "react";
import { Link, NavLink, Route, Switch } from "react-router-dom";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";

import AddDoA from "./AddDoA";
import AddKeells from "./AddKeells";

const {
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} = require("@material-ui/core");

const useStyles = makeStyles({
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
  inheritBg: {
    backgroundColor: "inherit",
  },
});

export default function AdminDashboard({ match: { url } }) {
  const classes = useStyles();
  return (
    <Grid
      container
      direction="row"
      justify="center"
      style={{ marginTop: "64px" }}
    >
      <Grid item sm={4} style={{ minHeight: "calc(100vh-64px)" }}>
        <List component="nav" aria-label="main mailbox folders">
          <NavLink
            to={`${url}/add-doa`}
            activeClassName={classes.activeTab}
            className={classes.tab}
          >
            <ListItem button className={classes.inheritBg}>
              <ListItemText primary="Add DoA Account" />
            </ListItem>
          </NavLink>
          <NavLink
            to={`${url}/add-keells`}
            activeClassName={classes.activeTab}
            className={classes.tab}
          >
            <ListItem button className={classes.inheritBg}>
              <ListItemText primary="Add Keells Account" />
            </ListItem>
          </NavLink>
        </List>
      </Grid>
      <Grid item sm={8}>
        <Switch>
          <Route path={`${url}/add-doa`}>
            <AddDoA />
          </Route>
          <Route path={`${url}/add-keells`}>
            <AddKeells />
          </Route>
        </Switch>
      </Grid>
    </Grid>
  );
}
