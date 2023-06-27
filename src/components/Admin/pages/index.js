import React from "react";
import { Switch, Route } from "react-router-dom";
import { adminRoutes } from '../../../router/admin'


function Pages() {
  return (
    <Switch>
      {
        adminRoutes.map((item,index) => {
          return <Route
            key={index}
            exact
            path={`/cash/${item.path}`}
            render={(props) => {
              console.log(props)
              return <item.component  {...props} />
            }}
          />
        })
      }
    </Switch>
  );
}

export default Pages;
