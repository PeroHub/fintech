import React from 'react'
import { Switch, Route } from "react-router-dom";
import { agentRoutes } from '../../../router/agent';


function index() {
return (
    <Switch>
        {
            agentRoutes.map((item, index) => {
                return <Route 
                key={index}
                exact
                path={`/agent/${item.path}`}
                render={(props) => {
                    return <item.component  {...props} />
                }}
                />
            })
        }
    </Switch>
    )
}
export default index;
