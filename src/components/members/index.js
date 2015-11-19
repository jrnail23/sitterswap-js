import React from 'react'
import {Link} from 'react-router'
import MembersTable from './membersTable'

var MEMBERS = [
  {key: 'jane-doe', firstName: 'Jane', lastName: 'Doe', listName: 'Doe, Jane', emailAddress: 'jdoe@fakeemail.com'},
  {key: 'john-public', firstName: 'John', lastName: 'Public', listName: 'Public, John', emailAddress: 'jpublic@fakeemail.com'}
]

export default class extends React.Component {
  render () {
    return (
      <div>
        <h1>Members</h1>
        <Link to='/members/add' className='btn btn-default'>Add New Member</Link>
        <MembersTable members={MEMBERS} />
      </div>
    )
  }
}
