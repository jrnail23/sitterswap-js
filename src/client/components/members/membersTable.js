import React from 'react'
import {Link} from 'react-router'
import EmailLink from '../common/emailLink'

class MemberRow extends React.Component {
  static propTypes = {
    member: React.PropTypes.shape({
      key: React.PropTypes.string.isRequired,
      firstName: React.PropTypes.string.isRequired,
      lastName: React.PropTypes.string.isRequired,
      emailAddress: React.PropTypes.string.isRequired
    })
  }

  render () {
    var member = this.props.member
    return (
      <tr>
        <td><Link to={`/members/${member.key}`}>{member.lastName + ', ' + member.firstName}</Link></td>
        <td><EmailLink emailAddress={member.emailAddress} /></td>
      </tr>
    )
  }
}

export default class MembersTable extends React.Component {
  static propTypes = {
    members: React.PropTypes.array
  }

  render () {
    return (
      <div>
        <table className='table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {this.props.members.map(function (member) {
              return <MemberRow key={member.key} member={member} />
            })}
          </tbody>
        </table>
      </div>
    )
  }
}
