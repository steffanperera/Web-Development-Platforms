import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { makeStyles, useMediaQuery } from "@material-ui/core";

import "./App.css";

import Header from "./components/Header";
import HomePageMsg from "./components/HomePageMsg";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Dashboards from "./components/Dashboards/Dashboards";

const useStyles = makeStyles({
  appMain: {
    paddingTop: "150px",
    paddingLeft: "320px",
    paddingRight: "320px",
    /* width: '100%' */
  },
});

function App() {
  const classes = useStyles();
  const isInSmallViewport = useMediaQuery("(min-width:768px)");
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem("data");
    if (data) {
      const { name, id } = JSON.parse(data);
      setLoggedIn(true);
    }
  }, []);

  const wrappedComponent = (Component) => {
    return (
      <div
        className={isInSmallViewport ? classes.appMain : undefined}
        styles={{ marginTop: "64px" }}
      >
        <Component />
      </div>
    );
  };

  return (
    <>
      <Router>
        <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        <Switch>
          <Route
            path="/signin"
            render={() =>
              loggedIn ? (
                <Redirect to="/dashboard" />
              ) : (
                <SignIn setLoggedIn={setLoggedIn} />
              )
            }
          />
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route
            path="/dashboard"
            render={(props) => <Dashboards {...props} loggedIn={loggedIn} />}
          />
          <Route path="/" component={HomePageMsg}></Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;

// note: this App.js file is responsible for the default view of the react application.
