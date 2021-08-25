import React, { useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";

import AdminDashboard from "./admin/AdminDashboard";
import FarmerDashboard from "./farmer/FarmerDashboard";
import KeellsDashboard from "./keells/KeellsDashboard";
import DoADashboard from "./doa/DoADashboard";

const Dashboards = ({ match: { url }, loggedIn, location }) => {
  const history = useHistory();
  useEffect(() => {
    console.log(location.pathname);
    if (
      loggedIn &&
      (location.pathname === "/dashboard/" ||
        location.pathname === "/dashboard")
    ) {
      const newUrl = location.pathname === "/dashboard/" ? `${url}` : `${url}/`;

      const { type } = JSON.parse(localStorage.getItem("data"));
      switch (type) {
        case "FARMER":
          history.push(`${newUrl}farmer`);
          break;
        case "ADMIN":
          history.push(`${newUrl}admin`);
          break;
        case "KEELLS":
          history.push(`${newUrl}keells`);
          break;
        case "DOA":
          history.push(`${newUrl}doa`);
          break;
      }
    }
  }, [loggedIn, location]);
  return (
    <Switch>
      <Route path={`${url}/admin`} component={AdminDashboard} />
      <Route path={`${url}/farmer`} component={FarmerDashboard} />
      <Route path={`${url}/keells`} component={KeellsDashboard} />
      <Route path={`${url}/doa`} component={DoADashboard} />
    </Switch>
  );
};

export default Dashboards;
