import React from 'react'
import { Router, Route } from 'react-router'

let DefaultRoute = Router.DefaultRoute
let NotFoundRoute = Router.NotFoundRoute;

let routes = (
  <Route name="app" path="/" handler={require('./components/app')}>
    <DefaultRoute handler={require('./components/homePage')} />
    <NotFoundRoute handler={require('./components/notFoundPage')} />
  </Route>
)

module.exports = routes
