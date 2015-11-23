import React from 'react'
import {bindAll} from 'lodash'
import NewMemberForm from './newMemberForm'
import {addMember} from '../../actions/membersActions'

export default class extends React.Component {

  static contextTypes = {
    history: React.PropTypes.object.isRequired
  }

  constructor (props, context) {
    super(props, context)

    bindAll(this, 'setMemberState', 'memberFormIsValid', 'saveMember')

    this.state = {
      member: {key: '', firstName: '', lastName: '', emailAddress: ''},
      errors: {}
    }
  }

  setMemberState (event) {
    var field = event.target.name
    var value = event.target.value
    this.state.member[field] = value
    return this.setState({member: this.state.member})
  }

  memberFormIsValid () {
    var formIsValid = true
    this.state.errors = {}

    if (!this.state.member.firstName) {
      this.state.errors.firstName = 'First name is required'
      formIsValid = false
    }

    if (!this.state.member.lastName) {
      this.state.errors.lastName = 'Last name is required'
      formIsValid = false
    }

    if (!this.state.member.emailAddress) {
      this.state.errors.emailAddress = 'Email address is required'
      formIsValid = false
    }

    this.setState({errors: this.state.errors})
    return formIsValid
  }

  saveMember (event) {
    event.preventDefault()

    if (!this.memberFormIsValid()) {
      return
    }

    addMember(this.state.member)
    this.context.history.pushState(null, `/members`)
  }

  render () {
    return (
      <div>
        <h1>Add New Member</h1>
        <NewMemberForm member={this.state.member}
          onChange={this.setMemberState}
          onSave={this.saveMember}
          errors={this.state.errors} />
      </div>
    )
  }
}
