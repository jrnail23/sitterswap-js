import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './components/app'
import HomePage from './components/home'
import MembersPage from './components/members'
import AddMemberPage from './components/members/add'
import MemberProfilePage from './components/members/profile'
import NotFoundPage from './components/not-found'
import SitRecordingPage from './components/activities/recordSit'

export default (
<Route path='/' component={App}>
    <IndexRoute component={HomePage} />
    <Route path='members' component={MembersPage} />
    <Route path='members/add' component={AddMemberPage} />
    <Route path='members/:memberKey/sits/new' component={SitRecordingPage} />
    <Route path='members/:key' component={MemberProfilePage} />
    <Route path='*' component={NotFoundPage} />
  </Route>
)
