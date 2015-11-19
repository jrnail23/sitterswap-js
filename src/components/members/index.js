import React from 'react'
import {Link} from 'react-router'
import MembersList from './membersList'

export default class extends React.Component {
  render () {
    return (
      <div>
        <h1>Members</h1>
        <Link to='/members/add' className='btn btn-default'>Add New Member</Link>
        <MembersList />
      </div>
    )
  }
}
