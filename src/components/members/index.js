import React from 'react'
import {Link} from 'react-router'
import MembersTable from './membersTable'
import {getAllMembers} from '../../api/membersApi'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      members: getAllMembers()
    }
  }

  render () {
    return (
      <div>
        <h1>Members</h1>
        <Link to='/members/add' className='btn btn-default'>Add New Member</Link>
        <MembersTable members={this.state.members} />
      </div>
    )
  }
}
