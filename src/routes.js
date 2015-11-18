import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './components/app'
import HomePage from './components/homePage'
import NotFoundPage from './components/notFoundPage'

const routes = (
  <Route path='/' component={App}>
    <IndexRoute component={HomePage} />
    <Route path='*' component={NotFoundPage} />
  </Route>
)

export default routes
