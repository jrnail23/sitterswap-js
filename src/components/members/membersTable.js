import React from 'react'
import {Link} from 'react-router'

class MemberRow extends React.Component {
  render () {
    var member = this.props.member
    return (
      <tr>
        <td><Link to={`/members/${member.key}`}>{member.listName}</Link></td>
        <td><a href='mailto:{member.emailAddress}'>{member.emailAddress}</a></td>
      </tr>
    )
  }
}

MemberRow.propTypes = {
  member: React.PropTypes.shape({
    key: React.PropTypes.string,
    listName: React.PropTypes.string,
    emailAddress: React.PropTypes.string
  })
}

export default class MembersTable extends React.Component {
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
          <tbody className='dev'>
            {this.props.members.map(function (member) {
              return <MemberRow key={member.key} member={member} />
            })}
          </tbody>
        </table>
      </div>
    )
  }
}

MembersTable.propTypes = {
  members: React.PropTypes.array
}
