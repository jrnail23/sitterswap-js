import React from 'react'
import {Link} from 'react-router'
import MembersTable from './membersTable'
import store from '../../stores/membersStore'

const getStateFromStore = () => {
  return {
    members: store.getAllMembers()
  }
}

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.onStoreChanged = this::this.onStoreChanged
    this.state = getStateFromStore()
  }

  componentDidMount () {
    store.addChangeListener(this.onStoreChanged)
  }

  componentWillUnmount () {
    store.removeChangeListener(this.onStoreChanged)
  }

  onStoreChanged () {
    this.setState(getStateFromStore())
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
