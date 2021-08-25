import React, { useEffect, useState } from "react";
import {
  NavLink,
  Redirect,
  Route,
  Switch,
  useLocation,
} from "react-router-dom";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";

import AddListing from "./AddListing";
import ViewListing from "./ViewListing";

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
});

export default function FarmerDashboard({ match: { url } }) {
  const location = useLocation();
  const classes = useStyles();
  const [farmerId, setFarmerId] = useState(null);

  useEffect(() => {
    const { id } = JSON.parse(localStorage.getItem("data"));
    console.log(id);
    setFarmerId(id);
  }, []);
  console.log(url);
  return (
    <Grid container direction="row" justify="center">
      <Grid item sm={3} style={{ paddingTop: "64px" }}>
        <List component="nav" aria-label="main mailbox folders">
          <NavLink
            to={`${url}/add`}
            activeStyle={{
              fontWeight: "bold",
              color: "red",
              backgroundColor: "'#66ffb3'",
            }}
          >
            <ListItem button>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Add Listing" />
            </ListItem>
          </NavLink>
          <NavLink
            to={`${url}/list`}
            activeStyle={{
              fontWeight: "bold",
              color: "red",
            }}
          >
            <ListItem button>
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText primary="View Listings" />
            </ListItem>
          </NavLink>
        </List>
      </Grid>
      <Grid
        item
        container
        sm={9}
        className={classes.bgPattern}
        alignItems="center"
        justify="center"
      >
        <Switch>
          <Route path={`${url}/add`}>
            <AddListing farmerId={farmerId} />
          </Route>
          <Route path={`${url}/list`}>
            <ViewListing farmerId={farmerId} />
          </Route>
          <Route path={`${url}/`}>
            <Redirect to={`${url}/add`} />
          </Route>
        </Switch>
      </Grid>
    </Grid>
  );
}
