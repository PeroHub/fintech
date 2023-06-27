import React from 'react'
import { Route } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import Error  from './Error'

//implements private routing to components that are enlisted in App.js.
export default function AdminRoute({ component: Component, ...rest }) {
    const { currentUser } = useAuth()
    return (
        <Route
            {...rest}
            render={props => {
                return currentUser?.type > 3 ? <Component {...props} /> : <Error />
            }}
        >

        </Route>
    )
}
