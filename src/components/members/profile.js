import React from 'react'
import MembersStore from '../../stores/membersStore'

export default class MemberProfilePage extends React.Component {
  constructor (props, context) {
    super(props, context)

    this.state = {member: null}
  }

  static propTypes = {
    params: React.PropTypes.shape({
      key: React.PropTypes.string.isRequired
    })
  }

  componentWillMount () {
    var memberKey = this.props.params.key
    if (memberKey) {
      this.setState({member: MembersStore.getMemberByKey(memberKey)})
    }
  }

  render () {
    let member = this.state.member
    return (
        <div>
          <h1>Member Profile</h1>
          <h2>{member.firstName + ' ' + member.lastName}</h2>
          <div className='dev'>(member profile goes here)</div>
        </div>
      )
  }
}
