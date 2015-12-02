import React from 'react'
import {Link} from 'react-router'
import MembersTable from './membersTable'
import store from '../../stores/members'

const getStateFromStores = () => {
  return {
    members: store.getAllMembers()
  }
}

export default class extends React.Component {
  constructor (props) {
    super(props)
    this._onChange = this::this._onChange
    this.state = getStateFromStores()
  }

  componentDidMount () {
    store.addChangeListener(this._onChange)
  }

  componentWillUnmount () {
    store.removeChangeListener(this._onChange)
  }

  _onChange () {
    this.setState(getStateFromStores())
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
